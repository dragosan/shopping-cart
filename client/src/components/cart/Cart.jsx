import React,{useContext} from 'react'
import { AppContext } from '../../context/AppProvider';
import formatCurrency from '../../utils';

const Cart = () => {
    const { cart,removeFromCart } = useContext(AppContext);
    return (
      <div>
        {cart.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cart.length} in the cart{" "}
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={()=>removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cart.length !== 0 && (
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cart.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button className="button primary">Proceed</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default Cart
