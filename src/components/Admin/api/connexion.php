<?php

// Connexion à la base de données
// Assurez-vous de configurer les informations de connexion appropriées
$host = 'localhost';
$dbname = 'pistaches';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Récupération des données envoyées depuis le formulaire
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Requête de vérification des informations d'identification
        $query = "SELECT * FROM users WHERE email = :email";
        $statement = $pdo->prepare($query);
        $statement->bindValue(':email', $email);
        $statement->execute();
        $user = $statement->fetch(PDO::FETCH_ASSOC);

        // Vérification du mot de passe
        if ($user && password_verify($password, $user['password'])) {
            // Authentification réussie
            $response = array(
                'success' => true,
                'message' => 'Authentification réussie'
            );
        } else {
            // Authentification échouée
            $response = array(
                'success' => false,
                'message' => 'Identifiants invalides'
            );
        }

        // Renvoyer la réponse au format JSON
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
} catch (PDOException $e) {
    // Gestion des erreurs de connexion à la base de données
    $response = array(
        'success' => false,
        'message' => 'Erreur de connexion à la base de données : ' . $e->getMessage()
    );

    // Renvoyer la réponse au format JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}
