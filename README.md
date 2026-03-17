# Interactive Developer Portfolio

A dynamic, fully responsive, and highly animated personal portfolio website built to showcase projects, skills, and coding achievements.

![Portfolio Preview](/public/vite.svg) (*Add an actual screenshot to your public directory and link it here*)

## 🌟 Key Features

- **Modern Tech Stack**: Built with React 19, Vite, and Tailwind CSS v4 for blazing fast performance and styling.
- **Rich Animations**: Utilizes Framer Motion, GSAP, and Anime.js to create a premium, interactive user experience.
- **Custom UI Elements**: Custom "bouncing" blue arrow cursor, smooth scrolling, and dynamic page transitions.
- **Dedicated Sections**:
  - **About & Hero**: Introduction with animated text and Lottie animations.
  - **Skills**: Categorized technical skills (Frontend, Backend, Languages, Tools) with proficiency indicators dynamically loaded from JSON.
  - **Projects**: Showcase of personal projects (e.g., Nivana, Volunteer Management System) with links to live demos and GitHub repositories.
  - **DSA Profile**: Live integration-like display of competitive programming stats (LeetCode, CodeChef, HackerRank, GeeksForGeeks).
  - **Certifications**: Gallery of earned certificates.
  - **Contact**: Integrated contact form powered by EmailJS.
- **Interactive ChatBot**: A floating "CV Chatbot" available on all pages to interactively answer questions about the portfolio.

## 🛠️ Technology Stack

**Frontend Context:**
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4) & Styled Components
- **Animations**: Framer Motion, GSAP, Anime.js, Lottie-React
- **Icons**: Lucide React, React Icons
- **Data Visualization**: Recharts

**Utilities & Integrations:**
- **Email Handling**: EmailJS (@emailjs/browser)
- **Routing/Scrolling**: react-scroll
- **Code Linting**: ESLint

## 📁 Project Structure

```text
src/
├── animations/        # Reusable animation variants (Framer Motion, GSAP)
├── assets/            # Static files, images, icons
├── components/        # React components
│   ├── chatbot/       # Floating CV ChatBot components
│   ├── layout/        # Navbar, PageTransition, etc.
│   ├── sections/      # Hero, About, Skills, Projects, DSA Profile, Contact
│   └── ui/            # Reusable UI elements
├── data/              # JSON files for dynamic content (projects, skills, achievements, DSA stats)
├── hooks/             # Custom React hooks
├── styles/            # Global stylesheets
├── utils/             # Helper functions
├── App.jsx            # Main application component routing internal sections
└── main.jsx           # Entry point
```

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anuj-yd/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your EmailJS configuration:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   *(Ensure to replace the values with your actual EmailJS credentials for the contact form to work)*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 Customization

You can easily update the content using the JSON files located in `src/data/`:
- `projects.json`: Add/remove projects.
- `skills.json`: Update your technical skills and proficiency.
- `dsa-stats.json`: Update your competitive programming profiles.
- `achievements.json`: Manage your featured milestones.

## 👤 Author

**Anuj Yadav**
- [GitHub](https://github.com/anuj-yd)
- Email/Contact via the portfolio form.

## 📄 License

This project is licensed under the MIT License - feel free to build upon it for your own portfolio!
