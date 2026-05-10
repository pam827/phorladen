<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once 'config/cors.php';
require_once 'config/database.php';
require_once 'middleware/auth.php';
require_once 'controllers/AuthController.php';
require_once 'controllers/ServiceController.php';
require_once 'controllers/BookingController.php';
require_once 'controllers/ContactController.php';

// Get request path
$requestUri  = $_SERVER['REQUEST_URI'];
$scriptName  = dirname($_SERVER['SCRIPT_NAME']);
$path        = str_replace($scriptName, '', parse_url($requestUri, PHP_URL_PATH));
$path        = '/' . trim($path, '/');
$method      = $_SERVER['REQUEST_METHOD'];

// Route matching
function route($method, $pattern, $callback) {
    global $path;
    $regex = preg_replace('/\{[^}]+\}/', '([^/]+)', $pattern);
    $regex = '@^' . $regex . '$@';
    if ($_SERVER['REQUEST_METHOD'] === $method && preg_match($regex, $path, $matches)) {
        array_shift($matches);
        call_user_func_array($callback, $matches);
        exit;
    }
}

// ── AUTH ──────────────────────────────────────────────────
route('POST', '/login',  function() {
    (new AuthController())->login();
});
route('POST', '/logout', function() {
    (new AuthController())->logout();
});
route('GET',  '/me',     function() {
    (new AuthController())->me();
});

// ── SERVICES ──────────────────────────────────────────────
route('GET',  '/services',      function() {
    (new ServiceController())->index();
});
route('GET',  '/services/{slug}', function($slug) {
    (new ServiceController())->show($slug);
});
route('PUT',  '/services/{id}', function($id) {
    requireAdmin();
    (new ServiceController())->update($id);
});

// ── BOOKINGS ──────────────────────────────────────────────
route('POST', '/bookings', function() {
    (new BookingController())->create();
});
route('GET',  '/bookings', function() {
    requireAdmin();
    (new BookingController())->index();
});
route('PUT',  '/bookings/{id}', function($id) {
    requireAdmin();
    (new BookingController())->update($id);
});
route('DELETE', '/bookings/{id}', function($id) {
    requireAdmin();
    (new BookingController())->delete($id);
});

// ── CONTACT ───────────────────────────────────────────────
route('POST', '/contact', function() {
    (new ContactController())->send();
});

// ── 404 ───────────────────────────────────────────────────
http_response_code(404);
echo json_encode(['error' => 'Route not found', 'path' => $path]);
