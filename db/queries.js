const db = require("../db");

async function getAllBirds() {
  const { rows } = await db.query("SELECT * FROM birds");
  return rows;
}