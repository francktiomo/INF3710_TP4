DROP SCHEMA IF EXISTS ToutFrais CASCADE;
CREATE SCHEMA ToutFrais;

SET search_path TO ToutFrais;

CREATE TABLE IF NOT EXISTS ToutFrais.Client (
	numeroclient SERIAL PRIMARY KEY,
	nomclient TEXT NOT NULL,
	prenomclient TEXT,
	adressecourrielclient TEXT UNIQUE NOT NULL,
	rueclient VARCHAR(40),
	villeclient VARCHAR(40),
	codepostalclient VARCHAR(7)
);

CREATE TABLE IF NOT EXISTS ToutFrais.Fournisseur (
	numerofournisseur SERIAL PRIMARY KEY,
	nomfournisseur TEXT,
	adressefournisseur VARCHAR(255) NOT NULL 
);

CREATE TABLE IF NOT EXISTS ToutFrais.Planrepas (
	numeroplan SERIAL PRIMARY KEY,
	categorie VARCHAR(50),
	frequence SMALLINT,  
	nbpersonnes SMALLINT,
	nbcalories SMALLINT,
	prix NUMERIC(6, 2) NOT NULL,
	numerofournisseur INTEGER NOT NULL,
	FOREIGN KEY (numerofournisseur) REFERENCES Fournisseur(numerofournisseur) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Abonner (
	numeroclient INTEGER NOT NULL,
	numeroplan INTEGER NOT NULL,
	duree SMALLINT NOT NULL CHECK (duree >= 0),
	PRIMARY KEY (numeroclient, numeroplan),
	FOREIGN KEY (numeroclient) REFERENCES Client(numeroclient) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Telephone (
	numeroclient INTEGER NOT NULL,
	numerodetelephone TEXT NOT NULL,
	PRIMARY KEY (numeroclient, numerodetelephone),
	FOREIGN KEY (numeroclient) REFERENCES Client(numeroclient) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT chk_phone CHECK (numerodetelephone NOT LIKE '%[^0-9]')
);

CREATE TABLE IF NOT EXISTS ToutFrais.Famille (
	numeroplan INTEGER PRIMARY KEY,
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Vegetarien (
	numeroplan INTEGER PRIMARY KEY,
	typederepas VARCHAR(40) NOT NULL,
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Pescetarien (
	numeroplan INTEGER PRIMARY KEY,
	typepoisson VARCHAR(40) NOT NULL,
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Rapide (
	numeroplan INTEGER PRIMARY KEY,
	tempsdepreparation NUMERIC(6, 2) NOT NULL,
	FOREIGN KEY (numeroplan) REFERENCES Famille(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Facile (
	numeroplan INTEGER PRIMARY KEY,
	nbringredients SMALLINT NOT NULL,
	FOREIGN KEY (numeroplan) REFERENCES Famille(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Kitrepas (
	numerokitrepas SERIAL PRIMARY KEY,
	numeroplan INTEGER NOT NULL,
	description TEXT,
	FOREIGN KEY (numeroplan) REFERENCES Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Image (
	numeroimage SERIAL PRIMARY KEY,
	numerokitrepas INTEGER NOT NULL,
	donnees VARCHAR(255),
	FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas(numerokitrepas) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Ingredient (
	numeroingredient SERIAL PRIMARY KEY,
	nomingredient TEXT NOT NULL,
	paysingredient TEXT
);

CREATE TABLE IF NOT EXISTS ToutFrais.Contenir (
	numerokitrepas INTEGER NOT NULL,
	numeroingredient INTEGER NOT NULL,
	PRIMARY KEY(numerokitrepas, numeroingredient),
	FOREIGN KEY (numerokitrepas) REFERENCES Kitrepas(numerokitrepas) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (numeroingredient) REFERENCES Ingredient(numeroingredient) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ToutFrais.Etape (
	numerokitrepas INTEGER PRIMARY KEY,
	descriptionetape TEXT,
	dureeetape NUMERIC(6, 2),
	numerokitrepasetrecomposede SMALLINT
);
