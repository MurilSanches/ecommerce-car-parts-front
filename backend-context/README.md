# E-commerce Car Parts Backend

Sistema de e-commerce para peças automotivas desenvolvido em Java com Spring Boot e MongoDB.

## Funcionalidades

### 1. CRUD de Produtos
- ✅ Criação, listagem, atualização e exclusão de produtos
- ✅ Paginação de produtos
- ✅ Busca por categoria, marca, nome
- ✅ Filtro por faixa de preço
- ✅ Filtro por marcas recomendadas (array de CarBrand)
- ✅ Controle de estoque
- ✅ Produtos vinculados automaticamente ao fornecedor do usuário logado
- ✅ Validação de permissão (apenas o dono pode editar/excluir)
- ✅ Campo "Marcas Recomendadas" (array) para associar produtos a múltiplas marcas de carros

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
- ✅ Finalizar compra (checkout) - reduz estoque e cria pedido
- ✅ Validação de estoque em tempo real

### 4. Autenticação e Autorização
- ✅ Registro de usuários (retorna userId)
- ✅ Login (retorna userId)
- ✅ Criptografia de senhas
- ✅ Autenticação via header `X-User-Id`

### 5. Consulta de Informações de Carros
- ✅ Consulta de informações de carro por placa
- ✅ Geração de dados aleatórios mas consistentes (mesma placa = mesmos dados)
- ✅ Retorna: nome, marca, modelo, ano, cor, tipo de combustível, motor, chassi e RENAVAM
- ✅ Suporte a placas antigas (ABC1234) e novas (ABC1D23)

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
- `GET /api/products` - Listar produtos (com paginação e filtro opcional por marcas recomendadas)
- `GET /api/products/{id}` - Buscar produto por ID
- `POST /api/products` - Criar produto (requer header `X-User-Id`, vinculado automaticamente ao fornecedor do usuário)
- `PUT /api/products/{id}` - Atualizar produto (requer header `X-User-Id`, apenas o dono)
- `DELETE /api/products/{id}` - Excluir produto (requer header `X-User-Id`, apenas o dono)
- `GET /api/products/category/{category}` - Produtos por categoria
- `GET /api/products/brand/{brand}` - Produtos por marca
- `GET /api/products/recommended-brand/{recommendedBrand}` - Produtos por uma marca recomendada
- `GET /api/products/recommended-brands?recommendedBrands={marca1}&recommendedBrands={marca2}` - Produtos por múltiplas marcas recomendadas
- `GET /api/products/search?name={name}` - Buscar produtos
- `GET /api/products/price-range?minPrice={min}&maxPrice={max}` - Filtrar por preço
- `GET /api/products/supplier/{supplierId}` - Produtos por fornecedor

### Carros
- `GET /api/cars/plate/{plate}` - Consultar informações de carro por placa

### Fornecedores
- `GET /api/suppliers` - Listar fornecedores
- `GET /api/suppliers/me` - Buscar fornecedor do usuário (requer header `X-User-Id`)
- `GET /api/suppliers/{id}` - Buscar fornecedor por ID
- `POST /api/suppliers` - Criar fornecedor (requer header `X-User-Id`, vinculado ao usuário)
- `PUT /api/suppliers/{id}` - Atualizar fornecedor (requer header `X-User-Id`, apenas o dono)
- `DELETE /api/suppliers/{id}` - Excluir fornecedor (requer header `X-User-Id`, apenas o dono)

### Carrinho
- `POST /api/cart/{userId}` - Criar carrinho para o usuário
- `GET /api/cart/{userId}` - Obter carrinho do usuário
- `POST /api/cart/{userId}/add?productId={id}&quantity={qty}` - Adicionar item
- `PUT /api/cart/{userId}/update?productId={id}&quantity={qty}` - Atualizar quantidade
- `DELETE /api/cart/{userId}/remove?productId={id}` - Remover item
- `DELETE /api/cart/{userId}/clear` - Limpar carrinho
- `POST /api/cart/{userId}/checkout` - Finalizar compra (reduz estoque e cria pedido)

