# 10Bench admin: SEO, AEO and GEO settings

The admin panel lives at **`/admin`** (for example `https://10-bench.vercel.app/admin`).
It edits one file, `content/seo.json`, which drives:

- page titles, descriptions, canonical links and social share images
- structured data (CoworkingSpace, WebSite, FAQPage, BreadcrumbList, BlogPosting, OfferCatalog, ContactPage)
- `sitemap.xml`, `robots.txt` (including AI crawler rules) and `llms.txt`
- local geo tags and the business name, address and phone shown across the website
- the FAQs on the Workspaces page and the "10Bench at a glance" block on the About page

## How saving works

When you click **Save changes**, the server commits `content/seo.json` to GitHub.
Vercel sees the commit and redeploys automatically, so every page is rebuilt with the
new SEO as static HTML. Changes are live in about a minute.

When running locally (`npx next dev`), saving writes straight to `content/seo.json` instead.

## One-time setup on Vercel

In the Vercel project, open **Settings → Environment Variables** and add:

| Name | Value |
| --- | --- |
| `ADMIN_PASSWORD` | A strong password for signing in to `/admin` |
| `ADMIN_SESSION_SECRET` | A long random string (signs the login cookie) |
| `GITHUB_TOKEN` | A GitHub fine-grained token, see below |

Optional, only if the repository details change:

| Name | Default |
| --- | --- |
| `GITHUB_REPO` | `digitechsprint/10Bench` |
| `GITHUB_BRANCH` | `main` |
| `GITHUB_SEO_PATH` | `artifacts/tenbench/content/seo.json` |

Then redeploy (Deployments → ⋯ → Redeploy) so the variables take effect.

### Creating the GitHub token

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. **Repository access**: *Only select repositories* → `digitechsprint/10Bench`.
3. **Permissions → Repository permissions → Contents**: *Read and write*. Nothing else is needed.
4. Copy the token into the `GITHUB_TOKEN` variable on Vercel.

Without `GITHUB_TOKEN` the admin still opens and shows your settings, but the Save button is disabled.

## Local development

Create `artifacts/tenbench/.env.local` (it is git-ignored):

```
ADMIN_PASSWORD=choose-a-password
ADMIN_SESSION_SECRET=any-long-random-string
```

## Things worth filling in

The Overview tab scores the setup and links to each fix. The items it can't fill in for you:

- **PIN code** and **latitude/longitude** of the building
- **Opening hours** (format: `Mo-Fr 09:00-19:00`)
- **Profile links**: Google Business Profile, Instagram, LinkedIn, Facebook, JustDial
- **Google Search Console** and **Bing Webmaster** verification codes
- **Website address**: update it once a custom domain is connected, so canonical links and the sitemap use it
