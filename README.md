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

```sh
yarn
# ou
npm install
```

- Inicie o app

```sh
yarn run start
# ou
npm run start
```

- Abra o browser na url

```text
http://localhost:8085/
```

- Para obter um nome sorteado, basta fazer uma requisição para a URL abaixo

```text
http://localhost:8085/draw
```

- Para obter o nome do último sorteado

```text
http://localhost:8085/last-draw
```

- Resetar a lista dos sorteados

```text
http://localhost:8085/reset
```

- Tornar o app executável no windows

Instalar

```sh
npm install -g pkg
```

Empacotar a aplicação para Windows

```sh
npm run pkg-windows
```

Executar o executável

```sh
./prayer-family.exe
```

- Authors

[**Diorgenes Morais**](https://github.com/diorgenesmorais)

