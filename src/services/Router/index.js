import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../../screens/Dashboard";
import Layout from "../../screens/Layout";
import Products from "../../screens/Products";
import Orders from "../../screens/Orders";
import Signin from "../../screens/Signin";
import AddProduct from "../../screens/AddnewProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: '/products',
                element: <Products />,
            },
            {
                path: '/orders',
                element: <Orders />,
            },
            {
                path: '/signin',
                element: <Signin />,
            },
            {
                path: '/addProduct',
                element: <AddProduct />,
            }

        ],
    },
]);

const Routing = () => {
    return <RouterProvider router={router} />;
};

export default Routing;
