import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import './tailwind.css';
import './index.css';
const container = document.getElementById('root');
if (container) ReactDOM.createRoot(container).render(<React.StrictMode><RouterProvider router={router}/></React.StrictMode>);
