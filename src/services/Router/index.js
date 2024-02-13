import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../../screens/Dashboard";
import Layout from "../../screens/Layout";
import Products from "../../screens/Products";
import Orders from "../../screens/Orders";
import Signin from "../../screens/Signin";
import AddProduct from "../../screens/AddnewProduct";
import UpdateProduct from "../../screens/UpdateProduct";
import ProductDetail from "../../screens/ProductDetail";
import OrderDetail from "../../screens/OrderDetail";
import UpdateProfile from "../../screens/UpdateProfile";

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
            },
            {
                path: '/updateProduct/:_id',
                element: <UpdateProduct />,
            },
            {
                path: '/productDetail/:_id',
                element: <ProductDetail />,
            },
            {
                path: '/orderDetail/:_id',
                element: <OrderDetail />,
            },
            {
                path: '/updateProfile',
                element: <UpdateProfile />,
            }

        ],
    },
]);

const Routing = () => {
    return <RouterProvider router={router} />;
};

export default Routing;
