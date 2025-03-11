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

module.exports = {
    getAllBirds,
    getAllFamily,
    getAllRange,
    getAllDiet,
    getAllMigration,
    getAllHabitat,
    getAllConservation
};