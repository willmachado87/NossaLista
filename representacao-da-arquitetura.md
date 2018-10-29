# Representação da Arquitetura

## Modelo de Arquitetura
O modelo de arquitetura Utilizado foi MVC onde o próprio Ionic(Angular) já trabalha.

![Arquitetura da Solução](https://raw.githubusercontent.com/willmachado87/NossaLista/master/imagens/arqGeral.jpeg)

## Visão Lógica
* Como o sistema trabalha com a arquitetura MVC todas as paginas do sistema possuem controlador(controller), modelo(model) e visão(view).
Na imagem abaixo podemos verificar como foi estruturado o projeto.
Na pasta src/pages é o local onde todas telas(paginas) são guardadas junto com seus recpectivos MVC
Neste exemplo temos a tela de login onde:
login.module é o model
login.html é a view
login.ts é o controller
![Arquitetura da Solução](https://raw.githubusercontent.com/willmachado87/NossaLista/master/imagens/mvc.jpg)

### Diagrama de Classes
![Arquitetura da Solução](https://raw.githubusercontent.com/willmachado87/NossaLista/master/imagens/diagramaClass.jpg)

### Banco de Dados
O banco de dados firestore organiza seus dados por coleção,documento e dados sendo que
a coleção e onde será armazenado todos dados necessários de um documento e este documento 
possui dados. 
Ex: listas(coleção) > uid(documento) > nome da lista, usuários e etc(dados)
![Arquitetura da Solução](https://raw.githubusercontent.com/willmachado87/NossaLista/master/imagens/firebaseschea.jpg)

