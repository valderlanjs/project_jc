import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function initializeDatabase() {
  try {
    // Verificar se o banco de dados existe, se não, criar
    const adminPool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'postgres',
    });

    try {
      const dbCheck = await adminPool.query(
        "SELECT 1 FROM pg_database WHERE datname = $1",
        [process.env.DB_NAME]
      );

      if (dbCheck.rows.length === 0) {
        await adminPool.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log(`✅ Database ${process.env.DB_NAME} created`);
      }
    } finally {
      await adminPool.end();
    }

    // Criar tabelas
    await createTables();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

async function createTables() {
  const createHeroTable = `
    CREATE TABLE IF NOT EXISTS hero_content (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      subtitle VARCHAR(500),
      button_text VARCHAR(100),
      background_image VARCHAR(500),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createAdminTable = `
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'admin',
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Função para atualizar o updated_at
  const createUpdateTrigger = `
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `;

  const createHeroTrigger = `
    DROP TRIGGER IF EXISTS update_hero_updated_at ON hero_content;
    CREATE TRIGGER update_hero_updated_at
    BEFORE UPDATE ON hero_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `;

  const createAdminTrigger = `
    DROP TRIGGER IF EXISTS update_admin_updated_at ON admin_users;
    CREATE TRIGGER update_admin_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  `;

  try {
    // Criar função de trigger
    await pool.query(createUpdateTrigger);
    
    // Criar tabelas
    await pool.query(createHeroTable);
    await pool.query(createAdminTable);
    
    // Criar triggers
    await pool.query(createHeroTrigger);
    await pool.query(createAdminTrigger);
    
    // Inserir admin padrão (senha: admin123)
    const adminCheck = await pool.query(
      'SELECT id FROM admin_users WHERE username = $1', 
      ['admin']
    );
    
    if (adminCheck.rows.length === 0) {
      const hashedPassword = '$2a$10$8K1p/a0dRTlR0.0D5QbW.O.0D5QbW.O.0D5QbW.O.0D5QbW.O'; // admin123
      await pool.query(
        'INSERT INTO admin_users (username, email, password, role) VALUES ($1, $2, $3, $4)',
        ['admin', 'admin@madeireira.com', hashedPassword, 'superadmin']
      );
      console.log('✅ Default admin user created');
    }

    // Inserir conteúdo padrão do hero
    const heroCheck = await pool.query(
      'SELECT id FROM hero_content WHERE id = $1', 
      [1]
    );
    
    if (heroCheck.rows.length === 0) {
      await pool.query(
        `INSERT INTO hero_content (id, title, subtitle, button_text, background_image) 
         VALUES ($1, $2, $3, $4, $5)`,
        [
          1,
          'Especialista em Madeiras Nobres',
          'Transforme seu projeto com madeiras de altíssima qualidade e acabamento impecável.',
          'Falar com Especialista',
          '/uploads/hero-default.jpg'
        ]
      );
      console.log('✅ Default hero content created');
    }

  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}