# Ravi Kumar Gupta — Portfolio

Personal portfolio website built as a Single Page Application using plain HTML, CSS, and JavaScript. No framework. No build step. Hosted on GitHub Pages.

---

## Architecture

The site uses a **shell + dynamic view** pattern.

`index.html` is the permanent shell — it contains the navbar, an empty `<main id="content">` container, and the footer. It never reloads. All page content is fetched as HTML fragments from the `views/` folder and injected into `#content` when a user navigates.

Navigation menus are driven entirely by `data/navigation.json`. Adding or removing a menu item requires only a JSON change — no HTML or JavaScript changes needed.

---

## Folder Structure

```
/
├── index.html                  # App shell — navbar, content container, footer
├── 404.html                    # GitHub Pages SPA routing redirect
├── .htaccess                   # Apache SPA routing (Render / shared hosting)
│
├── data/
│   ├── navigation.json         # All menu items — titles, URLs, view names, enabled flag
│   └── config.json             # Site name, base path, repo name
│
├── views/                      # HTML fragments loaded dynamically into #content
│   ├── home.html
│   ├── about.html
│   ├── contact.html
│   ├── journey.html
│   ├── projects.html
│   ├── learning.html
│   └── journal-*.html          # One file per journal entry
│
├── js/
│   ├── app.js                  # Entry point — DOMContentLoaded, startup sequence
│   ├── config.js               # App global object
│   ├── navigation.js           # Renders nav from JSON, handles clicks, submenus
│   ├── router.js               # navigateTo(), buildUrl(), popstate (back/forward)
│   ├── views.js                # loadView() — fetches and injects HTML fragments
│   ├── initialization.js       # initializeFooter() — wires footer nav links
│   ├── theme.js                # Theme toggle (reserved, not yet wired)
│   ├── utils.js                # yearsOfExperience() helper
│   └── pages/
│       ├── home.js             # initializeHome() — fills experience spans, contact button
│       ├── contact.js          # initializeContact() — copy email button
│       ├── about.js            # Reserved
│       ├── projects.js         # Reserved
│       ├── journal.js          # Reserved
│       └── learning.js         # Reserved
│
├── css/
│   ├── styles.css              # Main styles — submenu behavior, active states, navbar
│   ├── variables.css           # Reserved for CSS custom properties
│   ├── navbar.css              # Reserved
│   ├── sidebar.css             # Reserved
│   ├── cards.css               # Reserved
│   ├── layout.css              # Reserved
│   └── timeline.css            # Reserved
│
└── assets/
    ├── images/                 # Profile photo
    ├── logos/                  # Favicon
    └── resume/                 # Downloadable resume PDF
```

---

## JavaScript Load Order

Scripts are loaded via `<script>` tags in `index.html` in this exact order — there is no bundler:

1. `js/utils.js` — helper functions
2. `js/config.js` — `App` global object
3. `js/navigation.js` — nav rendering and click handling
4. `js/initialization.js` — footer link wiring
5. `js/pages/contact.js` — contact page init
6. `js/pages/home.js` — home page init
7. `js/app.js` — DOMContentLoaded entry point
8. `js/views.js` — view loader
9. `js/router.js` — routing and history management

---

## Startup Sequence

1. `DOMContentLoaded` fires in `app.js`
2. `App.basePath` is derived from the first URL segment (e.g. `/Ravi-Gupta/`)
3. Favicon is set to an absolute path using `App.basePath`
4. `loadNavigation()` fetches `data/navigation.json` and renders the navbar
5. `initializeNavigation()` attaches click handlers to nav links
6. `initializeFooter()` attaches click handlers to footer links
7. `getInitialRoute()` reads the current URL or `?route=` param (set by 404 redirect)
8. URL is cleaned with `history.replaceState` if `?route=` was present
9. The matching menu entry is found and `navigateTo()` loads the first view

---

## Routing

The app uses `history.pushState` for clean URLs with no hash.

`App.basePath` is detected dynamically from `window.location.pathname`:
- On GitHub Pages: `/Ravi-Gupta/`
- On localhost: `/`

**GitHub Pages deep-link handling:** GitHub Pages returns a 404 on direct URL access (e.g. reloading `/Ravi-Gupta/journal/some-post`). `404.html` catches this, extracts the route from the path, and redirects to `/?route=%2Fjournal%2Fsome-post`. `app.js` reads the `?route=` param and navigates correctly.

**Apache hosting:** `.htaccess` handles the same redirect via `ErrorDocument 404`.

---

## Navigation JSON

`data/navigation.json` controls the entire navigation. Supports unlimited nesting.

```json
{
  "menus": [
    {
      "title": "Journal",
      "url": "/journal",
      "view": "journal",
      "enabled": true,
      "children": [
        {
          "title": "My First Post",
          "url": "/journal/my-first-post",
          "view": "journal-my-first-post",
          "enabled": true
        }
      ]
    }
  ]
}
```

| Field | Description |
|---|---|
| `title` | Display text in the navbar |
| `url` | Route used in the browser address bar |
| `view` | Filename in `views/` folder without `.html` |
| `enabled` | `false` hides the item from the navbar entirely |
| `children` | Nested menu items — renders as a dropdown |

---

## Adding a New Page

1. Create `views/your-page.html` with the page content (no `<html>` or `<body>` tags)
2. Add an entry to `data/navigation.json` with `enabled: true`
3. If the page needs JavaScript on load, add a case to `initializeView()` in `js/app.js` and create `js/pages/your-page.js`

---

## Adding a New Journal Entry

1. Create `views/journal-your-post-title.html`
2. Add an entry under `Journal > children` in `data/navigation.json`:

```json
{
  "title": "Your Post Title",
  "url": "/journal/your-post-title",
  "view": "journal-your-post-title",
  "enabled": true
}
```

No other changes needed.

---

## Running Locally

1. Place the project folder inside your WAMP `www` directory:
   ```
   C:\wamp64\www\Ravi-Gupta\
   ```
2. Start WAMP and ensure the Apache server is running (green icon in system tray)
3. Open your browser and navigate to:
   ```
   http://localhost/Ravi-Gupta/
   ```

Do not open `index.html` directly in the browser — the app fetches views over HTTP and will not work on the `file://` protocol.

---

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Bootstrap 5.3.3 (dark theme)
- Bootstrap Icons 1.11.3
- Hosted on GitHub Pages
