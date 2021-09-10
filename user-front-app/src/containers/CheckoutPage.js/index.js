import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, getAddress, getCartItems } from '../../actions';
import Layout from '../../components/Layout';
import { Anchor, MaterialButton, MaterialInput } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import Card from '../../components/UI/Card';
import AddressForm from './AddressForm';
import CartPage from "../CartPage";

import './style.css';

/**
* @author
* @function CheckoutPage
**/

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div
                onClick={props.onClick}
                className={`checkoutHeader ${props.active && "active"}`}
            >
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
};

const Address = ({
    adr,
    selectAddress,
    enableAddressEditForm,
    confirmDeliveryAddress,
    onAddressSubmit,
}) => {
    return (
        <div className="flexRow addressContainer">
            <div>
                <input name="address" onClick={() => selectAddress(adr)} type="radio" />
            </div>
            <div className="flexRow sb addressinfo">
                {!adr.edit ? (
                    <div style={{ width: "100%" }}>
                        <div className="addressDetail">
                            <div>
                                <span className="addressName">Người Nhận: {adr.name}</span>
                                <span className="addressType">{adr.addressType}</span>
                                <span className="addressMobileNumber">SĐT: {adr.mobileNumber}</span>
                            </div>
                            {adr.selected && (
                                <Anchor
                                    name="Chỉnh Sửa"
                                    onClick={() => enableAddressEditForm(adr)}
                                    style={{
                                        fontWeight: "500",
                                        color: "#2874f0",
                                    }}
                                />
                            )}
                        </div>
                        <div className="fullAddress">
                            Địa Chỉ: {adr.town},  {adr.district},{adr.city}<br />
                        </div>
                        <div className="fullAddress">
                            Địa Chỉ Chi Tiết: {adr.address} <br />
                        </div>
                        {adr.selected && (
                            <MaterialButton
                                title="Xác Nhận Địa Chỉ"
                                onClick={() => confirmDeliveryAddress(adr)}
                                style={{
                                    width: "200px",
                                    margin: "10px 0",
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <AddressForm
                        withoutLayout={true}
                        onSubmitForm={onAddressSubmit}
                        initialData={adr}
                        onCancel={() => { }}
                    />
                )}
            </div>
        </div>
    );
};

const CheckoutPage = (props) => {
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    };

    const selectAddress = (addr) => {
        //console.log(addr);
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id
                ? { ...adr, selected: true }
                : { ...adr, selected: false }
        );
        setAddress(updatedAddress);
    };

    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    };

    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        );
        setAddress(updatedAddress);
    };

    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setPaymentOption(true);
    };

    const onConfirmOrder = () => {
        const totalAmount = Object.keys(cart.cartItems).reduce(
            (totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
            },
            0
        );
        const items = Object.keys(cart.cartItems).map((key) => ({
            productId: key,
            payablePrice: cart.cartItems[key].price,
            purchasedQty: cart.cartItems[key].qty,
        }));
        const itemRecords = Object.keys(cart.cartItems).map((key) => ({
            productName: cart.cartItems[key].name,
            productImage: cart.cartItems[key].img,
            productPrice: cart.cartItems[key].price,
            productQty: cart.cartItems[key].qty,
        }));

        const payload = {
            addressId: selectedAddress._id,
            record: {
                addressRecord: selectedAddress.address,
                addressTypeRecord:selectedAddress.addressType,
                nameRecord: selectedAddress.name,
                phoneRecord: selectedAddress.mobileNumber,
                itemRecords,
                totalRecord:totalAmount,
            },
            totalAmount,
            items,
            paymentStatus: "pending",
            paymentType: "cod"
        };

        console.log(payload);
        dispatch(addOrder(payload));
        setConfirmOrder(true);
    };

    useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems());
    }, [auth.authenticate]);

    useEffect(() => {
        const address = user.address.map((adr) => ({
            ...adr,
            selected: false,
            edit: false,
        }));
        setAddress(address);
        //user.address.length === 0 && setNewAddress(true);
    }, [user.address]);

    if (confirmOrder) {
        return (
            <Layout>
                <Card>
                    <div style={{ color: '#4834d4', margin: '50px 0 50px 100px' }}>
                        <div >Đơn Hàng Của Bạn Đã Được Xác Nhận</div>
                        <div>Thời gian Giao Hàng Dự Kiến 3 đến 5 ngày</div>
                        <div>Thông Tin Liên Hệ : 0377276515 </div>
                    </div>
                </Card>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <div className="checkoutContainer">
                    {/* check if user logged in or not */}
                    <CheckoutStep
                        stepNumber={"1"}
                        title={"Đăng Nhập"}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ? (
                                <div className="loggedInId">
                                    <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                                    <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                                </div>
                            ) : (
                                <div>
                                    Vui lòng Đăng Nhập
                                </div>
                            )
                        }
                    />
                    <CheckoutStep
                        stepNumber={"2"}
                        title={"Địa Chỉ Giao Hàng"}
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {confirmAddress ? (
                                    <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address}`}</div>
                                ) : (
                                    address.map((adr) => (
                                        <Address
                                            selectAddress={selectAddress}
                                            enableAddressEditForm={enableAddressEditForm}
                                            confirmDeliveryAddress={confirmDeliveryAddress}
                                            onAddressSubmit={onAddressSubmit}
                                            adr={adr}
                                        />
                                    ))
                                )}
                            </>
                        }
                    />

                    {/* AddressForm */}
                    {confirmAddress ? null : newAddress ? (
                        <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
                    ) : auth.authenticate ? (
                        <CheckoutStep
                            stepNumber={"+"}
                            title={"Thêm Địa Chỉ Giao Hàng"}
                            active={false}
                            onClick={() => setNewAddress(true)}
                        />
                    ) : null}

                    <CheckoutStep
                        stepNumber={"3"}
                        title={"Xem Lại Đơn Hàng"}
                        active={orderSummary}
                        body={
                            orderSummary ? (
                                <CartPage onlyCartItems={true} />
                            ) : orderConfirmation ? (
                                <div className="stepCompleted">
                                    {Object.keys(cart.cartItems).length} items
                                </div>
                            ) : null
                        }
                    />

                    {orderSummary && (
                        <Card
                            style={{
                                margin: "10px 0",
                            }}
                        >
                            <div
                                className="flexRow sb"
                                style={{
                                    padding: "20px",
                                    alignItems: "center",
                                }}
                            >
                                <p style={{ fontSize: "12px" }}>
                                    Email xác nhận đơn hàng sẽ được gửi đến {" "}
                                    <strong>{auth.user.email}</strong>
                                </p>
                                <MaterialButton
                                    title="Tiếp Tục"
                                    onClick={userOrderConfirmation}
                                    style={{
                                        width: "200px",
                                    }}
                                />
                            </div>
                        </Card>
                    )}

                    <CheckoutStep
                        stepNumber={"4"}
                        title={"Phương Thức Thanh Toán"}
                        active={paymentOption}
                        body={
                            paymentOption && (
                                <div>
                                    <div
                                        className="flexRow"
                                        style={{
                                            alignItems: "center",
                                            padding: "20px",
                                        }}
                                    >
                                        <input type="radio" name="paymentOption" value="cod" />
                                        <div>Thanh toán khi giao hàng</div>
                                    </div>

                                    <MaterialButton
                                        title="Xác Nhận Đơn Hàng"
                                        onClick={onConfirmOrder}
                                        style={{
                                            width: "200px",
                                            margin: "0 0 20px 20px",
                                        }}
                                    />
                                    <div style={{ color: "#535c68", margin: '0 auto' }}>Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng của NAD Shop</div>
                                </div>
                            )
                        }
                    />
                </div>

                {/* Price Component */}
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    );
};

export default CheckoutPage;