CREATE DATABASE IF NOT EXISTS le_coincoin CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_unicode_ci;

USE le_coincoin;

CREATE TABLE
    users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(191) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    annonces (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_annonces_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

CREATE TABLE
    messages (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        sender_id INT UNSIGNED NOT NULL,
        receiver_id INT UNSIGNED NOT NULL,
        annonces_id INT UNSIGNED,
        message VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT fk_messages_receiver FOREIGN KEY (receiver_id) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT fk_messages_annonce FOREIGN KEY (annonces_id) REFERENCES annonces (id) ON DELETE CASCADE
    );