### Pedidos
- `GET /api/orders/{userId}` - Listar pedidos do usuário (a ser implementado)

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

**Resposta:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "role": "USER",
  "firstName": "João",
  "lastName": "Silva",
  "message": "Usuário registrado com sucesso"
}
```

**Importante:** Use o `userId` retornado no header `X-User-Id` dos próximos endpoints.

### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Resposta:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "role": "USER",
  "firstName": "João",
  "lastName": "Silva",
  "message": "Login realizado com sucesso"
}
```

**Importante:** Use o `userId` retornado no header `X-User-Id` dos próximos endpoints.

### Criar Fornecedor
```json
POST /api/suppliers
Headers:
  X-User-Id: 507f1f77bcf86cd799439011
  Content-Type: application/json

Body:
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
**Nota:** 
- O fornecedor será automaticamente vinculado ao usuário informado no header `X-User-Id`
- Cada usuário pode ter apenas um fornecedor
- O `userId` deve ser obtido do endpoint de login/registro

### Buscar Meu Fornecedor
```
GET /api/suppliers/me
Headers:
  X-User-Id: 507f1f77bcf86cd799439011
```
Retorna o fornecedor vinculado ao usuário informado no header `X-User-Id`.

### Criar Produto
```json
POST /api/products
Headers:
  X-User-Id: 507f1f77bcf86cd799439011
  Content-Type: application/json

