import React from 'react';
import { TextAd, getLanguageDirection, CTA_BUTTON_TEXT } from '../types/textAds';
import { ExternalLink } from 'lucide-react';

interface TextAdDisplayProps {
  ad: TextAd;
  onClick?: () => void;
  className?: string;
  maxWidth?: string;
  showCTAButton?: boolean;
}

export const TextAdDisplay: React.FC<TextAdDisplayProps> = ({ 
  ad, 
  onClick, 
  className = '', 
  maxWidth = '400px',
  showCTAButton = true 
}) => {
  const direction = getLanguageDirection(ad.language);
  const ctaText = CTA_BUTTON_TEXT[ad.language];

  const handleCTAClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ad.cta_link) {
      window.open(ad.cta_link, '_blank', 'noopener,noreferrer');
    }
  };

  const adStyle: React.CSSProperties = {
    backgroundColor: ad.text_style.backgroundColor,
    color: ad.text_style.textColor,
    fontSize: ad.text_style.fontSize,
    fontWeight: ad.text_style.fontWeight,
    textAlign: ad.text_style.textAlign || (direction === 'rtl' ? 'right' : 'left'),
    borderRadius: ad.text_style.borderRadius || '8px',
    padding: ad.text_style.padding || '16px',
    direction,
    maxWidth,
    border: '1px solid #e5e7eb',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease-in-out'
  };

  return (
    <div 
      className={`text-ad-display ${className}`}
      style={adStyle}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Text advertisement: ${ad.title}`}
    >
      {/* Ad Title (optional, smaller text) */}
      {ad.title && (
        <div 
          className="text-ad-title"
          style={{
            fontSize: '12px',
            opacity: 0.7,
            marginBottom: '8px',
            fontWeight: '500'
          }}
        >
          {ad.title}
        </div>
      )}

      {/* Main Ad Text */}
      <div 
        className="text-ad-content"
        style={{
          lineHeight: '1.5',
          marginBottom: ad.cta_link && showCTAButton ? '12px' : '0'
        }}
      >
        {ad.ad_text}
      </div>

      {/* CTA Button */}
      {ad.cta_link && showCTAButton && (
        <button
          onClick={handleCTAClick}
          className="text-ad-cta"
          style={{
            backgroundColor: ad.text_style.textColor || '#000000',
            color: ad.text_style.backgroundColor || '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'opacity 0.2s',
            marginTop: '8px'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLElement).style.opacity = '0.8';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.opacity = '1';
          }}
          aria-label={`${ctaText}: ${ad.cta_link}`}
        >
          {ctaText}
          <ExternalLink size={12} />
        </button>
      )}
    </div>
  );
};

// Preview component for ad creation
interface TextAdPreviewProps {
  title: string;
  adText: string;
  language: 'en' | 'sw' | 'fr' | 'ar';
  ctaLink?: string;
  textStyle: {
    backgroundColor: string;
    textColor: string;
    fontSize: string;
    fontWeight: 'normal' | 'bold' | '500' | '600' | '700';
    textAlign?: 'left' | 'center' | 'right';
    borderRadius?: string;
    padding?: string;
  };
}

export const TextAdPreview: React.FC<TextAdPreviewProps> = ({
  title,
  adText,
  language,
  ctaLink,
  textStyle
}) => {
  const previewAd: TextAd = {
    id: 'preview',
    title,
    ad_text: adText,
    language,
    ad_type: 'text',
    cta_link: ctaLink,
    text_style: textStyle,
    status: 'active',
    user_id: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  return (
    <div className="text-ad-preview">
      <div className="text-xs text-gray-500 mb-2">Preview:</div>
      <TextAdDisplay 
        ad={previewAd}
        maxWidth="300px"
        showCTAButton={true}
      />
    </div>
  );
};

// Responsive text ad for different screen sizes
interface ResponsiveTextAdProps extends TextAdDisplayProps {
  breakpoints?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
}

export const ResponsiveTextAd: React.FC<ResponsiveTextAdProps> = ({
  breakpoints = {
    mobile: '280px',
    tablet: '350px', 
    desktop: '400px'
  },
  ...props
}) => {
  return (
    <div className="responsive-text-ad">
      <style jsx>{`
        .responsive-text-ad .text-ad-display {
          max-width: ${breakpoints.mobile};
        }
        
        @media (min-width: 768px) {
          .responsive-text-ad .text-ad-display {
            max-width: ${breakpoints.tablet};
          }
        }
        
        @media (min-width: 1024px) {
          .responsive-text-ad .text-ad-display {
            max-width: ${breakpoints.desktop};
          }
        }
      `}</style>
      <TextAdDisplay {...props} />
    </div>
  );
};

export default TextAdDisplay;