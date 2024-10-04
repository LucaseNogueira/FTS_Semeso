import styled from "styled-components";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";

const FooterContainerFluid = styled.footer`
    background-color: #000000;
    @media (max-width: 991.9px) {
        background-color: transparent;
    }
`;

const FooterNavContainer = styled.div`
    @media (max-width: 991.9px) {
        background-color: #000000;
    }
    color: #ffffff;
    opacity: 0.7;
`; 

const IconLink = styled(Icon)`
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.5);
  }
`; 
 
const FooterComponentFluid = () =>{
    const [techStack, setTechStackList] = useState([]);

    useEffect(() => {
        fetch("/data/json/footerTechstack.json")
        .then(response => response.json())
        .then(data => setTechStackList(data))
        .catch(error => console.error("Erro ao carregar os itens da pilha de tecnologias"))
    }, []);
    
    return (
        <FooterContainerFluid className="container-fluid">
            <nav className="navbar navbar-expand-lg">
                <FooterNavContainer className="container-fluid d-flex justify-content-center">  
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#footer-nav-link-container" aria-controls="footer-nav-link-container" aria-expanded="false" aria-label="Toggle navigation">
                        <Icon icon="iconamoon:arrow-down-2" width="150" height="36"  style={{color: 'white'}}/> 
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="footer-nav-link-container"> 
                        <div className="navbar-nav"> 
                            {techStack.map((tech, index) => (
                                <a key={index} href={tech.url} className="nav-link" title={tech.titulo} target="_blank" rel="noreferrer"> 
                                    <IconLink icon={tech.icone} width="26" height="26" alt={tech.titulo} style={{color: 'white'}}/>
                                </a> 
                            ))} 
                        </div>  
                    </div>
                </FooterNavContainer> 
            </nav>
        </FooterContainerFluid>
    );
}

export default FooterComponentFluid;