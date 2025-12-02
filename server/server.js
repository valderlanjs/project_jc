import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { initializeDatabase } from './config/database.js';
import heroRoutes from './routes/heroRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de segurança
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Compressão
app.use(compression());

// Logging
app.use(morgan('combined'));

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/hero', heroRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: '🚀 Madeireira Pro API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// Rota para servir a imagem padrão do hero
app.get('/uploads/hero-default.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/hero-default.jpg'));
});

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Rota não encontrada: ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Error:', error);
  res.status(500).json({ 
    success: false, 
    error: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : error.message 
  });
});

// Inicializar database e iniciar servidor
async function startServer() {
  try {
    console.log('🔄 Inicializando banco de dados...');
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`
✨ Madeireira Pro Server Started! ✨

📍 Server running on: http://localhost:${PORT}
📊 API Health: http://localhost:${PORT}/api/health
🗄️ Database: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}
🌍 Environment: ${process.env.NODE_ENV}

📋 Available Routes:
   GET    /api/health          - Health check
   GET    /api/hero            - Get hero content
   PUT    /api/hero/:id        - Update hero content
   PUT    /api/hero/:id/background - Update hero background
   POST   /api/hero            - Create hero content
   POST   /api/auth/login      - Admin login
   GET    /api/auth/me         - Verify token

🚀 Ready to receive requests!
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();