# 📝 ModStack Assignment - Notetaking Application

A modern, multi-tenant notetaking app built with **React.js** and **Auth0 authentication**. This application allows users to securely create, view, search, update, and delete their personal notes with a smooth and responsive experience.

---

## 🚀 Features

- **Multi-tenant Architecture**: Secure user authentication with Auth0 (OIDC SDK)
- **Full CRUD Operations**: Create, Read, Update, and Delete personal notes
- **Search Functionality**: Quickly find notes using search queries
- **Persistent Storage**: Notes saved locally using `localStorage`
- **Responsive Design**: Fully responsive across desktop and mobile
- **User-specific Data**: Each user’s notes are isolated and protected

---

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite
- **Authentication**: Auth0 OIDC SDK
- **Storage**: Browser `localStorage`
- **Styling**: CSS / Styled Components
- **Build Tool**: Vite
- **Linting**: ESLint

---

## ✅ Assignment Requirements Completed

- ✅ Multi-tenant app with Auth0
- ✅ Full CRUD for notes
- ✅ Built using modern React (Vite)
- ✅ Search across notes
- ✅ Single-line and multi-line note formats
- ✅ LocalStorage-based persistence
- ✅ Responsive UI

## 📋 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn
- An [Auth0](https://auth0.com/) account

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/shriyanshbhargava/modStack-Assignment.git
cd modStack-Assignment
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure Auth0**

- Sign up at [Auth0](https://auth0.com/)
- Create a new **Single Page Application**
- Copy your **Domain** and **Client ID**
- Configure:
  - Allowed Callback URLs
  - Logout URLs
  - Web Origins

4. **Create a `.env` file** in the root directory:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-audience  # optional
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

6. **Open in browser**

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

---
