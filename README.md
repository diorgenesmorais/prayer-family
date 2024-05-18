# Prayer family

> Sorteio de nomes para família de oração

**Antes de executar**:

- Salve no diretório data/entries.json uma lista de nome seguindo a seguinte estrutura:

```json
[
  {
    "name": "Nome da pessoa",
    "status": "active"
  }
]
```

- Instale as dependência

```bash
yarn
# ou
npm install
```

- Inicie o app

```bash
yarn run start
# ou
npm run start
```

- Para obter um nome sorteado, basta fazer uma requisição para a URL abaixo

```text
http://localhost:8080/draw
```

- Authors

[**Diorgenes Morais**](https://github.com/diorgenesmorais)

