import styled from "styled-components";
import { Icon } from '@iconify/react';

const HeaderContainerFluid = styled.header`
    background-color: #699ECA;
    @media (max-width: 991.9px) {
        background-color: transparent;
    }
`;
 
const HeaderNavLinkContainer = styled.div`
    font-size: 19px;
    opacity: 0.7;
`;

const HeaderNavLinkItem = styled.a`
    color: #ffffff;
`;

function HeaderComponentFluid(){
    return (
        <HeaderContainerFluid className="container-fluid"> 
            <nav className="navbar navbar-expand-lg"> 
                <div className="container-fluid d-flex"> 
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header-nav-link-container" aria-controls="header-nav-link-container" aria-expanded="false" aria-label="Toggle navigation">
                        <Icon icon="mingcute:menu-fill" width="36" height="36" style={{color: 'white'}}/> 
                    </button>
                    <HeaderNavLinkContainer className="collapse navbar-collapse justify-content-center" id="header-nav-link-container"> 
                        <ul className="navbar-nav">
                            <li className="nav-item"style={{'color':'white'}}> 
                                <HeaderNavLinkItem className="nav-link" href="/" >Home</HeaderNavLinkItem> 
                            </li> 
                            <li className="nav-item">
                                <HeaderNavLinkItem className="nav-link" href="/get-started">Bora Começar</HeaderNavLinkItem> 
                            </li>
                            <li className="nav-item">
                                <HeaderNavLinkItem className="nav-link" href="/extra">Extra</HeaderNavLinkItem> 
                            </li>
                            <li className="nav-item">
                                <HeaderNavLinkItem className="nav-link" href="https://www.linkedin.com/in/lucas-nogueira-695145241/" target="_blank" rel="noreferrer">Sobre mim</HeaderNavLinkItem> 
                            </li>
                            <li className="nav-item">
                                <HeaderNavLinkItem className="nav-link" href="/exemple">Exemplo</HeaderNavLinkItem> 
                            </li> 
                        </ul>
                    </HeaderNavLinkContainer> 
                </div> 
            </nav> 
        </HeaderContainerFluid>
    ); 
}

export default HeaderComponentFluid;