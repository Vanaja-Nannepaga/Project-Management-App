# Project Management App 🗂️

A full‑stack, enterprise-grade issue tracker built with the **MERN stack**. This app replicates core workflows from tools like Jira, Linear, or Trello, enabling teams to manage bugs, feature requests, and development pipelines using a modern **drag-and-drop Kanban UI**.

---

## 📖 Detailed Description

The Project Management App allows users to manage tasks (tickets) visually using a Kanban board. Tasks move through three key stages: **To Do**, **In Progress**, and **Done**. It supports drag‑and‑drop status updates, editing, and deletion of tickets. Built with a mobile-first responsive design, it's ideal for agile workflows and personal task tracking.

---

## ✅ Features

### Kanban & Task Management
- **Three-stage workflow**: Visualize tasks in "To Do", "In Progress", or "Done".
- **Drag-and-drop**: Rearrange tasks between columns with `react‑beautiful‑dnd`.

### Dashboard & Auth (Frontend)
- **User login**: Upon login (via JWT auth), users land on a dashboard listing their assigned projects.
- **Dashboard features**:
  - Select a project to view its Kanban board.
  - Summary cards showing total tickets and breakdown by status.
- **Kanban board**:
  - Tickets displayed as cards with title, description, priority, and assignee.
  - Edit (via modal) or delete (with confirmation) tickets, updating backend.
  - 💬 Comment icon reserved for upcoming discussion features.

### CRUD Operations
- **Create/Edit tickets**: Fill in details—title, description, status, assignee.
- **Delete tickets**: Confirm before permanently removing.

### Responsive Interface
- Built with **Tailwind CSS** for fluid layouts across devices.
- Columns stack on mobile; side-by-side on desktop.

### Secure Backend
- **JWT-based** authorization on all API requests.
- Tracks ticket operations via REST endpoints.

---

## 🛠 Tech Stack

| Layer       | Technologies |
|-------------|--------------|
| Frontend    | React, Tailwind CSS, react-beautiful-dnd, react-icons |
| Backend     | Node.js, Express, MongoDB (or SQL), Mongoose (or Sequelize), JWT |
| API         | RESTful routes: GET/PUT/DELETE for tickets |
| Authentication | JSON Web Tokens |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v14+), npm
- MongoDB (or other SQL DB) running
- JWT-auth backend supporting:
  - `GET /api/tickets/project/:projectId`
  - `PUT /api/tickets/:ticketId`
  - `DELETE /api/tickets/:ticketId`
  - `/api/auth/login` (for JWT login)

---

## 📥 Clone the Repository

```bash
git clone https://github.com/Vanaja-Nannepaga/Project-Management-App.git
cd Project-Management-App

d Project-Management-App

# Install frontend & backend dependencies
npm install
cd server && npm install
cd ../

# Start backend (from project root)
cd server && npm start

# Start frontend
cd .. && npm start
