import { useState } from "react";
import CardExample from "../components/Cards/CardExample";
import MainContainer from "../components/Main/MainContainer";
import NavComponentStickyTop from "../components/Navs/NavComponentStickyTop";
import { getNewsWithTerms } from "../services/news";

function Example(){
    const [news, setNews] = useState([]);

    const searchNews = async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const sentence = event.target.value;
            try{
                const response = await getNewsWithTerms(sentence);
                console.log(response);
                setNews(response);
            }catch(error){
                console.error(error);
                setNews([]);
            }
        }
    }
    return (
        <MainContainer className="container"> 
            <NavComponentStickyTop className="navbar sticky-top">
                <div className="container-fluid">  
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onKeyDown={searchNews}/>
                    </form> 
                </div>
            </NavComponentStickyTop>
            <div className="container mb-5 mt-2">   
                <div className="row">
                    <div className="col-3"/> 
                    <div className="col-12">
                        { news.map((n,index) => (
                            <CardExample 
                                key={index}
                                title={n.title}
                                subtitle={n.author}
                                description={n.description}
                                link={n.link}
                                pubdate={n.date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};
 
export default Example;