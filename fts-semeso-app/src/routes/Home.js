import CarouselCaption from "../components/Carousels/CarouselCaption";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import MainContainer from "../components/Main/MainContainer";

function Home(){
    const [carouselItemList, setCarouselItemList] = useState([]);

    useEffect(() => {
        fetch("/data/json/carouselItens.json")
        .then(response => response.json())
        .then(data => setCarouselItemList(data))
        .catch(error => console.error("Erro ao carregar os itens no carousel"))
    }, []);
    
    return (
        <MainContainer className="container">
            <section className="row">
                <div className="col-12">
                    <CarouselCaption id="main-carousel-container" carouselItemList={carouselItemList} displaySideButtons={false}/>
                </div> 
            </section>
            <article className="row">
                <div className="col-12">
                    <h2>O que é Full Text Search?</h2>
                    <p dangerouslySetInnerHTML={{ __html: "<b>Full Text Search</b>, <b>Text Search</b> ou simplesmente <b>FTS</b> é uma ferramenta presente no PostgreSQL e em outros SGBDs que possibilita a exploração avançada de conteúdos textuais." }}/>
                    <p dangerouslySetInnerHTML={{__html: "No PostgreSQL, este método de busca permite <i>normalizar</i>, <i>atribuir pesos</i>, <i>indexar</i>, <i>ranquear</i> o conteúdo do texto, isso tudo para comprir a premissa de uma busca textual mais rápida e objetiva."}}/>

                    <h2>Diferença de outras pesquisas por palavras-chave</h2>
                    <p dangerouslySetInnerHTML={{__html:"É muito comum encontrar operadores de buscas textual nos SGBDs. O PostgreSQL tem como operadores <code>~</code>, <code>~*</code>, <code>LIKE</code> e <code>ILIKE</code>. Estes operadores são muito importantes, e não devem ser desconsiderados, porém estes operadores estão aquém de muitas <b>propriedades essenciais requeridas hoje em dia</b>, como:"}}/>
                    <ul> 
                        <li dangerouslySetInnerHTML={{__html:"Operadores de busca textuais <b>não possuem suporte linguístico</b>, nem mesmo para o inglês."}}/>
                        <li dangerouslySetInnerHTML={{__html:"Mesmo unindo <b>expressões regulares</b> com os operadores, <b>Full Text Search</b> acaba sendo a melhor alternativa para lidar com <b>palavras derivadas</b>, exemplo <i>tecnólogo</i> e <i>tecnologia</i>. Formular uma solução para palavras derivadas utilizando expressões regulares e operadores de busca textuais tendem a ser custoso, tedioso e propenso a erros, afinal <b>uma palavra pode ter várias palavras derivadas</b>"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Operadores de buscas textuais não fornecem uma ordem de classificação, um ranking dos resultados da pesquisa. A imagem a seguir apresenta a ordem de busca estabelecida com o auxílio do Full Text Search, supondo que a palavra pesquisada seja <i>PHP</i> num conteúdo de <i>vagas</i>, <i>tecnologia</i> e <i>postagem</i>."}}/>
                        <img src="/img/article/home/Ordem da pesquisa no BD.png" alt="Ordem da pesquisa no BD" className="d-block mx-auto mt-4 mb-4"/>
                        <li dangerouslySetInnerHTML={{__html:"Operadores de buscas tendem a ser mais lentos quando comparados com FTS por não possuírem <b>suporte a indexação</b> e realizarem sua busca em <b>todo o conteúdo do documento</b>."}}/> 
                    </ul>

                    <h2>Casos de usos</h2>
                    <p dangerouslySetInnerHTML={{__html:"O Full Text Search pode ser utilizado para melhorar a experiência de busca e navegação em grandes volumes de texto. Dito isso, é possível utilizar FTS como solução de <b>campos de buscas</b>, <b>campos auto-suggests</b>, <b>Chatbots</b>, <b>Análise e estatísticas</b>, <b>CMS</b> e etc…"}}/>

                    {/* <h2>Projetos e Empresas já que utilizam FTS</h2>
                    <div className="row">
                        <div className="col-6">
                            <a href="https://www.ifood.com.br/" title="IFood" target="_blank" rel="noreferrer">
                                <Icon icon="simple-icons:ifood" width="200" height="200"  style={{color: "RED"}} className="d-block mx-auto mt-4 mb-4"/>
                            </a>
                        </div>
                        <div className="col-6">
                            <a href="https://www.ipm.com.br/" title="IPM Sistemas" target="_blank" rel="noreferrer">
                                <img src="\img\article\home\logo-ipm-red.svg" width="200" height="200" alt="IPM Sistemas" className="d-block mx-auto mt-4 mb-4"/> 
                            </a> 
                        </div> 
                    </div> */}

                    <h2>Ferramentas Semelhantes</h2>
                    <p dangerouslySetInnerHTML={{__html:"Existem muitas outras ferramentas no mercado que disponibilizam uma forma rápida de explorar conteúdos textuais. Sim, são ferramentas rápidas porém existem pontos que devem ser levados em consideração antes de utilizá-las:"}}/>
                    <ul> 
                        <li dangerouslySetInnerHTML={{__html:"Estas ferramentas possuem acesso a todos os documentos?"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Tem acesso a todos os atributos do banco de dados?"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Essas ferramentas precisam ser mantidas;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Verificar se a ferramenta atende aos <b>certificados</b> requeridos;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"Mão de obra especializada;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"<b>Inconsistência de dados</b>. Pode acontecer dos dados indexados e retornados pela ferramenta foram excluídos no banco de dados PostgreSQL;"}}/>
                        <li dangerouslySetInnerHTML={{__html:"A ferramenta <b>não suportar buscas instantâneas</b>, sendo necessário realizar o download de novos dados e indexa-los;"}}/>
                    </ul>
                    <div className="row">
                        <div className="col-6">
                            <a href="https://www.elastic.co/pt/elasticsearch" title="Elasticsearch" target="_blank" rel="noreferrer">
                                <Icon icon="logos:elasticsearch" width="200" height="200" className="d-block mx-auto mt-4 mb-4"/>
                            </a>
                        </div>
                        <div className="col-6">
                            <a href="https://www.algolia.com/pt-br/" title="Algolia" target="_blank" rel="noreferrer">
                                <Icon icon="bxl:algolia" width="200" height="200" style={{color: 'blue'}} className="d-block mx-auto mt-4 mb-4"/>
                            </a> 
                        </div> 
                    </div>
                </div>
            </article>
        </MainContainer> 
    );
}

export default Home;