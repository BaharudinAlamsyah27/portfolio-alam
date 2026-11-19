# Template Standar Deskripsi Proyek (`src/content/projects/<slug>.mdx`)

Setiap kali Alam mengirim hasil `PORTFOLIO_DESCRIPTION.md` (atau objek JSON dengan kunci `title, tagline, shortDescription, fullDescription, features[], techStack{}, challenges[], learnings[], tags[], liveUrl, repoUrl, descriptionEn`), petakan langsung ke format MDX berikut:

```mdx
---
title: "<title>"
tagline: "<tagline (maks. 12 kata)>"
summary:
  id: "<shortDescription (2-3 kalimat, maks. 280 karakter)>"
  en: "<descriptionEn.short>"
role: "<Peran, mis. Full-Stack Developer (Solo Project)>"
context: "<Konteks, mis. Program MagangHub di BPRS Sukowati Sragen>"
duration: "<Durasi, mis. 2 minggu>"
stack:
  - "<Gabungan teknologi utama dari techStack{}>"
tags:
  - "<8-10 tags/keywords>"
category: web # web | ai | enterprise | gis | mobile | game | network | other
demoUrl: "<liveUrl>"
repoUrl: "<repoUrl>"
featured: true
draft: false
order: 0
date: YYYY-MM-DD
status: selesai
---

## Gambaran Umum & Latar Belakang

<fullDescription: latar belakang masalah, solusi yang dibuat, dan hasil/manfaatnya>

## Fitur Unggulan

- <fitur 1>
- <fitur 2>

## Arsitektur & Tech Stack

- **Frontend:** ...
- **Backend:** ...
- **Database:** ...
- **Tools:** ...
- **Deployment:** ...

## Tantangan & Solusi

1. **<Judul Tantangan 1>:** <uraian tantangan dan cara mengatasinya>
2. **<Judul Tantangan 2>:** <uraian tantangan dan cara mengatasinya>

## Yang Saya Pelajari

- <pembelajaran teknis / non-teknis 1>
- <pembelajaran teknis / non-teknis 2>
```
