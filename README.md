# TRABALHO PRÁTICO A2 - API Marketplace (ADS28)

[Projeto-final-BackEnd/ at main · SarahEvelyn2005/Projeto-final-BackEnd https://share.google/zFZXfhJh24P07gACO](start_span)Este repositório contém o código-fonte da API REST desenvolvida para a disciplina de **Construção de Backend**, ministrada pelo Prof. Gustavo Clay[span_0](end_span).

O projeto consiste em um backend para um **Marketplace (E-commerce)**, onde é possível gerenciar usuários, produtos, pedidos, pagamentos e avaliações. [span_1](start_span)[span_2](start_span)O sistema implementa validações rigorosas, relacionamentos entre entidades e boas práticas de arquitetura MVC[span_1](end_span)[span_2](end_span).

## [span_3](start_span)🛠 Tecnologias Utilizadas[span_3](end_span)

* **Node.js** & **Express**: Estrutura base da API.
* **[span_4](start_span)MongoDB Atlas**: Banco de dados NoSQL em nuvem[span_4](end_span).
* **[span_5](start_span)Mongoose**: ODM para modelagem de dados e relacionamentos[span_5](end_span).
* **[span_6](start_span)[span_7](start_span)Yup**: Middleware para validação de dados de entrada[span_6](end_span)[span_7](end_span).
* **[span_8](start_span)Dotenv**: Gerenciamento de variáveis de ambiente[span_8](end_span).
* **[span_9](start_span)Git/GitHub**: Versionamento e colaboração[span_9](end_span).

---

## 🗂 Modelagem de Dados

[span_10](start_span)[span_11](start_span)O banco de dados conta com **10 Collections** relacionadas, atendendo ao requisito de complexidade do projeto[span_10](end_span)[span_11](end_span).

### Diagrama ER
> *[span_12](start_span)[span_13](start_span)O diagrama completo de Entidade-Relacionamento encontra-se na pasta `/docs` deste repositório.*[span_12](end_span)[span_13](end_span)

![Diagrama do Banco de Dados](./docs/diagrama-banco.png)

### [span_14](start_span)Estrutura das Collections[span_14](end_span)
1.  **Users**: Clientes e Vendedores (Admin/Customer/Seller).
2.  **Addresses**: Endereços de entrega (Relacionamento: `User`).
3.  **Products**: Itens do catálogo (Relacionamento: `User` - Vendedor).
4.  **Categories**: Categorização de produtos.
5.  **Suppliers**: Fornecedores externos.
6.  **Orders**: Pedidos de compra (Relacionamento: `User`, `Product` e `Address`).
7.  **Payments**: Controle financeiro (Relacionamento: `Order`).
8.  **Coupons**: Sistema de descontos.
9.  **Reviews**: Avaliações de produtos (Relacionamento: `User`, `Product`).
10. **Wishlists**: Lista de desejos (Relacionamento: `User`, `Product`).

---

## [span_15](start_span)🚀 Instalação e Execução[span_15](end_span)

### Pré-requisitos
* Node.js (v18+)
* NPM ou Yarn

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
    [span_16](start_span)Crie um arquivo `.env` na raiz do projeto baseando-se no arquivo `.env.example` fornecido[span_16](end_span).
    
    ```ini
    # .env
    PORT=3000
    MONGO_URI=mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/NOMEDOBANCO
    ```
    > **[span_17](start_span)Nota:** O arquivo `.env` contendo as credenciais reais não é versionado por segurança[span_17](end_span).

4.  **Execute o projeto:**
    ```bash
    npm run dev
    ```
    A API estará rodando em: `http://localhost:3000`

---

## [span_18](start_span)📡 Principais Endpoints[span_18](end_span)

[span_19](start_span)A documentação completa, incluindo exemplos de JSON (Body) e respostas, pode ser importada no **Postman** através do arquivo `.json` disponível na raiz deste projeto[span_19](end_span).

| Recurso | Método | Rota | Descrição |
| :--- | :--- | :--- | :--- |
| **Usuários** | `POST` | `/users` | Cria usuário (Validação Yup: email, CPF) |
| | `GET` | `/users` | Lista todos os usuários |
| **Produtos** | `POST` | `/products` | Cria produto vinculado a um vendedor |
| | `GET` | `/products` | Lista produtos (Populate: User) |
| **Pedidos** | `POST` | `/orders` | Cria pedido com array de itens |
| | `GET` | `/orders` | Lista pedidos (Populate completo) |
| **Categorias**| `POST` | `/categories`| Cria nova categoria |

---

## [span_20](start_span)[span_21](start_span)👥 Integrantes e Contribuições[span_20](end_span)[span_21](end_span)

Abaixo descrevemos a participação de cada membro na construção do projeto, issues resolvidas e funcionalidades implementadas.

### 1. Sarah Evelyn (Líder Técnico)
* **GitHub:** ``
* **Contribuições:**
    * Configuração inicial do servidor (Express), conexão com MongoDB Atlas e estrutura de pastas MVC.
    * Implementação do **CRUD de Users e Orders** e **Auth Logic**.
    * Criação dos Middlewares de Validação base (Yup) para reutilização.
    * Criaçao dos Models para padronização
    * Gerenciamento de Merge Requests e revisão de código principal.

### 2. Rhuan Justino
* **GitHub:** ``
* **Contribuições:**
    * Desenvolvimento do **CRUD de Orders** (Lógica complexa de carrinhos/itens).

---

**[span_22](start_span)Data de Entrega:** 21/11[span_22](end_span)
