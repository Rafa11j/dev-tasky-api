# Dev Tasky - Back-end

## Preparando ambiente

Instalando as dependências:

```bash
yarn install
```

Crie um banco de dados

Crie um arquivo `.env` copiando do arquivo `.env.sample`:

Execute o comando para rodar as migrations:

```bash
yarn typeorm migration:run
```

Por fim execute o comando:

```bash
yarn dev
```

