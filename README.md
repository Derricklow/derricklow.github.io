# Derrick Low - Portfolio Website

Personal portfolio website showcasing my skills, project experiences, and professional background as a web developer based in Johor Bahru, Malaysia.

**Live site:** [derricklow.github.io](https://derricklow.github.io)

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Vanilla JavaScript** - Animations and interactivity
- **Font Awesome Pro** - Icons

## Features

- Responsive design (desktop, tablet, mobile)
- Typing text animation on hero section
- Scroll-triggered fade-in animations using Intersection Observer
- Animated skill progress bars with counting effect
- Sticky navigation header on scroll
- Infinite-scrolling tech stack marquee
- Mobile-friendly hamburger menu layout

## Project Structure

```
derricklow.github.io/
├── index.html          # Main HTML page
├── app.css             # Custom styles and animations
├── app.js              # JavaScript (scroll, typing, observers)
├── img/                # Images and tech logos
│   ├── derrick.jpg
│   ├── cordova-icon.png
│   ├── mysql-icon.png
│   └── vba-icon.png
├── fontawesome-pro/    # Font Awesome Pro icons
├── LICENSE             # MIT License
└── README.md
```

## Sections

1. **Hero** - Introduction with avatar, typing animation, and key stats
2. **What I Do** - Skills overview with animated progress bars
3. **Tech Marquee** - Scrolling tech stack icons
4. **Project Experiences** - Cards showcasing past work (courier apps, vehicle immobilizer, shipping app, warehouse analysis, cage dropoff/pickup)

## Getting Started

No build step required. Simply open `index.html` in a browser or serve with any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## Deployment

This site is deployed automatically via [GitHub Pages](https://pages.github.com/) from the `main` branch.

## License

MIT License - see [LICENSE](LICENSE) for details.
