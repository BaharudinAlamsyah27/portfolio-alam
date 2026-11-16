import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/ui';

export interface LocalizedField {
  id: string;
  en?: string;
}

/**
 * Ambil teks sesuai bahasa aktif. Jika bahasa Inggris belum diisi,
 * otomatis fallback ke Bahasa Indonesia.
 */
export function pickLocale(field: LocalizedField | undefined, locale: Locale): string {
  if (!field) return '';
  if (locale === 'en' && field.en && field.en.trim().length > 0) {
    return field.en;
  }
  return field.id;
}

export async function getProfileData() {
  const entries = await getCollection('profile');
  return entries[0]?.data;
}

export async function getSkillsData() {
  const entries = await getCollection('skills');
  return entries[0]?.data?.items ?? [];
}

export async function getNowData() {
  const entries = await getCollection('now');
  return entries[0]?.data;
}

export async function getProjectsData(includeDrafts = false) {
  const entries = await getCollection('projects');
  return entries
    .filter((entry) => (includeDrafts ? true : !entry.data.draft))
    .sort((a, b) => {
      if (a.data.order !== b.data.order) return a.data.order - b.data.order;
      return b.data.date.getTime() - a.data.date.getTime();
    });
}

export async function getExperienceData() {
  const entries = await getCollection('experience');
  return entries.sort((a, b) => {
    if (a.data.current !== b.data.current) return a.data.current ? -1 : 1;
    const aTime = a.data.start?.getTime() ?? 0;
    const bTime = b.data.start?.getTime() ?? 0;
    return bTime - aTime;
  });
}

export async function getPlacesData() {
  const entries = await getCollection('places');
  return entries.sort((a, b) => {
    const aTime = a.data.visitedAt?.getTime() ?? 0;
    const bTime = b.data.visitedAt?.getTime() ?? 0;
    return bTime - aTime;
  });
}

export async function getChangelogData() {
  const entries = await getCollection('changelog');
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getNotesData(includeDrafts = false) {
  const entries = await getCollection('notes');
  return entries
    .filter((entry) => (includeDrafts ? true : !entry.data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getGuestbookData() {
  const entries = await getCollection('guestbook');
  return entries[0]?.data?.entries ?? [];
}

export async function getProductsData(includeDrafts = false) {
  const entries = await getCollection('products');
  return entries
    .filter((entry) => (includeDrafts ? true : !entry.data.draft))
    .sort((a, b) => a.data.order - b.data.order);
}
