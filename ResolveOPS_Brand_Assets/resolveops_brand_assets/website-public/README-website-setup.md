# Website-ready files (Vite / React)

Copy the files in this folder into your project's `public/` directory.

Then add the following inside the `<head>` of `index.html`:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:image" content="https://YOUR-DOMAIN.com/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://YOUR-DOMAIN.com/og-image.png">
```

Replace `https://YOUR-DOMAIN.com` with your actual deployed domain. Use `/resolveops-logo.png` in your header on dark backgrounds; use `/resolveops-symbol.png` for symbol-only placements.
