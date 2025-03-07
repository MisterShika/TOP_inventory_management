require('dotenv').config();
const { Client } = require("pg");


const SQL = `
CREATE TABLE IF NOT EXISTS birds (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    family VARCHAR(100),
    size_cm DECIMAL(5,2),
    weight_g DECIMAL(6,2),
    wingspan_cm DECIMAL(5,2),
    habitat TEXT,
    range TEXT,
    migration_pattern TEXT,
    diet TEXT,
    conservation_status VARCHAR(50)
);

INSERT INTO birds (name, scientific_name, family, size_cm, weight_g, wingspan_cm, habitat, range, migration_pattern, diet, conservation_status)
VALUES 
('Bald Eagle', 'Haliaeetus leucocephalus', 'Accipitridae', 70, 4000, 200, 'Forests, near water', 'North America', 'Migratory', 'Fish, small mammals', 'Least Concern'),
('Peregrine Falcon', 'Falco peregrinus', 'Falconidae', 40, 900, 110, 'Urban areas, cliffs, mountains', 'Worldwide', 'Migratory', 'Birds, small mammals', 'Least Concern'),
('Snowy Owl', 'Bubo scandiacus', 'Strigidae', 60, 2000, 150, 'Tundra', 'Arctic regions', 'Migratory', 'Rodents, birds', 'Vulnerable')
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();