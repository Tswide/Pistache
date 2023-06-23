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

    // Requête pour récupérer toutes les catégories
    $query = "SELECT * FROM categories";
    $statement = $pdo->query($query);
    $categories = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Conversion en format JSON et envoi de la réponse
    header('Content-Type: application/json');
    echo json_encode($categories);
} catch (PDOException $e) {
    // Gestion des erreurs de connexion à la base de données
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
}
?>
