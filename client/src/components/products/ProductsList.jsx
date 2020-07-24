import React,{useContext} from "react";
import formatCurrency from "../../utils";
import { AppContext } from "../../context/AppProvider"

const ProductsList = () => {
    const {products,cart,addToCart} = useContext(AppContext);
  return (
      <div>
    <ul className="products">
        {products!==undefined && products.map((product) => (
                <li key={product._id}>
                    <div className="product">
                        <a href="#">
                            <img src={product.image} alt={product.title}/>
                            <p>{product.title}</p>
                        </a>
                        <div className="product-price">
                            <div>{formatCurrency(product.price)}</div>
                            <button onClick={()=> addToCart(product)} className="button primary">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </li>
              ))
        
          }
      
    </ul>
    </div>
  );
};

export default ProductsList;
