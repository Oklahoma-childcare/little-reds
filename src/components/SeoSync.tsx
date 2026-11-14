import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { PAGE_META } from '../lib/render-page.mjs';
export function SeoSync() {
  const path = useRouterState({select: s => s.location.pathname});
  useEffect(() => {
    const normalized = path.replace(/\/$/,'') || '/';
    const meta = PAGE_META[normalized] || PAGE_META['/'];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    const base = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');
    if (base && import.meta.env.VITE_PUBLICATION_APPROVED === 'true') {
      const url = `${base}${normalized === '/' ? '/' : normalized + '/'}`;
      if (canonical) canonical.setAttribute('href', url);
      else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = url;
        document.head.appendChild(link);
      }
    }
  }, [path]);
  return null;
}