Body:
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
  "specifications": "Compatível com motores 1.0",
  "recommendedBrands": ["VOLKSWAGEN", "FIAT", "FORD"]
}
```
**Nota:** 
- O produto será automaticamente vinculado ao fornecedor do usuário informado no header `X-User-Id`
- Não é necessário informar `supplierId`
- O usuário deve ter um fornecedor criado antes de criar produtos
- O campo `recommendedBrands` é opcional e aceita um array de valores do enum CarBrand (ex: ["VOLKSWAGEN", "FIAT", "FORD"])

### Consultar Carro por Placa
```
GET /api/cars/plate/ABC1234
```

**Resposta:**
```json
{
  "plate": "ABC1234",
  "name": "Volkswagen Gol",
  "brand": "Volkswagen",
  "model": "Gol",
  "year": "2020",
  "color": "Branco",
  "fuelType": "Flex (Álcool/Gasolina)",
  "engine": "1.6",
  "chassis": "WVW123456789ABCDE",
  "renavam": "12345678901"
}
```
**Nota:**
- Aceita placas no formato antigo (ABC1234) ou novo (ABC1D23)
- Não é necessário autenticação para este endpoint

### Finalizar Compra (Checkout)
```
POST /api/cart/{userId}/checkout
```

**Resposta:**
```json
{
  "id": "order_id_here",
  "user": { ... },
  "items": [
    {
      "product": { ... },
      "quantity": 2,
      "unitPrice": 25.90,
      "totalPrice": 51.80
    }
  ],
  "totalAmount": 51.80,
  "totalItems": 2,
  "status": "CONFIRMED",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Nota:**
- O checkout valida o estoque novamente antes de finalizar
- Reduz automaticamente o estoque dos produtos
- Cria um pedido (Order) com status CONFIRMED
- Limpa o carrinho após a finalização
- Se algum produto não tiver estoque suficiente, a operação falha e nenhum estoque é reduzido

### Filtrar Produtos por Marca Recomendada
```
GET /api/products/recommended-brand/VOLKSWAGEN?page=0&size=10
```

Ou filtrar por múltiplas marcas usando o endpoint específico:
```
GET /api/products/recommended-brands?recommendedBrands=VOLKSWAGEN&recommendedBrands=FIAT&recommendedBrands=FORD&page=0&size=10
```

Ou usando o filtro opcional no endpoint principal (múltiplas marcas):
```
GET /api/products?recommendedBrands=VOLKSWAGEN&recommendedBrands=FIAT&page=0&size=10
```

**Marcas disponíveis:** VOLKSWAGEN, FIAT, FORD, CHEVROLET, RENAULT, TOYOTA, HONDA, HYUNDAI, NISSAN, PEUGEOT, CITROEN, MERCEDES_BENZ, BMW, AUDI, VOLVO, JEEP, MITSUBISHI, KIA, SUZUKI, MAZDA, SUBARU, LAND_ROVER, JAGUAR, PORSCHE, FERRARI, LAMBORGHINI, MASERATI, ALFA_ROMEO, MINI, SMART, RAM, DODGE, CHRYSLER, CADILLAC, LINCOLN, INFINITI, ACURA, LEXUS, TESLA, BYD, CHERY, JAC, LIFAN, TAC, GREAT_WALL, CAOA_CHERY, IVECO, SCANIA, MAN, MERCEDES_BENZ_TRUCKS

### Criar Carrinho
```
POST /api/cart/user_id_here
```

**Resposta:**
```json
{
  "id": "cart_id_here",
  "user": { ... },
  "items": [],
  "totalAmount": 0.00,
  "totalItems": 0,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Nota:**
- Cria um carrinho vazio para o usuário especificado
- Se já existir um carrinho para o usuário, retorna erro
- O carrinho também é criado automaticamente ao adicionar o primeiro item

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
- `user_id`: ID de um usuário (obtido na resposta do login/registro)

### Fluxo de Teste Recomendado

1. **Autenticação**: 
   - Registre um usuário ou faça login
   - **Copie o `userId` da resposta** e atualize a variável `user_id` no Postman
   - Todos os endpoints que criam/atualizam/excluem recursos usam o header `X-User-Id` automaticamente
   
2. **Fornecedores**: 
   - Crie um fornecedor usando `POST /api/suppliers` (usa `X-User-Id` do environment)
   - Use `GET /api/suppliers/me` para buscar seu fornecedor
   - Copie o `supplier_id` para a variável do environment
   
3. **Produtos**: 
   - Crie produtos usando `POST /api/products` (usa `X-User-Id` do environment)
   - Produtos são vinculados automaticamente ao seu fornecedor
   - Não é necessário informar `supplierId`
   - Copie o ID do produto para a variável `product_id`
   
4. **Carrinho**: Use o `user_id` e `product_id` para testar o carrinho

### Autenticação via Header

**Importante:** O sistema usa autenticação via header `X-User-Id` ao invés de tokens JWT. 

- Após fazer login ou registrar, você recebe um `userId` na resposta
- Use esse `userId` no header `X-User-Id` em todas as requisições que criam/atualizam/excluem recursos
- A collection do Postman já está configurada para usar a variável `{{user_id}}` automaticamente

### Fluxo de Negócio

O sistema segue o seguinte fluxo:
1. **Usuário** faz login/registro → recebe `userId` na resposta
2. **Usuário** usa o `userId` no header `X-User-Id` para criar um **Fornecedor** (vinculado automaticamente)
3. **Usuário** usa o `userId` no header `X-User-Id` para criar **Produtos** (vinculados automaticamente ao seu fornecedor)
4. **Clientes** podem adicionar produtos ao **Carrinho** e fazer compras

**Regras importantes:**
- Cada usuário pode ter apenas um fornecedor
- Produtos são criados automaticamente vinculados ao fornecedor do usuário informado no header `X-User-Id`
- Apenas o dono do fornecedor/produto pode editar ou excluir
- O header `X-User-Id` é obrigatório para endpoints que criam/atualizam/excluem recursos
- O `userId` é obtido na resposta do login/registro

## Próximos Passos

1. ✅ Configurar credenciais do MongoDB
2. Executar testes da aplicação
3. Implementar testes unitários
4. Adicionar documentação Swagger/OpenAPI
5. Implementar sistema de pedidos
6. Adicionar notificações por email