SET search_path TO ToutFrais;

INSERT INTO 
    ToutFrais.Client (nomclient, prenomclient, adressecourrielclient, rueclient, villeclient, codepostalclient)
VALUES
    ('Musk', 'Elon', 'elon.musk@mail.com', 'Main Street', 'Houston', '77002'),
    ('West', 'Kanye', 'ye@mail.com', 'Michigan Avenue', 'Montreal', 'H1Z 3R5'),
    ('Bezos', 'Jeff', 'jeff.bezos@mail.com', 'Pennsylvania Avenue', 'Washington DC', '20001');

INSERT INTO
    ToutFrais.Fournisseur (nomfournisseur, adressefournisseur)
VALUES
    ('QC Transport', '978 ARGYLE ST N HALIFAX NS B3J 2B3'),
    ('Benjamin', '775 RUE ONTARIO OUEST MONTREAL QC H2X 1Y8'),
    ('AB Transport', '423 GALTS AVE RED DEER AB T4N 2A6'),
    ('MN Transport', '2688 ST MARYS RD WINNIPEG MN R3C 0C4'),
    (NULL, '2258 ORENDA RD BRAMPTON ON L6W 1Z2'),
    (NULL, '3789 CARLING AVENUE OTTAWA ON K1Z 7B5');

INSERT INTO
    ToutFrais.Planrepas (categorie, frequence, nbpersonnes, nbcalories, prix, numerofournisseur)
VALUES 
    ('Cetogene', 4, 5, 3000, 23.50, 1),
    ('Vegan', 3, 8, 2300, 34.00, 2),
    ('Cetogene', 10, 2, 2000, 45.50, 3),
    ('Chinois', 3, 7, 4500, 50.25, 1),
    ('Crudites', 2, 10, 2000, 50, 4),
    ('Fast Food', 25, 4, 5000, 18.99, 2);

INSERT INTO
    ToutFrais.Abonner (numeroclient, numeroplan, duree)
VALUES
    (1, 1, 23),
    (2, 2, 48),
    (3, 6, 90);

INSERT INTO 
    ToutFrais.Telephone (numeroclient, numerodetelephone)
VALUES
    (1, '+1-613-555-0141'),
    (2, '+1613-555-0506'),
    (3, '+1-418-555-0173');

INSERT INTO ToutFrais.Famille (numeroplan) VALUES (1), (4);

INSERT INTO
    ToutFrais.Vegetarien (numeroplan, typederepas)
VALUES
    (2, 'Spaghettis'),
    (5, 'Salade de fruits et legumes');

INSERT INTO
    ToutFrais.Pescetarien (numeroplan, typepoisson)
VALUES
    (4, 'Sushi'),
    (5, 'Saumon');

INSERT INTO
    ToutFrais.Rapide (numeroplan, tempsdepreparation)
VALUES
    (1, 15),
    (4, 10);

INSERT INTO
    ToutFrais.Facile (numeroplan, nbringredients)
VALUES
    (1, 5),
    (4, 3);

INSERT INTO
    ToutFrais.Kitrepas (numeroplan, description)
VALUES
    (1, 'De la confiture d’oignons dans les galettes de viande, et encore dans la garniture ? Ça double le plaisir. Le chou, éveillé par un peu de vinaigre de vin rouge, apporte du croquant et de la couleur grâce à son mauve vibrant. On privilégie un fromage à croûte lavée puisqu’il fond bien à la chaleur.'),
    (2, 'Les carottes volent la vedette dans cette proposition présentée sur notre page couverture. Grâce à leurs fanes en partie conservées, elles mettent en relief l’aspect frais et l’esprit « anti-gaspi » de cette recette. ');

INSERT INTO
    ToutFrais.Image (numerokitrepas, donnees)
VALUES
    (1, '0xA5144B43EE53CA6D8A7E5150D101DD30'),
    (2, '0xA3E2B682DCAAB487E1C757A728086E55');

INSERT INTO
    ToutFrais.Ingredient (nomingredient, paysingredient)
VALUES
    ('Ail', 'Canada'),
    ('Oignon', 'Allemagne'),
    ('Sel', 'Cameroun');

INSERT INTO
    ToutFrais.Contenir (numerokitrepas, numeroingredient)
VALUES
    (1, 1),
    (2, 3);

INSERT INTO
    ToutFrais.Etape (numerokitrepas, descriptionetape, dureeetape, numerokitrepasetrecomposede)
VALUES
    (1, 'Placer la grille dans le bas du four. Préchauffer le four à 200°C (400°F). Tapisser une plaque de cuisson de papier parchemin.', 2, 1),
    (2, 'Cuire au four environ 20minutes ou jusqu’à ce que le fromage soit doré. Laisser tiédir. Couper et servir à l’apéritif.', 10, 2);
