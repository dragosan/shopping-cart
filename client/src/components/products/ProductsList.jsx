import React,{useContext,useState,useEffect} from "react";
import formatCurrency from "../../utils/utils";
import { AppContext } from "../../context/AppProvider";
import {AuthContext} from "../../context/AuthProvider";
import Modal from 'react-modal';
import {Fade,Zoom} from 'react-reveal';

const ProductsList = () => {
    const {products,addToCart} = useContext(AppContext);
    const {user} = useContext(AuthContext)
    const [modal,setModal] = useState({product:null});

    
    const openModal = (product) =>{
        setModal({product})
    }

    const closeModal = () =>{
        setModal({product:null})
    }
  return (
      <div>
          <Fade bottom cascade>
    <ul className="products">
        {products!==undefined && products.map((product) => (
                <li key={product._id}>
                    <div className="product">
                        <a href={`#/${product._id}`}
                        onClick = {()=>openModal(product)}>
                            
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
    </Fade>
    {modal.product && <Modal isOpen={true}  onRequestClose={closeModal}>
            <Zoom>
              <button className="close-modal"  onClick={closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={modal.product.image} alt={modal.product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{modal.product.title}</strong>
                  </p>
                  <p>{modal.product.description}</p>
                  <p>
                    Avaiable Sizes:{" "}
                    {modal.product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(modal.product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        addToCart(modal.product);
                        closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>}
    </div>
  );
};

export default ProductsList;
