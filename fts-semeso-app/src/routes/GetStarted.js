import SQLBlockComponent from "../components/CodeBlocks/SQLBlockComponent";
import MainContainer from "../components/Main/MainContainer"; 

function GetStarted(){
    return( 
        <MainContainer className="container"> 
            <article className="row">
                <div className="col-12">
                    <h2>Antes de tudo...</h2>
                    <p dangerouslySetInnerHTML={{__html:"Esta página aborda conceitos <b>fundamentais do Full Text Search</b>. Para aplicar estes conceitos foi adaptado uma base chamada <a href='https://www.kaggle.com/datasets/gpreda/bbc-news' target='_blank' rel='noopener noreferrer'>BBC News</a>, presente no Kaggle. Você pode seguir os passos deste tópico para conseguir esta base de dados adaptada ou aplicar os conhecimentos aprendidos em outra base de dados de sua escolha. Caso escolha aplicar os conhecimentos desta página em outra base de dados, este tópico pode ser ignorado e você pode avançar para o tópico '<b>O que é um documento?</b>'."}}/>
                    <ol>
                        <li dangerouslySetInnerHTML={{__html:"Abra o <b>PgAdmin</b> e crie um novo banco de dados no <b><i>schema public</i></b>: <code>Servers >> [SELECIONE O SEU SERVER] >> Databases >> Create >> Database...</code>. Caso queira, você pode chamar este banco de <b>BBCNews</b>;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Abra um <b><i>Query Tool</i></b> e insira o seguinte comando para criar as tabelas:"}}/>
                        <SQLBlockComponent conteudo="
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
                        "/>
                        <li dangerouslySetInnerHTML={{__html:"Acesse a pasta <a href='https://github.com/LucaseNogueira/FTS_Semeso/blob/main/doc/data' target='_blank' rel='noopener noreferrer'>data</a> deste repositório e realize o <b><i>download</i></b> dos arquivos <b><i>CSV</i></b> <a href='https://github.com/LucaseNogueira/FTS_Semeso/blob/main/doc/data/tbauthor.csv' target='_blank' rel='noopener noreferrer'>tbauthor</a>, <a href='https://github.com/LucaseNogueira/FTS_Semeso/blob/main/doc/data/tbnews.csv' target='_blank' rel='noopener noreferrer'>tbnews</a> e <a href='https://github.com/LucaseNogueira/FTS_Semeso/blob/main/doc/data/tbnewsauthor.csv' target='_blank' rel='noopener noreferrer'>tbnewsauthor</a>"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Retorne ao <b>PGAdmin</b>, pressione o botão direito na tabela <code>tbauthor</code> e clique em <code>Import/Export Data..</code>. Selecione o arquivo <b><i>tbauthor.csv</i></b>, informe como formato <b><i>CSV</i></b> e como <i>encoding <b>UTF8</b></i>. Clique em <b>OK</b>;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Repita o processo da <b>Etapa 4</b>, porém com as tabelas/arquivos <b><i>tbnews</i></b> e <b><i>tbnewsauthor</i></b>;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Pronto, é só isso!!! :D"}}/>
                    </ol>

                    <h2>O que é um documento?</h2>
                    <p dangerouslySetInnerHTML={{__html:"Um <b>documento</b>, no <b>Full Text Search</b>, é um conteúdo textual. Uma combinação de atributos textuais oriundos de uma tabela ou diferentes tabelas (<b><a href='https://www.youtube.com/watch?v=wWeD0xZZsyo' target='_blank' rel='noopener noreferrer'>Oleg Bartunov - PGConf India</a></b>). Pode ser interpretado como uma unidade pesquisada pelo FTS, podendo ter como origem um artigo ou uma mensagem de e-mail. A intenção do Full Text Search é transformar o conteúdo de um documento em <b><i>lexemes</i></b>, radical de uma palavra, que estão associadas ao documento e podem ser trabalhadas com mais facilidade."}}/>
                    <img src="/img/article/get_started/Documento para Lexeme.png" alt="Documento para Lexeme" className="d-block mx-auto mt-4 mb-4"/>

                    <h2>O que é um Lexeme?</h2>
                    <p dangerouslySetInnerHTML={{__html:"É um termo linguístico equivalente a raiz, radical ou base lexical de uma palavra. Uma das funções do FTS é <b>encontrar o lexeme de uma palavra</b>."}}/>
                    <img src="/img/article/get_started/Estrutura da palavra.png" alt="Estrutura de uma palavra" className="d-block mx-auto mt-4 mb-4"/>

                    <h2>O que são Stop Words?</h2>
                    <p dangerouslySetInnerHTML={{__html:"Stop word pode ser interpretado como palavras muito frequentes no <b>vocabulário</b> de uma determinada língua ou região. Por ser tão comum, estas palavras são <b>irrelevantes</b> para o conjunto de resultados do Full Text Search. Num vocabulário, exemplo português brasileiro, é comum termos como stop words palavras como <b>de</b>, <b>a</b>, <b>com</b>, <b>sem</b>. Assim é possível concluir que as palavras consideradas como stop words pelos motores de buscas são, na maioria dos casos, <b>conjunções, preposições e outras palavras</b>."}}/>

                    <h2>O que é um Dicionário?</h2>
                    <p dangerouslySetInnerHTML={{__html:"Quando falamos de <b>Text Search</b>, dicionários são utilizados na <b>eliminação das stop words</b>, na <b>aplicação do stemming</b> (processo que <i>'reduz'</i> a palavra em radical) e na localização de <b>sinônimos</b>, auxiliando na criação do <b>vetor de lexemes</b>. No PostgreSQL, esta configuração é definida pela variável <code>default_text_search_config</code>, que aplica o tratamento das stop words e a transformação da palavra no seu radical. Para apresentar o seu valor em tela basta <i>codar</i> <code>SHOW default_text_search_config</code>."}}/>
                    <img src="/img/article/get_started/Default text search config.png" alt="Estrutura de uma palavra" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"Por padrão o PostgreSQL define <code>pg_catalog.simple</code> ou utiliza das configurações locais do seu banco para definir o <b>valor padrão</b> da variável <code>default_text_search_config</code>. É possível alterar este valor em 3 instâncias:"}}/>
                    <ul>
                        <li dangerouslySetInnerHTML={{__html:"Alterando as <b>configurações</b> de uma <b>sessão</b>;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Alterando as <b>configurações</b> do <b>banco de dados</b>;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Indicando um dicionário <b>diretamente nas funções de text search</b>;"}}/>
                    </ul>
                    <p dangerouslySetInnerHTML={{__html:"Cada definição vai de acordo com o problema. A lista de configurações padrões de Text Search do PostgreSQL pode ser encontrada com <code>SELECT * FROM pg_catalog.pg_ts_config</code>. Já o conteúdo de cada dicionário está no caminho <code>/PostgreSQL/share/tsearch_data</code>, nesta pasta todos os arquivos <code>.stop</code> são dicionários de stop words, já os arquivos <code>.syn</code> são sinônimos."}}/>
                    <SQLBlockComponent conteudo={`SELECT * FROM pg_catalog.pg_ts_config`}/> 
                    <img src="/img/article/get_started/pg_ts_config.png" alt="Resultado do pg_ts_config" className="d-block mx-auto mt-4 mb-4"/> 
                    <p dangerouslySetInnerHTML={{__html:"O banco de dados utilizado para explicar este conteúdo é inteiramente em inglês. Desta forma, o dicionário recomendado é o <code>pg_catalog.english</code>, ou outro dicionário derivado do inglês. Para alterar as configurações padrões de text search da sessão basta informar <code>SET default_text_search_config  = 'pg_catalog.english'</code>."}}/>

                    <h2>tsvector && tsquery</h2>
                    <p dangerouslySetInnerHTML={{__html:"O PostgreSQL disponibiliza dois <code>data types</code> para o <b>processamento de linguagem natural</b> em documentos, sendo eles o <code>tsvector</code> e o <code>tsquery</code>."}}/>

                    <h2>tsvector</h2>
                    <p dangerouslySetInnerHTML={{__html:"Sobre o <code>tsvector</code> podemos concluir que é uma <b>lista ordenada de várias palavras</b>, onde, por padrão, elas são salvas em ordem alfabética no vetor caso identificadas num documento."}}/>
                    <SQLBlockComponent conteudo={`SELECT 'a fat cat sat on a mat and ate a fat rat but fat cats is not weak'::tsvector`}/>
                    <img src="/img/article/get_started/tsvector_1.png" alt="Resultado tsvector num texto simples" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"O <code>tsvector</code> não adiciona ao vetor o <b>radical</b> de cada palavra e nem realiza o tratamento de palavras chaves ou o ranking das palavras. O <code>tsvector</code> e o <code>tsquery</code> são apenas <b>“ferramentas fundamentais”</b> do Full Text Search, não serão eles que irão tratar tudo relacionado ao FTS, porém para entender FTS no PostgreSQL é necessário entender  <code>tsvector</code> e <code>tsquery</code>."}}/>
                    <p dangerouslySetInnerHTML={{__html:"Outra característica do <code>tsvector</code> é manter o posicionamento das palavras no documento. O posicionamento é um inteiro único entre <b>1 a 16383</b>."}}/>
                    <SQLBlockComponent conteudo={`SELECT 'a:1 fat:2 cat:3 sat:4 on:5 a:6 mat:7 and:8 ate:9 a:10 fat:11 rat:12 but:13 fat:14 cats:15 is:16 not:17 weak:18'::tsvector`}/>
                    <img src="/img/article/get_started/tsvector_pos.png" alt="Resultado tsvector com posicionamento das palavras" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"Um documento, por exemplo uma página na internet, pode possuir diferentes partes: cabeçalho, rodapé e corpo. Sabendo disso, é possível determinar os pesos das palavras com o <code>tsvector</code>. Estes pesos vão de <b>A</b> a <b>D</b> e são muito uteis determinar a importância de um conjunto de palavras, seja por serem de partes distintas do documento ou serem partes de diferentes documentos mesclados."}}/>
                    <SQLBlockComponent conteudo={`SELECT 'a:1A fat:2A,3C cat:5D'::tsvector;`}/>
                    <img src="/img/article/get_started/tsvector_pesos_1.png" alt="Resultado tsvector com pesos" className="d-block mx-auto mt-4 mb-4"/>
                    <SQLBlockComponent conteudo={`SELECT 'a:1A fat:2A cat:3A'::tsvector || 'a:1B fat:2B cat:3B sat:4B on:5B a:6B mat:7B'::tsvector || 'fat:1C cat:2C is:3C not:4C weak:5C'::tsvector;`}/>
                    <img src="/img/article/get_started/tsvector_pesos_2.png" alt="Resultado tsvector com pesos e concatenando conteúdos" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"Trabalhar diretamente com o <code>tsvector</code> é uma boa oportunidade de entender como o PostgreSQL transforma o conteúdo de um documento utilizando técnicas de Full Text Search. Mas o <code>tsvector</code> está limitado a <b>ordenar as palavras</b> encontradas, mantendo sempre a <b>singularidade</b> de cada palavra no vetor. Além disso, o <code>tsvector</code> consegue interpretar o <b>peso</b> e o <b>posicionamento</b> informado no conteúdo do documento, porém não é ele que ranqueia e normaliza o conteúdo do documento. Pensando nisso, o PostgreSQL desenvolveu uma função capaz de atender este requisito, e tornar mais prático o trabalho do Full Text Search no SGBD."}}/>

                    <h2>to_tsvector</h2>
                    <p dangerouslySetInnerHTML={{__html:"A função <code>to_tsvector</code> é responsável por aplicar a <b>normalização</b>, o tratamento de <b>stop words</b> e todos os outros tratamentos feitos quando trabalhamos com <code>tsvector</code>, transformando as palavras de um documento em <b><i>lexemes</i></b> de fato."}}/>
                    <SQLBlockComponent conteudo={`SELECT to_tsvector('a fat cat sat on a mat and ate a fat rat but fat cats is not weak');`}/>
                    <img src="/img/article/get_started/to_tsvector_1.png" alt="Função to_tsvector" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"É possível informar um dicionário específico para esta função. Podemos verificar o resultado quando passamos o dicionário <code>simple</code> na função <code>to_tsvector</code>. De cara é possível notar que a normalização e as stop words <b>não foram executadas com êxito</b>."}}/>
                    <SQLBlockComponent conteudo={`SELECT to_tsvector('simple', 'a fat cat sat on a mat and ate a fat rat but fat cats is not weak');`}/>
                    <img src="/img/article/get_started/to_tsvector_dic_simple.png" alt="Resultado to_tsvector no dicionário simple" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"Desta forma podemos concluir que a definição de um dicionário é <b>crucial</b> nesta etapa. O PostgreSQL disponibiliza alguns dicionários de stop words, como melhor explicado no tópico '<b><i>O que é um Dicionário?</i></b>'. Cada idioma tem seu dicionário e podemos testar um case em português."}}/>
                    <SQLBlockComponent conteudo={`SELECT to_tsvector('portuguese', 'Um gato gordo sentou-se em uma esteira e comeu um rato gordo mas gatos gordos não são fracos');`}/>
                    <img src="/img/article/get_started/to_tsvector_dic_portuguese.png" alt="Resultado to_tsvector num dicionário português" className="d-block mx-auto mt-4 mb-4"/>

                    <h2>tsquery</h2>
                    <p dangerouslySetInnerHTML={{__html:"Ao contrário do <code>tsvector</code> e <code>to_tsvector</code> o <code>tsquery</code> é responsável por trabalhar com a consulta por termos. Se tratando de uma <b><i>query</i></b>, podemos trabalhar com <b>operadores lógicos</b> como <code>&</code>, <code>|</code>, <code>!</code>."}}/>
                    <SQLBlockComponent conteudo={`SELECT 'fat & rat & ! cat'::tsquery;`}/>
                    <img src="/img/article/get_started/tsquery_1.png" alt="Resultado tsquery" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"Também é possível trabalhar com <b>pesos</b> no <code>tsquery</code>. Sabendo que os pesos vão de <b>A</b> a <b>D</b>, é possível informar mais de um peso para um mesmo termo, basta informar em sequência."}}/>
                    <SQLBlockComponent conteudo={`SELECT 'fat:ab & rat & ! cat'::tsquery;`}/>
                    <img src="/img/article/get_started/tsquery_pesos.png" alt="Resultado tsquery com pesos" className="d-block mx-auto mt-4 mb-4"/> 
                    <p dangerouslySetInnerHTML={{__html:"Além destes operadores, o PostgreSQL possui um operador específico para trabalhar com a <b>proximidade de termos</b>, chamado <code><-></code>."}}/>
                    <SQLBlockComponent conteudo={`SELECT 'fat:ab & rat:b & ! cat <-> dog'::tsquery;`}/>
                    <img src="/img/article/get_started/tsquery_operador.png" alt="Resultado tsquery com operador <->" className="d-block mx-auto mt-4 mb-4"/>

                    <h2>to_tsquery</h2>
                    <p dangerouslySetInnerHTML={{__html:"Esta função aplica o <code>tsquery</code> e a normalização no conteúdo consultado. Por aplicar a normalização, esta função aproveita do dicionário de stop words definido por padrão ou passado na função."}}/>
                    <SQLBlockComponent conteudo={`SELECT to_tsquery('fat:ab & rat:b & ! cat <-> dogs');`}/>
                    <img src="/img/article/get_started/to_tsquery_1.png" alt="Resultado to_tsquery" className="d-block mx-auto mt-4 mb-4"/>
                    <SQLBlockComponent conteudo={`SELECT to_tsquery('portuguese','João:AB & livros <-> economico');`}/>
                    <img src="/img/article/get_started/to_tsquery_2.png" alt="Resultado to_tsquery em português" className="d-block mx-auto mt-4 mb-4"/>

                    <h2>Outras funções tsquery</h2>
                    <p dangerouslySetInnerHTML={{__html:"Além da função <code>to_tsquery</code> o PostgreSQL disponibiliza outras maneiras de trabalhar com <b>query</b> e <b>text search</b>, uma delas é com a função <code>plainto_tsquery</code> que permite a consulta por <b>sentença completa</b>, com espaçamentos e pontuações. O resultado desta função é um grupo de lexemes trabalhando com o operador <code>&</code>"}}/>
                    <SQLBlockComponent conteudo={`SELECT plainto_tsquery('The Fat Rats, the fat cats. The fat horse');`}/>
                    <img src="/img/article/get_started/plainto_tsquery.png" alt="Resultado plainto_tsquery" className="d-block mx-auto mt-4 mb-4"/>

                    <h2>Operador <code>@@</code></h2>
                    <p dangerouslySetInnerHTML={{__html:"No PostgreSQL, o FTS tem sua base no operador <code>@@</code> , de fazer o <b><i>“match”</i></b> entre um documento com um conteúdo pesquisado verificando se a consulta de texto corresponde ao vetor de texto."}}/>
                    <p dangerouslySetInnerHTML={{__html:"Se considerarmos a uma tabela de autores em nossa base de dados, que possui como colunas autid, representando o ID do autor, e autname, representando o nome do autor."}}/>
                    <SQLBlockComponent conteudo={`SELECT * FROM tbauthor`}/>
                    <img src="/img/article/get_started/select_tbauthor.png" alt="Resultado select tbauthor" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"Podemos utilizar o operador <code>@@</code> para consultar o <b>termo</b>, palavra consultada, no vetor de texto, coluna ou qualquer outro conteúdo que possa ser interpretado como um documento."}}/>
                    <SQLBlockComponent conteudo={
                        `SELECT * FROM tbauthor WHERE autname @@ 'daniels';`
                    }/>
                    <img src="/img/article/get_started/operador_arroba.png" alt="Resultado select tbauthor com @@" className="d-block mx-auto mt-4 mb-4"/>
                    <p dangerouslySetInnerHTML={{__html:"É possível notar a semelhança do operador <code>@@</code> com o operador <code>like</code> ou <code>ilike</code> , e realmente para este exemplo a utilização dos outros operadores resultaria em respostas semelhantes. A diferença de utilizar o operador <code>@@</code> está no seu propósito, pois enquanto operadores como <code>like</code> ou <code>ilike</code> tendem a comparar padrões textuais, o operador <code>@@</code> tem o propósito de trabalhar em conjunto com o FTS, compreendendo a normalização dos termos e realizando o <i>“match”</i> do conteúdo <code>tsvector</code> com a query <code>tsquery</code>."}}/>
                    <SQLBlockComponent conteudo="
                        SELECT newid,newtitle,newdescription
