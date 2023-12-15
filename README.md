# 20232BSET03P2

Inteli - Engenharia de Software | Avaliação 2023-2B P2

Prova Alan Rozensztajn Schipper

Vulnerabilidades Identificadas

SQL Injection:
-Vulnerabilidade a ataques de SQL Injection nas rotas de inserção de dados, como por exemplo as rotas de insercao de /cats estava com insercao direta de valores, o que torna vulneravel a SQL Injection

Tratamento de Erros Inadequado:
-Tratamento de erros insuficiente que poderia vazar detalhes da implementação.

Lógica de Votação Insegura:
-A votação estava sem verificação da existência do registro do animal, esta na parte de /vote/ :animalType:id , onde não verificarva se o animal existia antes de registrar o voto

Métodos não estavam completos, como por exemplo o de:
-As rotas GET e POST para /dogs estavam incompletas.

O que eu implementei?

-Inseri uma função que exige que o usuario bote um nome como uma verificação de seguranca "Insert name" e mostra um codigo de erro de 400 caso nao seja posto o nome, e melhora pois anteriormente estava duplicado as rotas post pra gatos e cachorros

-Mudei a forma que as tabelas são criadas com o ID de Interger primaru key pra melhorar a seguranca e facilitar a identificacao e insercacao de regsitros sql

-Melhorei a seguranca mudando a inserção de dados de interpolacao de string o que gera a vulnerabilidades do sql com a insercao sendo feito apenas com placeholders o que evita a injecao

-Inseri uma funcao de tipo do animal onde verificar o tipo de animal e verificar se ele já existe atraves dos IDS

-Na parte de sanitizacao utilizao "prepared statenebts" com paramentros na rota POST para /cats, o que faz a protecao contra o SQL injection de inserir novos registros de gatos

-Fiz a implementação da rota de Post get para /dogs, que estavam incompletas, o que permite a insercao de novos registros de cachorros e a recuperacao de todos os registros de caes no banco de dados e usei a mesma logica de seguranca que apliquei na parte de gatos.

-Funcao para que caso a pessao insira um gato ou cachorro com uma ID não existente ele retorno se foi um "gato" ou "cachorro" e a sua ID representando que ele nao existe.
