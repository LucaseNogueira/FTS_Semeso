import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import Home from './routes/Home';
import "prismjs/themes/prism.css"; 
import "prismjs";
import "prismjs/components/prism-sql";
import HeaderComponentFluid from './components/Headers/HeaderComponentFluid';
import GlobalStyle from './components/GlobalStyle';
import FooterComponentFluid from './components/Footers/FooterComponentFluid';
import GetStarted from './routes/GetStarted';
import Extra from './routes/Extra';
import Example from './routes/Example';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle/> 
        <BrowserRouter>
            <HeaderComponentFluid/> 
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/get-started' element={<GetStarted />}/>
                <Route path='/extra' element={<Extra />}/> 
                <Route path='/exemple' element={<Example />}/>
            </Routes> 
            <FooterComponentFluid/> 
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
