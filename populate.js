require('dotenv').config();
const { Client } = require("pg");


const SQL = `
  CREATE TABLE IF NOT EXISTS families (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS habitats (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    habitat_type TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ranges (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    range_description TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS migration_patterns (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    pattern TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS diets (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    diet_type TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS conservation_status (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    status VARCHAR(50) UNIQUE NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS birds (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    family_id INTEGER REFERENCES families(id),
    size_cm DECIMAL(5,2),
    weight_g DECIMAL(6,2),
    wingspan_cm DECIMAL(5,2),
    habitat_id INTEGER REFERENCES habitats(id),
    range_id INTEGER REFERENCES ranges(id),
    migration_pattern_id INTEGER REFERENCES migration_patterns(id),
    diet_id INTEGER REFERENCES diets(id),
    conservation_status_id INTEGER REFERENCES conservation_status(id)
  );

  INSERT INTO families (name) VALUES 
  ('Accipitridae'),
  ('Falconidae'),
  ('Strigidae')
  ON CONFLICT (name) DO NOTHING;

  INSERT INTO habitats (habitat_type) VALUES 
  ('Forests, near water'),
  ('Urban areas, cliffs, mountains'),
  ('Tundra')
  ON CONFLICT (habitat_type) DO NOTHING;

  INSERT INTO ranges (range_description) VALUES 
  ('North America'),
  ('Worldwide'),
  ('Arctic regions')
  ON CONFLICT (range_description) DO NOTHING;

  INSERT INTO migration_patterns (pattern) VALUES 
  ('Migratory')
  ON CONFLICT (pattern) DO NOTHING;

  INSERT INTO diets (diet_type) VALUES 
  ('Fish, small mammals'),
  ('Birds, small mammals'),
  ('Rodents, birds')
  ON CONFLICT (diet_type) DO NOTHING;

  INSERT INTO conservation_status (status) VALUES 
  ('Least Concern'),
  ('Vulnerable')
  ON CONFLICT (status) DO NOTHING;

  INSERT INTO birds (name, scientific_name, family_id, size_cm, weight_g, wingspan_cm, habitat_id, range_id, migration_pattern_id, diet_id, conservation_status_id)
  VALUES 
  (
      'Bald Eagle', 
      'Haliaeetus leucocephalus', 
      (SELECT id FROM families WHERE name = 'Accipitridae'), 
      70, 
      4000, 
      200, 
      (SELECT id FROM habitats WHERE habitat_type = 'Forests, near water'),
      (SELECT id FROM ranges WHERE range_description = 'North America'),
      (SELECT id FROM migration_patterns WHERE pattern = 'Migratory'),
      (SELECT id FROM diets WHERE diet_type = 'Fish, small mammals'),
      (SELECT id FROM conservation_status WHERE status = 'Least Concern')
  ),
  (
      'Peregrine Falcon', 
      'Falco peregrinus', 
      (SELECT id FROM families WHERE name = 'Falconidae'), 
      40, 
      900, 
      110, 
      (SELECT id FROM habitats WHERE habitat_type = 'Urban areas, cliffs, mountains'),
      (SELECT id FROM ranges WHERE range_description = 'Worldwide'),
      (SELECT id FROM migration_patterns WHERE pattern = 'Migratory'),
      (SELECT id FROM diets WHERE diet_type = 'Birds, small mammals'),
      (SELECT id FROM conservation_status WHERE status = 'Least Concern')
  ),
  (
      'Snowy Owl', 
      'Bubo scandiacus', 
      (SELECT id FROM families WHERE name = 'Strigidae'), 
      60, 
      2000, 
      150, 
      (SELECT id FROM habitats WHERE habitat_type = 'Tundra'),
      (SELECT id FROM ranges WHERE range_description = 'Arctic regions'),
      (SELECT id FROM migration_patterns WHERE pattern = 'Migratory'),
      (SELECT id FROM diets WHERE diet_type = 'Rodents, birds'),
      (SELECT id FROM conservation_status WHERE status = 'Vulnerable')
  );

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