declare module '*.mjs' {
  export const PAGE_META: Record<string, {title:string;description:string}>;
  export function renderPage(path: string, site: any, photos: any, social?: any): string;
}
