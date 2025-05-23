# Fetch-Auaus
Aplicativo feito utilizando o framework Expo e a API DogAPI

O app mostra imagens aleatórias de cachorrinhos, que podem ser favoritadas (os favoritos são salvos localmente) e desfavoritadas.

Funcionalidades:
- Visualizar imagens aleatórias de cachorrinhos;
- Favoritar suas imagens preferidas;
- Visualizar seus favoritos e removê-los quando quiser;
- Os arquivos são salvos localmente


Estrutura do projeto:
```markdown 
fetch-auaus/
├── assets/                  # Arquivos de mídia
├── App.js                   # Componente principal
├── app.json                 # Configuração do Expo
├── package.json             # Dependências
└── README.md                # Documentação
```

Como executar o projeto:

Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/fetch-auaus.git
```

2. Acesse a pasta do projeto
```bash
cd fetch-auaus
```

3. Instale as dependências 
```bash
npm install 
```

3. Iniciar
```bash
expo start
```
Por fim, escanear o QR code com Expo Go (Android) ou a Câmera (iOS)


Tela inicial (ao abrir o app)
![Tela inicial](./assets/img1.jpeg)

Tela de carregamento (após clicar no botão "mais auaus")
![Tela carregamento](./assets/img2.jpeg)

Alert indicando que a imagem foi salva (após clicar no botão de salvar)
![Tela favoritado](./assets/img3.jpeg)

Tela de imagens favoritas (após clicar no botão "meus auaus favoritos")
![Tela favoritos](./assets/img4.jpeg)

Alert indicando que a imagem foi removida dos favoritos (após clicar na latinha de lixo)
![Tela removido](./assets/img5.jpeg)

Tela de favoritos quando vazia
![Tela favoritos vazio](./assets/img6.jpeg)