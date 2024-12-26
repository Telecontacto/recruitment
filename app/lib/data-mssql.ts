"use server";
import sql from 'mssql';

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER || 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function executeQuery<T>(query: string, params: any[]): Promise<T> {
  try {
    const pool = await sql.connect(sqlConfig);
    const request = pool.request();

    params.forEach((param, index) => {
      request.input(`param${index + 1}`, param);
    });

    const result = await request.query(query);
    return result.recordset as T;
  } catch (err) {
    console.error('SQL Query Error:', err);
    throw err;
  }
}
