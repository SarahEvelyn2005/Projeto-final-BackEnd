# TRABALHO PRÁTICO A2 - API Marketplace (ADS28)

[[Projeto final](https://github.com/SarahEvelyn2005/Projeto-final-BackEnd)]Este repositório contém o código-fonte da API REST desenvolvida para a disciplina de **Construção de Backend**, ministrada pelo Prof. Gustavo Clay[cite: 1, 2].

O projeto consiste em um backend para um **Marketplace (E-commerce)**, onde é possível gerenciar usuários, produtos, pedidos, pagamentos e avaliações. O sistema implementa validações rigorosas, relacionamentos entre entidades e boas práticas de arquitetura MVC[cite: 56, 4].

## 🛠 Tecnologias Utilizadas [cite: 69]

- **Node.js** & **Express**: Estrutura base da API.
- **MongoDB Atlas**: Banco de dados NoSQL em nuvem[cite: 17].
- **Mongoose**: ODM para modelagem de dados e relacionamentos[cite: 20].
- **Yup**: Middleware para validação de dados de entrada[cite: 6, 49].
- **Dotenv**: Gerenciamento de variáveis de ambiente[cite: 19].
- **Git/GitHub**: Versionamento e colaboração[cite: 9].

---

## 🗂 Modelagem de Dados

O banco de dados conta com **10 Collections** relacionadas, atendendo ao requisito de complexidade do projeto.

### Diagrama ER

> _O diagrama completo de Entidade-Relacionamento encontra-se na pasta `/docs` deste repositório._

![Diagrama do Banco de Dados](./docs/diagrama-banco.png)

### Estrutura das Collections

1.  **Users**: Clientes e Vendedores (Admin/Customer/Seller). **(Pronto)**
2.  **Addresses**: Endereços de entrega (Relacionamento: `User`). **(fazendo)**
3.  **Products**: Itens do catálogo (Relacionamento: `User` - Vendedor).**(Pronto)**
4.  **Categories**: Categorização de produtos.
5.  **Suppliers**: Fornecedores externos.
6.  **Orders**: Pedidos de compra (Relacionamento: `User`, `Product` e `Address`).**(Pronto)**
7.  **Payments**: Controle financeiro (Relacionamento: `Order`). **(fazendo)**
8.  **Coupons**: Sistema de descontos.
9.  **Reviews**: Avaliações de produtos (Relacionamento: `User`, `Product`).
10. **Wishlists**: Lista de desejos (Relacionamento: `User`, `Product`).

---

##🚀 Instalação e Execução

### Pré-requisitos

- Node.js (v18+)
- NPM ou Yarn

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/SEU_USUARIO/NOME_DO_REPO.git](https://github.com/SEU_USUARIO/NOME_DO_REPO.git)
    cd NOME_DO_REPO
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto baseando-se no arquivo `.env.example` fornecido.

    ```ini
    # .env
    PORT=3000
    MONGO_URI=mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/NOMEDOBANCO
    ```

    > **Nota:** O arquivo `.env` contendo as credenciais reais não é versionado por segurança.

4.  **Execute o projeto:**
    ```bash
    npm run dev
    ```
    A API estará rodando em: `http://localhost:3000`

---

## 📡 Principais Endpoints [cite: 72]

A documentação completa, incluindo exemplos de JSON (Body) e respostas, pode ser importada no **Postman** através do arquivo `.json` disponível na raiz deste projeto.

| Recurso        | Método | Rota          | Descrição                                |
| :------------- | :----- | :------------ | :--------------------------------------- |
| **Usuários**   | `POST` | `/users`      | Cria usuário (Validação Yup: email, CPF) |
|                | `GET`  | `/users`      | Lista todos os usuários                  |
| **Produtos**   | `POST` | `/products`   | Cria produto vinculado a um vendedor     |
|                | `GET`  | `/products`   | Lista produtos (Populate: User)          |
| **Pedidos**    | `POST` | `/orders`     | Cria pedido com array de itens           |
|                | `GET`  | `/orders`     | Lista pedidos (Populate completo)        |
| **Categorias** | `POST` | `/categories` | Cria nova categoria                      |

---

## 👥 Integrantes e Contribuições

Abaixo descrevemos a participação de cada membro na construção do projeto, issues resolvidas e funcionalidades implementadas.

### 1. Sarah Evelyn (Líder Técnico)

- **GitHub:** `@SarahEvelyn2005`
- **Contribuições:**
  - Configuração inicial do servidor (Express), conexão com MongoDB Atlas e estrutura de pastas MVC.
  - Implementação do **CRUD de Users e Orders** e **Auth Logic**.
  - Criação dos Middlewares de Validação base (Yup) para reutilização.
  - Gerenciamento de Merge Requests e revisão de código principal.
  - Desenvolvimento do **CRUD de Payments** e integração com pedidos.
  - Implementação de relacionamento avançado (`populate`) nas rotas de venda.

### 2. Rhuan Justino

- **GitHub:** `@RhuanJSouza`
- **Contribuições:**
  - Desenvolvimento do **CRUD de Orders** (Lógica complexa de carrinhos/itens).

### 3. Pablo Sousa

- **GitHub:** `@ pablo-sousaa`
- **Contribuições:**
  - Responsável pela **Modelagem de Dados** e criação do Diagrama ER.
  - Implementação de filtros de busca de produtos.

### 4. Raphael Alves

- **GitHub:** `@Raphael999-lab’s `
- **Contribuições:**

### 5. Luis Matias

- **GitHub:** `@luisvmatias`
- **Contribuições:**

---

**Data de Entrega:** 21/11
