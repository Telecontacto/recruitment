import sql from 'mssql';

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER || '',
  options: {
    encrypt: false, // For local dev / testing
    trustServerCertificate: true, // For local dev / testing
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(sqlConfig);
    return pool;
  } catch (err) {
    console.error('SQL Connection Error:', err);
    throw err;
  }
}
