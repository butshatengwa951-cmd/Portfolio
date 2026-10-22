# Nocturne — Butsha Tengwa Portfolio

A tactile, atmospheric developer portfolio built with **Vue 3, TypeScript and Vite**, drawing on the intimate tension of silk, shadow, embroidery and pearl. Blackberry ink, bruised wine, smoked mauve, old ivory and pearl-lilac light shape an art-directed space that feels whimsical yet grounded.

**Source repository:** [Portfolio on GitHub](https://github.com/butshatengwa951-cmd/Portfolio) · **Live site:** [Nocturne portfolio](https://butsha-nocturne-portfolio.onrender.com/) · **Previous case-file version:** [Projects on GitHub](https://github.com/butshatengwa951-cmd/Projects)

## Pages

The portfolio is organised into seven navigable pages: Home (`/#/`), Selected Work (`/#/work`), Skills Map (`/#/skills`), Journey (`/#/journey`), About (`/#/about`), Field Notes (`/#/field-notes`) and Contact (`/#/contact`). Each page shares the same header, footer, textures, theme toggle and responsive styling. Vue Router hash history keeps direct links and refreshes working on static hosting.

## Design principles

- Dark and intimate, with fibre-like texture, grain, stitched linework and layered pigment-like colour.
- Restrained organic movement, pearlescent details and softened, tactile controls.
- Backend, data and system thinking presented through real projects and an interactive skills constellation.
- Responsive layout, keyboard-accessible links, and reduced-motion support.
- Static Vue/Vite site; the contact form uses FormSubmit for email delivery and requires a public recipient address configured at build time.

## Stack

- Vue 3 + TypeScript
- Vite
- Instrument Serif display typography, DM Sans body text and IBM Plex Mono technical labels
- CSS textile textures and animation, an embroidered SVG hero illustration, live iframe previews and an interactive SVG skills constellation
- Lucide icons

## Local development

Requirements: Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

## Contact form setup

Set `VITE_CONTACT_EMAIL` to the inbox that should receive messages. Copy `.env.example` to `.env.local` for local testing, and add the same variable in your hosting provider's environment settings before building the deployed site. The form submits through [FormSubmit's AJAX endpoint](https://formsubmit.co/ajax-documentation); on first use, FormSubmit sends an activation email to the configured recipient. Confirm that email before expecting submissions to arrive. The recipient address is a public Vite variable, so use an inbox address intended for public contact, not a secret.

## Validate and build

```sh
npm run typecheck
npm run build
npm run preview
```

The production build is generated in `dist/`.

## Deploy on Render

Create a **Static Site** connected to this repository.

- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Add a rewrite from `/*` to `/index.html` if client-side routes are added later.

## Before publishing publicly

- Verify every project description, technology list and repository URL against the actual source.
- Replace the StockWell source link if its code lives in a different repository.
- Set `VITE_CONTACT_EMAIL` to the inbox that should receive portfolio enquiries, then submit a test message and confirm FormSubmit's activation email.
- Check whether each live site permits iframe embedding; use the direct-open link when a host blocks embeds.
- Keep live URLs and skills-map relationships aligned with the actual repositories.
- Expand the ModernTechHR and Lightning News case studies with implementation details verified from code.

Project previews embed the live applications when their hosts permit iframe embedding; use the direct-open links when a host blocks embeds. The hero artwork is an original CSS/SVG composition rather than a third-party image.

## Project links

- StockWell live application: https://stockwell-hl1e.onrender.com/
- Budget Tracker Python Mini Toolkit: https://github.com/butshatengwa951-cmd/Budget-Tracker-python-mini-toolkit/tree/main
- GitHub profile: https://github.com/butshatengwa951-cmd

## License

Portfolio source code and authored content by Butsha Tengwa. Add a license if you want to permit reuse under specific terms.
