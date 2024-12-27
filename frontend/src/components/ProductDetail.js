import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../styles/ProductDetail.css';

const ProductDetail = ({ products, setBag, bag }) => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const product = products.find((p) => p.id === productId);

    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            setMainImage(product.image);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="product-detail-not-found">
                <h2>Product not found</h2>
                <button onClick={() => navigate('/home')} className="back-button">
                    Back to Products
                </button>
            </div>
        );
    }

    const handleImageSwap = (newImage) => {
        setMainImage(newImage);
    };

    const handleAddToBag = () => {
        if (product.quantity <= 0) {
            alert('Out of stock!');
        } else {
            const totalInBag = bag.reduce((total, item) => {
                return item.id === product.id ? total + item.quantity : total;
            }, 0);

            if (totalInBag + quantity > product.quantity) {
                alert('Cannot add more than the available stock!');
            } else {
                setBag((prevBag) => {
                    const updatedBag = [...prevBag];
                    const existingProduct = updatedBag.find((item) => item.id === product.id);

                    if (existingProduct) {
                        existingProduct.quantity += quantity;
                    } else {
                        updatedBag.push({
                            ...product,
                            quantity,
                            totalPrice: product.price * quantity,
                        });
                    }

                    return updatedBag;
                });

                alert(`${product.name} added to bag!`);
            }
        }
    };

    const handleIncrement = () => {
        if (quantity < product.quantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        } else {
            alert('Cannot add more than the available stock!');
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (
        <div className="product-detail-container">
            <div className="product-detail-card">
                <div className="product-image-container">
                    <img 
                        src={mainImage} 
                        alt={product.name} 
                        className="product-detail-image"
                    />
                    <div className="product-thumbnail-container">
                        <img 
                            src={product.image} 
                            alt="Front View" 
                            className={`product-thumbnail ${mainImage === product.image ? 'active' : ''}`}
                            onClick={() => handleImageSwap(product.image)}
                        />
                        {product.backImage && (
                            <img 
                                src={product.backImage} 
                                alt="Back View" 
                                className={`product-thumbnail ${mainImage === product.backImage ? 'active' : ''}`}
                                onClick={() => handleImageSwap(product.backImage)}
                            />
                        )}
                    </div>
                </div>
                <div className="product-detail-info">
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Price: <strong>€{product.price}</strong></p>
                    <p className="product-stock">Stock: {product.quantity}</p>
                    <div className="quantity-container">
                        <button onClick={handleDecrement}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleAddToBag} className="submit-button">
                        Add to Bag
                    </button>
                    <button onClick={() => navigate('/home')} className="back-button">
                        Back to Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
