import SQLBlockComponent from "../components/CodeBlocks/SQLBlockComponent";
import MainContainer from "../components/Main/MainContainer";

function Extra(){
    return (
        <MainContainer className="container">
            <article className="row">
                <div className="col-12">
                    <h2>Stored Procedures</h2>
                    <p dangerouslySetInnerHTML={{__html:"As <b>Stored Procedures</b> são blocos de códigos SQL que são armazenados e executados pelo PostgreSQL. Foram introduzidas na <b>versão 11</b> do SGBD e se distinguem das <b><i>functions</b></i> pela capacidade de executar transações (<code>COMMIT</code> e <code>ROLLBACK</code>)."}}/>
                    <SQLBlockComponent conteudo="CREATE OR REPLACE PROCEDURE update_author_always_error(aut_name VARCHAR, new_aut_name VARCHAR)
AS $$
	BEGIN
		BEGIN
			UPDATE tbauthor
			   SET autname = autname || ' Maçã'
			 WHERE autname = aut_name;
	
			IF (SELECT count(autname) FROM tbauthor WHERE autname = aut_name) <= 0 THEN
				RAISE EXCEPTION 'Não foi possível encontrar o autor chamado %', aut_name;
			END IF;
	
			UPDATE tbauthor
			   SET autname = new_aut_name
			 WHERE autname = aut_name;
	
			COMMIT;
	
		EXCEPTION
			WHEN OTHERS THEN
				ROLLBACK;
				RAISE NOTICE 'Erro durante a atualização do nome do autor. Realizado ROLLBACK da operação por questões de segurança!';
		END;
	END;
$$ LANGUAGE plpgsql;"/> 
                    <p dangerouslySetInnerHTML={{__html:"Obs.: A função criada no código anterior propositalmente vai dar erro. Ela foi pensada desta forma para notarmos o tratamento de exceções, assim como o <code>COMMIT</code> e <code>ROLLBACK</code> funcionando."}}/>
                    <p dangerouslySetInnerHTML={{__html:"Apesar de ser possível informar o <code>COMMIT</code> ou <code>ROLLBACK</code> no bloco, eles não são um atributo obrigatório, permitindo que o usuário crie suas procedures sem este recurso."}}/>
                    <SQLBlockComponent conteudo="CREATE OR REPLACE PROCEDURE insert_author(aut_name VARCHAR)
AS $$
	BEGIN
		INSERT INTO tbauthor(autname) VALUES (aut_name);
	END;
$$ LANGUAGE plpgsql;"/>
                    <p dangerouslySetInnerHTML={{__html:"É utilizado o comando <code>CALL</code> para chamar uma <b>Stored Procedure</b>."}}/>
                    <SQLBlockComponent conteudo="CALL update_author_always_error('Lionel Ronaldo', 'Pelé Maradona');"/>

                    <h2>Functions</h2>
                    <p dangerouslySetInnerHTML={{__html:"Functions são blocos de código que retornam um valor e podem ser usadas em consultas SQL. São mais flexíveis que procedures, mas não podem executar transações diretamente."}}/>
                    <SQLBlockComponent conteudo="CREATE OR REPLACE FUNCTION link_topic(link_txt VARCHAR) RETURNS VARCHAR
AS $$
BEGIN
RETURN REGEXP_REPLACE(
REGEXP_REPLACE(link_txt, 'https://www\.bbc\.co\.uk/|\d+', '', 'g'),
'[-/]',
' ',
'g'
) AS topic;
END;
$$ LANGUAGE plpgsql;"/>
                    <SQLBlockComponent conteudo="SELECT link_topic('https://www.bbc.co.uk/news/world-europe-60638042');"/>

                    <h2>Triggers</h2>
                    <p dangerouslySetInnerHTML={{__html:"Triggers (ou <b>gatilhos</b>) são procedimentos executados automaticamente em resposta a determinados eventos em uma tabela, como <code>INSERT</code>, <code>UPDATE</code>, ou <code>DELETE</code>. "}}/>
                    <p dangerouslySetInnerHTML={{__html:"Eles podem ser usados para manter a integridade dos dados, registrar alterações, ou implementar regras complexas de negócio, podendo ser executada antes(<code>BEFORE</code>) ou depois(<code>AFTER</code>)"}}/>
                    <SQLBlockComponent conteudo="-- FUNCTION: public.news_tsvector_trigger()

-- DROP FUNCTION IF EXISTS public.news_tsvector_trigger();

CREATE OR REPLACE FUNCTION public.news_tsvector_trigger()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
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
$BODY$;

ALTER FUNCTION public.news_tsvector_trigger()
    OWNER TO postgres;
"/> 
                </div>
            </article> 
        </MainContainer> 
    );
};

export default Extra;