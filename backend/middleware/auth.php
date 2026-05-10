<?php
session_start();

function requireAdmin(): void {
    if (empty($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized. Please log in.']);
        exit;
    }
}

function isAdmin(): bool {
    return !empty($_SESSION['admin_id']);
}
