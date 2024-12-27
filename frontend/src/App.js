import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
};

import EnterPage from "./pages/EnterPage";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import ShoppingBag from './components/ShoppingBag';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddProductForm from './components/AddProducts';
import RunningLine from './components/RunningLine';

const App = () => {
    const [products, setProducts] = useState([]);
    const [bag, setBag] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const showNavbar = location.pathname !== "/";
    const showRunningLine = location.pathname !== "/";

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
          .then(response => {
            const productsWithImagePaths = response.data.map(product => ({
              ...product,
              image: `http://localhost:5000${product.image}`,
              backImage: product.backImage ? `http://localhost:5000${product.backImage}` : null
            }));
            setProducts(productsWithImagePaths);
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      }, []);

    return (
        <div>
            {showNavbar && <Navbar />}
            {showRunningLine && <RunningLine />}
            <AnimatePresence mode='wait'>
                <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={location.pathname}
                    style={{ position: 'relative', minHeight: '100vh' }}
                >
                
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<EnterPage onNavigate={handleNavigate} />} />
                    <Route path="/home" element={<Home products={products} />} />
                    <Route path="/bag" element={<ShoppingBag bag={bag} setBag={setBag} />} />
                    <Route path="/product/:productId" element={<ProductDetail products={products} bag={bag} setBag={setBag} />} />
                    <Route path="/admin/add-product" element={<AddProductForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </motion.div>
            </AnimatePresence>
            <Footer />
        </div>
    );
};

export default App;
