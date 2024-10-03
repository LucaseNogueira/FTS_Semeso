import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; 
import "prismjs/components/prism-sql";
import { Icon } from "@iconify/react/dist/iconify.js";
 
function SQLBlockComponent({conteudo}) {
    const codeRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const copyClick = () => {
        const codeContent = codeRef.current.textContent;

        navigator.clipboard.writeText(codeContent)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error("Erro ao copiar: ", err);
            });
    };
    
    return (
        <div style={{ position: "relative"}}>
            <pre 
                style={{
                    backgroundColor: "rgb(25, 25, 25)",
                    padding: "1rem",
                    borderRadius: "5px",
                    overflow: "auto"
                }}
            > 
            <code
                ref={codeRef}
                className="language-sql"  
                style={{
                    color: "whitesmoke",
                    fontSize: "12px"
                }}> 
                {conteudo}
            </code>
            <button
                onClick={copyClick}
                style={{ 
                    position: "absolute",
                    top: "2px",
                    right: "2px", 
                    backgroundColor: "rgb(30, 30, 30)",
                    color: "whitesmoke",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }} 
            >
                {copied && <span style={{color:"green"}}>Código copiado!</span>}
                <Icon icon="ph:copy" width="20" height="20" style={copied ? {color: 'green'} : {color:'whitesmoke'}} /> 
            </button> 
            </pre>
        </div>
    );  
}

export default SQLBlockComponent; 
