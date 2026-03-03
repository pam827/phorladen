-- ============================================================
-- PHORLADEN GLOBAL SERVICES — Database Setup
-- Run this in phpMyAdmin or MySQL CLI
-- ============================================================

CREATE DATABASE IF NOT EXISTS phorladen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE phorladen;

-- ── ADMINS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(100) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── SERVICES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    slug        VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── BOOKINGS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    full_name      VARCHAR(255) NOT NULL,
    email          VARCHAR(255) NOT NULL,
    phone          VARCHAR(50),
    service_id     INT,
    preferred_date DATE,
    message        TEXT,
    status         ENUM('pending','contacted','completed') DEFAULT 'pending',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Admin account: username=admin | password=admin123
-- (Change password immediately after setup!)
INSERT INTO admins (username, password) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
-- The hash above is for "password" — use the PHP snippet below to generate your own:
-- echo password_hash('YourSecurePassword123!', PASSWORD_BCRYPT);

-- Services seed
INSERT INTO services (name, slug, description) VALUES
(
    'Courier & Cargo',
    'courier-cargo',
    'Phorladen''s Courier & Cargo service provides end-to-end delivery solutions for individuals and businesses. Whether you are shipping documents, parcels, or bulk freight, we guarantee safe, timely, and cost-effective delivery across Nigeria and internationally. Our network spans 50+ countries with real-time tracking and full insurance coverage.'
),
(
    'Travel Reservation',
    'travel-reservation',
    'Our Travel Reservation service offers bespoke travel planning for business executives, families, and groups. We handle everything from flight bookings and visa arrangements to ground transportation and travel insurance. With access to hundreds of airlines and exclusive fares, we find the best options for your budget and schedule.'
),
(
    'Hotel Reservation',
    'hotel-reservation',
    'Experience seamless hotel booking through Phorladen''s Hotel Reservation service. We partner with over 5,000 properties worldwide — from budget-friendly business hotels to ultra-luxury five-star resorts. Corporate rates, complimentary upgrades, and special amenities are available for our valued clients.'
),
(
    'Aircraft Charter',
    'aircraft-charter',
    'Phorladen''s Aircraft Charter service provides private and semi-private air travel solutions for executives, corporate groups, and time-sensitive cargo. Fly on your schedule, not the airline''s. We offer light, mid-size, and heavy jets with full in-flight concierge services and flexible routing.'
),
(
    'General Logistics',
    'general-logistics',
    'Our General Logistics division manages complex supply chains with precision. From warehousing and inventory management to last-mile delivery and distribution planning, we optimize your entire logistics operation. Our certified team handles import/export documentation, customs clearance, and third-party logistics (3PL) solutions.'
);

-- ============================================================
-- GENERATE A SECURE ADMIN PASSWORD (run in PHP CLI)
-- ============================================================
-- php -r "echo password_hash('YourPassword123!', PASSWORD_BCRYPT);"
-- Then UPDATE admins SET password='<hash>' WHERE username='admin';
-- ============================================================
