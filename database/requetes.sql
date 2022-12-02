-- Question 4 - Requêtes SQL.

/* 4.1  Numéros (numéroclient) et les noms (nomclient) des clients qui ont commandé un repas 
avec un prix compris entre 20 dollars et 40 dollars
*/
SELECT C.numeroclient, C.nomclient
FROM Client C, Abonner A
WHERE 
    C.numeroclient = A.numeroclient AND
    C.numeroclient IN (
        SELECT numeroclient
        FROM Abonner A, Planrepas P
        WHERE 
            A.numeroplan = P.numeroplan AND
            P.prix BETWEEN 20 AND 40
);


/* 4.2 Numéros des plans repas (numéroplan) qui ne proviennent pas du fournisseur au nom de 
'QC Transport'
*/
SELECT numeroplan
FROM Fournisseur F, Planrepas P
WHERE 
    F.numerofournisseur = P.numerofournisseur AND 
    F.nomfournisseur <> 'QC Transport';


/* 4.3 Liste des numéros des plans Famille (numéroplan) dont la catégorie du plan repas 
correspond à 'cétogène'
*/
SELECT F.numeroplan
FROM Famille F, Planrepas P
WHERE 
	F.numeroplan = P.numeroplan AND
	P.categorie = 'Cetogene';


/* 4.4 Nombre de fournisseurs n’ayant pas de nom dans leur dossier (la valeur de nomfournisseur
est NULL)
*/
SELECT COUNT(*) AS NbFournisseursSansNom
FROM Fournisseur
WHERE nomfournisseur IS NULL;


/* 4.5 Noms des fournisseurs (nomfournisseur) ayant fait des livraisons de plans repas dont le 
montant est supérieur aux livraisons faites par le fournisseur dont le nom est 'AB Transport'.
*/
SELECT SUM(prix), numerofournisseur
FROM Planrepas
GROUP BY (numerofournisseur)
HAVING SUM(prix) > (SELECT SUM(prix)
FROM Planrepas P, Fournisseur F
WHERE 
    P.numerofournisseur = F.numerofournisseur AND
    F.nomfournisseur = 'AB Transport');


/* 4.6 Noms des fournisseurs (nomfournisseur), adresses (adressefournisseur) et montant 
total des prix des livraisons de plans repas des fournisseurs ayant les deux plus larges montants de livraison 
sur la plateforme
*/
SELECT F.nomfournisseur, F.adressefournisseur, SUM(prix) AS montanttotal
FROM Fournisseur F, Planrepas P
WHERE F.numerofournisseur = P.numerofournisseur
GROUP BY nomfournisseur, adressefournisseur
ORDER BY montanttotal DESC
LIMIT 2;


/*  4.7 Nombre de kit repas n’ayant jamais été réservés chez les fournisseurs */
SELECT COUNT(numerokitrepas)
FROM Kitrepas
WHERE numerokitrepas NOT IN
(
    SELECT K.numerokitrepas
    FROM Kitrepas K, Planrepas P, Fournisseur F
    WHERE K.numeroplan = P.numeroplan
    AND P.numerofournisseur = F.numerofournisseur
);


/* 4.8 Numéros (numéroclient), noms (nomclient) et prénoms (prénomclient) des clients
dont le prénom ne commence pas par une voyelle (en majuscule ou en minuscule) et habitant    
(villeclient) à la même adresse (adressefournisseur) que le fournisseur 'Benjamin'. Ordonnez ces clients
alphabétiquement selon le nom.
*/
SELECT numeroclient, nomclient, prenomclient
FROM Client, Fournisseur
WHERE 
	prenomclient NOT SIMILAR TO '[aeiouyAEIOUY]%' AND
	nomfournisseur = 'Benjamin' AND
	adressefournisseur ILIKE '%' || villeclient || '%'
ORDER BY nomclient;


/* 4.9 Pays des ingrédients (paysingrédient) et nombre d’ingrédients par pays dont le 
(paysingrédient) ne contient pas la lettre 'g' à la troisième position de la fin; triés par ordre décroissant selon 
le pays de l’ingrédient (paysingrédient).
*/
SELECT paysingredient, COUNT(numeroingredient) AS nombreingredients
FROM Ingredient
WHERE paysingredient NOT LIKE '%g__'
GROUP BY paysingredient
ORDER BY paysingredient DESC;


/* 4.10 Créez une vue 'V_fournisseur' contenant la catégorie du plan repas 'V_catégorie', l’adresse du
fournisseur 'V_adresse' et le total des prix de tous les plans repas desservis par ce fournisseur 'V_tot'. Cette 
vue doit uniquement contenir les fournisseurs dont V_tot est supérieur à 12 500$ et dont le nom de la 
catégorie du plan repas contient la lettre 'e' et la lettre 'o' à la troisième position de la fin; triés par ordre 
croissant selon le nom de la catégorie du plan repas et par ordre décroissant selon 'V_tot'. Finalement, 
afficher le résultat de cette vue.
*/

-- CREATE OR REPLACE VIEW V_fournisseur AS 
--     SELECT 
--         P.categorie AS V_catégorie,
--         F.adressefournisseur AS V_adresse,
--         SUM(P.prix) AS V_tot
-- FROM Fournisseur F, Planrepas P 
-- WHERE
--     categorie LIKE '%e%'
--     AND categorie LIKE '%o__'
-- GROUP BY F.numerofournisseur
-- HAVING SUM(P.prix) > 12500 
-- ORDER BY categorie, V_tot ASC;

CREATE OR REPLACE VIEW V_fournisseur AS 
    SELECT 
        P.categorie AS V_catégorie,
        F.adressefournisseur AS V_adresse,
        SUM(P.prix) AS V_tot
	FROM
        Fournisseur F, Planrepas P 
	WHERE
		F.numerofournisseur = P.numerofournisseur AND
		P.categorie LIKE '%e%' AND
		P.categorie LIKE '%o__'
	GROUP BY
        F.numerofournisseur, P.categorie
	HAVING 
		SUM(P.prix) > 12500
	ORDER BY
        categorie, V_tot ASC;

