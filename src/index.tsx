import React from 'react';
import {createRoot} from 'react-dom/client';
import "./index.scss"
import App from "./App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ReactDOM from "react-dom/client";
import Stats from "./Stats";

const router = createBrowserRouter([
    {
        path: '/stats',
        element: <App/>,
        errorElement: <ErrorPage/>
    },
    {
        path: '/',
        element: <Stats/>,
        errorElement: <ErrorPage/>
    },
])

ReactDOM.createRoot(document.getElementById('app')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);