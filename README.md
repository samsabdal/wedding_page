# Royal Islamic Wedding Invitation — MD Karimullah & Hina Quadri

A bespoke, mobile-first, single-page Islamic wedding invitation website designed for **MD Karimullah** and **Hina Quadri**.

**Live Invitation Website:** [https://wedding-page-1xp.pages.dev/](https://wedding-page-1xp.pages.dev/)

## ✨ Design & Features

- **Aesthetic:** Royal Emerald theme (`#063C30`) with antique gold foil accents (`#C9A35B`), warm ivory typography, and subtle repeating *"An-nikah min sunnati"* calligraphic watermark.
- **Cinematic Atmosphere:** Floating luminous spheres, soft gold dust particles, and smooth scroll reveal animations.
- **Interactive Countdown:** Live countdown timer synchronized to IST (Asia/Kolkata: October 28, 2026, 05:00 AM).
- **One-Click Calendar Integration:** Add to Google Calendar and download standard `.ics` (Apple Calendar & Outlook).
- **Verified Venues & Google Maps:**
  - **Marriage Venue:** Royal Palace Mandap, Bhadrak ([Google Maps](https://maps.app.goo.gl/vZppiagNp6Ta55o1A))
  - **Reception Venue:** Topiwale Baba Mandap, Dhamnagar ([Google Maps](https://maps.app.goo.gl/XXBM2FHdq89V7njF8))
- **Soundtrack:** User-initiated background audio player with playback toggle.
- **Native Sharing:** Web Share API integration with clipboard copy fallback.
- **Accessibility & Performance:** Zero horizontal overflow, mobile-friendly navigation drawer, and support for `prefers-reduced-motion`.

## 📁 Repository Structure

```text
├── index.html     # Primary single-page HTML document
├── style.css      # Custom royal styling, damask textures & animations
├── script.js      # Countdown, audio player, calendar & map engine
├── audio.mp3      # Wedding background soundtrack
├── logo.png       # Codes Cool attribution logo
├── .gitignore     # Git ignore rules
└── README.md      # Project documentation
```

## 🚀 Cloudflare Pages Deployment Settings

This repository is built as a pure, zero-dependency static site.

- **Framework preset:** `None`
- **Production branch:** `main`
- **Build command:** `exit 0` *(or leave empty)*
- **Build output directory:** `.` *(root)*
- **Root directory:** `/` *(leave default / empty)*

---
*Crafted with elegance for MD Karimullah & Hina Quadri.*
