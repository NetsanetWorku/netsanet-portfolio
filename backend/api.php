<?php
/**
 * Portfolio Backend API
 * Handles contact form submissions, data retrieval, and other backend operations
 */

// Enable CORS for frontend communication
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// API Endpoints
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$route = basename($request_uri);

switch ($route) {
    case 'contact':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            handleContactForm();
        }
        break;
    
    case 'portfolio':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            getPortfolioData();
        }
        break;
    
    case 'projects':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            getProjects();
        }
        break;
    
    case 'skills':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            getSkills();
        }
        break;
    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
        break;
}

/**
 * Handle Contact Form Submissions
 */
function handleContactForm() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (!isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    $name = sanitizeInput($input['name']);
    $email = sanitizeInput($input['email']);
    $message = sanitizeInput($input['message']);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        return;
    }
    
    // Save to database or file
    $contact_data = [
        'name' => $name,
        'email' => $email,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR']
    ];
    
    // Log contact submission (in production, save to database)
    $logFile = 'contact_log.json';
    $contacts = [];
    
    if (file_exists($logFile)) {
        $contacts = json_decode(file_get_contents($logFile), true);
    }
    
    $contacts[] = $contact_data;
    file_put_contents($logFile, json_encode($contacts, JSON_PRETTY_PRINT));
    
    // Send email notification (commented out for demo)
    // sendEmailNotification($name, $email, $message);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully!',
        'data' => $contact_data
    ]);
}

/**
 * Get Portfolio Data
 */
function getPortfolioData() {
    $portfolio = [
        'name' => 'Netsanet Worku',
        'title' => 'Full-Stack Developer',
        'university' => 'Madda Walabu University',
        'year' => 'Third Year',
        'field' => 'Computer Science',
        'bio' => 'Passionate web developer with expertise in HTML, CSS, JavaScript, React, and PHP',
        'location' => 'Asela, Ethiopia',
        'social' => [
            'tiktok' => 'https://tiktok.com/@netsanet.worku',
            'telegram' => 'https://t.me/Abi_yam21',
            'github' => 'https://github.com/NetsanetWorku'
        ]
    ];
    
    echo json_encode($portfolio);
}

/**
 * Get Projects
 */
function getProjects() {
    $projects = [
        [
            'id' => 1,
            'title' => 'Personal Portfolio',
            'description' => 'A modern, responsive portfolio website built with React and Tailwind CSS',
            'technologies' => ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
            'link' => 'https://netsanet.portfolio.com',
            'image' => 'portfolio-project.jpg'
        ],
        [
            'id' => 2,
            'title' => 'E-Commerce Platform',
            'description' => 'Full-stack e-commerce application with payment integration',
            'technologies' => ['React', 'Node.js', 'MongoDB', 'Stripe'],
            'link' => 'https://ecommerce-app.com',
            'image' => 'ecommerce-project.jpg'
        ],
        [
            'id' => 3,
            'title' => 'Task Management App',
            'description' => 'Collaborative task management application with real-time updates',
            'technologies' => ['React', 'Firebase', 'Tailwind CSS'],
            'link' => 'https://task-manager-app.com',
            'image' => 'task-app.jpg'
        ]
    ];
    
    echo json_encode($projects);
}

/**
 * Get Skills
 */
function getSkills() {
    $skills = [
        'Frontend' => ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'SCSS'],
        'Backend' => ['PHP', 'Node.js', 'Express', 'REST APIs'],
        'Database' => ['MySQL', 'MongoDB', 'Firebase'],
        'Tools' => ['Git', 'Docker', 'Vite', 'Webpack', 'npm', 'Yarn']
    ];
    
    echo json_encode($skills);
}

/**
 * Sanitize Input
 */
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Send Email Notification (Optional)
 */
function sendEmailNotification($name, $email, $message) {
    $to = 'netsanet@email.com';
    $subject = "New Contact Form Submission from {$name}";
    $body = "Name: {$name}\nEmail: {$email}\nMessage:\n{$message}";
    
    $headers = "From: {$email}\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    
    mail($to, $subject, $body, $headers);
}

?>
