import pkg from "pg";
import dotenv from "dotenv";
import fs from "fs"; // You use fs in importData()

dotenv.config();
const { Pool } = pkg;

// ✅ Configure PostgreSQL pool for both local & cloud (Neon, Render, etc.)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

// ✅ Utility function to test connection
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL connected successfully to Neon");
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

// // ✅ Utility to import local data (optional)
// export const importData = async (jsonFile = "local-data.json") => {
//   let client;
//   try {
//     client = await pool.connect();
//     console.log("✅ Connected to PostgreSQL for import");

//     if (!fs.existsSync(jsonFile)) {
//       console.error(`⚠️ File "${jsonFile}" not found.`);
//       process.exit(1);
//     }

//     const data = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
//     console.log("📦 Loaded tables:", Object.keys(data));

//     for (const [table, rows] of Object.entries(data)) {
//       console.log(`🚀 Importing ${rows.length} rows into "${table}"...`);

//       let imported = 0;
//       for (const row of rows) {
//         try {
//           const columns = Object.keys(row).join(", ");
//           const placeholders = Object.keys(row)
//             .map((_, i) => `$${i + 1}`)
//             .join(", ");

//           await client.query(
//             `INSERT INTO ${table} (${columns}) VALUES (${placeholders})
//              ON CONFLICT DO NOTHING`,
//             Object.values(row)
//           );
//           imported++;
//         } catch (err) {
//           console.error(`⚠️ Failed to insert into ${table}:`, err.message);
//         }
//       }
//       console.log(
//         `✅ Finished "${table}": ${imported}/${rows.length} rows imported`
//       );
//     }

//     console.log("🎉 Data import completed successfully!");
//   } catch (err) {
//     console.error("❌ Import failed:", err.message);
//   } finally {
//     if (client) client.release();
//   }
// };
