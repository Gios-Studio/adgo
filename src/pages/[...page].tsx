/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:35 UTC
 */

import { BuilderComponent, builder } from '@builder.io/react';
import { useRouter } from 'next/router';

export async function getStaticProps({ params }) {
  const urlPath = '/' + (params?.page?.join('/') || '');
  const page = await builder.get('page', { url: urlPath }).toPromise();
  return { props: { page: page || null }, revalidate: 5 };
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export default function Page({ page }) {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;
  return <BuilderComponent model="page" content={page} />;
}