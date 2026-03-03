<?php
class ServiceController {
    private PDO $conn;

    public function __construct() {
        $this->conn = (new Database())->connect();
    }

    public function index(): void {
        $stmt = $this->conn->query("SELECT * FROM services ORDER BY id ASC");
        echo json_encode($stmt->fetchAll());
    }

    public function show(string $slug): void {
        $stmt = $this->conn->prepare("SELECT * FROM services WHERE slug = :slug LIMIT 1");
        $stmt->execute([':slug' => $slug]);
        $service = $stmt->fetch();

        if (!$service) {
            http_response_code(404);
            echo json_encode(['error' => 'Service not found.']);
            return;
        }
        echo json_encode($service);
    }

    public function update(string $id): void {
        $data = $this->getBody();
        $name        = trim($data['name']        ?? '');
        $description = trim($data['description'] ?? '');

        if (!$name) {
            http_response_code(400);
            echo json_encode(['error' => 'Name is required.']);
            return;
        }

        $stmt = $this->conn->prepare(
            "UPDATE services SET name = :name, description = :desc WHERE id = :id"
        );
        $stmt->execute([':name' => $name, ':desc' => $description, ':id' => (int)$id]);

        echo json_encode(['success' => true]);
    }

    private function getBody(): array {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}
