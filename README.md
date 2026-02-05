# Enterprise SaaS Admin Dashboard

A **portfolio-grade, enterprise-style SaaS Admin Dashboard** built with:

- **Next.js (App Router)**
- **React & TypeScript**
- **Tailwind CSS**
- **React Query (TanStack)**
- **JWT Authentication & Role-Based Access Control (RBAC)**

---

## 🏗️ Project Status — Ticket 2 Completed

**What’s done so far:**

- ✅ Initialized Next.js project with TypeScript and Tailwind CSS
- ✅ Configured ESLint & Prettier for professional code formatting
- ✅ Created enterprise-ready folder structure:

src/

- app/ # routing, layouts, page entry points
- components/ # UI & reusable components (Sidebar, Topbar, charts)
- hooks/ # custom React hooks (auth, permissions)
- lib/ # app-wide setup (React Query client, auth helpers)
- services/ # API calls (auth, users, reports)
- types/ # shared TypeScript types
- utils/ # helper functions and constants

- ✅ Implemented **dashboard layout** with persistent sidebar and topbar
- ✅ Sidebar navigation with **active route highlighting**
- ✅ Scrollable main content, sticky topbar, responsive sidebar (tablet support)
- ✅ Route groups `(auth)` and `(dashboard)` for clean App Router structure
- ✅ Root redirect (`/` → `/login`)
- ✅ UX polish for a **real SaaS feel**

**Recruiter / Portfolio Highlights:**

- Shows modern **Next.js App Router architecture**
- Demonstrates **clean, scalable folder organization**
- Dashboard **feels like a real product**, not a tutorial
- Prepares for **authentication, RBAC, and CRUD modules**

---

## 🚀 Next Steps

**Ticket 3: Authentication & Role-Based Access**

- Login flow
- Fake JWT authentication
- Auth context and route protection
- Sidebar filtered by role
- Role-based route guarding for `/dashboard/*`

---

## 💡 Notes

- All code is **TypeScript-ready** and production-friendly
- **ESLint & Prettier** ensure consistent, clean code
- Ready to showcase on **GitHub or your resume**
- Dev server currently running at [http://localhost:3000](http://localhost:3000)
