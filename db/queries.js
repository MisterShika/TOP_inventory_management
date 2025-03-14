const db = require("../db");

const standardSelect = `
  SELECT 
      b.id, 
      b.name, 
      b.scientific_name, 
      f.name AS family, 
      b.size_cm, 
      b.weight_g, 
      b.wingspan_cm, 
      h.habitat_type, 
      r.range_description, 
      m.pattern AS migration_pattern, 
      d.diet_type, 
      c.status AS conservation_status
  FROM birds b
  LEFT JOIN families f ON b.family_id = f.id
  LEFT JOIN habitats h ON b.habitat_id = h.id
  LEFT JOIN ranges r ON b.range_id = r.id
  LEFT JOIN migration_patterns m ON b.migration_pattern_id = m.id
  LEFT JOIN diets d ON b.diet_id = d.id
  LEFT JOIN conservation_status c ON b.conservation_status_id = c.id
`;

const standardAdd = `
  WITH 
  insert_family AS (
      INSERT INTO families (name) 
      VALUES ($3) 
      ON CONFLICT (name) DO NOTHING
      RETURNING id
  ),
  insert_habitat AS (
      INSERT INTO habitats (habitat_type) 
      VALUES ($7) 
      ON CONFLICT (habitat_type) DO NOTHING
      RETURNING id
  ),
  insert_range AS (
      INSERT INTO ranges (range_description) 
      VALUES ($8) 
      ON CONFLICT (range_description) DO NOTHING
      RETURNING id
  ),
  insert_migration_pattern AS (
      INSERT INTO migration_patterns (pattern) 
      VALUES ($9) 
      ON CONFLICT (pattern) DO NOTHING
      RETURNING id
  ),
  insert_diet AS (
      INSERT INTO diets (diet_type) 
      VALUES ($10) 
      ON CONFLICT (diet_type) DO NOTHING
      RETURNING id
  ),
  insert_conservation_status AS (
      INSERT INTO conservation_status (status) 
      VALUES ($11) 
      ON CONFLICT (status) DO NOTHING
      RETURNING id
  )

  INSERT INTO birds (
      name, scientific_name, family_id, size_cm, weight_g, wingspan_cm, habitat_id, range_id, migration_pattern_id, diet_id, conservation_status_id
  )
  VALUES (
      $1, 
      $2, 
      COALESCE((SELECT id FROM insert_family), (SELECT id FROM families WHERE name = $3)), 
      $4, 
      $5, 
      $6, 
      COALESCE((SELECT id FROM insert_habitat), (SELECT id FROM habitats WHERE habitat_type = $7)),
      COALESCE((SELECT id FROM insert_range), (SELECT id FROM ranges WHERE range_description = $8)),
      COALESCE((SELECT id FROM insert_migration_pattern), (SELECT id FROM migration_patterns WHERE pattern = $9)),
      COALESCE((SELECT id FROM insert_diet), (SELECT id FROM diets WHERE diet_type = $10)),
      COALESCE((SELECT id FROM insert_conservation_status), (SELECT id FROM conservation_status WHERE status = $11))
  )
  RETURNING *;
`;

async function getAllBirds() {
  const { rows } = await db.query(standardSelect);
  return rows;
}

async function getAllFamily(family) {
  const { rows } = await db.query(
    `${standardSelect} WHERE f.name ILIKE $1`, 
    [`%${family}%`]
  );
  return rows;
}

async function getAllRange(range) {
  const { rows } = await db.query(
    `${standardSelect} WHERE r.range_description ILIKE $1`, 
    [`%${range}%`]
  );
  return rows;
}

async function getAllDiet(diet) {
  const { rows } = await db.query(
    `${standardSelect} WHERE d.diet_type ILIKE $1`, 
    [`%${diet}%`]
  );
  return rows;
}

async function getAllMigration(migration) {
  const { rows } = await db.query(
    `${standardSelect} WHERE m.pattern ILIKE $1`, 
    [`%${migration}%`]
  );
  return rows;
}

async function getAllHabitat(habitat) {
  const { rows } = await db.query(
    `${standardSelect} WHERE h.habitat_type ILIKE $1`, 
    [`%${habitat}%`]
  );
  return rows; 
}

async function getAllConservation(conservation) {
  const { rows } = await db.query(
    `${standardSelect} WHERE c.status ILIKE $1`, 
    [`%${conservation}%`]
  );
  return rows; 
}

async function addBird(bird) {
  const {
    name,
    scientific_name,
    family,
    size_cm,
    weight_g,
    wingspan_cm,
    habitat_type,
    range_description,
    migration_pattern,
    diet_type,
    conservation_status
  } = bird;

  const params = [
    name,
    scientific_name,
    family,
    size_cm,
    weight_g,
    wingspan_cm,
    habitat_type,
    range_description,
    migration_pattern,
    diet_type,
    conservation_status
  ];

  await db.query(standardAdd, params);
}

async function deleteBird(id) {
  await db.query("DELETE FROM birds WHERE id = $1", [id]);
}

module.exports = {
    getAllBirds,
    getAllFamily,
    getAllRange,
    getAllDiet,
    getAllMigration,
    getAllHabitat,
    getAllConservation,
    addBird,
    deleteBird
};