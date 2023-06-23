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
    $id = $data['id'];
    $titre = $data['titre'];

    // Requête de mise à jour de la catégorie
    $query = "UPDATE categories SET titre = :titre WHERE id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindValue(':id', $id);
    $statement->bindValue(':titre', $titre);
    $statement->execute();

    // Conversion en format JSON et envoi de la réponse
    header('Content-Type: application/json');
    echo json_encode('Catégorie mise à jour avec succès');
} catch (PDOException $e) {
    // Gestion des erreurs de connexion à la base de données
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
}
?>

