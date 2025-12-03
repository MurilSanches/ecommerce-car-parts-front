# E-commerce Car Parts Backend

Sistema de e-commerce para peças automotivas desenvolvido em Java com Spring Boot e MongoDB.

## Funcionalidades

### 1. CRUD de Produtos
- ✅ Criação, listagem, atualização e exclusão de produtos
- ✅ Paginação de produtos
- ✅ Busca por categoria, marca, nome
- ✅ Filtro por faixa de preço
- ✅ Controle de estoque
- ✅ Produtos vinculados automaticamente ao fornecedor do usuário logado
- ✅ Validação de permissão (apenas o dono pode editar/excluir)

### 2. CRUD de Fornecedores
- ✅ Criação, listagem, atualização e exclusão de fornecedores
- ✅ Validação de email único
- ✅ Informações completas de contato
- ✅ Relacionamento com usuário (cada usuário pode ter um fornecedor)
- ✅ Buscar fornecedor do usuário logado

### 3. Sistema de Carrinho
- ✅ Adicionar produtos ao carrinho
- ✅ Remover produtos do carrinho
- ✅ Atualizar quantidade de itens
- ✅ Calcular total do carrinho
- ✅ Limpar carrinho

### 4. Autenticação e Autorização
- ✅ Registro de usuários
- ✅ Login
- ✅ Criptografia de senhas

## Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data MongoDB**
- **Lombok**
- **Maven**

## Configuração

### 1. Pré-requisitos
- Java 17+
- Maven 3.6+
- MongoDB 4.4+

### 2. Configuração do MongoDB

A aplicação está configurada para usar variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.a6fotnv.mongodb.net/car_parts_db?appName=Cluster0

# Server Port
SERVER_PORT=8080
```

**Importante:** 
- Copie o arquivo `env.example` para `.env` e preencha com suas credenciais reais
- O arquivo `.env` está no `.gitignore` e não será commitado no repositório
- Para desenvolvimento local, você pode usar MongoDB local: `mongodb://localhost:27017/car_parts_db`

### 3. Executar a aplicação
```bash
mvn spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8080`

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login

### Produtos
- `GET /api/products` - Listar produtos (com paginação)
- `GET /api/products/{id}` - Buscar produto por ID
- `POST /api/products` - Criar produto (vinculado automaticamente ao fornecedor do usuário logado)
- `PUT /api/products/{id}` - Atualizar produto (apenas o dono)
- `DELETE /api/products/{id}` - Excluir produto (apenas o dono)
- `GET /api/products/category/{category}` - Produtos por categoria
- `GET /api/products/brand/{brand}` - Produtos por marca
- `GET /api/products/search?name={name}` - Buscar produtos
- `GET /api/products/price-range?minPrice={min}&maxPrice={max}` - Filtrar por preço
- `GET /api/products/supplier/{supplierId}` - Produtos por fornecedor

### Fornecedores
- `GET /api/suppliers` - Listar fornecedores
- `GET /api/suppliers/me` - Buscar fornecedor do usuário logado
- `GET /api/suppliers/{id}` - Buscar fornecedor por ID
- `POST /api/suppliers` - Criar fornecedor (vinculado ao usuário logado)
- `PUT /api/suppliers/{id}` - Atualizar fornecedor (apenas o dono)
- `DELETE /api/suppliers/{id}` - Excluir fornecedor (apenas o dono)

### Carrinho
- `GET /api/cart/{userId}` - Obter carrinho do usuário
- `POST /api/cart/{userId}/add?productId={id}&quantity={qty}` - Adicionar item
- `PUT /api/cart/{userId}/update?productId={id}&quantity={qty}` - Atualizar quantidade
- `DELETE /api/cart/{userId}/remove?productId={id}` - Remover item
- `DELETE /api/cart/{userId}/clear` - Limpar carrinho

## Exemplos de Uso

