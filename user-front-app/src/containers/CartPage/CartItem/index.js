import React, { useState } from 'react'
import { generatePublicUrl } from '../../../urlConfig';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';

/**
* @author
* @function CartItem
**/

const CartItem = (props) => {
    const product = useSelector(state => state.product)
    const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');


    const [qty, setQty] = useState(props.cartItem.qty);
    const {
        _id, name, price, img
    } = props.cartItem;

    const maxqty = product.products.find(item => item._id == _id)

    const onQuantityIncrement = () => {
        if (qty >= maxqty.quantity) return;
        setQty(qty + 1);
        props.onQuantityInc(_id, qty + 1);
    }

    const onQuantityDecrement = () => {
        if (qty <= 1) return;
        setQty(qty - 1);
        props.onQuantityDec(_id, qty - 1);
    }

    return (
        <div className="cartItemContainer">
            <div className="flexRow">

                <div className="cartProImgContainer">
                    <img src={generatePublicUrl(img)} alt={''} />
                </div>
                <div className="cartItemDetails">
                    <div>
                        <p>{name}</p>
                        <p>Giá: {formatCash(price)} VNĐ</p>
                    </div>
                    <div>Giao hàng từ 3-5 ngày</div>
                </div>

            </div>
            <div style={{
                display: 'flex',
                margin: '5px 0'
            }}>
                {/* quantity control */}
                <div className="quantityControl">
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly />
                    <button onClick={onQuantityIncrement}>+</button>
                </div>
                {/* <button className="cartActionBtn">save for later</button> */}
                <button
                    className="cartActionBtn"
                    onClick={() => props.onRemoveCartItem(_id)}
                >
                    Remove
                </button>
            </div>
        </div>
    )

}

export default CartItem