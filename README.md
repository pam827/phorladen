# Phorladen Global Services — Full Stack Web Platform

A complete lead-generation and service request management platform built with **React + PHP + MySQL**.

---

## 📁 Project Structure

```
phorladen/
├── frontend/          ← React SPA (Vite)
│   ├── src/
│   │   ├── components/   Navbar, Footer, ServiceCard, ProtectedRoute
│   │   ├── pages/        Home, Services, ServiceDetail, Booking, Contact
│   │   ├── pages/admin/  Login, Dashboard
│   │   ├── services/     api.js (Axios)
│   │   └── context/      AuthContext.jsx
│   └── ...
└── backend/           ← PHP REST API
    ├── config/           database.php, cors.php
    ├── controllers/      Auth, Service, Booking, Contact
    ├── middleware/        auth.php (session guard)
    ├── index.php         Router
    └── database.sql      Schema + seed data
```

---

## ⚡ Quick Setup

### 1. Database
1. Open **phpMyAdmin**
2. Import or paste `backend/database.sql`
3. This creates the `phorladen` database with all tables and seed data

### 2. Backend
1. Copy the `backend/` folder into your web server root:
   - **XAMPP**: `C:/xampp/htdocs/phorladen/backend/`
   - **InfinityFree**: Upload to `htdocs/backend/`
2. Edit `backend/config/database.php` with your credentials:
   ```php
   private $host = "localhost";
   private $db   = "phorladen";
   private $user = "your_db_user";
   private $pass = "your_db_password";
   ```
3. Update `backend/config/cors.php` with your production domain

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev          # Development
npm run build        # Production build → dist/
```

### 4. Deploy (InfinityFree)
```bash
npm run build        # Creates dist/ folder
```
- Upload `dist/` contents to `htdocs/` (your public folder)
- Upload `backend/` to `htdocs/backend/`
- The `.htaccess` files handle URL routing automatically

---

## 🔐 Admin Access

Default credentials (change immediately!):
- **Username**: `admin`
- **Password**: `password`

**To set a secure password:**
```php
// Run in PHP CLI or a temporary PHP file:
echo password_hash('YourSecurePassword123!', PASSWORD_BCRYPT);
// Copy the output, then run in MySQL:
// UPDATE admins SET password='<hash>' WHERE username='admin';
```

Admin dashboard: `/admin/dashboard`

---

## 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/login` | — | Admin login |
| POST | `/logout` | — | Admin logout |
| GET | `/me` | — | Check auth status |
| GET | `/services` | — | List all services |
| GET | `/services/{slug}` | — | Get service by slug |
| PUT | `/services/{id}` | ✅ Admin | Update service |
| POST | `/bookings` | — | Submit booking |
| GET | `/bookings` | ✅ Admin | List all bookings |
| PUT | `/bookings/{id}` | ✅ Admin | Update booking status |
| DELETE | `/bookings/{id}` | ✅ Admin | Delete booking |
| POST | `/contact` | — | Submit contact form |

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| HTTP Client | Axios |
| Styling | Vanilla CSS (design system in `index.css`) |
| Backend | Pure PHP 8+ (no framework) |
| Database | MySQL via PDO |
| Auth | PHP sessions (shared hosting compatible) |
| Deployment | InfinityFree / any shared hosting |

---

## 🔒 Security Features
- PDO prepared statements (SQL injection prevention)
- Input sanitization with `htmlspecialchars()`
- Email validation with `filter_var()`
- Session-based admin authentication with `password_verify()`
- CORS restricted to allowed origins
- Error display disabled in production

---

## 🚀 Services Included
1. **Courier & Cargo** — Domestic & international shipments
2. **Travel Reservation** — Flights, visas, travel planning
3. **Hotel Reservation** — Global property bookings
4. **Aircraft Charter** — Private jet and cargo charter
5. **General Logistics** — Supply chain & 3PL solutions

---

## 📞 Support
Update contact details in:
- `Footer.jsx` — address, phone, email
- `Contact.jsx` — contact info section  
- `ServiceDetail.jsx` — sidebar contact info
- `ContactController.php` — email recipient (`$to`)
