<?php
session_start();

// Database connection (you would need to replace these with your actual database details)
$servername = "localhost";
$username = "your_db_username";
$password = "your_db_password";
$dbname = "your_db_name";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to show/hide sections
function showSection($id) {
    // In a real scenario, this would manipulate the DOM via AJAX or redirect to another page
    echo "<script>document.getElementById('$id').style.display = 'block';</script>";
    $sections = ['home', 'about', 'services', 'application', 'contact', 'universities', 'faq'];
    foreach ($sections as $section) {
        if ($section !== $id) {
            echo "<script>document.getElementById('$section').style.display = 'none';</script>";
        }
    }
}

// Simulating chat bot functionality
function sendMessage($message) {
    $botResponse = "Bu konuda size nasıl yardımcı olabilirim?";
    echo "<div class='message user-message'>$message</div>";
    echo "<div class='message bot-message'>$botResponse</div>";
}

// Handling form submissions
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['submit_application'])) {
        // Handle application form submission
        $name = $_POST['name'];
        $email = $_POST['email'];
        $university = $_POST['university'];
        $message = $_POST['message'];
        
        // Here you would insert this data into your database
        $stmt = $conn->prepare("INSERT INTO Users (name, email, university_preference) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $university);
        $stmt->execute();
        $stmt->close();
        
        echo "Thank you for your application, $name!";
    } elseif (isset($_POST['appointment'])) {
        // Handle appointment form submission
        $name = $_POST['name'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        
        // Insert into appointments table
        $stmt = $conn->prepare("INSERT INTO Appointments (user_name, appointment_date, appointment_time) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $date, $time);
        $stmt->execute();
        $stmt->close();
        
        echo "Appointment set for $name on $date at $time.";
    }
}

// Function to fetch and display student reviews
function displayReviews($conn) {
    $sql = "SELECT student_name, comment, image_url FROM StudentReviews";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<div class='comment-card'>
                    <img src='{$row['image_url']}' alt='{$row['student_name']}'>
                    <h3>{$row['student_name']}</h3>
                    <p>{$row['comment']}</p>
                  </div>";
        }
    } else {
        echo "No reviews available.";
    }
}

// Start of HTML output
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tkm Acente</title>
    <link rel="stylesheet" href="styles.css">
    <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    <script>
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'tr'}, 'google_translate_element');
        }
        // JavaScript for section visibility and chatbot
        function showSection(id) {
            // ... your JavaScript here for showing sections
        }
        function sendMessage(event) {
            // ... your JavaScript here for handling chatbot messages
        }
        function openChatbot() {
            document.getElementById('chatbot').style.display = 'block';
        }
        function closeChatbot() {
            document.getElementById('chatbot').style.display = 'none';
        }
        // ... other JavaScript functions
    </script>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="javascript:void(0);" onclick="showSection('home')">Anasayfa</a></li>
                <!-- ... other navigation items -->
            </ul>
        </nav>
    </header>

    <main>
        <!-- Home, About, Services, FAQ, etc. sections would go here -->
        <section id="home">
            <!-- Your home section content -->
        </section>
        <!-- ... other sections -->

        <section id="application">
            <h2>Başvuru Formu</h2>
            <form action="" method="post">
                <label for="name">Adınız:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">E-posta:</label>
                <input type="email" id="email" name="email" required>
                
                <label for="university">Tercih Edilen Üniversite:</label>
                <input type="text" id="university" name="university">
                
                <label for="message">Mesajınız:</label>
                <textarea id="message" name="message"></textarea>
                
                <button type="submit" name="submit_application">Gönder</button>
            </form>
        </section>

        <section id="student-reviews">
            <h1>Öğrenci Yorumları</h1>
            <?php displayReviews($conn); ?>
        </section>

        <section id="appointment">
            <h1>Randevu Sistemi</h1>
            <div class="form-container">
                <form id="appointmentForm" action="" method="post">
                    <div class="form-group">
                        <label for="name">Adınız Soyadınız:</label>
                        <input type="text" id="name" name="name" placeholder="Adınızı ve Soyadınızı girin" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="date">Randevu Tarihi:</label>
                        <input type="date" id="date" name="date" required>
                    </div>

                    <div class="form-group">
                        <label for="time">Randevu Saati:</label>
                        <input type="time" id="time" name="time" required>
                    </div>

                    <button type="submit" name="appointment">Randevu Al</button>
                </form>
            </div>
        </section>

        <!-- Chatbot -->
        <div id="chatbot" style="display:none;">
            <div id="chatbot-header">
                <span>Chatbot</span>
                <button onclick="closeChatbot()">X</button>
            </div>
            <div id="chatbot-messages"></div>
            <div id="chatbot-input-container">
                <input type="text" id="user-input" placeholder="Mesajınızı yazın..." onkeypress="sendMessage(event)">
                <button onclick="sendMessage(event)">Gönder</button>
            </div>
        </div>
        <button id="open-chatbot-btn" onclick="openChatbot()">Chatbot'u Aç</button>

        <!-- Working Hours, map, etc. would go here -->
    </main>
    <footer>
        <p>Web Sitemiz, 7 gün 24 saat hizmetinizde!</p>
    </footer>
</body>
</html>

<?php
$conn->close();
?>