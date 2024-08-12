# FTS Semeso

## Sumário:
1. Sumário
2. Introdução
3. Ambiente necessário
4. Criação do banco de dados
5. Tópicos do Minicurso

## Introdução:
Este repositório foi criado para manter arquivos referentes ao minicurso ministrado pelo autor na edição do SEMESO que irá acontecer no segundo semestre de 2024. O assunto deste minicurso é "Full Text Search e buscas textuais avançadas no PostgreSQL".

Este arquivo tem o intuito de introduzir o visitante ao projeto e conduzi-lo quanto aos pré-requisitos e demais etapas introdutórias. Assuntos mais expecificos referentes ao Full Text Search ou temas que estão neste repositório porém não foram tratados neste arquivo serão apresentados no minicurso.

## Ambiente necessário
O ambiente de desenvolvimento utilizado pelo author deste projeto é o seguinte:
- PgAdmin4
- PostgreSQL v.16

Recomendo que seu computador possua os dois software com as mesmas versões utilizadas na máquina do autor. Caso não seja possível, os requisitos minimos são:
- PgAdmin3
- PostgreSQL v.12 ou superior

## Criação do banco de dados
1. Abra o PgAdimin e crie um novo banco de dados no schema public ``Servers >> [SELECIONE O SEU SERVER] >> Databases >> Create >> Database...``. Você pode chama-lo de BBCNews;
2. Abra uma "Query Tool" e insira o sequinte comando para criar a tabela:
    ```sql
    /*CRIANDO TABELA TBNEWS COM SUAS SEQUENCES E SUAS CONSTRAINTS*/
    CREATE SEQUENCE tbnews_newid_seq;
    CREATE TABLE tbnews(
        newid BIGINT NOT NULL DEFAULT NEXTVAL('tbnews_newid_seq'),
        newtitle VARCHAR NOT NULL,
        newpubdate TIMESTAMP NOT NULL,
        newguid VARCHAR NOT NULL,
        newlink VARCHAR NOT NULL,
        newdescription TEXT NOT NULL,
        CONSTRAINT pk_tbnews PRIMARY KEY (newid)
    );
    ALTER SEQUENCE tbnews_newid_seq OWNED BY tbnews.newid;

    /*CRIANDO TABELA TBAUTHOR COM SUAS SEQUENCES E SUAS CONSTRAINTS*/
    CREATE SEQUENCE tbauthor_autid_seq;
    CREATE TABLE tbauthor(
        autid INTEGER NOT NULL DEFAULT NEXTVAL('tbauthor_autid_seq'),
        autname VARCHAR(100) NOT NULL,
        CONSTRAINT pk_tbauthor PRIMARY KEY (autid)
    );
    ALTER SEQUENCE tbauthor_autid_seq OWNED BY tbauthor.autid;

    /*CRIANDO TABELA TBNEWSAUTHOR COM SUAS CONSTRAINTS*/
    CREATE TABLE tbnewsauthor(
        newid BIGINT NOT NULL,
        autid INTEGER NOT NULL,
        CONSTRAINT pk_tbnewsauthor PRIMARY KEY (newid, autid),
        CONSTRAINT fk_tbnewsauthor_tbnews FOREIGN KEY (newid) REFERENCES tbnews (newid) ON DELETE CASCADE,
        CONSTRAINT fk_tbnewsauthor_tbauthor FOREIGN KEY (autid) REFERENCES tbauthor (autid) ON DELETE CASCADE
    );
    ```
3. Vá em [data](https://github.com/LucaseNogueira/FTS_Semeso/blob/main/doc/data/tbauthor.csv) e baixe os arquivos [tbauthor](https://github.com/LucaseNogueira/FTS_Semeso/blob/main/doc/data), [tbnews](https://github.com/LucaseNogueira/FTS_Semeso/blob/main/doc/data/tbnews.csv), [tbnewsauthor](https://github.com/LucaseNogueira/FTS_Semeso/blob/main/doc/data/tbnewsauthor.csv);
4. Retorne ao PGAdmin, precione o botão direito na tabela ``tbauthor`` e clique em ``Import\Export Data..``. Selecione o arquivo "tbauthor.csv", formato csv e encoding UTF8. Clique em "OK";
5. Repita o processo da **etapa 4**, porém com as tabelas/arquivos "tbnews" e "tbnewsauthor";
6. Pronto, é só isso!!! :D

## Tópicos do Minicurso
1. Introdução:
    - O que é Full Text Search (FTS);
    - Diferença entre FTS e buscas por palavras chaves tradicionais;
    - Casos de uso comum para FTS;
    - Cases, exemplos reais de empresas ou projetos que utilizaram o FTS como solução;

2. Conceitos Fundamentais:
    - Aprofundando em lexemes, dicionários e stop words;
    - Tokenização, quebra de texto em tokens;
    - Como funciona ts_query e ts_vector;
    - Indexação de dados para melhorar a performance;

3. Revisando alguns assuntos:
    - Functions;
    - Triggers;
    - Stored Procedures;
    - Regex

4. Praticando FTS numa base de dados