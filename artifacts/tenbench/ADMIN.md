# 10Bench admin: SEO, AEO, GEO and enquiries

The admin panel lives at **`/admin`** (for example `https://10-bench.vercel.app/admin`). It has:

- **Enquiries**: messages from the website contact form, with status (new / contacted / closed),
  internal notes, one-tap email / call / WhatsApp replies and CSV export.
- **SEO settings** that drive:
  - page titles, descriptions, canonical links and social share images
  - structured data (CoworkingSpace, WebSite, FAQPage, BreadcrumbList, BlogPosting, OfferCatalog, ContactPage)
  - `sitemap.xml`, `robots.txt` (including AI crawler rules) and `llms.txt`
  - local geo tags and the business name, address and phone shown across the website
  - the FAQs on the Workspaces page and the "10Bench at a glance" block on the About page

## Where data is stored

| Setup | SEO settings | Enquiries |
| --- | --- | --- |
| **Supabase connected** (recommended) | `site_settings` table: changes go live within seconds | `enquiries` table |
| GitHub token only | Committed to `content/seo.json`: Vercel redeploys (about a minute) | Not stored: the form asks visitors to call or WhatsApp |
| Local development | Written to `content/seo.json` | Needs Supabase |

`content/seo.json` is also the starting point: until the first save in the admin, the site uses it.

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com) (the free plan is enough).
2. Open **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
   This creates the two tables with row-level security switched on and no public access.
3. Open **Project Settings → API** (or **API Keys**) and copy:
   - the **Project URL**
   - the **service_role** key (or a **secret** key, `sb_secret_…`). Keep it private: it must only
     ever go in server environment variables, never in code or the browser.

## 2. Add environment variables on Vercel

In the Vercel project, open **Settings → Environment Variables** and add:

| Name | Value |
| --- | --- |
| `ADMIN_PASSWORD` | A strong password for signing in to `/admin` |
| `ADMIN_SESSION_SECRET` | A long random string (signs the login cookie) |
| `SUPABASE_URL` | The Supabase Project URL, e.g. `https://abcd1234.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | The service_role / secret key |

Then redeploy (Deployments → ⋯ → Redeploy) so the variables take effect.

### Optional: GitHub storage instead of Supabase

If Supabase isn't connected, SEO settings can still be saved by committing to GitHub:

| Name | Value |
| --- | --- |
| `GITHUB_TOKEN` | Fine-grained token: *Only select repositories* → `digitechsprint/10Bench`, permission **Contents: Read and write** |
| `GITHUB_REPO` | Optional, default `digitechsprint/10Bench` |
| `GITHUB_BRANCH` | Optional, default `main` |
| `GITHUB_SEO_PATH` | Optional, default `artifacts/tenbench/content/seo.json` |

When Supabase is connected it is always used for SEO settings, and GitHub is ignored.

## Local development

Create `artifacts/tenbench/.env.local` (it is git-ignored):

```
ADMIN_PASSWORD=choose-a-password
ADMIN_SESSION_SECRET=any-long-random-string
# Optional, to test against Supabase locally:
SUPABASE_URL=https://abcd1234.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

## Things worth filling in

The Overview tab scores the setup and links to each fix. Items only you can fill in:

- **PIN code** and **latitude/longitude** of the building
- **Opening hours** (format: `Mo-Fr 09:00-19:00`)
- **Profile links**: Google Business Profile, Instagram, LinkedIn, Facebook, JustDial
- **Google Search Console** and **Bing Webmaster** verification codes
- **Website address**: update it once a custom domain is connected
