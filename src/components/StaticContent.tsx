import site from '../lib/site.json';
import photos from '../lib/photos.json';
import social from '../lib/social-links.json';
import { renderPage } from '../lib/render-page.mjs';

/** Identical page content for pre-rendered HTML and client-side navigation. */
export function StaticContent({path}: {path: string}) {
  return <div className="site-content" dangerouslySetInnerHTML={{__html: renderPage(path, site, photos, social)}} />;
}