FROM tbnews
WHERE to_tsvector(newtitle || ' ' || newdescription) @@ to_tsquery('beer')
ORDER BY newid;"/>
                    <img src="/img/article/get_started/totsvector_totsquery_arroba.png" alt="Resultado select utilizando funções FTS e o operador @@" className="d-block mx-auto mt-4 mb-4" style={{maxWidth:"1200px"}}/>

                    <h2>Definindo pesos</h2>
                    <p dangerouslySetInnerHTML={{__html:"A função <code>setweight</code> retorna uma cópia do <code>tsvector</code> passado como parâmetro com o valor de todas as posições e pesos dos lexemes."}}/>
                    <SQLBlockComponent conteudo={`SELECT setweight(to_tsvector(newtitle), 'A') || setweight(to_tsvector(newdescription), 'B')FROM tbnews`}/>
                    <img src="/img/article/get_started/setweight_1.png" alt="Resultado select utilizando funções FTS e o operador @@" className="d-block mx-auto mt-4 mb-4" style={{maxWidth:"1200px"}}/>

                    <h2>Manipulação do documento</h2>
                    <p dangerouslySetInnerHTML={{__html:"Com o conhecimento adquirido até o momento é possível manipular o documento para criar <code>tsvector</code> com texto normalizado, posições e pesos. Com o banco de dados <b>BBC News</b> vamos criar uma coluna na tabela <code>tbnews</code> capaz de armazenar o <code>tsvector</code> das colunas <code>tbnews.title</code>, <code>tbnews.description</code> e <code>tbauthor.autname</code>. Sendo assim, nosso script deve:"}}/>
                    <ul>
                        <li dangerouslySetInnerHTML={{__html:"Criar nova coluna na tabela <code>tbnews</code> chamada <code>newtsvector</code>;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Realizar uma junção com a tabela <code>tbauthor</code> para trabalhar com a coluna <code>tbauthor.autname</code>;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Adicionar o <code>tsvector</code> das colunas <code>tbnews.title</code>, <code>tbnews.description</code> e <code>tbauthor.autname</code> na coluna criada;"}}/>
                    </ul>
                    <SQLBlockComponent conteudo="ALTER TABLE tbnews
 ADD COLUMN newtsvector tsvector;

