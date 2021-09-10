
import { cartConstants, productConstants } from "./constants";
import store from '../store';
import axiosInstance from "../helpers/axios";

export const getAllProduct = () => {
    return async dispatch => {

        const res = await axiosInstance.get(`/cartproduct/getAllProduct`);
        if (res.status === 200) {
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products: res.data.products }
            })
        } else {
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_FAILURE,
                payload: { error: res.data.error }
            });
            console.log('res2', res);

        }
        console.log(res);

    }
}

const getCartItems = () => {
    return async dispatch => {
        try {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const res = await axiosInstance.post(`/user/getCartItems`);
            if (res.status === 200) {
                const { cartItems } = res.data;
                console.log({ getCartItems: cartItems })
                if (cartItems) {
                    dispatch(getAllProduct())
                        .then(() => dispatch({
                            type: cartConstants.ADD_TO_CART_SUCCESS,
                            payload: { cartItems }
                        }))
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const addToCart = (product, newQty = 1) => {
    console.error('addToCart', product,newQty);
    return async dispatch => {

        const {
            cart: {
                cartItems
            },
            auth } = store.getState();

        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQty) : 1;
        cartItems[product._id] = {
            ...product,
            qty
        };

        if (auth.authenticate) {
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const payload = {
                cartItems: [{
                    product: product._id,
                    quantity: qty
                }]
            };
            console.log(payload);
            const res = await axiosInstance.post(`/user/cart/addtocart`, payload);
            console.log(res);
            if (res.status === 201) {
                dispatch(getCartItems());
            }
        } else {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }

        console.log('addToCart::', cartItems);
        dispatch(getAllProduct())
            .then(() => dispatch({
                type: cartConstants.ADD_TO_CART_SUCCESS,
                payload: { cartItems }
            }))

    }
}



export const updateCart = () => {
    console.error('updateCart')
    return async dispatch => {
        const { auth } = store.getState();
        let cartItems = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : null;

            //add tu localstore vao database
        if (auth.authenticate) {
            console.log('22xoa cart22')
            localStorage.removeItem('cart');
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key, index) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id
                        }
                    })
                };
                if (Object.keys(cartItems).length > 0) {
                    const res = await axiosInstance.post(`/user/cart/addtocart`, payload);
                    if (res.status === 201) {
                        dispatch(getCartItems());
                    }
                }
            }
        } else {
            console.log('ko dang nhap')

            if (cartItems) {
                dispatch(getAllProduct())
                    .then(() => dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems }
                    }))

            }
        }



    }
}

//remove theo id
export const removeCartItem = (payload) => {
    console.error('removeCartItem', payload)
    return async (dispatch) => {
        try {
            const { auth } = store.getState();
            let cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;
            if (auth.authenticate) {
                localStorage.removeItem('cart');
                dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
                const res = await axiosInstance.post(`/user/cart/removeItem`, { payload });
                if (res.status === 202) {
                    dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
                    dispatch(getCartItems());
                } else {
                    const { error } = res.data;
                    dispatch({
                        type: cartConstants.REMOVE_CART_ITEM_FAILURE,
                        payload: { error },
                    });
                }
            } else {
                if (cartItems) {
                    delete cartItems[payload.productId]
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    dispatch(getAllProduct())
                        .then(() => dispatch({
                            type: cartConstants.ADD_TO_CART_SUCCESS,
                            payload: { cartItems }
                        }))

                }
            }
        } catch (error) {
            console.log(error);
        }
    };
};


export {
    getCartItems
}