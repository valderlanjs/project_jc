import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Save, Upload, Image as ImageIcon, Eye, RefreshCw } from 'lucide-react';
import api from '../services/api';

const HeroEditor = () => {
  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    button_text: '',
    background_image: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async () => {
    setLoading(true);
    try {
      const response = await api.get('/hero');
      if (response.data.success) {
        setContent(response.data.data);
        setPreviewImage(`http://localhost:5000${response.data.data.background_image}`);
      }
    } catch (error) {
      console.error('Error loading hero content:', error);
      showMessage('error', 'Erro ao carregar conteúdo do hero');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleInputChange = (field, value) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put(`/hero/1`, content);
      if (response.data.success) {
        showMessage('success', 'Conteúdo salvo com sucesso!');
      }
    } catch (error) {
      console.error('Error saving hero content:', error);
      showMessage('error', 'Erro ao salvar conteúdo');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Por favor, selecione um arquivo de imagem');
      return;
    }

    // Validar tamanho do arquivo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'A imagem deve ter menos de 5MB');
      return;
    }

    // Preview da imagem
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload para o servidor
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('backgroundImage', file);

      const response = await api.put('/hero/1/background', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        showMessage('success', 'Imagem de fundo atualizada com sucesso!');
        setContent(prev => ({
          ...prev,
          background_image: response.data.imagePath
        }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      showMessage('error', 'Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    loadHeroContent();
    showMessage('info', 'Formulário resetado para os valores atuais');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Editor - Hero Section
          </h1>
          <p className="text-gray-600">
            Gerencie o conteúdo da seção principal do site
          </p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' :
            message.type === 'error' ? 'bg-red-50 border border-red-200 text-red-700' :
            'bg-blue-50 border border-blue-200 text-blue-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Edição */}
          <div className="space-y-6">
            {/* Conteúdo Textual */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Conteúdo Textual
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título Principal *
                  </label>
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Digite o título principal"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Título que aparece em destaque
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtítulo *
                  </label>
                  <textarea
                    value={content.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Digite o subtítulo"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Texto descritivo abaixo do título
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Texto do Botão *
                  </label>
                  <input
                    type="text"
                    value={content.button_text}
                    onChange={(e) => handleInputChange('button_text', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Texto do botão principal"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Texto que aparece no botão de ação
                  </p>
                </div>
              </div>
            </div>

            {/* Upload de Imagem */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Imagem de Fundo
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="background-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="background-upload"
                    className={`cursor-pointer block ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <span className="text-sm text-gray-600">
                      {uploading ? 'Fazendo upload...' : 'Clique para fazer upload de uma nova imagem'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG até 5MB
                    </p>
                  </label>
                </div>

                {content.background_image && (
                  <div className="text-sm text-gray-600">
                    <strong>Imagem atual:</strong> {content.background_image}
                  </div>
                )}
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>

              <button
                onClick={resetForm}
                disabled={saving}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Resetar
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Preview
              </h2>

              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                {/* Simulação do Hero Section */}
                <div 
                  className="h-80 bg-cover bg-center relative"
                  style={{ 
                    backgroundImage: previewImage ? `url(${previewImage})` : 'none',
                    backgroundColor: !previewImage ? '#f3f4f6' : 'transparent'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                    <h1 className="text-2xl font-bold text-white mb-3 leading-tight">
                      {content.title || 'Título Principal'}
                    </h1>
                    <p className="text-white/90 text-sm mb-4 leading-relaxed">
                      {content.subtitle || 'Subtítulo será exibido aqui. Este é um texto mais longo que descreve o negócio.'}
                    </p>
                    <button className="
                      self-start
                      bg-white/80
                      border 
                      border-primary
                      text-primary
                      hover:bg-primary
                      hover:text-white
                      transition-all 
                      duration-300
                      px-4 
                      py-2
                      text-sm
                      font-medium
                      rounded-xl
                      backdrop-blur-sm
                      w-auto
                    ">
                      {content.button_text || 'Texto do Botão'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Informações do Preview */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Informações do Preview:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Título: {content.title || 'Não definido'}</li>
                  <li>• Subtítulo: {content.subtitle ? `${content.subtitle.substring(0, 50)}...` : 'Não definido'}</li>
                  <li>• Botão: {content.button_text || 'Não definido'}</li>
                  <li>• Imagem: {content.background_image ? 'Carregada' : 'Não carregada'}</li>
                </ul>
              </div>
            </div>

            {/* Dicas */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Dicas</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Use imagens de alta qualidade para melhor visualização</li>
                <li>• Mantenha os textos curtos e objetivos</li>
                <li>• O botão deve ter uma chamada clara para ação</li>
                <li>• Sempre visualize as alterações antes de salvar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HeroEditor;