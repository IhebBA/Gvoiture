DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS agents;
DROP TABLE IF EXISTS missions;
DROP TABLE IF EXISTS maintenances;
/*DROP TABLE IF EXISTS utilisateur;*/
CREATE TABLE cars (
  matricule TEXT PRIMARY KEY,
  marque TEXT NOT NULL,
  modele TEXT NOT NULL,
  type TEXT,
  energie TEXT,
  date DATETIME,
  dernière_vidange INTEGER NOT NULL
);

CREATE TABLE missions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT DEFAULT '_',
  distance INTEGER NOT NULL,
  carburant INTEGER NOT NULL,
  chauffeur_id INTEGER NOT NULL,
  car_mat INTEGER NOT NULL,
  date DATETIME,
  FOREIGN KEY (car_mat) REFERENCES cars (matricule),
  FOREIGN KEY (chauffeur_id) REFERENCES agents (id)
);

CREATE TABLE agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  idA INTEGER ,
  cin INTEGER NOT NULL,
  nom TEXT NOT NULL,
  date DATETIME
);

CREATE TABLE maintenances (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  montant INTEGER NOT NULL,
  description TEXT NOT NULL,
  date DATETIME,
  car_mat INTEGER NOT NULL
);

CREATE TABLE utilisateur (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email Text NOT NULL,
  motpass TEXT NOT NULL,
  nom text NOT NULL,
  prenom text NOT NULL,
  matricule INTEGER NOT NULL,
  permission text NOT NULL
);

INSERT INTO cars (matricule, marque, modele, type, energie,date,dernière_vidange) VALUES (
  
  '196TU7741',
  'CITROEN',
  'NIMO',
  'Commerciale',
  'Gasoil 50',
 '2020-01-01 10:00:00',
 '10000'
);

INSERT INTO cars (matricule, marque, modele, type, energie,date,dernière_vidange) VALUES (
  
  '196TU7743',
  'CITROEN',
  'NIMO',
  'Commerciale',
  'Gasoil 50',
  '2020-01-01 10:00:00',
  '10000'
);

INSERT INTO agents (idA, cin, nom) VALUES (
  385,
  '08988610',
  'Mohamed Amine Jmili'
);

INSERT INTO agents (idA, cin, nom) VALUES (
  234,
  '05462879',
  'Hamza Chaouachi'
);

INSERT INTO missions (id, nom, distance, carburant, chauffeur_id, car_mat, date) VALUES (
  1,
  'Bizerte',
  167,
  45,
  385,
  '196TU7741',
  '2020-01-01 10:00:00'
); 
INSERT INTO utilisateur (id,email, motpass, nom, prenom, matricule,permission) VALUES (
  
  '1',
  'tt@tabarka.com',
  '1230',
  't',
  't',
  '125663',
  'admin'
);