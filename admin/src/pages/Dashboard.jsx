import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { 
  Image, 
  FileText, 
  ShoppingCart, 
  Users,
  TrendingUp,
  Eye
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      name: 'Hero Section',
      value: 'Ativa',
      change: '+0%',
      changeType: 'positive',
      icon: Image,
      href: '/hero'
    },
    {
      name: 'Produtos Cadastrados',
      value: '6',
      change: '+0%',
      changeType: 'neutral',
      icon: ShoppingCart,
      href: '/products'
    },
    {
      name: 'Serviços Ativos',
      value: '4',
      change: '+0%',
      changeType: 'neutral',
      icon: FileText,
      href: '/services'
    },
    {
      name: 'Visualizações',
      value: '1.2k',
      change: '+12%',
      changeType: 'positive',
      icon: Eye
    }
  ];

  const quickActions = [
    {
      title: 'Editar Hero Section',
      description: 'Atualize a imagem e texto da seção principal',
      icon: Image,
      href: '/hero',
      color: 'bg-blue-500'
    },
    {
      title: 'Gerenciar Produtos',
      description: 'Adicione ou edite produtos do catálogo',
      icon: ShoppingCart,
      href: '/products',
      color: 'bg-green-500',
      comingSoon: true
    },
    {
      title: 'Configurar Serviços',
      description: 'Gerencie os serviços oferecidos',
      icon: FileText,
      href: '/services',
      color: 'bg-purple-500',
      comingSoon: true
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Bem-vindo ao painel de administração da Madeireira Pro
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-sm rounded-2xl border p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              {stat.href && (
                <div className="mt-4">
                  <Link
                    to={stat.href}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`block bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-200 ${
                  action.comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/30'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${action.color} p-3 rounded-xl text-white`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {action.title}
                        </h3>
                        {action.comingSoon && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Em breve
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Atividade Recente
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sistema iniciado</p>
                  <p className="text-sm text-gray-500">Painel admin está ativo</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Agora</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Image className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Hero Section</p>
                  <p className="text-sm text-gray-500">Pronta para edição</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Agora</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;