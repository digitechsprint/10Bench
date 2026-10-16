'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDown, ArrowUp, Bot, Building2, CheckCircle2, ExternalLink, FileText, Gauge, Globe2, HelpCircle, Loader2, LogOut, MapPin,
  Plus, Save, Search, Trash2, TriangleAlert,
} from 'lucide-react';
import type { PageKey, SeoSettings } from '../../lib/seo';

type Section = 'overview' | 'site' | 'pages' | 'business' | 'faqs' | 'ai';
type Storage = 'github' | 'local' | 'none';

const sections: { id: Section; label: string; icon: typeof Gauge; hint: string }[] = [
  { id: 'overview', label: 'Overview', icon: Gauge, hint: 'SEO health and quick links' },
  { id: 'site', label: 'Search basics', icon: Search, hint: 'Site title, description, keywords, verification' },
  { id: 'pages', label: 'Pages', icon: FileText, hint: 'Title, description and share image per page' },
  { id: 'business', label: 'Business & location', icon: Building2, hint: 'Local SEO, address, hours and map position' },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle, hint: 'Answer-engine (AEO) questions and answers' },
  { id: 'ai', label: 'AI & answer engines', icon: Bot, hint: 'GEO: AI summary, key facts and AI crawlers' },
];

const pageLabels: Record<PageKey, string> = { home: 'Home', about: 'About', offerings: 'Workspaces', gallery: 'Gallery', blogs: 'Journal', contact: 'Contact' };
const pagePaths: Record<PageKey, string> = { home: '/', about: '/about/', offerings: '/offerings/', gallery: '/gallery/', blogs: '/blogs/', contact: '/contact/' };
const images = ['/images/workspace-reception.jpeg', '/images/workspace-lounge.jpeg', '/images/workspace-meeting.jpeg', '/images/workspace-floorplan.jpeg'];
const businessTypes = ['CoworkingSpace', 'LocalBusiness', 'ProfessionalService', 'RealEstateAgent'];

const api = async (url: string, init?: RequestInit) => {
  const response = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers }, credentials: 'same-origin' });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
};

const fullTitle = (settings: SeoSettings, key: PageKey) =>
  key === 'home' ? `${settings.pages.home.title} | ${settings.site.name}` : settings.site.titleTemplate.replace('%s', settings.pages[key].title);

/* ---------- Health checks ---------- */

