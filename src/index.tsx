import React from 'react';
import {createRoot} from 'react-dom/client';
import "./index.scss"
import App from "./App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";
import ErrorPage from "./components/ErrorPage/ErrorPage";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById('app'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>
    },
])

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);