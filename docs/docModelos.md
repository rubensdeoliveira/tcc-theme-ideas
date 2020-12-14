# **UNIVERSIDADE FEDERAL DO RIO GRANDE DO NORTE**

### **CENTRO DE ENSINO SUPERIOR DO SERIDÓ**

### **DEPARTAMENTO DE COMPUTAÇÃO E TECNOLOGIA**

### **CURSO DE BACHARELADO EM SISTEMAS DE INFORMAÇÃO**

**Jaine de Senna Santos**
**José Rubens de Oliveira Junior**
**Maria das Graças Dias Amorim**

## **TCC Theme Ideas: Modelo Conceitual e Modelo de Dados**

**Caicó – RN**
**2020**

---
<div id='sumario'/>
## Sumário

- [**TCC Theme Ideas: Modelo Conceitual e Modelo de Dados**](#tcc-theme-ideas-modelo-conceitual-e-modelo-de-dados)
- [Sumário](#sumário)
- [Descrição](#descrição)
  - [**Histórico de Revisões**](#histórico-de-revisões)
- [Modelo Conceitual](#modelo-conceitual)
- [Modelo de Dados](#modelo-de-dados)

<div id='descricao'/>

## Descrição

Este documento descreve o modelo conceitual do software que é composto por um conjunto de Entidades e seus relacionamentos. No decorrer do desenvolvimento da aplicação web TCC Theme Ideas este documento servirá de referência para a codificação do banco de dados, bem como para a compreensão pelo cliente de como funcionará as relações de dados dentro do sistema em uma linguagem de fácil compreensão a todos os envolvidos.

<div id='revisoes'/>

### **Histórico de Revisões**

| Data       | Versão | Descrição                                                              | Autor                           |
| :--------- | :----: | :--------------------------------------------------------------------- | :------------------------------ |
| 14/12/2020 |  1.0   | Cabeçalho, descrição do documento,sumário, modelo conceitual e dicionário de dados;  | Jaine, José Rubens e Maria |


<div id ='conceitual' />

## Modelo Conceitual
![Modelo conceitual](/docs/img/modeloConceitual.png)
## Dicionário de dados
### Usuário(users)

| Nome | Descrição | Tipo de dado | Tamanho | Restrições |
|------|-----------|--------------|---------|------------|
|**id**|Identificação do usuário|uuid|-|PK / Identity|
|**name**|Nome do usuário|Varchar|256|Not Null|
|**surname**|Sobrenome do usuário|Varchar|256|Not Null|
|**type**|Tipo de usuário|Varchar|256|Not Null|
|**avatar**|Foto de perfil do usuário|Varchar|256|-|
|**email**|E-mail do usuário|Varchar|256|Unique / Not Null|
|**password**|Senha do usuário|Varchar|256|Not Null|
|**created_at**|Data que o usuário foi criado|timestamp|-|Not Null|
|**updated_at**|Data que o usuário atualizou suas informações  |timestamp|-|Not Null|

### Tema(tcc_themes)

| Nome | Descrição | Tipo de dado | Tamanho | Restrições |
|------|-----------|--------------|---------|------------|
|**id**|Identificação do tema do TCC|uuid|-|PK / Identityl|
|**course**|Curso que o usuário está cursando/dar aula|Varchar|256|Not Null|
|**suggestion**|Sugestão de tema para o TCC|Varchar|256|Unique e Not Null|
|**description**|Uma breve descrição do tema do TCC sugerido|Varchar|256|Not Null|
|**area**|Área que está relacionada ao tema do TCC sugerido|Varchar|256|Not Null|
|**links**|Links de artigos sugerido para ajudar com o tema|Varchar|256|-|
|**user_id**| Chave estrangeira que relaciona tema com usuário |uuid|-|FK|


### Usuários-Temas(users_tccs)
| Nome | Descrição | Tipo de dado | Tamanho | Restrições |
|------|-----------|--------------|---------|------------|
|**user_id**|Chave estrangeira que relaciona vários usuários com vários temas|uuid|-|FK|
|**tcc_id**|Chave estrangeira que relaciona vários temas com vários usuários|uuid|-|FK|
