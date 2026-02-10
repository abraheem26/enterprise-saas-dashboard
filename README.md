Enterprise SaaS Admin Dashboard

A portfolio-grade, enterprise-style SaaS Admin Dashboard built with:


Next.js (App Router)


React & TypeScript


Tailwind CSS


React Query (TanStack)


JWT Authentication & Role-Based Access Control (RBAC)



🏗️ Project Status — Tickets 2, 3, 4 & 5 Completed

What’s done so far:

✅ Project Setup & Dashboard Layout (Ticket 2)

Initialized Next.js project with TypeScript and Tailwind CSS


Configured ESLint & Prettier for professional code formatting


Created enterprise-ready folder structure:


src/

├─ app/           # routing, layouts, page entry points

├─ components/    # UI & reusable components (Sidebar, Topbar, charts)

├─ hooks/         # custom React hooks (auth, permissions)

├─ lib/           # app-wide setup (React Query client, auth helpers)

├─ services/      # API calls (auth, users, reports)

├─ types/         # shared TypeScript types

├─ utils/         # helper functions and constants

Implemented dashboard layout with persistent sidebar and topbar


Sidebar navigation with active route highlighting


Scrollable main content, sticky topbar, responsive sidebar (tablet support)


Route groups (auth) and (dashboard) for clean App Router structure


Root redirect (/ → /login)


UX polish for a real SaaS feel


✅ Authentication & Role-Based Access (Ticket 3 & 4)

Login flow with fake JWT authentication


Auth context for user state & token


Protected routes via ProtectedRoute component


Role-based access control (RBAC):


Admin: full access


Manager: limited access


Viewer: read-only access


Sidebar items filtered by role


Unauthorized users are redirected or blocked


Middleware & cookie-based token storage prepared for real API


✅ React Query & API Layer Setup (Ticket 5)

Configured QueryClientProvider globally


Created apiClient abstraction for fetch calls


Global error handling and loader via GlobalLoader


Mock API endpoints implemented in Next.js API routes


useUsers hook demonstrates fetching data via React Query


No direct fetch calls in components — all server-state handled through React Query


Recruiter / Portfolio Highlights:

Shows modern Next.js App Router architecture


Implements role-based authentication & permissions


Demonstrates server-state management with React Query


Dashboard feels like a real product, not a tutorial


Clean, modular, scalable folder organization



🚀 Next Steps

Ticket 6: CRUD Modules & Tables

Implement Users, Subscriptions, Reports pages


CRUD operations via React Query + API


Data tables with pagination, search, filters, sorting


Charts with Recharts / Chart.js for analytics



💡 Notes

All code is TypeScript-ready and production-friendly


ESLint & Prettier ensure consistent, clean code


Dev server running at http://localhost:3000

