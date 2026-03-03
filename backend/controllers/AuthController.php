<?php
class AuthController {
    private PDO $conn;

    public function __construct() {
        $this->conn = (new Database())->connect();
    }

    public function login(): void {
        $data = $this->getBody();
        $username = trim($data['username'] ?? '');
        $password = $data['password'] ?? '';

        if (!$username || !$password) {
            http_response_code(400);
            echo json_encode(['error' => 'Username and password are required.']);
            return;
        }

        $stmt = $this->conn->prepare("SELECT * FROM admins WHERE username = :u LIMIT 1");
        $stmt->execute([':u' => $username]);
        $admin = $stmt->fetch();

        if (!$admin || !password_verify($password, $admin['password'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials.']);
            return;
        }

        $_SESSION['admin_id']       = $admin['id'];
        $_SESSION['admin_username'] = $admin['username'];

        echo json_encode([
            'success' => true,
            'admin'   => ['id' => $admin['id'], 'username' => $admin['username']],
        ]);
    }

    public function logout(): void {
        session_destroy();
        echo json_encode(['success' => true]);
    }

    public function me(): void {
        if (empty($_SESSION['admin_id'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Not authenticated.']);
            return;
        }
        echo json_encode([
            'id'       => $_SESSION['admin_id'],
            'username' => $_SESSION['admin_username'],
        ]);
    }

    private function getBody(): array {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}
