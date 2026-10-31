# Captain Coaster Blog

Source of <https://blog.captaincoaster.com>, a static [Hugo](https://gohugo.io) site deployed on Vercel.

## Run locally

Install the Hugo version pinned in `vercel.json`, then:

```bash
hugo server
```

## Write a post

Add `content/blog/<slug>.md`; the file name is the URL (`/blog/<slug>`).

```yaml
---
title: 'Post title'
date: '2026-01-31'
tags: ['news']
draft: false
summary: 'One sentence shown on the home page and in social previews.'
authors: ['florian']
---
```

Authors are defined in `hugo.toml` under `params.authors`. Put images in `static/images/` and reference them as `/images/<file>`. Posts with `draft: true` are not published.

## Layout

- `hugo.toml`: site settings, authors
- `vercel.json`: Hugo version, redirects, security headers (CSP included)
- `content/`: posts and the About page
- `layouts/`: templates, plus the image and link render hooks in `_markup/`
- `assets/css/main.css`: the only stylesheet
- `assets/js/views.js` and `api/views/[slug].mjs`: post view counter, stored in Upstash Redis (`KV_REST_API_URL` and `KV_REST_API_TOKEN` in Vercel); it is the only JavaScript on the site
- `static/`: images, favicons, `robots.txt` and Space Grotesk ([OFL](https://openfontlicense.org))

Any new external script, image or connection must be added to the CSP in `vercel.json`.
