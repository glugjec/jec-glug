# GLUG JEC — Official Website

<div align="center">

  <img src="frontend/src/assets/main_logo.png" alt="GLUG JEC Logo" width="140" />

  <h3>Born from curiosity, powered by community.</h3>

  <p>The official web portal for the <strong>GNU/Linux Users Group (GLUG)</strong> of <strong>Jorhat Engineering College (JEC)</strong>, Assam.</p>

  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=black&style=flat-square" alt="React" /></a>
    <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square" alt="Tailwind CSS" /></a>
    <a href="https://reactrouter.com/"><img src="https://img.shields.io/badge/React_Router-v7.6-CA4245?logo=react-router&logoColor=white&style=flat-square" alt="React Router" /></a>
    <a href="https://github.com/glugjec/jec-glug/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License" /></a>
    <a href="https://github.com/glugjec/jec-glug/pulls"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
  </p>

</div>

---

## 📌 Table of Contents

- [GLUG JEC — Official Website](#glug-jec--official-website)
  - [📌 Table of Contents](#-table-of-contents)
  - [🐧 About GLUG JEC](#-about-glug-jec)
  - [✨ Key Features](#-key-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [📂 Project Architecture](#-project-architecture)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running Locally](#running-locally)
  - [📜 Available Scripts](#-available-scripts)
  - [ Admin Panel \& Content Management](#-admin-panel--content-management)
    - [Authentication \& Sessions](#authentication--sessions)
    - [Management Modules](#management-modules)
  - [🌐 Deployment](#-deployment)
  - [🤝 Contributing](#-contributing)
  - [🌐 Community \& Socials](#-community--socials)
  - [📄 License](#-license)

---

## 🐧 About GLUG JEC

The **GNU/Linux Users Group (GLUG)** of **Jorhat Engineering College (JEC)** is a student-led developer community dedicated to championing open-source software, GNU/Linux systems, and collaborative technical growth.

We organize workshops, hackathons, open-source bootcamps, and technical talks—empowering students to build real-world software, contribute to global open-source programs (like Google Summer of Code), and collaborate with fellow developers.

---

## ✨ Key Features

- **Responsive Landing Page & Hero**:
  - Interactive hero section featuring direct invites to the GLUG WhatsApp community and community platform.
  - Floating dynamic navbar with animated sliding indicator and mobile hamburger drawer.
- **Events Hub (`/events`)**:
  - Filter and browse both **Upcoming** and **Past** events.
  - Real-time indicator highlight for events occurring **Today**.
  - Multi-image gallery preview with modal lightbox for event recaps.
- **Team Showcase (`/team`)**:
  - Categorized presentation across leadership levels (Club Mentor, Club Head, Co-Heads, Leads, and Members).
  - Dynamic API integration with reliable offline fallback to local configuration (`team.json`).
  - Interactive member cards featuring social links (LinkedIn, Instagram).
- **Sponsors & Partners (`/sponsors`)**:
  - Tier-based sponsor visibility and recognition.
  - Home sponsor spotlight section.
  - Dedicated partnership enquiry and proposal contact section.
- **Visual Media Gallery**:
  - Curated showcases from previous club bootcamps, workshops, and tech seminars.
- **Contact & Community Portal (`/contact`)**:
  - Direct inquiry form submission integrated with the backend API.
  - Campus location map coordinates and official contact information.
- **Protected Admin Dashboard (`/admin`)**:
  - Secure credential-based login with timed session tracking and `x-api-key` header verification.
  - Comprehensive content management:
    - **Event Manager**: Create, edit, and delete events with multi-image upload capabilities.
    - **Gallery Manager**: Curate, add, and remove gallery media.
    - **Sponsor Manager & Home Sponsor Manager**: Update brand logos, tiers, and partner links.
    - **Team Manager**: Add or edit team member profiles and leadership listings.

---

##  Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | [React 19](https://react.dev/), [React DOM](https://react.dev/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Build Tool & Bundler** | [Vite 7](https://vite.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), PostCSS, `@tailwindcss/vite` |
| **UI Components & Carousel** | [Embla Carousel](https://www.embla-carousel.com/), Radix UI Slot, Class Variance Authority (`cva`), `clsx`, `tailwind-merge` |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), Poppins, Noto Serif JP, MBF Canno |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Deployment** | [GitHub Pages (`gh-pages`)](https://pages.github.com/) |

---

## 📂 Project Architecture

```text
jec-glug/
├── frontend/
│   ├── public/                      # Static assets & favicon
│   │   ├── images/                  # Public image resources & backgrounds
│   │   ├── favicon.ico
│   │   └── teampagebackground.png
│   ├── src/
│   │   ├── assets/                  # Bundled logos, fonts, and vector graphics
│   │   │   ├── fonts/               # Custom font definitions
│   │   │   └── sponsor_logo/        # Partner and sponsor branding assets
│   │   ├── components/              # Modular UI components
│   │   │   ├── admin/               # Admin dashboard modules (Events, Gallery, Sponsors, Team)
│   │   │   ├── ui/                  # Reusable UI primitives (Button, Card, Carousel)
│   │   │   ├── AboutGLUG.jsx        # About club info & mission section
│   │   │   ├── ContactForm.jsx      # Interactive contact form
│   │   │   ├── EventCard.jsx        # Individual event showcase item
│   │   │   ├── EventImageGallery.jsx# Event gallery modal & photo viewer
│   │   │   ├── EventsComponent.jsx  # Main events listing & filters
│   │   │   ├── Footer.jsx           # Global site footer with links & social handles
│   │   │   ├── Hero.jsx             # Homepage hero banner & calls to action
│   │   │   ├── Navbar.jsx           # Responsive floating navigation bar
│   │   │   ├── TeamSection.jsx      # Team member layout component
│   │   │   └── ...
│   │   ├── config/                  # Configuration & auth utilities
│   │   │   ├── auth.js              # Admin authentication credentials config
│   │   │   └── xapiSession.js       # Session storage & x-api-key management
│   │   ├── lib/                     # Helper functions & Tailwind class merger (cn)
│   │   ├── pages/                   # Application route views
│   │   │   ├── AdminPanel.jsx       # Admin dashboard & login gate
│   │   │   ├── ContactPage.jsx      # Contact information & form page
│   │   │   ├── EventPage.jsx        # Event details view
│   │   │   ├── HomePage.jsx         # Landing page entry point
│   │   │   ├── SponsorPage.jsx      # Sponsors & partnership page
│   │   │   └── TeamPage.jsx         # Club hierarchy & team view
│   │   ├── team.json                # Fallback static roster of core members
│   │   ├── App.jsx                  # Main routing and app wrapper
│   │   ├── index.css                # Global Tailwind CSS imports & theme directives
│   │   └── main.jsx                 # React root render entry
│   ├── index.html                   # HTML template
│   ├── jsconfig.json                # Path alias mapping (@/* -> ./src/*)
│   ├── package.json                 # Project dependencies & scripts
│   └── vite.config.js               # Vite configuration with React & Tailwind plugins
└── README.md                        # Project documentation (this file)
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18.0.0 or higher recommended): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js), **yarn**, or **pnpm**
- **Git**: [Download Git](https://git-scm.com/)

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/glugjec/jec-glug.git
   cd jec-glug/frontend
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

---

### Environment Variables

Create a `.env` file inside the `frontend/` directory (you can copy `.env.example`):

```bash
cp .env.example .env
```

Define the following environment variables:

```env
# Backend API Base URL
VITE_API_BASE_URL=https://api.yourdomain.com

# Admin Panel Credentials (Optional overrides)
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password
```

| Variable | Description | Default (Fallback) |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of the backend REST API endpoint for events, gallery, and contacts. | `undefined` (set to your API endpoint) |
| `VITE_ADMIN_USERNAME` | Admin panel login username. | `defaultAdmin` |
| `VITE_ADMIN_PASSWORD` | Admin panel login password. | `jecglug123` |

---

### Running Locally

To spin up the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Once started, open your browser and navigate to:
```text
http://localhost:5173
```

---

## 📜 Available Scripts

In the `frontend/` directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the local development server via Vite at `http://localhost:5173`. |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| `npm run preview` | Locally serves the production build from `dist/` to test prior to deployment. |
| `npm run lint` | Runs ESLint to identify code smells, syntax issues, and styling inconsistencies. |
| `npm run deploy` | Runs `npm run build` and deploys the generated `dist/` folder to the `gh-pages` branch. |

---

## 🔒 Admin Panel & Content Management

The administrative panel is located at `/admin`.

### Authentication & Sessions
- Access to the dashboard is protected by username and password credentials configured via environment variables.
- Upon successful authentication, a session token is stored in `sessionStorage` with a 10-minute expiry window.
- Mutation requests to the backend API automatically include the `x-api-key` header created by `buildXapiHeaders()`.

### Management Modules
- **Events Manager**: Add upcoming workshops, modify event details, attach multiple gallery images, or delete outdated records.
- **Gallery Manager**: Upload event photos and manage the club's visual archive.
- **Sponsor Manager**: Update corporate and community sponsor profiles, logos, and external website links.
- **Team Manager**: Keep club member details, roles, and profiles up to date.

---

## 🌐 Deployment

The application is configured for deployment using **GitHub Pages** with the `gh-pages` package:

1. Build and push the latest bundle to the `gh-pages` branch:
   ```bash
   npm run deploy
   ```
2. In the repository settings on GitHub (**Settings > Pages**), ensure that the build source is set to `Deploy from a branch` and pointed to the `gh-pages` branch root (`/`).

---

## 🤝 Contributing

Contributions from students, community members, and open-source enthusiasts are warmly welcomed!

1. **Fork the Repository** on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/jec-glug.git
   cd jec-glug/frontend
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. **Make your changes** and test locally (`npm run dev` and `npm run lint`).
5. **Commit your changes** following conventional commit standards:
   ```bash
   git commit -m "feat: add interactive timeline for past events"
   ```
6. **Push to your branch**:
   ```bash
   git push origin feat/your-feature-name
   ```
7. **Open a Pull Request (PR)** against the `main` branch of `glugjec/jec-glug` with a clear description of your changes.

---

## 🌐 Community & Socials

Connect with **GLUG JEC** across the web:

- 🌐 **Official Community**: [community.glugjec.com](https://community.glugjec.com/)
- 🐙 **GitHub**: [github.com/glugjec](https://github.com/glugjec)
- 💼 **LinkedIn**: [linkedin.com/company/glug-jec](https://www.linkedin.com/company/glug-jec)
- 📸 **Instagram**: [@jecglug](https://www.instagram.com/jecglug/)
- 📘 **Facebook**: [facebook.com/jec.glug](https://www.facebook.com/jec.glug/)
- 💬 **WhatsApp Community**: [Join GLUG WhatsApp](https://chat.whatsapp.com/C3ZPRyoG0OI5Uy5ZEs7xxL)
- ✉️ **Email**: [glug.jec@gmail.com](mailto:glug.jec@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ by the students of <strong>GNU/Linux Users Group, Jorhat Engineering College</strong></sub>
</div>

