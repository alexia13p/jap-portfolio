# Jan Patrick Tolentino — Portfolio (static, no build)

Single-page portfolio with a WebGL Nexus Core hero. **No build step** — plain static files that run anywhere.

## View locally
Serve the folder (don't open the file directly, browsers block module/JSX loading over file://):
```bash
npx serve .
# or
python3 -m http.server 8000
```
Then open the printed URL.

## Deploy (no build command, no framework preset)
- **GitHub Pages** — push these files to a repo, Settings → Pages → Deploy from branch → `main` / root. Open the `.github.io` URL.
- **Vercel** — New Project → import repo → Framework Preset: **Other** → Build Command: *(leave empty)* → Output Directory: `.` (root). Deploy.
- **Netlify** — drag-and-drop this folder onto the Netlify dashboard.

## Files
```
index.html      Portfolio page
Portfolio.jsx    Page markup (compiled in-browser)
_ds_bundle.js    Components
styles.css + tokens/   Design tokens
nexus/           WebGL hero pages
jap-resume.pdf   Resume
```
Requires internet on load (React, Babel, and Three.js load from CDN).
