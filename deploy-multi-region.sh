#!/bin/bash

# AdGo Multi-Region Edge Function Deployment Script
# Deploys Edge Functions to multiple Supabase regions with automated failover

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REGIONS=("us-east-1" "eu-west-1" "ap-southeast-1" "af-south-1")
FUNCTIONS=("sdk" "telemetry" "security")
PROJECT_REF="${SUPABASE_PROJECT_REF}"
ACCESS_TOKEN="${SUPABASE_ACCESS_TOKEN}"

# Regional endpoints mapping
declare -A REGION_ENDPOINTS=(
    ["us-east-1"]="https://api.supabase.com"
    ["eu-west-1"]="https://eu.api.supabase.com"
    ["ap-southeast-1"]="https://ap.api.supabase.com"
    ["af-south-1"]="https://af.api.supabase.com"
)

# Regional configurations
declare -A REGION_CONFIG=(
    ["us-east-1"]='{"timezone":"America/New_York","currency":"USD","locale":"en-US"}'
    ["eu-west-1"]='{"timezone":"Europe/London","currency":"EUR","locale":"en-GB"}'
    ["ap-southeast-1"]='{"timezone":"Asia/Singapore","currency":"SGD","locale":"en-SG"}'
    ["af-south-1"]='{"timezone":"Africa/Johannesburg","currency":"ZAR","locale":"en-ZA"}'
)

echo -e "${BLUE}🚀 AdGo Multi-Region Deployment Starting...${NC}"

# Check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}📋 Checking prerequisites...${NC}"
    
    if ! command -v supabase &> /dev/null; then
        echo -e "${RED}❌ Supabase CLI not installed${NC}"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        echo -e "${RED}❌ jq not installed${NC}"
        exit 1
    fi
    
    if [[ -z "$PROJECT_REF" ]]; then
        echo -e "${RED}❌ SUPABASE_PROJECT_REF not set${NC}"
        exit 1
    fi
    
    if [[ -z "$ACCESS_TOKEN" ]]; then
        echo -e "${RED}❌ SUPABASE_ACCESS_TOKEN not set${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Prerequisites checked${NC}"
}

# Deploy function to specific region
deploy_to_region() {
    local function_name=$1
    local region=$2
    local endpoint=${REGION_ENDPOINTS[$region]}
    local config=${REGION_CONFIG[$region]}
    
    echo -e "${YELLOW}🌍 Deploying ${function_name} to ${region}...${NC}"
    
    # Create region-specific environment variables
    local env_vars=$(cat <<EOF
{
  "REGION": "$region",
  "REGION_CONFIG": $config,
  "SUPABASE_URL": "${endpoint}/projects/${PROJECT_REF}",
  "SUPABASE_SERVICE_ROLE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}",
  "EDGE_FUNCTION_REGION": "$region"
}
EOF
)
    
    # Deploy function with regional configuration
    supabase functions deploy $function_name \
        --project-ref $PROJECT_REF \
        --region $region \
        --env-vars "$env_vars" \
        --no-verify-jwt || {
        echo -e "${RED}❌ Failed to deploy ${function_name} to ${region}${NC}"
        return 1
    }
    
    echo -e "${GREEN}✅ ${function_name} deployed to ${region}${NC}"
}

# Test regional endpoint
test_endpoint() {
    local function_name=$1
    local region=$2
    local endpoint="${REGION_ENDPOINTS[$region]}/functions/v1/${function_name}"
    
    echo -e "${YELLOW}🧪 Testing ${function_name} in ${region}...${NC}"
    
    local response=$(curl -s -o /dev/null -w "%{http_code}" \
        -X GET "$endpoint/health" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        --connect-timeout 10 \
        --max-time 30)
    
    if [[ "$response" == "200" ]]; then
        echo -e "${GREEN}✅ ${function_name} healthy in ${region}${NC}"
        return 0
    else
        echo -e "${RED}❌ ${function_name} unhealthy in ${region} (HTTP $response)${NC}"
        return 1
    fi
}