type Check = { label: string; ok: boolean; detail: string; section: Section };
function healthChecks(s: SeoSettings): Check[] {
  const keys = Object.keys(s.pages) as PageKey[];
  const titleIssues = keys.filter(key => { const length = fullTitle(s, key).length; return length < 25 || length > 65; });
  const descIssues = keys.filter(key => { const length = s.pages[key].description.length; return length < 70 || length > 165; });
  const titles = keys.map(key => s.pages[key].title.toLowerCase());
  return [
    { label: 'Site address uses https', ok: /^https:\/\//.test(s.site.url), detail: s.site.url, section: 'site' },
    { label: 'Home description is 120–160 characters', ok: s.site.defaultDescription.length >= 120 && s.site.defaultDescription.length <= 160, detail: `${s.site.defaultDescription.length} characters`, section: 'site' },
    { label: 'Every page title is 25–65 characters', ok: titleIssues.length === 0, detail: titleIssues.length ? `Check: ${titleIssues.map(key => pageLabels[key]).join(', ')}` : 'All good', section: 'pages' },
    { label: 'Every page description is 70–165 characters', ok: descIssues.length === 0, detail: descIssues.length ? `Check: ${descIssues.map(key => pageLabels[key]).join(', ')}` : 'All good', section: 'pages' },
    { label: 'Page titles are unique', ok: new Set(titles).size === titles.length, detail: 'Duplicate titles compete with each other in search', section: 'pages' },
    { label: 'Google Search Console verified', ok: Boolean(s.site.googleVerification), detail: 'Paste the verification code from Search Console', section: 'site' },
    { label: 'PIN code added', ok: Boolean(s.business.postalCode), detail: 'Needed for a complete local address', section: 'business' },
    { label: 'Map position (latitude/longitude) added', ok: Boolean(s.business.latitude && s.business.longitude), detail: 'Helps Google Maps and AI place the business', section: 'business' },
    { label: 'Opening hours added', ok: s.business.openingHours.length > 0, detail: 'Shown in rich results and AI answers', section: 'business' },
    { label: 'Social / Google Business profile links added', ok: s.business.sameAs.length > 0, detail: 'Links like your Google Business Profile, Instagram, LinkedIn', section: 'business' },
    { label: 'At least 4 FAQs', ok: s.faqs.length >= 4, detail: `${s.faqs.length} FAQs`, section: 'faqs' },
    { label: 'AI summary is 200–900 characters', ok: s.aeo.summary.length >= 200 && s.aeo.summary.length <= 900, detail: `${s.aeo.summary.length} characters`, section: 'ai' },
    { label: 'At least 4 key facts', ok: s.aeo.keyFacts.length >= 4, detail: `${s.aeo.keyFacts.length} facts`, section: 'ai' },
    { label: 'AI assistants can read the site', ok: s.ai.allowAiCrawlers, detail: s.ai.allowAiCrawlers ? 'ChatGPT, Perplexity, Claude, Gemini can cite you' : 'AI crawlers are blocked', section: 'ai' },
  ];
}

/* ---------- Small form building blocks ---------- */

function Field({ label, hint, children, count, range }: { label: string; hint?: string; children: ReactNode; count?: number; range?: [number, number] }) {
  const state = count === undefined || !range ? '' : count === 0 ? 'is-empty' : count < range[0] || count > range[1] ? 'is-warn' : 'is-good';
  return <label className="adm-field">
    <span className="adm-label">{label}{count !== undefined && <em className={`adm-count ${state}`}>{count}{range ? ` / ${range[0]}–${range[1]}` : ''}</em>}</span>
    {children}
    {hint && <span className="adm-hint">{hint}</span>}
  </label>;
}

function ListField({ label, hint, value, onChange, rows = 4, placeholder }: { label: string; hint?: string; value: string[]; onChange: (value: string[]) => void; rows?: number; placeholder?: string }) {
  const [text, setText] = useState(value.join('\n'));
  return <Field label={label} hint={hint ?? 'One per line.'}>
    <textarea rows={rows} value={text} placeholder={placeholder} onChange={event => { setText(event.target.value); onChange(event.target.value.split('\n').map(line => line.trim()).filter(Boolean)); }} />
  </Field>;
}

function ImagePicker({ value, onChange, allowDefault }: { value: string; onChange: (value: string) => void; allowDefault?: boolean }) {
  const custom = value && !images.includes(value);
  return <div className="adm-images">
    {allowDefault && <button type="button" className={`adm-image adm-image-default ${!value ? 'is-active' : ''}`} onClick={() => onChange('')}>Use site default</button>}
    {images.map(src => <button type="button" key={src} className={`adm-image ${value === src ? 'is-active' : ''}`} onClick={() => onChange(src)}><img src={src} alt="" /></button>)}
    <input className="adm-image-custom" value={custom ? value : ''} placeholder="Or an image path / URL" onChange={event => onChange(event.target.value)} />
  </div>;
}

function GooglePreview({ title, url, description }: { title: string; url: string; description: string }) {
  return <div className="adm-serp">
    <span className="adm-serp-url">{url}</span>
    <span className="adm-serp-title">{title.length > 62 ? `${title.slice(0, 60)}…` : title}</span>
    <span className="adm-serp-desc">{description.length > 160 ? `${description.slice(0, 158)}…` : description || 'No description yet.'}</span>
  </div>;
}

function SocialPreview({ title, description, image, domain }: { title: string; description: string; image: string; domain: string }) {
  return <div className="adm-social">
    <img src={image} alt="" />
    <div><span>{domain}</span><strong>{title}</strong><p>{description}</p></div>
  </div>;
}

/* ---------- Login ---------- */

function Login({ configured, onDone }: { configured: boolean; onDone: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return <div className="adm-login">
    <form className="adm-login-card" onSubmit={async event => {
      event.preventDefault();
      setBusy(true); setError('');
      const result = await api('/api/admin/session/', { method: 'POST', body: JSON.stringify({ password }) });
      setBusy(false);
      if (result.ok) onDone(); else setError(result.data.error || 'Could not sign in.');
    }}>
      <span className="adm-logo"><b>10</b>bench <i>admin</i></span>
      <h1>Sign in to manage SEO</h1>
      {!configured && <p className="adm-alert"><TriangleAlert size={16} /> Admin isn’t set up yet. Add an <code>ADMIN_PASSWORD</code> environment variable on the server, then redeploy.</p>}
      <label className="adm-field"><span className="adm-label">Password</span>
        <input type="password" autoComplete="current-password" autoFocus value={password} onChange={event => setPassword(event.target.value)} disabled={!configured} />
      </label>
      {error && <p className="adm-error">{error}</p>}
      <button className="adm-btn adm-btn-primary" disabled={!configured || busy || !password}>{busy ? <Loader2 className="adm-spin" size={16} /> : null} Sign in</button>
      <a href="/" className="adm-back">← Back to website</a>
    </form>
  </div>;
}

/* ---------- Main app ---------- */

export function AdminApp() {
  const [session, setSession] = useState<{ configured: boolean; authenticated: boolean; storage: Storage } | null>(null);
  const [settings, setSettings] = useState<SeoSettings | null>(null);
  const [saved, setSaved] = useState('');
  const [version, setVersion] = useState<string | null>(null);
  const [storage, setStorage] = useState<Storage>('none');
  const [section, setSection] = useState<Section>('overview');
  const [page, setPage] = useState<PageKey>('home');
  const [status, setStatus] = useState<{ tone: 'good' | 'bad' | 'info'; text: string; errors?: string[] } | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadKey, setLoadKey] = useState(0);

  const load = useCallback(async () => {
    const sessionResult = await api('/api/admin/session/');
    setSession(sessionResult.data);
    if (!sessionResult.data.authenticated) return;
    const result = await api('/api/admin/seo/');
    if (!result.ok) { setStatus({ tone: 'bad', text: result.data.error || 'Could not load settings.' }); return; }
    setSettings(result.data.settings);
    setSaved(JSON.stringify(result.data.settings));
    setVersion(result.data.version);
    setStorage(result.data.storage);
    setLoadKey(key => key + 1);
  }, []);

  useEffect(() => { load(); }, [load]);

  const dirty = settings !== null && JSON.stringify(settings) !== saved;
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = (mutate: (draft: SeoSettings) => void) => setSettings(current => {
    if (!current) return current;
    const draft = structuredClone(current);
    mutate(draft);
    return draft;
  });

  const checks = useMemo(() => settings ? healthChecks(settings) : [], [settings]);
  const score = checks.length ? Math.round(checks.filter(check => check.ok).length / checks.length * 100) : 0;

  async function save() {
    if (!settings) return;
    setSaving(true); setStatus(null);
    const result = await api('/api/admin/seo/', { method: 'PUT', body: JSON.stringify({ settings, version }) });
    setSaving(false);
    if (result.ok) {
      setSettings(result.data.settings);
      setSaved(JSON.stringify(result.data.settings));
      setVersion(result.data.version);
      setStatus({ tone: 'good', text: result.data.message });
    } else if (result.status === 401) {
      setSession(current => current && { ...current, authenticated: false });
    } else {
      setStatus({ tone: 'bad', text: result.data.error || 'Save failed.', errors: result.data.errors });
    }
  }

  if (!session) return <div className="adm-loading"><Loader2 className="adm-spin" size={22} /></div>;
  if (!session.authenticated) return <Login configured={session.configured} onDone={load} />;
  if (!settings) return <div className="adm-loading">{status ? <p className="adm-error">{status.text}</p> : <Loader2 className="adm-spin" size={22} />}</div>;

  const s = settings;
  const domain = s.site.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const current = sections.find(item => item.id === section)!;
  const imageUrl = (path: string) => path || s.site.ogImage;

  return <div className="adm">
    <aside className="adm-side">
      <span className="adm-logo"><b>10</b>bench <i>admin</i></span>
      <nav>
        {sections.map(item => <button key={item.id} type="button" className={section === item.id ? 'is-active' : ''} onClick={() => setSection(item.id)}>
          <item.icon size={17} /><span>{item.label}</span>
        </button>)}
      </nav>
      <div className="adm-side-foot">
        <a href="/" target="_blank" rel="noreferrer"><Globe2 size={15} /> View website</a>
        <button type="button" onClick={async () => { await api('/api/admin/session/', { method: 'DELETE' }); setSettings(null); load(); }}><LogOut size={15} /> Sign out</button>
      </div>
    </aside>

    <main className="adm-main">
      <header className="adm-top">
        <div><h1>{current.label}</h1><p>{current.hint}</p></div>
        <div className="adm-top-actions">
          <span className={`adm-pill ${dirty ? 'is-dirty' : ''}`}>{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
          <button type="button" className="adm-btn adm-btn-primary" onClick={save} disabled={!dirty || saving || storage === 'none'}>
            {saving ? <Loader2 className="adm-spin" size={16} /> : <Save size={16} />} Save changes
          </button>
        </div>
      </header>

      {storage === 'none' && <p className="adm-alert"><TriangleAlert size={16} /> Saving is not set up on this server yet. Add a <code>GITHUB_TOKEN</code> environment variable (see ADMIN.md in the project) and redeploy.</p>}
      {status && <div className={`adm-status is-${status.tone}`}>
        {status.tone === 'good' ? <CheckCircle2 size={17} /> : <TriangleAlert size={17} />}
        <div><strong>{status.text}</strong>{status.errors && <ul>{status.errors.map(error => <li key={error}>{error}</li>)}</ul>}</div>
      </div>}

      <div key={loadKey} className="adm-body">
        {section === 'overview' && <>
          <div className="adm-overview">
            <div className="adm-card adm-score">
              <div className="adm-ring" style={{ ['--score' as string]: score }}><span>{score}</span></div>
              <div><h2>SEO health</h2><p>{checks.filter(check => check.ok).length} of {checks.length} checks passed. Fix the amber items to improve how you appear on Google, Maps and AI assistants.</p></div>
            </div>
            <div className="adm-card adm-links">
              <h2>Live files</h2>
              {[['Sitemap', '/sitemap.xml'], ['Robots rules', '/robots.txt'], ['AI summary (llms.txt)', '/llms.txt']].map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label}<ExternalLink size={14} /></a>)}
              <h2>Test tools</h2>
              <a href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(s.site.url)}`} target="_blank" rel="noreferrer">Google Rich Results test<ExternalLink size={14} /></a>
              <a href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(s.site.url)}`} target="_blank" rel="noreferrer">PageSpeed Insights<ExternalLink size={14} /></a>
              <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer">Google Search Console<ExternalLink size={14} /></a>
            </div>
          </div>
          <div className="adm-card">
            <h2>Checklist</h2>
            <ul className="adm-checks">
              {checks.map(check => <li key={check.label} className={check.ok ? 'is-ok' : 'is-warn'}>
                {check.ok ? <CheckCircle2 size={18} /> : <TriangleAlert size={18} />}
                <div><strong>{check.label}</strong><span>{check.detail}</span></div>
                {!check.ok && <button type="button" className="adm-btn adm-btn-ghost" onClick={() => setSection(check.section)}>Fix</button>}
              </li>)}
            </ul>
          </div>
        </>}

        {section === 'site' && <div className="adm-grid">
          <div className="adm-card">
            <h2>Website</h2>
            <Field label="Site name"><input value={s.site.name} onChange={e => update(d => { d.site.name = e.target.value; })} /></Field>
            <Field label="Website address" hint="Your live domain, e.g. https://www.10bench.in. Used for canonical links, sitemap and social previews."><input value={s.site.url} onChange={e => update(d => { d.site.url = e.target.value; })} /></Field>
            <Field label="Title template" hint="%s is replaced by each page’s title."><input value={s.site.titleTemplate} onChange={e => update(d => { d.site.titleTemplate = e.target.value; })} /></Field>
            <Field label="Default title" count={s.site.defaultTitle.length} range={[30, 65]}><input value={s.site.defaultTitle} onChange={e => update(d => { d.site.defaultTitle = e.target.value; })} /></Field>
            <Field label="Default description" count={s.site.defaultDescription.length} range={[120, 160]}><textarea rows={3} value={s.site.defaultDescription} onChange={e => update(d => { d.site.defaultDescription = e.target.value; })} /></Field>
            <ListField label="Keywords" hint="One per line. Use phrases people search, like “coworking space Vaishali”." value={s.site.keywords} onChange={value => update(d => { d.site.keywords = value; })} rows={6} />
          </div>
          <div className="adm-card">
            <h2>Default share image</h2>
            <p className="adm-muted">Shown when a page is shared on WhatsApp, LinkedIn, Facebook or X and has no image of its own.</p>
            <ImagePicker value={s.site.ogImage} onChange={value => update(d => { d.site.ogImage = value; })} />
            <h2>Verification & social</h2>
            <Field label="Google Search Console code" hint="From Search Console → Settings → Ownership verification → HTML tag (just the content value)."><input value={s.site.googleVerification} onChange={e => update(d => { d.site.googleVerification = e.target.value; })} /></Field>
            <Field label="Bing Webmaster code"><input value={s.site.bingVerification} onChange={e => update(d => { d.site.bingVerification = e.target.value; })} /></Field>
            <Field label="X (Twitter) handle" hint="Optional, e.g. @10bench"><input value={s.site.twitterHandle} onChange={e => update(d => { d.site.twitterHandle = e.target.value; })} /></Field>
            <Field label="Language / region" hint="en_IN for English (India)."><input value={s.site.locale} onChange={e => update(d => { d.site.locale = e.target.value; })} /></Field>
          </div>
        </div>}

        {section === 'pages' && <>
          <div className="adm-tabs">{(Object.keys(pageLabels) as PageKey[]).map(key => <button key={key} type="button" className={page === key ? 'is-active' : ''} onClick={() => setPage(key)}>{pageLabels[key]}</button>)}</div>
          <div className="adm-grid">
            <div className="adm-card">
              <h2>{pageLabels[page]} page</h2>
              <Field label="Title" hint={`Shown in Google as: “${fullTitle(s, page)}”`} count={fullTitle(s, page).length} range={[25, 65]}>
                <input value={s.pages[page].title} onChange={e => update(d => { d.pages[page].title = e.target.value; })} />
              </Field>
              <Field label="Description" hint="Write it like an ad: what’s here, where, and a reason to click." count={s.pages[page].description.length} range={[70, 160]}>
                <textarea rows={4} value={s.pages[page].description} onChange={e => update(d => { d.pages[page].description = e.target.value; })} />
              </Field>
              <span className="adm-label">Share image</span>
              <ImagePicker allowDefault value={s.pages[page].ogImage} onChange={value => update(d => { d.pages[page].ogImage = value; })} />
              <label className="adm-toggle">
                <input type="checkbox" checked={s.pages[page].noindex} onChange={e => update(d => { d.pages[page].noindex = e.target.checked; })} />
                <span /> Hide this page from search engines (noindex)
              </label>
            </div>
            <div className="adm-card">
              <h2>Google preview</h2>
              <GooglePreview title={fullTitle(s, page)} url={`${domain}${pagePaths[page] === '/' ? '' : ` › ${pagePaths[page].replace(/\//g, '')}`}`} description={s.pages[page].description} />
              <h2>Share preview</h2>
              <SocialPreview title={s.pages[page].title} description={s.pages[page].description} image={imageUrl(s.pages[page].ogImage)} domain={domain} />
            </div>
          </div>
        </>}

        {section === 'business' && <div className="adm-grid">
          <div className="adm-card">
            <h2>Business details</h2>
            <p className="adm-muted">Keep these exactly the same as your Google Business Profile. Consistent name, address and phone is one of the strongest local ranking signals. Changes here also update the website’s contact details.</p>
            <Field label="Business name"><input value={s.business.name} onChange={e => update(d => { d.business.name = e.target.value; })} /></Field>
            <Field label="Business type" hint="Used in structured data so Google knows what you are.">
              <select value={s.business.type} onChange={e => update(d => { d.business.type = e.target.value; })}>{businessTypes.map(type => <option key={type}>{type}</option>)}</select>
            </Field>
            <Field label="Description" count={s.business.description.length} range={[150, 500]}><textarea rows={4} value={s.business.description} onChange={e => update(d => { d.business.description = e.target.value; })} /></Field>
            <div className="adm-row">
              <Field label="Phone"><input value={s.business.phone} onChange={e => update(d => { d.business.phone = e.target.value; })} /></Field>
              <Field label="WhatsApp number" hint="Digits with country code, e.g. 919773987782"><input value={s.business.whatsapp} onChange={e => update(d => { d.business.whatsapp = e.target.value; })} /></Field>
            </div>
            <Field label="Email"><input type="email" value={s.business.email} onChange={e => update(d => { d.business.email = e.target.value; })} /></Field>
            <Field label="Price range" hint="Optional, e.g. ₹₹ or “From ₹X/month”."><input value={s.business.priceRange} onChange={e => update(d => { d.business.priceRange = e.target.value; })} /></Field>
            <Field label="Logo image path"><input value={s.business.logo} onChange={e => update(d => { d.business.logo = e.target.value; })} /></Field>
          </div>
          <div className="adm-card">
            <h2><MapPin size={17} /> Address & map</h2>
            <Field label="Street address"><input value={s.business.streetAddress} onChange={e => update(d => { d.business.streetAddress = e.target.value; })} /></Field>
            <div className="adm-row">
              <Field label="City"><input value={s.business.locality} onChange={e => update(d => { d.business.locality = e.target.value; })} /></Field>
              <Field label="PIN code"><input value={s.business.postalCode} placeholder="e.g. 2010xx" onChange={e => update(d => { d.business.postalCode = e.target.value; })} /></Field>
            </div>
            <div className="adm-row">
              <Field label="State"><input value={s.business.region} onChange={e => update(d => { d.business.region = e.target.value; })} /></Field>
              <Field label="Region code" hint="e.g. IN-UP"><input value={s.business.regionCode} onChange={e => update(d => { d.business.regionCode = e.target.value; })} /></Field>
            </div>
            <div className="adm-row">
              <Field label="Latitude"><input value={s.business.latitude} placeholder="28.6…" onChange={e => update(d => { d.business.latitude = e.target.value; })} /></Field>
              <Field label="Longitude"><input value={s.business.longitude} placeholder="77.3…" onChange={e => update(d => { d.business.longitude = e.target.value; })} /></Field>
            </div>
            <p className="adm-hint">To get coordinates, right-click your building in Google Maps and click the numbers at the top of the menu to copy them.</p>
            <ListField label="Areas served" value={s.business.areaServed} onChange={value => update(d => { d.business.areaServed = value; })} />
            <ListField label="Opening hours" hint="One per line in this format: Mo-Fr 09:00-19:00 · Sa 10:00-16:00" placeholder="Mo-Fr 09:00-19:00" value={s.business.openingHours} onChange={value => update(d => { d.business.openingHours = value; })} rows={3} />
            <ListField label="Profiles (sameAs)" hint="One link per line: Google Business Profile, Instagram, LinkedIn, Facebook, JustDial…" placeholder="https://www.instagram.com/…" value={s.business.sameAs} onChange={value => update(d => { d.business.sameAs = value; })} />
          </div>
        </div>}

        {section === 'faqs' && <div className="adm-card">
          <h2>Frequently asked questions</h2>
          <p className="adm-muted">These appear on the Workspaces page, in Google’s FAQ structured data and in the AI summary. Phrase questions the way people actually ask them, and answer in the first sentence.</p>
          <div className="adm-faqs">
            {s.faqs.map((faq, index) => <div key={index} className="adm-faq">
              <span className="adm-faq-num">{String(index + 1).padStart(2, '0')}</span>
              <div className="adm-faq-fields">
                <Field label="Question"><input value={faq.question} onChange={e => update(d => { d.faqs[index].question = e.target.value; })} /></Field>
                <Field label="Answer" count={faq.answer.length} range={[40, 320]}><textarea rows={3} value={faq.answer} onChange={e => update(d => { d.faqs[index].answer = e.target.value; })} /></Field>
              </div>
              <div className="adm-faq-actions">
                <button type="button" aria-label="Move up" disabled={index === 0} onClick={() => update(d => { [d.faqs[index - 1], d.faqs[index]] = [d.faqs[index], d.faqs[index - 1]]; })}><ArrowUp size={15} /></button>
                <button type="button" aria-label="Move down" disabled={index === s.faqs.length - 1} onClick={() => update(d => { [d.faqs[index + 1], d.faqs[index]] = [d.faqs[index], d.faqs[index + 1]]; })}><ArrowDown size={15} /></button>
                <button type="button" aria-label="Delete" className="is-danger" onClick={() => update(d => { d.faqs.splice(index, 1); })}><Trash2 size={15} /></button>
              </div>
            </div>)}
          </div>
          <button type="button" className="adm-btn adm-btn-ghost" onClick={() => update(d => { d.faqs.push({ question: '', answer: '' }); })}><Plus size={16} /> Add a question</button>
        </div>}

        {section === 'ai' && <div className="adm-grid">
          <div className="adm-card">
            <h2>AI summary</h2>
            <p className="adm-muted">The one paragraph you want ChatGPT, Gemini, Perplexity and Google’s AI Overviews to say about you. Shown on the About page and in /llms.txt. Write facts, not slogans: who, what, where, for whom, how to contact.</p>
            <Field label="Summary" count={s.aeo.summary.length} range={[200, 900]}><textarea rows={7} value={s.aeo.summary} onChange={e => update(d => { d.aeo.summary = e.target.value; })} /></Field>
            <ListField label="Key facts" hint="One per line as “Label: value”. Shown as “10Bench at a glance” on the About page." value={s.aeo.keyFacts} onChange={value => update(d => { d.aeo.keyFacts = value; })} rows={7} />
          </div>
          <div className="adm-card">
            <h2>AI crawlers</h2>
            <label className="adm-toggle">
              <input type="checkbox" checked={s.ai.allowAiCrawlers} onChange={e => update(d => { d.ai.allowAiCrawlers = e.target.checked; })} />
              <span /> Allow AI assistants and AI search to read and cite the website
            </label>
            <p className="adm-hint">Covers GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended and others. Recommended on: being cited is how AI answers send you visitors.</p>
            <Field label="llms.txt introduction"><textarea rows={3} value={s.ai.llmsIntro} onChange={e => update(d => { d.ai.llmsIntro = e.target.value; })} /></Field>
            <a className="adm-btn adm-btn-ghost" href="/llms.txt" target="_blank" rel="noreferrer"><ExternalLink size={15} /> View live llms.txt</a>
          </div>
        </div>}
      </div>
    </main>
  </div>;
}
