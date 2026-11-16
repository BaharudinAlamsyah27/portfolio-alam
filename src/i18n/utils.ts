import { defaultLocale, ui, type Locale } from './ui';

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  if (maybeLocale === 'en') {
    return 'en';
  }
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: keyof (typeof ui)[typeof defaultLocale]): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}

export function getLocalizedPath(path: string, targetLocale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const withoutEn = cleanPath.replace(/^\/en(?=\/|$)/, '') || '/';

  if (targetLocale === defaultLocale) {
    return withoutEn;
  }
  return withoutEn === '/' ? '/en/' : `/en${withoutEn}`;
}
