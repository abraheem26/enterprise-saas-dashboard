# 🧩 Enterprise SaaS Admin Dashboard

A **portfolio-grade, enterprise-style SaaS Admin Dashboard** built to demonstrate real-world frontend architecture, authentication, and scalable state management.

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **React & TypeScript**
- **Tailwind CSS**
- **React Query (TanStack)**
- **JWT Authentication**
- **Role-Based Access Control (RBAC)**

---

## 🏗️ Project Status

### ✅ Tickets 1 - 7 Completed

This project is actively developed using a ticket-based, enterprise-style workflow.

---

## 📌 What’s Done So Far

---

### ✅ Ticket 1 & 2 — Project Setup & Dashboard Layout

- Initialized **Next.js** project with **TypeScript** & **Tailwind CSS**
- Configured **ESLint** & **Prettier** for professional code formatting
- Designed an enterprise-ready folder structure:

  src/  
  ├─ app/ # App Router pages, layouts, route groups  
  │ ├─ (auth)/ # Login & auth routes  
  │ ├─ (dashboard)/ # Protected dashboard routes  
  │ └─ api/ # Next.js route handlers (mock backend)  
  ├─ components/ # Reusable UI components (Sidebar, Topbar, Loader)  
  ├─ context/ # Auth context  
  ├─ hooks/ # Custom hooks (useAuth, useUsers, etc.)  
  ├─ lib/  
  │ ├─ apiClient.ts # Central API abstraction  
  │ └─ apis/ # Domain-specific API files  
  ├─ services/ # Mock services & fake backend logic  
  ├─ types/ # Shared TypeScript types  
  └─ utils/ # Helpers & constants

- Implemented a full dashboard layout:
  - Persistent sidebar & topbar
  - Active route highlighting
  - Scrollable main content area
  - Sticky topbar
  - Responsive sidebar (tablet support)
- Route groups for clean architecture:
  - `(auth)` → authentication pages
  - `(dashboard)` → protected dashboard pages
- Root redirect: `/ → /login`
- UX polish for a real SaaS feel

---

### ✅ Ticket 3 & 4 — Authentication & Role-Based Access Control

- Login flow with **mock JWT authentication**
- Centralized **Auth Context** for user & token state
- Protected routes using a `ProtectedRoute` component
- Role-Based Access Control (RBAC):
  - **Admin** → Full access
  - **Manager** → Limited access
  - **Viewer** → Read-only access
- Sidebar navigation dynamically filtered by user role
- Unauthorized access is blocked or redirected
- Middleware & cookie-based token storage prepared for real APIs

---

### ✅ Ticket 5 — React Query & API Layer Setup

- Configured `QueryClientProvider` at the app root
- Created a reusable `apiClient` abstraction for fetch calls
- Global loading & error handling via `GlobalLoader`
- Mock API endpoints using **Next.js API Routes**
- `useUsers` hook demonstrates server-state fetching with React Query
- No direct `fetch` calls inside components  
  → All server-state handled through **React Query**

---

### ✅ Ticket 6 — Reusable Data Table Component

Create a generic DataTable component supporting pagination, loading, and empty states.

- Table layout & columns config
- Pagination controls
- Loading skeleton
- Empty state UI

---

### ✅ Ticket 7 — Users Module (Admin CRUD)

Implement Users module with full CRUD operations for Admin role.

- Users list page
- Create/Edit user modal
- Delete confirmation
- Mock API integration

---

## ⭐ Recruiter / Portfolio Highlights

- Modern **Next.js App Router** architecture
- Real-world **role-based authentication & permissions**
- Proper **server-state management** using React Query
- Dashboard feels like a real product — not a tutorial
- Clean, modular, and scalable folder organization
- Strong separation of concerns (UI, hooks, services, state)

---

## 🚀 Next Steps

### 🔜 Ticket 8 — Table Search, Filters & Sorting

Enhance DataTable with search, amd filters using query keys.

- Search Input
- Filters
- Query Key strategy

---

## 💡 Notes

- Fully **TypeScript-ready** & production-friendly codebase
- ESLint & Prettier ensure consistent code quality
- Local development server: http://localhost:3000

---