### Registrar Usuário
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "João",
  "lastName": "Silva",
  "phone": "11999999999",
  "address": "Rua das Flores, 123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Criar Fornecedor
```json
POST /api/suppliers
{
  "name": "Minha Loja de Peças",
  "description": "Loja especializada em peças automotivas",
  "email": "loja@example.com",
  "phone": "11987654321",
  "address": "Av. Principal, 1000",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567",
  "country": "Brasil",
  "contactPerson": "João Silva"
}
```
**Nota:** O fornecedor será automaticamente vinculado ao usuário logado. Cada usuário pode ter apenas um fornecedor.

### Buscar Meu Fornecedor
```
GET /api/suppliers/me
```
Retorna o fornecedor vinculado ao usuário logado.

### Criar Produto
```json
POST /api/products
{
  "name": "Filtro de Óleo",
  "description": "Filtro de óleo para motor 1.0",
  "price": 25.90,
  "stock": 100,
  "category": "Filtros",
  "brand": "Mann",
  "model": "W712/75",
  "year": "2020-2023",
  "images": ["https://example.com/filtro.jpg"],
  "specifications": "Compatível com motores 1.0"
}
```
**Nota:** O produto será automaticamente vinculado ao fornecedor do usuário logado. Não é necessário informar `supplierId`.

### Adicionar ao Carrinho
```
POST /api/cart/user_id_here/add?productId=product_id_here&quantity=2
```

## Estrutura do Projeto

```
src/main/java/com/ecommerce/carparts/
├── config/          # Configurações (Security, etc.)
├── controller/      # Controllers REST
├── dto/            # Data Transfer Objects
├── model/          # Entidades do domínio
├── repository/     # Repositórios MongoDB
├── service/        # Lógica de negócio
└── CarPartsApplication.java
```

## Testando a API com Postman

### Importar Collection

1. Abra o Postman
2. Clique em **Import** no canto superior esquerdo
3. Selecione os arquivos:
   - `Ecommerce-Car-Parts-API.postman_collection.json` (Collection)
   - `Ecommerce-Car-Parts-API.postman_environment.json` (Environment)
4. Selecione o environment "E-commerce Car Parts - Local" no canto superior direito

### Variáveis do Environment

A collection utiliza as seguintes variáveis que você pode atualizar conforme necessário:
- `base_url`: URL base da API (padrão: http://localhost:8080)
- `product_id`: ID de um produto (preencha após criar um produto)
- `supplier_id`: ID de um fornecedor (preencha após criar um fornecedor)
- `user_id`: ID de um usuário (preencha após criar um usuário)

### Fluxo de Teste Recomendado

1. **Autenticação**: Primeiro registre um usuário e faça login
2. **Fornecedores**: 
   - Crie um fornecedor (será vinculado automaticamente ao usuário logado)
   - Use `GET /api/suppliers/me` para buscar seu fornecedor
3. **Produtos**: 
   - Crie produtos (serão vinculados automaticamente ao seu fornecedor)
   - Não é necessário informar `supplierId`
   - Copie o ID do produto para a variável `product_id`
4. **Carrinho**: Use o `user_id` e `product_id` para testar o carrinho

### Fluxo de Negócio

O sistema segue o seguinte fluxo:
1. **Usuário** faz login/registro
2. **Usuário** cria um **Fornecedor** (vinculado automaticamente)
3. **Usuário** cria **Produtos** (vinculados automaticamente ao seu fornecedor)
4. **Clientes** podem adicionar produtos ao **Carrinho** e fazer compras

**Regras importantes:**
- Cada usuário pode ter apenas um fornecedor
- Produtos são criados automaticamente vinculados ao fornecedor do usuário logado
- Apenas o dono do fornecedor/produto pode editar ou excluir

## Próximos Passos

1. ✅ Configurar credenciais do MongoDB
2. Executar testes da aplicação
3. Implementar testes unitários
4. Adicionar documentação Swagger/OpenAPI
5. Implementar sistema de pedidos
6. Adicionar notificações por email