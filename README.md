# Task Manager - API

Projeto tem por finalidade exercitar o conteúdo visto no curso de NodeJs na Rocketseat.

Foi disponibilizado um template com as assinaturas das rotas, e do middleware para serem  implementados.

No template existe também testes que ajudaram no desenvolvimento do app.

# Funcionalidades - API

Cria um usuário com `name` e `username`, Faz o CRUD de *todos*:

- Criar um novo *todo*;
- Listar todos os *todos*;
- Alterar o `title` e `deadline` de um *todo* existente;
- Marcar um *todo* como feito;
- Excluir um *todo*;

# Executado nas Rotas

- POST `/users` ⇒ Rota recebe `name`, e `username` dentro do corpo da requisição. Ao cadastrar um novo usuário, é armazenado dentro de um objeto no formato:

```jsx
{ 
	id: 'uuid', // precisa ser um uuid
	name: 'Danilo Vieira', 
	username: 'danilo', 
	todos: []
}
```

- GET `/todos` ⇒ Rota recebe pelo header da requisição, uma propriedade `username` contendo o username do usuário e retornar uma lista com todas as tarefas desse usuário.

- POST `/todos`⇒ Rota recebe `title` e `deadline` dentro do corpo da requisição e uma propriedade `username` contendo o username do usuário dentro do header da requisição. Ao criar um novo *todo*, ele é armazenado dentro da lista `todos` do usuário que está criando essa tarefa. Cada tarefa esta no seguinte formato:

```jsx
{ 
	id: 'uuid', // precisa ser um uuid
	title: 'Nome da tarefa',
	done: false, //sempre false ao criar um todo
	deadline: '2021-02-27T00:00:00.000Z', 
	created_at: '2021-02-22T00:00:00.000Z'
}
```

- PUT `/todos/:id` ⇒ A rota recebe pelo header da requisição, uma propriedade `username` contendo o username do usuário e recebe as propriedades `title` e `deadline` dentro do corpo. É alterado **apenas** o `title` e o `deadline` da tarefa que possua o `id` igual ao `id` presente nos parâmetros da rota.

- PATCH `/todos/:id/done` ⇒ A rota recebe pelo header da requisição, uma propriedade `username` contendo o username do usuário e alterar a propriedade `done` para `true` no *todo* que possuir um `id` igual ao `id` presente nos parâmetros da rota.

- DELETE `/todos/:id` ⇒ A rota recebe pelo header da requisição, uma propriedade `username` contendo o username do usuário e excluir o *todo* que possuir um `id` igual ao `id` presente nos parâmetros da rota.

# Tecnologias Utilizadas

- NodeJs
- Express
- uuid
- Nodemon (dependência de desenvolvimento)

# Instalação e Execução

- Faça o clone do repositório com o comando git clone;
- use o comando npm/yarn no terminal para instalar as dependências.
