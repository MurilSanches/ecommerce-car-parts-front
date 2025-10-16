# 🚗 AutoParts - E-commerce de Peças Automotivas

Um e-commerce moderno e responsivo especializado em peças e acessórios automotivos, construído com React 19 e as mais recentes tecnologias web.

![AutoParts Preview](https://via.placeholder.com/800x400/ff6b00/ffffff?text=AutoParts+E-commerce)

## ✨ Características Principais

### 🛍️ **E-commerce Completo**
- **Catálogo de produtos** organizado por categorias
- **Sistema de busca avançado** com filtros múltiplos
- **Carrinho de compras** com persistência local
- **Lista de desejos** (wishlist) integrada
- **Páginas de produto** detalhadas com galeria

### 🎨 **Design Moderno**
- **Interface responsiva** para todos os dispositivos
- **Tema personalizado** com cores automotivas
- **Animações suaves** e transições elegantes
- **Componentes reutilizáveis** e bem estruturados
- **UX otimizada** para conversão

### ⚡ **Performance**
- **Lazy loading** de imagens e rotas
- **Infinite scroll** para listagem de produtos
- **PWA ready** com service worker
- **Otimizações** de bundle e carregamento

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 19** - Framework principal com novas funcionalidades
- **TypeScript** - Tipagem estática para melhor desenvolvimento
- **Vite** - Build tool ultra-rápido
- **React Router DOM v7** - Roteamento com lazy loading

### **Styling**
- **Tailwind CSS v4** - Framework CSS utility-first
- **CSS Custom Properties** - Variáveis personalizadas
- **Responsive Design** - Mobile-first approach

### **State Management**
- **Zustand** - Gerenciamento de estado leve e eficiente
- **Local Storage** - Persistência de dados do usuário

### **UI Components**
- **Radix UI** - Componentes acessíveis e customizáveis
- **Custom Components** - Componentes específicos do domínio

### **Development**
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **TypeScript** - Verificação de tipos

## 🚀 Início Rápido

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/autoparts-ecommerce.git

# Entre no diretório
cd autoparts-ecommerce

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Scripts Disponíveis**

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm run preview      # Preview do build de produção

# Linting
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas de linting automaticamente
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── DepartmentsMenu.tsx    # Menu de departamentos
│   ├── Footer.tsx            # Rodapé do site
│   ├── LazyImage.tsx         # Componente de imagem lazy
│   ├── MiniCart.tsx          # Carrinho mini
│   ├── PromoBanners.tsx      # Banners promocionais
│   ├── Skeleton.tsx          # Loading skeletons
│   └── TireFinder.tsx        # Buscador de pneus
├── pages/              # Páginas da aplicação
│   ├── static/         # Páginas estáticas
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Help.tsx
│   │   ├── Privacy.tsx
│   │   └── Terms.tsx
│   ├── Cart.tsx        # Página do carrinho
│   ├── Categories.tsx  # Página de categorias
│   ├── Checkout.tsx    # Página de checkout
│   ├── Home.tsx        # Página inicial
│   ├── Login.tsx       # Página de login
│   ├── Product.tsx     # Página do produto
│   ├── Register.tsx    # Página de registro
│   └── Search.tsx      # Página de busca
├── store/              # Gerenciamento de estado
│   ├── auth.ts         # Store de autenticação
│   ├── cart.ts         # Store do carrinho
│   └── wishlist.ts     # Store da wishlist
├── App.tsx             # Componente principal
├── main.tsx           # Ponto de entrada
└── index.css          # Estilos globais
```

## 🎯 Funcionalidades Detalhadas

### **🏠 Página Inicial**
- **Buscador de pneus** por medidas
- **Banners promocionais** dinâmicos
- **Seções por categoria** (Pneus, Óleos, Freios)
- **Infinite scroll** para todos os produtos
- **Cards interativos** com wishlist

### **🔍 Sistema de Busca**
- **Filtros avançados** por categoria, marca, preço
- **Busca por texto** em tempo real
- **Ordenação** por relevância, preço, avaliação
- **Resultados visuais** com imagens e ratings
- **Estado vazio** com sugestões

### **📱 Categorias**
- **Cards coloridos** com ícones
- **Navegação direta** para produtos
- **Animações escalonadas**
- **Design responsivo**

### **🛒 Carrinho & Checkout**
- **Mini carrinho** deslizante
- **Persistência** de dados
- **Cálculo de frete** por CEP
- **Processo de checkout** completo

### **👤 Autenticação**
- **Login/Registro** mock
- **Sessão persistente**
- **Proteção de rotas**

## 🎨 Design System

### **Cores**
- **Primary**: `#ff6b00` (Laranja automotivo)
- **Secondary**: Tons de cinza e branco
- **Accent**: Verde para sucesso, vermelho para alertas

### **Componentes**
- **Botões**: `.btn-primary`, `.btn-outline`
- **Cards**: `.card` com hover effects
- **Animações**: `.fade-in`, `.slide-up`

### **Responsividade**
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1280px+

## 📱 PWA Features

- **Manifest.json** configurado
- **Service Worker** para cache
- **Instalável** em dispositivos móveis
- **Offline ready** (básico)

## 🔧 Configuração

### **Variáveis de Ambiente**
```bash
# .env.local
VITE_API_URL=https://api.autoparts.com
VITE_APP_NAME=AutoParts
```

### **Tailwind CSS**
```typescript
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff6b00',
          // ... outras variações
        }
      }
    }
  }
}
```

## 🚀 Deploy

### **Vercel (Recomendado)**
```bash
npm install -g vercel
vercel --prod
```

### **Netlify**
```bash
npm run build
# Upload da pasta dist/
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contribuição

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

## 📝 Roadmap

### **Próximas Features**
- [ ] **Sistema de avaliações** completo
- [ ] **Chat de suporte** integrado
- [ ] **Notificações push** para ofertas
- [ ] **Integração com APIs** reais
- [ ] **Sistema de cupons** e promoções
- [ ] **Histórico de pedidos** detalhado
- [ ] **Recomendações** baseadas em IA

### **Melhorias Técnicas**
- [ ] **Testes unitários** com Vitest
- [ ] **Testes E2E** com Playwright
- [ ] **Storybook** para componentes
- [ ] **CI/CD** com GitHub Actions
- [ ] **Monitoramento** com Sentry

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: [Seu Nome](https://github.com/seu-usuario)
- **Design**: [Designer](https://github.com/designer)
- **Product**: [Product Manager](https://github.com/pm)

## 📞 Suporte

- **Email**: suporte@autoparts.com
- **Discord**: [Comunidade AutoParts](https://discord.gg/autoparts)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/autoparts-ecommerce/issues)

---

<div align="center">
  <p>Feito com ❤️ para entusiastas automotivos</p>
  <p>🚗 AutoParts - Sua loja completa de peças automotivas</p>
</div>