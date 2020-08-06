import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { AppContext } from '../../context/AppProvider'
import formatCurrency from '../../utils/utils'

const CartList = () => {
    const {cart} = useContext(AppContext)
    return (
        <div className="cartlist">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cart.length === 0 ?
            <div>
              Cart is empty
          </div>
            :
            cart.map(item =>
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.title}
                    </Link>

                  </div>
                  <div>
                    Qty:
                  <select value={item.count}>
                     {[...Array(item.inStock).keys()].map(x=> <option key={x+1} value={x+1}>{x+1}</option>)}
                    </select>
                    <button type="button" className="button"  >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart-price">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3>
       Subtotal : {cart.reduce((a,c)=> a + c.count,0)} items       
      </h3>
      <h3>Total : {formatCurrency(cart.reduce((a,c)=> a + c.price * c.count,0))}</h3>
      <button  className="button primary full-width" disabled={cart.length === 0}>
        Proceed to Checkout
      </button>

    </div>

  </div>
    )
}

export default CartList
