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

    // Récupération des données envoyées depuis le formulaire
    $data = json_decode(file_get_contents('php://input'), true);
    $titre = $data['titre'];

    // Requête d'insertion d'une nouvelle catégorie
    $query = "INSERT INTO categories (titre) VALUES (:titre)";
    $statement = $pdo->prepare($query);
    $statement->bindValue(':titre', $titre);
    $statement->execute();

    // Récupération de l'ID de la nouvelle catégorie
    $categorieId = $pdo->lastInsertId();

    // Construction de l'objet catégorie avec l'ID généré
    $categorie = [
        'id' => $categorieId,
        'titre' => $titre
    ];

    // Conversion en format JSON et envoi de la réponse
    header('Content-Type: application/json');
    echo json_encode($categorie);
} catch (PDOException $e) {
    // Gestion des erreurs de connexion à la base de données
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
}
?>
