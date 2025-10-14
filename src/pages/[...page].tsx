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