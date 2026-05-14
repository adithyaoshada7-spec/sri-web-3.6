# Technical Implementation Guide: Critical Rendering Path (CRP) Optimization
**Target:** 1,200ms Reduction in mobile site load time.
**Project:** Sri Lanka Tourism Pipeline (Mobile Optimization)

---

## 1. DIAGNOSTICS: Identifying Render-Blocking Bottlenecks

Your first task is to confirm exactly which bytes are blocking the browser's main thread from painting.

### A. Chrome DevTools 'Coverage' Tab
1. Open DevTools > `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Win).
2. Type **"Coverage"** and select "Show Coverage".
3. Click the **Reload** icon.
4. **Action:** Look for files with high "Unused Bytes" (red bars). Any CSS/JS file >50% unused on the initial landing page is a prime candidate for splitting or deferred loading.

### B. Network Waterfall Analysis
1. Open **Network** tab > Disable Cache > Throttling: **Fast 3G** (to simulate India/Malaysia mobile latency).
2. Look for the "Highest" priority resources that appear *before* the first vertical green line (First Paint).
3. **Action:** Identify "Render-blocking chains" where one script waits for another, delaying the LCP image.

---

## 2. JAVASCRIPT OPTIMIZATION: Execution Strategy

We must stop the parser from pausing every time it hits a `<script>` tag.

### The Code
| Attribute | Behavior | Use Case |
| :--- | :--- | :--- |
| `async` | Fetching is non-blocking, but execution pauses the parser. | **Lead-gen scripts** (e.g., LeadPixel, Facebook Pixel) where execution order doesn't matter. |
| `defer` | Fetching is non-blocking; execution happens only after the HTML is fully parsed. | **Main App Business Logic** (e.g., `main.tsx`) where dependencies must be preserved. |

**Recommended Implementation:**
```html
<!-- Lead-gen Pixel (Independent) -->
<script async src="https://pixel.service.com/lead-gen.js"></script>

<!-- Main App Bundle (Maintains order, non-blocking) -->
<script defer src="/src/main.tsx"></script>
```

---

## 3. CSS OPTIMIZATION: Critical CSS & Async Loading

Main CSS files are render-blocking by default. We will swap this for the "Inline + Async" pattern.

### Pattern: Inline Critical CSS
Extract only the CSS required to render the "Above-the-Fold" (ATF) content (Header + Hero) and put it directly in the `<head>`.

### Pattern: Async Loading for the Rest
Load the full stylesheet without blocking the render:
```html
<link rel="preload" href="/dist/assets/index.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/dist/assets/index.css"></noscript>
```

---

## 4. IMAGE PRIORITIZATION: Largest Contentful Paint (LCP)

For the "Sri Lanka Highlands" hero image, we need to instruct the browser to prioritize its fetch immediately upon discovery.

**The Code:**
```tsx
<img 
  src="https://images.unsplash.com/..."
  alt="Sri Lanka Highlands"
  fetchPriority="high"
  loading="eager"
  decoding="async"
  className="..."
/>
```
*Note: Ensure `loading="lazy"` is REMOVED from the hero image to prevent it from being delayed by the intersection observer.*

---

## 5. VERIFICATION: Key Performance Indicators (KPIs)

After implementation, run a Lighthouse report (Mobile) or use Web Vitals extension. You must meet these targets:

1. **LCP (Largest Contentful Paint):** Target **< 2.5s**. (Reduces bounce rate).
2. **FCP (First Contentful Paint):** Target **< 1.8s**. (Shows users the site is alive).
3. **TBT (Total Blocking Time):** Target **< 200ms**. (Ensures the Lead-gen forms are interactive).

**Goal:** Total "Render-blocking time" in Lighthouse should reduce from 1,200ms to <100ms.
