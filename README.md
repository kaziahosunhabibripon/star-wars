# 🧾 Technical Documentation

## 📁 Folder Structure

star-wars/
├── public/ # Static assets
│ ├── components/ # Reusable React components (e.g., Card, SearchBox)
│ ├── pages/ # Next.js pages (includes index.tsx, [id].tsx, etc.)
│ ├── styles/ # Global styles and Tailwind config
│ ├── hooks/ # Helper functions or constants
│ └── app/ # App router (if using Next.js App Router)
│ └── types/ # All typescript Interface and Type Here
├── .env.example # Secret API or other file there
├── .gitignore # Ignored git file here
├── package.json # which npm packegae and dependecy are used there details describe
├── tailwind.config.js #tailwind css config file there
├── README.md # Full documentation Here about how to download install and run project with the technology and other things
├── tsconfig.json

# 🌌 Star Wars

A simple web application to explore Star Wars characters. Users can search, view details, and paginate through a list of characters powered by the [Star Wars API](https://akabab.github.io/starwars-api/api/all.json).

---

## 🚀 Features

- 🔍 **Search Box** – Quickly find Star Wars characters by name
- 📄 **Details Page** – View detailed information for each character
- 🔢 **Pagination** – Navigate through character listings with ease

---

## 🛠️ Technology Stack

- **Frontend**: [Next.js](https://nextjs.org/) v15.3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **API**: [Star Wars API](https://akabab.github.io/starwars-api/api/all.json)

---

## 📦 Installation

Follow these steps to run the project locally:

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (Recommended v18+)

### 🛠️ Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/kaziahosunhabibripon/star-wars
   cd star-wars
   ```

   Install dependencies

bash
Copy
Edit
npm install
Start the development server

You can use any of the following:

bash
Copy
Edit
npm run dev

# or

yarn dev

# or

pnpm dev

# or

Open in browser

Visit: http://localhost:3000

🌍 Live Demo
The project is deployed on Vercel:

🔗 Live Site: https://star-wars-two-theta.vercel.app/

📄 License

# This is the First Phase of Development

## Next phase will try to inculde

--> Authentication --> Signup or Register
--> Authorization --> Login (JWT)
--> ROLE BACK SYSTEM --> (User, Admin)
--> Dashboard --<> User and Admin Dashboard

## Last Phase Will Try to include

--> Make Backend --> with our own API --> Node Js, Express JS, Prisama, PostgresSQL
