# Pasadena Country Garden School — Website (v2)

A warm, nature-forward, mobile-first **multi-page** static website for **Pasadena Country Garden School**, a garden-based preschool & summer camp in Pasadena, CA (Arroyo Seco).

## Live site
Served via GitHub Pages: **https://thinkfirststudios.github.io/Pasadena-Country-Garden-School-V2/**
(Enable under repo **Settings → Pages → Deploy from a branch → `main` / root** if not already on.)

## Pages
| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About → Who We Are |
| `gallery.html` | About → Gallery |
| `summer-camp.html` | Programs → Summer Camp |
| `fall-enrichment.html` | Programs → Fall Enrichment |
| `food.html` | Food & Nourishing Traditions |
| `registration.html` | Registration (Brightwheel) |
| `contact.html` | Contact |

## Structure
```
assets/
  css/styles.css   # Garden design system (tokens, components)
  js/main.js       # Sticky nav, mobile menu, scroll reveals, lightbox, placeholder images
*.html             # One file per page (shared header/footer inline)
```

## Tech
- Plain HTML/CSS/JS — no build step. Open `index.html` or serve the folder.
- Mobile-first, accessible, `prefers-reduced-motion` respected.
- `LocalBusiness` / `Preschool` JSON-LD, per-page titles & meta.
- Brightwheel wired to all Apply/Enroll/Inquiry buttons.

## Before launch — replace demo content
- **Images**: currently auto-filled with themed demo photos (loremflickr) for the pitch. Drop real photos into an `assets/img/` folder and add real `<img>` tags (the auto-fill skips any `.imgph` that already contains an image).
- **Reviews**: replace placeholder testimonials/names.
- **Stats**: confirm the `[X]+ yrs` and other numbers.
- **Forms**: newsletter / inquiry / contact forms are demo stubs — connect to Brightwheel or an email handler.
- **Socials**: swap the placeholder Instagram/Facebook/Yelp links.
- Confirm: Pasadena Business No., meal details, program pricing (if public), founder/story copy, canonical domain; set up a Google Business Profile.
