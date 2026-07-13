# Integrations Setup

## Giscus

1. Enable GitHub Discussions on the repository you want to use.
2. Install the Giscus GitHub app for that repository.
3. Generate values at `https://giscus.app`.
4. Add `VITE_GISCUS_REPO`, `VITE_GISCUS_REPO_ID`, `VITE_GISCUS_CATEGORY`, and `VITE_GISCUS_CATEGORY_ID`.

## Pagefind

The blog page automatically uses Pagefind when `/pagefind/pagefind.js` exists. After building the site, run:

```bash
npx pagefind --site dist
```

Deploy the generated `dist/pagefind` folder with the app.

## Supabase

Create these tables in Supabase:

```sql
create table if not exists blog_engagement (
  post_id integer primary key,
  likes integer not null default 0,
  bookmarks integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  email text primary key,
  source text,
  created_at timestamptz not null default now()
);
```

Add RLS policies that allow anonymous `select` and `insert` or `upsert` for these two public tables.

## Umami

Add your website id and script URL:

```env
VITE_UMAMI_WEBSITE_ID=your-website-id
VITE_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
```

## Weather

Weather uses Open-Meteo and does not need a key. Set either a city name:

```env
VITE_WEATHER_LOCATION=Bengaluru
```

Or fixed coordinates:

```env
VITE_WEATHER_LATITUDE=12.9716
VITE_WEATHER_LONGITUDE=77.5946
```
