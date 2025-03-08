require('dotenv').config();
const { Client } = require("pg");


const SQL = `
    DROP TABLE IF EXISTS birds CASCADE;
    DROP TABLE IF EXISTS families CASCADE;
    DROP TABLE IF EXISTS habitats CASCADE;
    DROP TABLE IF EXISTS ranges CASCADE;
    DROP TABLE IF EXISTS migration_patterns CASCADE;
    DROP TABLE IF EXISTS diets CASCADE;
    DROP TABLE IF EXISTS conservation_status CASCADE;
`;

async function main() {
    console.log("Clearing...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();