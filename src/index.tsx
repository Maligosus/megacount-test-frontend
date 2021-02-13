import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './pages/App';



const renderElement=document.getElementById("root");

ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,renderElement);