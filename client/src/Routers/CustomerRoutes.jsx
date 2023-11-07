import React from "react";
import { Route,Routes } from "react-router-dom";
import { HomePage } from "../customer/pages";
import { BottomNavigations, Cart, Checkout, Footer, Navbar, Order, OrderDetails, PaymentSuccess, PaymentUpdatePage, Product, ProductDetails, RecentlyViewed, Wishlist } from "../customer/components";

const CustomerRoutes = () => {
    return (
        <div>
            
            <div>
                <Navbar />
            </div>
            <Routes>
                <Route path="/login" element={<HomePage/>} />
                <Route path="/register" element={<HomePage />} />
                <Route path="/" element={<HomePage/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product/>} />
                <Route path="/product/:productId/:category" element={<ProductDetails/>} />
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/account/order" element={<Order/>} />
                <Route path="/account/order/:orderId" element={<OrderDetails/>} />
                <Route path="/payment/:orderId" element={<PaymentSuccess/>} />
                <Route path="/payment/:orderId/:paymentId" element={<PaymentUpdatePage/>} />
                <Route path="/product/recentlyViewed" element={<RecentlyViewed/>} />
                <Route path="/product/wishlist" element={<Wishlist/>} />
            </Routes>

            <div>
                <BottomNavigations/>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default CustomerRoutes;
