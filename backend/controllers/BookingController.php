<?php
class BookingController {
    private PDO $conn;

    public function __construct() {
        $this->conn = (new Database())->connect();
    }

    public function index(): void {
        $sql = "
            SELECT b.*, s.name AS service_name
            FROM bookings b
            LEFT JOIN services s ON b.service_id = s.id
            ORDER BY b.created_at DESC
        ";
        $stmt = $this->conn->query($sql);
        echo json_encode($stmt->fetchAll());
    }

    public function create(): void {
        $data = $this->getBody();

        // Validation
        $required = ['full_name', 'email', 'service_id'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                http_response_code(400);
                echo json_encode(['error' => "Field '{$field}' is required."]);
                return;
            }
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email address.']);
            return;
        }

        $sql = "
            INSERT INTO bookings (full_name, email, phone, service_id, preferred_date, message)
            VALUES (:name, :email, :phone, :service, :date, :message)
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            ':name'    => htmlspecialchars(trim($data['full_name'])),
            ':email'   => trim($data['email']),
            ':phone'   => htmlspecialchars(trim($data['phone']   ?? '')),
            ':service' => (int)$data['service_id'],
            ':date'    => $data['preferred_date'] ?: null,
            ':message' => htmlspecialchars(trim($data['message'] ?? '')),
        ]);

        $id = $this->conn->lastInsertId();
        http_response_code(201);
        echo json_encode(['success' => true, 'id' => $id]);
    }

    public function update(string $id): void {
        $data   = $this->getBody();
        $status = $data['status'] ?? '';

        $allowed = ['pending', 'contacted', 'completed'];
        if (!in_array($status, $allowed)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid status value.']);
            return;
        }

        $stmt = $this->conn->prepare("UPDATE bookings SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $status, ':id' => (int)$id]);

        echo json_encode(['success' => true]);
    }

    public function delete(string $id): void {
        $stmt = $this->conn->prepare("DELETE FROM bookings WHERE id = :id");
        $stmt->execute([':id' => (int)$id]);

        echo json_encode(['success' => true]);
    }

    private function getBody(): array {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}
