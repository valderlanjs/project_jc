import { HeroModel } from '../models/hero.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const heroController = {
  async getHeroContent(req, res) {
    try {
      console.log('📥 Recebida requisição para buscar conteúdo do hero');
      
      const content = await HeroModel.getContent();
      
      if (!content) {
        return res.status(404).json({
          success: false,
          error: 'Conteúdo do hero não encontrado'
        });
      }

      console.log('✅ Conteúdo do hero encontrado:', content.id);
      
      res.json({
        success: true,
        data: content
      });
    } catch (error) {
      console.error('❌ Erro no getHeroContent:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor ao buscar conteúdo'
      });
    }
  },

  async updateHeroContent(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      console.log('📥 Recebida requisição para atualizar conteúdo do hero:', { id, updates });

      // Validar se o ID é um número
      const heroId = parseInt(id);
      if (isNaN(heroId)) {
        return res.status(400).json({
          success: false,
          error: 'ID inválido'
        });
      }

      // Verificar se o conteúdo existe
      const existingContent = await HeroModel.getContentById(heroId);
      if (!existingContent) {
        return res.status(404).json({
          success: false,
          error: 'Conteúdo do hero não encontrado'
        });
      }

      // Atualizar conteúdo
      const updatedContent = await HeroModel.updateContent(heroId, updates);
      
      if (!updatedContent) {
        return res.status(404).json({
          success: false,
          error: 'Falha ao atualizar conteúdo'
        });
      }

      console.log('✅ Conteúdo do hero atualizado com sucesso:', updatedContent.id);
      
      res.json({
        success: true,
        message: 'Conteúdo atualizado com sucesso',
        data: updatedContent
      });
    } catch (error) {
      console.error('❌ Erro no updateHeroContent:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor ao atualizar conteúdo'
      });
    }
  },

  async updateHeroBackground(req, res) {
    try {
      const { id } = req.params;
      
      console.log('📥 Recebida requisição para atualizar background do hero:', id);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'Nenhuma imagem fornecida'
        });
      }

      // Validar se o ID é um número
      const heroId = parseInt(id);
      if (isNaN(heroId)) {
        // Remover o arquivo enviado se o ID for inválido
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          error: 'ID inválido'
        });
      }

      // Verificar se o conteúdo existe
      const existingContent = await HeroModel.getContentById(heroId);
      if (!existingContent) {
        // Remover o arquivo enviado se o conteúdo não existir
        fs.unlinkSync(req.file.path);
        return res.status(404).json({
          success: false,
          error: 'Conteúdo do hero não encontrado'
        });
      }

      // Remover imagem anterior se existir
      if (existingContent.background_image && existingContent.background_image !== '/uploads/hero-default.jpg') {
        const oldImagePath = path.join(__dirname, '../../public', existingContent.background_image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log('🗑️ Imagem anterior removida:', oldImagePath);
        }
      }

      const imagePath = `/uploads/${req.file.filename}`;
      const updatedContent = await HeroModel.updateBackgroundImage(heroId, imagePath);

      if (!updatedContent) {
        // Remover o arquivo enviado se a atualização falhar
        fs.unlinkSync(req.file.path);
        return res.status(404).json({
          success: false,
          error: 'Falha ao atualizar imagem de fundo'
        });
      }

      console.log('✅ Background do hero atualizado com sucesso:', imagePath);
      
      res.json({
        success: true,
        message: 'Imagem de fundo atualizada com sucesso',
        imagePath: imagePath,
        data: updatedContent
      });
    } catch (error) {
      console.error('❌ Erro no updateHeroBackground:', error);
      
      // Remover o arquivo enviado em caso de erro
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor ao atualizar imagem de fundo'
      });
    }
  },

  async createHeroContent(req, res) {
    try {
      const { title, subtitle, button_text, background_image } = req.body;

      console.log('📥 Recebida requisição para criar conteúdo do hero:', { title, subtitle, button_text });

      const newContent = await HeroModel.createContent({
        title,
        subtitle,
        button_text,
        background_image: background_image || '/uploads/hero-default.jpg'
      });

      console.log('✅ Novo conteúdo do hero criado com sucesso:', newContent.id);
      
      res.status(201).json({
        success: true,
        message: 'Conteúdo criado com sucesso',
        data: newContent
      });
    } catch (error) {
      console.error('❌ Erro no createHeroContent:', error);
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor ao criar conteúdo'
      });
    }
  }
};