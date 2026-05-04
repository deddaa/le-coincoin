CREATE DATABASE IF NOT EXISTS le_coincoin
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE le_coincoin;

CREATE TABLE users (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(50)  NOT NULL UNIQUE,
    username   VARCHAR(25)  NOT NULL UNIQUE,
    password   VARCHAR(50)  NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE annonces (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     INT UNSIGNED NOT NULL,
    category_id INT UNSIGNED,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_url   VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_annonces_user     FOREIGN KEY (user_id)     REFERENCES users (id)      ON DELETE CASCADE,
    CONSTRAINT fk_annonces_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
);

CREATE TABLE messages (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sender_id   INT UNSIGNED NOT NULL,
    receiver_id INT UNSIGNED NOT NULL,
    annonces_id INT UNSIGNED,
    message     VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_messages_sender   FOREIGN KEY (sender_id)   REFERENCES users (id)    ON DELETE CASCADE,
    CONSTRAINT fk_messages_receiver FOREIGN KEY (receiver_id) REFERENCES users (id)    ON DELETE CASCADE,
    CONSTRAINT fk_messages_annonce  FOREIGN KEY (annonces_id) REFERENCES annonces (id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    user_id     INT UNSIGNED NOT NULL,
    annonces_id INT UNSIGNED NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, annonces_id),
    CONSTRAINT fk_favorites_user    FOREIGN KEY (user_id)     REFERENCES users (id)    ON DELETE CASCADE,
    CONSTRAINT fk_favorites_annonce FOREIGN KEY (annonces_id) REFERENCES annonces (id) ON DELETE CASCADE
);





-- Utilisateurs
INSERT INTO users (email, username, password) VALUES
    ('alice@mail.com',  'alice31',    'password'),
    ('bob@mail.com',    'bob_dupont', 'password'),
    ('claire@mail.com', 'claire_v',   'password');

-- Catégories
INSERT INTO categories (name) VALUES
    ('Véhicules'),
    ('Immobilier'),
    ('Électronique'),
    ('Maison & Jardin'),
    ('Mode & Accessoires'),
    ('Loisirs & Jeux'),
    ('Emploi'),
    ('Services');

-- Annonces
INSERT INTO annonces (user_id, category_id, name, description, image_url) VALUES
    (1, 1, 'Renault Clio 2018 essence',     'Très bon état, 45 000 km, première main, CT ok.',          'https://example.com/images/clio.jpg'),
    (1, 3, 'iPhone 13 Pro 256 Go',          'Vendu avec boîte et accessoires d''origine, sans rayure.', 'https://example.com/images/iphone13.jpg'),
    (2, 4, 'Canapé 3 places en tissu gris', 'Acheté en 2022, très peu utilisé, non-fumeur.',            'https://example.com/images/canape.jpg'),
    (2, 6, 'Vélo de montagne Decathlon',    'VTT 27 pouces, 21 vitesses, freins à disque.',             'https://example.com/images/vtt.jpg'),
    (3, 5, 'Veste en cuir femme taille M',  'Couleur noir, portée 2 fois, comme neuve.',                'https://example.com/images/veste.jpg'),
    (3, 3, 'MacBook Pro M1 13"',            '8 Go RAM, 256 Go SSD, chargeur inclus, batterie 97%.',     'https://example.com/images/macbook.jpg'),
    (1, 2, 'Studio meublé Paris 11e',       '25 m², calme, lumineux, disponible de suite.',             'https://example.com/images/studio.jpg'),
    (2, 4, 'Tondeuse à gazon Bosch',        'Électrique, 32 cm de coupe, bac ramasseur inclus.',        'https://example.com/images/tondeuse.jpg'),
    (3, 1, 'Scooter Yamaha 125cc 2020',     '8 000 km, entretenu en concession, vendu avec top case.',  'https://example.com/images/scooter.jpg'),
    (1, 6, 'Console PS5 + 2 manettes',      'Pack complet avec 3 jeux, parfait état.',                  'https://example.com/images/ps5.jpg');