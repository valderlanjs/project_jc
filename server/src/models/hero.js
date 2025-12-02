import { pool } from '../config/database.js';

export const HeroModel = {
  async getContent() {
    try {
      const result = await pool.query(
        'SELECT * FROM hero_content WHERE is_active = true ORDER BY id DESC LIMIT 1'
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Database Error in getContent:', error);
      throw new Error(`Erro ao buscar conteúdo do hero: ${error.message}`);
    }
  },

  async getContentById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM hero_content WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Database Error in getContentById:', error);
      throw new Error(`Erro ao buscar conteúdo do hero por ID: ${error.message}`);
    }
  },

  async updateContent(id, updates) {
    try {
      const allowedFields = ['title', 'subtitle', 'button_text', 'is_active'];
      const filteredUpdates = {};
      
      // Filtrar apenas campos permitidos
      Object.keys(updates).forEach(key => {
        if (allowedFields.includes(key)) {
          filteredUpdates[key] = updates[key];
        }
      });

      if (Object.keys(filteredUpdates).length === 0) {
        throw new Error('Nenhum campo válido para atualização');
      }

      const fields = Object.keys(filteredUpdates).map((key, index) => `${key} = $${index + 1}`).join(', ');
      const values = Object.values(filteredUpdates);
      values.push(id);

      const query = `UPDATE hero_content SET ${fields} WHERE id = $${values.length} RETURNING *`;
      
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Database Error in updateContent:', error);
      throw new Error(`Erro ao atualizar conteúdo do hero: ${error.message}`);
    }
  },

  async updateBackgroundImage(id, imagePath) {
    try {
      const result = await pool.query(
        'UPDATE hero_content SET background_image = $1 WHERE id = $2 RETURNING *',
        [imagePath, id]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Database Error in updateBackgroundImage:', error);
      throw new Error(`Erro ao atualizar imagem de fundo: ${error.message}`);
    }
  },

  async createContent(contentData) {
    try {
      const { title, subtitle, button_text, background_image } = contentData;
      
      const result = await pool.query(
        `INSERT INTO hero_content (title, subtitle, button_text, background_image) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, subtitle, button_text, background_image]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Database Error in createContent:', error);
      throw new Error(`Erro ao criar conteúdo do hero: ${error.message}`);
    }
  }
};