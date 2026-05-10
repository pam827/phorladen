<?php
class Database {
    private $host = "localhost";
    private $db   = "phorladen";
    private $user = "root";
    private $pass = "";

    public function connect(): PDO {
        $dsn = "mysql:host={$this->host};dbname={$this->db};charset=utf8mb4";
        $pdo = new PDO($dsn, $this->user, $this->pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,            PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES,   false);
        return $pdo;
    }
}
