# 🌍 TravelMania

TravelMania is a full-stack web application designed for travel enthusiasts to explore destinations, book adventure gear, and plan their escapes. It features a robust role-based system (Admin, Seller, Traveler), an interactive geographical shop map, an integrated AI travel bot, and a fully functional e-commerce store.

---

## ✨ Features

### 🔐 Authentication & Security
* **JWT (JSON Web Tokens):** Secure, stateless authentication.
* **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for `ADMIN`, `SELLER`, and `TRAVELER`.
* **Google OAuth2 Integration:** Users can sign up and log in quickly using their Google accounts.
* **Encrypted Passwords:** BCrypt password hashing handled securely by Spring Boot.

### 🗺️ Interactive Map & Spatial Data
* **PostGIS Integration:** Backend uses Hibernate Spatial to store exact geographical coordinates for physical shops.
* **Leaflet Maps:** Frontend renders interactive maps allowing users to discover nearby gear shops and travel locations.

### 🛒 E-Commerce & Booking
* **Dynamic Cart Context:** React Context API manages user shopping carts across the application.
* **Seller Dashboard:** Sellers can manage their inventory, view sales history, and handle rentals.
* **Checkout System:** Seamless product purchasing and order tracking.

### 🤖 AI Integration
* **Botpress Travel Assistant:** A built-in AI chatbot available on the homepage to help users "Plan Their Escape" instantly.

### 🛡️ Admin Control Center
* Dedicated secure dashboard for Admins to view registered users, manage roles, and delete accounts.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Routing:** React Router DOM
* **State Management:** React Context API
* **Mapping:** Leaflet & React-Leaflet
* **Styling:** Custom CSS with responsive layouts
* **Bot Integration:** Botpress Webchat

### Backend
* **Framework:** Spring Boot (Java)
* **Security:** Spring Security & JWT Auth
* **ORM:** Hibernate & Spring Data JPA
* **Database:** PostgreSQL
* **Spatial Extension:** PostGIS (Hibernate Spatial)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18+ recommended)
* **Java JDK** (v17 or higher)
* **PostgreSQL** with the **PostGIS** extension installed (or a cloud DB like Neon.tech).
* **Maven** (Included via `mvnw` wrapper in the project).

### 1. Backend Setup (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd backend
