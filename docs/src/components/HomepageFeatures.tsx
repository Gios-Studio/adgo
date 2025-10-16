import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    description: (
      <>
        AdGo platform was designed from the ground up to be easily installed and
        used to get your advertising campaigns up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    description: (
      <>
        AdGo lets you focus on your advertising strategy, and we'll do the chores. Go
        ahead and create campaigns and target your audience efficiently.
      </>
    ),
  },
  {
    title: 'Powered by Analytics',
    description: (
      <>
        Get deep insights into your advertising performance with real-time analytics
        and comprehensive reporting tools.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}