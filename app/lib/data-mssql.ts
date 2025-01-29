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
  let pool;
  try {
    //console.log('Connecting to the database...');
    pool = await sql.connect(sqlConfig);
    //console.log('Connected to the database.');

    const request = pool.request();

    if (params && params.length > 0) {
      params.forEach((param, index) => {
        console.log(`Adding parameter param${index + 1}:`, param);
        request.input(`param${index + 1}`, param);
      });
    } else {
      console.warn('No parameters provided for the query.');
    }

    console.log('Executing query:', query);
    console.log('With parameters:', params);

    const result = await request.query(query);

    console.log('Query executed successfully.');
    console.log('Result:', result);

    if (result.recordset.length === 0) {
      console.warn('Query executed but no data was returned.');
    } else {
      console.log('Data returned:', result.recordset);
    }

    return result.recordset as T;
  } catch (err) {
    console.error('SQL Query Error:', err);
    throw err;
  } finally {
    if (pool) {
      try {
        await pool.close();
        console.log('Database connection closed.');
      } catch (closeErr) {
        console.error('Error closing the database connection:', closeErr);
      }
    }
  }
}

export async function insertQuery<T>(query: string, params: any[]): Promise<T> {
  let pool;
  try {
    console.log('Connecting to the database...');
    pool = await sql.connect(sqlConfig);
    console.log('Connected to the database.');

    const request = pool.request();

    if (params && params.length > 0) {
      params.forEach((param, index) => {
        console.log(`Adding parameter param${index + 1}:`, param);
        request.input(`param${index + 1}`, param);
      });
    } else {
      console.warn('No parameters provided for the query.');
    }

    console.log('Executing query:', query);
    console.log('With parameters:', params);

    const result = await request.query(query);

    console.log('Query executed successfully.');
    console.log('Result:', result);

    if (result.recordset.length === 0) {
      console.warn('Query executed but no data was returned.');
    } else {
      console.log('Data returned:', result.recordset);
    }

    return result.recordset as T;
  } catch (err) {
    console.error('SQL Query Error:', err);
    throw err;
  } finally {
    if (pool) {
      try {
        await pool.close();
        console.log('Database connection closed.');
      } catch (closeErr) {
        console.error('Error closing the database connection:', closeErr);
      }
    }
  }
}