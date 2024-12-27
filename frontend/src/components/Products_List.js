import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import '../styles/ProductsList.css';

const Products_List = ({ products = [] }) => {
    const [bag, setBag] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [category, setCategory] = useState("All Products");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filter = params.get("filter");

        if (filter) {
            setFilteredProducts(products.filter((product) => product.category === filter));
            setCategory(filter);
        } else {
            setFilteredProducts(products);
            setCategory("All Products");
        }
    }, [location.search, products]);

   const InspectProduct = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (!filteredProducts || filteredProducts.length === 0) {
        return (
            <div className="centered-message">
                <h2>No products available</h2>
                <p>Come back later!</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Shop {category}</h2>
                <div className="products-grid">
                    {filteredProducts.map((product, index) => (
                        <div
                            className="product-item"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                                <img onClick={() => InspectProduct(product.id)}
                                    src={hoveredIndex === index && product.backImage ? product.backImage : product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <p>{product.name}</p>
                                <p>Price: €{product.price}</p>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default Products_List;
