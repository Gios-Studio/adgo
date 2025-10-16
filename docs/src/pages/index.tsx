import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/overview">
            Get Started - 5min ⏱️
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/api/overview"
            style={{marginLeft: '1rem'}}>
            API Reference 📖
          </Link>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <strong>99.9%</strong>
            <span>Uptime SLA</span>
          </div>
          <div className={styles.stat}>
            <strong>&lt;50ms</strong>
            <span>Global Latency</span>
          </div>
          <div className={styles.stat}>
            <strong>150+</strong>
            <span>Countries</span>
          </div>
          <div className={styles.stat}>
            <strong>1B+</strong>
            <span>Requests/Day</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Enterprise advertising technology platform with global reach, advanced targeting, and comprehensive analytics.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        
        {/* Quick Start Section */}
        <section className={styles.quickStart}>
          <div className="container">
            <div className="row">
              <div className="col col--12">
                <div className="text--center margin-bottom--lg">
                  <Heading as="h2">Get Started in Minutes</Heading>
                  <p className="margin-bottom--lg">
                    Install AdGo SDK and start serving ads with just a few lines of code
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col--6">
                <div className={styles.quickStartStep}>
                  <Heading as="h3">1. Install SDK</Heading>
                  <div className={styles.codeBlock}>
                    <pre>
                      <code>npm install @adgo/sdk</code>
                    </pre>
                  </div>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartStep}>
                  <Heading as="h3">2. Initialize & Fetch Ad</Heading>
                  <div className={styles.codeBlock}>
                    <pre>
                      <code>{`import AdGoSDK from '@adgo/sdk';

const adgo = new AdGoSDK({
  licenseKey: 'adgo_your_key_here'
});

const ad = await adgo.recordImpression(
  'ad-id', 'user-id', { placement: 'banner' }
);`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section className={styles.platformStats}>
          <div className="container">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2">Trusted by Developers Worldwide</Heading>
            </div>
            <div className="row">
              <div className="col col--3">
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>500K+</div>
                  <div className={styles.statLabel}>API Calls Daily</div>
                </div>
              </div>
              <div className="col col--3">
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>SDK Integrations</div>
                </div>
              </div>
              <div className="col col--3">
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>99.9%</div>
                  <div className={styles.statLabel}>Uptime SLA</div>
                </div>
              </div>
              <div className="col col--3">
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>24/7</div>
                  <div className={styles.statLabel}>Global Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className="text--center">
              <Heading as="h2">Ready to Transform Your Ad Tech?</Heading>
              <p className="margin-bottom--lg">
                Join thousands of developers building the future of advertising technology
              </p>
              <div className={styles.ctaButtons}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/getting-started/quick-start">
                  Start Building Free →
                </Link>
                <Link
                  className="button button--outline button--primary button--lg"
                  to="https://console.adgo.com"
                  style={{marginLeft: '1rem'}}>
                  Developer Console
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}