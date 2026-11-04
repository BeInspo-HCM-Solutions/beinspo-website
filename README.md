# BeInspo website

Static site, no build step and no external requests (the font is self-hosted). Open `index.html` directly, or serve the folder so relative links behave exactly as in production:

```
python -m http.server 8765 --directory BeInspo_Website
```

then open http://127.0.0.1:8765/ .

## Pages

- `index.html` — homepage: hero with the animated "One employee, every rule" story, a moving band of solved problems and platforms, "Which sounds like you?", Already solved, the four offerings as one path with a collapsible "Compare all four", Why BeInspo (story banner and plain-vs-BeInspo contrast), platforms, closing.
- `readiness-assessment.html` — 01 Readiness Assessment: timeline, six-question explorer with report tags, report card with eight parts.
- `implementation.html` — 02 Implementation: five-phase timeline, integrations explorer, evidence card, walk-away cards.
- `implementation-assurance.html` — 03 Implementation Assurance: entry chips, problem/answer explorer, relationship diagram, stage ribbon, beacon.
- `post-go-live-support.html` — 04 Post Go-Live Support & Stabilization: entry chips, first-year timeline, clickable five-level ladder with subscription and credit brackets.
- `school-boards.html` — Solved for school boards: six layers, walkthroughs (`#wt-a`, `#wt-b`, `#wt-c`), delivered work (`#delivered`), procurement answers.
- `team.html` — Our Team: story banner, three lead cards with linked chips and bio toggles, five commitments.
- `contact.html`, `contact-thanks.html`, `privacy.html`, `accessibility.html`.

Navigation on every page: Offerings ▾ · Solved for school boards · Why BeInspo (`index.html#why-beinspo`) · Our Team · Talk to us.

## Files

- `css/styles.css` — base palette, type and layout; declares the self-hosted Plus Jakarta Sans.
- `css/pages.css` — shared offering-page components (at-a-glance card, for/not-for, FAQ, path strip, relationship diagram).
- `css/merge.css` — components added in the redesign: timelines, explorers, beacon, evidence card, walk-away cards, homepage path, story banner, contrast, hero story, moving band, scroll reveal.
- `js/main.js` — mobile menu and Offerings dropdown. Each page carries its own small inline script for its interactive parts.
- `assets/fonts/` — Plus Jakarta Sans (SIL Open Font License, licence included).
- `assets/beinspo-logo.png`, `assets/favicon.svg`, `assets/spark.svg`, `assets/team/`.

## Motion and accessibility

All animation (hero story, moving band, scroll reveal, counters) stops for visitors whose system asks for reduced motion; they see the finished state. The hero story pauses on hover, has a pause button and step dots, and carries a screen-reader summary.

## Contact form

The form posts to `https://formsubmit.co/connect@beinspo.ca`. The first submission sends a one-time activation email to that address; submissions flow after it is confirmed. Change the hidden `_next` redirect to the real domain before launch.

## Review markers

Text wrapped in `<mark class="todo">` is a placeholder awaiting a confirmed fact (for example Oracle partnership status and data residency). It shows in yellow; remove the markup once confirmed.
