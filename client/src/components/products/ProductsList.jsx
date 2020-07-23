import React from "react";
import formatCurrency from "../../utils";

const ProductsList = ({ products }) => {
  return (
      <div>
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
            <div className="product">
                <a href="#">
                    <img src={product.image} alt={product.title}/>
                    <p>{product.title}</p>
                </a>
                <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button className="button primary">
                        Add To Cart
                    </button>
                </div>
            </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default ProductsList;