# Create global load balancer configuration
create_load_balancer_config() {
    echo -e "${YELLOW}⚖️  Creating load balancer configuration...${NC}"
    
    local config_file="regional-config.json"
    
    cat > $config_file <<EOF
{
  "loadBalancer": {
    "strategy": "closest_region",
    "healthCheck": {
      "enabled": true,
      "interval": 30,
      "timeout": 10,
      "retries": 3
    },
    "regions": [
EOF

    local first=true
    for region in "${REGIONS[@]}"; do
        if [[ "$first" == true ]]; then
            first=false
        else
            echo "," >> $config_file
        fi
        
        cat >> $config_file <<EOF
      {
        "name": "$region",
        "endpoint": "${REGION_ENDPOINTS[$region]}",
        "config": ${REGION_CONFIG[$region]},
        "priority": 1,
        "weight": 100
      }
EOF
    done
    
    cat >> $config_file <<EOF
    ],
    "failover": {
      "enabled": true,
      "maxRetries": 3,
      "backoffStrategy": "exponential",
      "circuitBreaker": {
        "enabled": true,
        "failureThreshold": 5,
        "recoveryTimeout": 60
      }
    }
  },
  "localization": {
    "defaultLocale": "en-US",
    "supportedLocales": ["en-US", "en-GB", "en-ZA", "fr-FR", "ar-SA"],
    "regionMapping": {
      "us-east-1": "en-US",
      "eu-west-1": "en-GB", 
      "ap-southeast-1": "en-SG",
      "af-south-1": "en-ZA"
    }
  },
  "monitoring": {
    "enabled": true,
    "metrics": ["latency", "availability", "error_rate"],
    "alerting": {
      "enabled": true,
      "thresholds": {
        "latency": 2000,
        "availability": 99.9,
        "error_rate": 1.0
      }
    }
  }
}
EOF
    
    echo -e "${GREEN}✅ Load balancer config created: $config_file${NC}"
}

# Deploy regional router function
deploy_regional_router() {
    echo -e "${YELLOW}🌐 Deploying regional router...${NC}"
    
    # Create the router function if it doesn't exist
    if [[ ! -f "supabase/functions/router/index.ts" ]]; then
        mkdir -p supabase/functions/router
        
        cat > supabase/functions/router/index.ts <<'EOF'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const REGIONAL_ENDPOINTS = {
  'us-east-1': 'https://api.supabase.com',
  'eu-west-1': 'https://eu.api.supabase.com', 
  'ap-southeast-1': 'https://ap.api.supabase.com',
  'af-south-1': 'https://af.api.supabase.com'
};

const REGION_PRIORITIES = {
  'us-east-1': ['us-east-1', 'eu-west-1', 'ap-southeast-1', 'af-south-1'],
  'eu-west-1': ['eu-west-1', 'us-east-1', 'ap-southeast-1', 'af-south-1'],
  'ap-southeast-1': ['ap-southeast-1', 'us-east-1', 'eu-west-1', 'af-south-1'],
  'af-south-1': ['af-south-1', 'eu-west-1', 'us-east-1', 'ap-southeast-1']
};

serve(async (req) => {
  const url = new URL(req.url);
  const clientRegion = detectClientRegion(req);
  const targetFunction = url.pathname.split('/')[1] || 'sdk';
  
  const priorityRegions = REGION_PRIORITIES[clientRegion] || REGION_PRIORITIES['us-east-1'];
  
  for (const region of priorityRegions) {
    try {
      const endpoint = `${REGIONAL_ENDPOINTS[region]}/functions/v1/${targetFunction}`;
      const response = await fetch(endpoint, {
        method: req.method,
        headers: req.headers,
        body: req.body
      });
      
      if (response.ok) {
        return new Response(response.body, {
          status: response.status,
          headers: {
            ...Object.fromEntries(response.headers.entries()),
            'X-AdGo-Region': region,
            'X-AdGo-Router': 'v1.0.0'
          }
        });
      }
    } catch (error) {
      console.warn(`Failed to reach ${region}:`, error.message);
      continue;
    }
  }
  
  return new Response('All regions unavailable', { status: 503 });
});

function detectClientRegion(req: Request): string {
  const cfRegion = req.headers.get('cf-ipcountry');
  const xForwardedFor = req.headers.get('x-forwarded-for');
  
  // Simple region detection based on IP geolocation
  if (cfRegion) {
    if (['US', 'CA', 'MX'].includes(cfRegion)) return 'us-east-1';
    if (['GB', 'DE', 'FR', 'IT', 'ES'].includes(cfRegion)) return 'eu-west-1';
    if (['SG', 'MY', 'TH', 'ID', 'PH'].includes(cfRegion)) return 'ap-southeast-1';
    if (['ZA', 'NG', 'EG', 'KE', 'MA'].includes(cfRegion)) return 'af-south-1';
  }
  
  return 'us-east-1'; // Default fallback
}
EOF
    fi
    
    # Deploy the router to all regions
    for region in "${REGIONS[@]}"; do
        deploy_to_region "router" "$region"
    done
    
    echo -e "${GREEN}✅ Regional router deployed${NC}"
}

