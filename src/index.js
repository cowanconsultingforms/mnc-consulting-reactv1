import React from 'react';
import ReactDOM,{createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './hooks/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>

    <App />
    
  </BrowserRouter>
);