UPDATE tbnews
 SET newtsvector = (
 SELECT setweight(to_tsvector('english', newtitle), 'A') ||
 setweight(to_tsvector('english', newdescription), 'B') ||
 setweight(to_tsvector('english', link_topic(newguid)), 'C') ||
 setweight(to_tsvector('english', autname), 'D')
 FROM tbnews as tbnews_aux
 INNER JOIN tbnewsauthor ON tbnews_aux.newid = tbnewsauthor.newid
 INNER JOIN tbauthor ON tbnewsauthor.autid = tbauthor.autid
 WHERE tbnews_aux.newid = tbnews.newid
 );

SELECT newid, newtsvector
  FROM tbnews;"/>
                    <img src="/img/article/get_started/mapulando_documento.png" alt="Manipulando o documento com FTS" className="d-block mx-auto mt-4 mb-4" style={{maxWidth:"1200px"}}/>

                    <h2>Trabalhando com indexação</h2>
                    <p dangerouslySetInnerHTML={{__html:"A indexação é uma técnica usada para melhorar o <b>desempenho</b> das consultas. Esta técnica armazena as posições das linhas em uma tabela, de acordo com o valor de uma ou mais colunas. Quando uma consulta busca por um valor específico, o PostgreSQL pode usar o índice para ir diretamente à linha que contém o valor, sem precisar verificar todas as linhas da tabela."}}/>
                    <p dangerouslySetInnerHTML={{__html:"Podemos gerar um índice para a coluna <code>newtsvector</code> utilizando o <code>GIN</code>, técnica de indexação mais utilizada para tipos complexos, ideal para o contexto de Full Text Search. É uma tarefa bem simples mas que trará bons resultados!!!"}}/>
                    <SQLBlockComponent conteudo={`CREATE INDEX newtsvector_idx
	ON tbnews
 USING GIN(newtsvector);`}/>
                    <p dangerouslySetInnerHTML={{__html:"Podemos criar uma trigger para garantir que o <code>tsvector</code> de cada linha seja atualizado após a inserção ou atualização."}}/>
                    <SQLBlockComponent conteudo={`CREATE OR REPLACE FUNCTION news_tsvector_trigger() RETURNS trigger
AS $$
	BEGIN
		IF tg_op = 'INSERT' THEN
			new.newtsvector := setweight(to_tsvector(new.newtitle), 'A') ||
							   setweight(to_tsvector(new.newdescription), 'B') ||
							   setweight(to_tsvector(new.link_topic(newguid)), 'C');
		ELSIF tg_op = 'UPDATE' THEN
			new.newtsvector := (
				SELECT old.newtsvector || setweight(to_tsvector(autname), 'D')
				  FROM tbnews
				 INNER JOIN tbnewsauthor ON tbnews.newid = tbnewsauthor.newid
				 INNER JOIN tbauthor ON tbnewsauthor.autid = tbauthor.autid
				 WHERE tbnews.newid = old.newid
			);
		END IF;
		return new;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER newtsvector_update AFTER INSERT OR UPDATE
	ON tbnews FOR EACH ROW EXECUTE PROCEDURE news_tsvector_trigger();`}/>

                    <h2>Consulta</h2>
                    <p dangerouslySetInnerHTML={{__html:"Após realizado o desenvolvimento da coluna <code>tsvector</code> é possível desenvolver uma query de consulta."}}/>
                    <SQLBlockComponent conteudo={`SELECT newtitle as title,
       autname as author,
       newdescription as description,
       newlink as link,
       newpubdate as date,
       newtsvector
  FROM tbnews
 INNER JOIN tbnewsauthor ON tbnews.newid = tbnewsauthor.newid
 INNER JOIN tbauthor ON tbnewsauthor.autid = tbauthor.autid
 WHERE newtsvector @@ plainto_tsquery('english', 'politic')
 LIMIT 15
`}/>

                    <h2>Fundamentação Teórica</h2> 
                    <p dangerouslySetInnerHTML={{__html:"O conteúdo <b>introdutório ao Full Text Search</b> pode ser encontrado em <a href='https://www.postgresql.org/docs/current/textsearch-intro.html' target='_blank' rel='noopener noreferrer'>PostgreSQL: Documentation: 16: 12.1. Introduction</a>. Nesta página também é encontrado uma explicação do operador <code>@@</code> e um caminho para as <b>configurações padrões de buscas textuais</b>."}}/>
                    <p dangerouslySetInnerHTML={{__html:"O significado da palavra <b>lexema</b>, assim como o conteúdo deste tópico no minicurso, foi baseado na explicação presente na página <a href='https://resumos.soescola.com/glossario/lexema-o-que-e-significado/#google_vignette' target='_blank' rel='noopener noreferrer'>Lexema: O que é, significado - Resumos Só Escola (soescola.com)</a>"}}/>
                    <p dangerouslySetInnerHTML={{__html:"A documentação referente as funções do Full Text Search esta em <a href='https://www.postgresql.org/docs/current/functions-textsearch.html' target='_blank' rel='noopener noreferrer'>PostgreSQL: Documentation: 16: 9.13. Text Search Functions and Operators</a>"}}/>
                    <p dangerouslySetInnerHTML={{__html:"O conteúdo de stop word foi baseado nas explicações presentes em <a href='https://www.postgresql.org/docs/current/textsearch-dictionaries.html#TEXTSEARCH-STOPWORDS' target='_blank' rel='noopener noreferrer'>PostgreSQL: Documentation: 16: 12.6. Dictionaries</a> e <a href='https://www.agenciamestre.com/seo/stop-words-como-funcionam-palavras-de-parada/' target='_blank' rel='noopener noreferrer'>Stop Words - Como Funcionam Palavras de Parada? | Agência Mestre (agenciamestre.com)</a>"}}/>
                    <p dangerouslySetInnerHTML={{__html:"Detalhes de configuração estão presentes em <a href='https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-DEFAULT-TEXT-SEARCH-CONFIG' target='_blank' rel='noopener noreferrer'>PostgreSQL: Documentation: 16: 20.11. Client Connection Defaults</a>"}}/> 
                </div>
            </article>
        </MainContainer>
    );
}

export default GetStarted; 