import React from 'react';
import {createRoot} from 'react-dom/client';
import "./index.scss"
import App from "./App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    }
])

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);