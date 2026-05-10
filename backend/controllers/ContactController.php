<?php
class ContactController {
    public function send(): void {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $name    = htmlspecialchars(trim($data['name']    ?? ''));
        $email   = trim($data['email']   ?? '');
        $phone   = htmlspecialchars(trim($data['phone']   ?? ''));
        $subject = htmlspecialchars(trim($data['subject'] ?? 'General Enquiry'));
        $message = htmlspecialchars(trim($data['message'] ?? ''));

        if (!$name || !$email || !$message) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, and message are required.']);
            return;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email address.']);
            return;
        }

        // Send email (configure your mail settings)
        $to      = 'info@phorladen.com';
        $headers = "From: noreply@phorladen.com\r\nReply-To: {$email}\r\nContent-Type: text/html; charset=UTF-8";
        $body    = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone:</strong> {$phone}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>{$message}</p>
        ";

        // mail($to, "Contact: {$subject}", $body, $headers);
        // Uncomment the above line on your live server.
        // On InfinityFree/shared hosting, use SMTP (PHPMailer) for reliable delivery.

        echo json_encode(['success' => true, 'message' => 'Message received.']);
    }
}
