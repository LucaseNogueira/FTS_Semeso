import styled from "styled-components";

const CarouselCaptionContainer = styled.div`
    max-height: 700px;
    box-shadow: 5px 5px 10px black; 
    .carousel-item {
        max-height: 700px;
        max-width: 1440px;
        width: 100%; 
    }

    .img-gradient-container{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden; /* Esconde o conteúdo que excede os limites */
        border-radius: 5px; 
    }

    img {
        max-width: 100%; /* A imagem nunca excederá a largura do item */
        height: 700px; /* A imagem nunca excederá a altura do item */
        object-fit: cover; /* A imagem será cortada para preencher o espaço */
        position: relative;
    } 

    /* Pseudo-elemento ::after para aplicar o gradiente */
    .img-gradient-container::after {
        content: ""; /* Pseudo-elemento vazio para o gradiente */
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30%; /* Altura do gradiente, ajuste conforme necessário */
        background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
        pointer-events: none; /* O gradiente não interfere na interação do usuário */
    } 
`; 

function CarouselCaption({id, carouselItemList = [], displaySideButtons = true}){
    return ( 
        <CarouselCaptionContainer id={id} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators"> 
                {carouselItemList.map((item, index) => (
                    <button
                        key={`a${item.id}`}
                        type="button" 
                        data-bs-target={`#${item.id}`} 
                        data-bs-slide-to={index} 
                        className={index === 0 ? "active" : ""} 
                        aria-current={index === 0 ? "true" : null} 
                        aria-label={`Slide ${index}`}
                    />
                ))}
            </div>
            <div className="carousel-inner">
                {carouselItemList.map((item, index) => (
                    <div 
                        key={`b${item.id}`}
                        className={`carousel-item ${index == 0 ? "active" : ""}`}
                    >
                        <div className="img-gradient-container"> 
                            <img
                                src={item.src}
                                className="d-block w-100"
                                alt={item.alt} 
                            />
                        </div>
                        <a className="carousel-caption d-block" href={item.link} target="_blank" rel="noreferrer"> 
                            <h5>{item.title}</h5>
                            <p>{item.description}</p> 
                        </a> 
                    </div>
                ))} 
            </div> 
                {displaySideButtons == true && (
                    <>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </>
                )} 
        </CarouselCaptionContainer>
    ); 
}

export default CarouselCaption;