# Update SDK with regional awareness
update_sdk_regional_config() {
    echo -e "${YELLOW}🔧 Updating SDK with regional configuration...${NC}"
    
    # Append regional configuration to the SDK
    cat >> sdks/javascript/adgo-sdk.ts <<'EOF'

/**
 * Regional Configuration for AdGo SDK
 * Automatically routes requests to the nearest healthy region
 */

interface RegionalConfig {
  region: string;
  endpoint: string;
  config: {
    timezone: string;
    currency: string;
    locale: string;
  };
  priority: number;
  weight: number;
}

const REGIONAL_CONFIGS: RegionalConfig[] = [
  {
    region: 'us-east-1',
    endpoint: 'https://api.supabase.com',
    config: { timezone: 'America/New_York', currency: 'USD', locale: 'en-US' },
    priority: 1,
    weight: 100
  },
  {
    region: 'eu-west-1', 
    endpoint: 'https://eu.api.supabase.com',
    config: { timezone: 'Europe/London', currency: 'EUR', locale: 'en-GB' },
    priority: 1,
    weight: 100
  },
  {
    region: 'ap-southeast-1',
    endpoint: 'https://ap.api.supabase.com', 
    config: { timezone: 'Asia/Singapore', currency: 'SGD', locale: 'en-SG' },
    priority: 1,
    weight: 100
  },
  {
    region: 'af-south-1',
    endpoint: 'https://af.api.supabase.com',
    config: { timezone: 'Africa/Johannesburg', currency: 'ZAR', locale: 'en-ZA' },
    priority: 1,
    weight: 100
  }
];

export class RegionalManager {
  private healthStatus: Map<string, boolean> = new Map();
  private lastHealthCheck: Map<string, number> = new Map();
  private circuitBreaker: Map<string, { failures: number; lastFailure: number }> = new Map();

  constructor() {
    this.initializeHealthStatus();
  }

  private initializeHealthStatus(): void {
    REGIONAL_CONFIGS.forEach(config => {
      this.healthStatus.set(config.region, true);
      this.lastHealthCheck.set(config.region, 0);
      this.circuitBreaker.set(config.region, { failures: 0, lastFailure: 0 });
    });
  }

  public async getOptimalRegion(): Promise<RegionalConfig> {
    const clientRegion = this.detectClientRegion();
    
    // Try client region first if healthy
    const clientConfig = REGIONAL_CONFIGS.find(c => c.region === clientRegion);
    if (clientConfig && await this.isRegionHealthy(clientConfig.region)) {
      return clientConfig;
    }

    // Find next best healthy region
    for (const config of REGIONAL_CONFIGS) {
      if (await this.isRegionHealthy(config.region)) {
        return config;
      }
    }

    // Fallback to first region even if unhealthy
    return REGIONAL_CONFIGS[0];
  }

  private detectClientRegion(): string {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (timezone.includes('America')) return 'us-east-1';
    if (timezone.includes('Europe')) return 'eu-west-1';
    if (timezone.includes('Asia')) return 'ap-southeast-1';
    if (timezone.includes('Africa')) return 'af-south-1';
    
    return 'us-east-1'; // Default
  }

  private async isRegionHealthy(region: string): Promise<boolean> {
    const now = Date.now();
    const lastCheck = this.lastHealthCheck.get(region) || 0;
    
    // Use cached result if recent
    if (now - lastCheck < 30000) { // 30 seconds
      return this.healthStatus.get(region) || false;
    }

    // Check circuit breaker
    const breaker = this.circuitBreaker.get(region);
    if (breaker && breaker.failures >= 5 && now - breaker.lastFailure < 60000) {
      return false; // Circuit open
    }

    try {
      const config = REGIONAL_CONFIGS.find(c => c.region === region);
      if (!config) return false;

      const response = await fetch(`${config.endpoint}/functions/v1/sdk/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      const isHealthy = response.ok;
      this.healthStatus.set(region, isHealthy);
      this.lastHealthCheck.set(region, now);

      // Reset circuit breaker on success
      if (isHealthy && breaker) {
        breaker.failures = 0;
      }

      return isHealthy;

    } catch (error) {
      console.warn(`Health check failed for ${region}:`, error);
      
      // Increment circuit breaker
      const breaker = this.circuitBreaker.get(region);
      if (breaker) {
        breaker.failures++;
        breaker.lastFailure = now;
      }

      this.healthStatus.set(region, false);
      this.lastHealthCheck.set(region, now);
      return false;
    }
  }

  public getRegionalConfig(region: string): RegionalConfig | undefined {
    return REGIONAL_CONFIGS.find(c => c.region === region);
  }

  public getAllRegions(): RegionalConfig[] {
    return [...REGIONAL_CONFIGS];
  }
}
EOF

    echo -e "${GREEN}✅ SDK updated with regional configuration${NC}"
}

# Run health checks on all deployments
run_health_checks() {
    echo -e "${YELLOW}🏥 Running comprehensive health checks...${NC}"
    
    local failed_checks=0
    
    for region in "${REGIONS[@]}"; do
        echo -e "${BLUE}Testing region: $region${NC}"
        
        for function in "${FUNCTIONS[@]}"; do
            if ! test_endpoint "$function" "$region"; then
                ((failed_checks++))
            fi
        done
        
        echo ""
    done
    
    if [[ $failed_checks -eq 0 ]]; then
        echo -e "${GREEN}✅ All health checks passed!${NC}"
    else
        echo -e "${YELLOW}⚠️  $failed_checks health checks failed${NC}"
    fi
    
    return $failed_checks
}

# Generate deployment report
generate_report() {
    echo -e "${YELLOW}📊 Generating deployment report...${NC}"
    
    local report_file="deployment-report-$(date +%Y%m%d-%H%M%S).json"
    
    cat > $report_file <<EOF
{
  "deployment": {
    "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "version": "1.0.0",
    "regions": [$(printf '"%s",' "${REGIONS[@]}" | sed 's/,$//')],
    "functions": [$(printf '"%s",' "${FUNCTIONS[@]}" | sed 's/,$//')],
    "status": "completed"
  },
  "configuration": {
    "loadBalancer": "enabled",
    "healthChecks": "enabled", 
    "circuitBreaker": "enabled",
    "multiRegion": true
  },
  "endpoints": {
EOF

    local first=true
    for region in "${REGIONS[@]}"; do
        if [[ "$first" == true ]]; then
            first=false
        else
            echo "," >> $report_file
        fi
        
        echo "    \"$region\": \"${REGION_ENDPOINTS[$region]}\"" >> $report_file
    done

    cat >> $report_file <<EOF
  }
}
EOF
    
    echo -e "${GREEN}✅ Deployment report saved: $report_file${NC}"
}

# Main deployment flow
main() {
    echo -e "${BLUE}============================================${NC}"
    echo -e "${BLUE}  AdGo Multi-Region Deployment Pipeline    ${NC}"
    echo -e "${BLUE}============================================${NC}"
    
    check_prerequisites
    
    # Deploy functions to all regions
    for function in "${FUNCTIONS[@]}"; do
        echo -e "\n${YELLOW}📦 Deploying $function to all regions...${NC}"
        
        for region in "${REGIONS[@]}"; do
            deploy_to_region "$function" "$region"
        done
    done
    
    # Deploy regional router
    deploy_regional_router
    
    # Create load balancer configuration
    create_load_balancer_config
    
    # Update SDK with regional awareness
    update_sdk_regional_config
    
    # Run comprehensive health checks
    echo -e "\n${YELLOW}🏥 Running final health checks...${NC}"
    run_health_checks
    
    # Generate deployment report
    generate_report
    
    echo -e "\n${GREEN}🎉 Multi-region deployment completed successfully!${NC}"
    echo -e "${BLUE}📍 Regions: ${REGIONS[*]}${NC}"
    echo -e "${BLUE}🔧 Functions: ${FUNCTIONS[*]}${NC}"
    echo -e "${BLUE}🌐 Load balancer: Enabled${NC}"
    echo -e "${BLUE}💚 Health monitoring: Active${NC}"
}

# Execute main function
main "$@"