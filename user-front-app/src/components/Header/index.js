import React, { useEffect, useState } from 'react';
import './style.css';
import nadshoplogo from '../../images/logo/nadshop6.png';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu
} from '../MaterialUI';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsSearch, login, signout, signup as _signup } from '../../actions';
import Cart from '../UI/Cart';
import { Redirect } from 'react-router';

/**
* @author
* @function Header
**/

const Header = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const [signup, setSignup] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keyword, setKeyword] = useState("");

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // state cart value
    const cart = useSelector((state) => state.cart);

    const userSignup = () => {
        const user = { firstName, lastName, email, password };
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === ""
        ) {
            return;
        }

        dispatch(_signup(user));
    };

    const userLogin = () => {
        if (signup) {
            userSignup();
        } else {
            dispatch(login({ email, password }));
        }
    };

    const logout = () => {
        dispatch(signout());
    };

    useEffect(() => {
        if (auth.authenticate) {
            setLoginModal(false);
        }
    }, [auth.authenticate]);

    const renderLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={<a className="fullName">{auth.user.fullName}</a>}
                menus={[
                    { label: "My Profile", href: "", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                    },
                    { label: "Gift Cards", href: "", icon: null },
                    { label: "Logout", href: "", icon: null, onClick: logout },
                ]}
            />
        );
    };

    const renderNonLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <button
                        className="loginButton"
                        onClick={() => {
                            setSignup(false);
                            setLoginModal(true);
                        }}
                    >
                        Login
                    </button>
                }
                menus={[
                    { label: "My Profile", href: "", icon: null },
                    { label: "11111", href: "", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                        onClick: () => {
                            !auth.authenticate && setLoginModal(true);
                        },
                    },
                    { label: "Wishlist", href: "", icon: null },
                    { label: "Rewards", href: "", icon: null },
                    { label: "Gift Cards", href: "", icon: null },
                ]}
                firstMenu={
                    <div className="firstmenu">
                        <span>New Customer?</span>
                        <button
                            onClick={() => {
                                setLoginModal(true);
                                setSignup(true);
                            }}
                            style={{ color: "#2874f0", cursor: "pointer" }}
                        >
                            Sign Up
                        </button>
                    </div>
                }
            />
        );
    };

    const onChangeSearch = (e) => {
        console.log(e.target.value)
         setKeyword(e.target.value); 
        console.log('keyword',keyword)
         dispatch(getProductsSearch(e.target.value)) 
        }

    const onClickSearch =  () => {
        <Redirect to="/home"/>
        dispatch(getProductsSearch(keyword))
    }

    return (
        <div className="header">
            {/* Login modal */}
            <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            {signup ? <h2>Đăng Ký</h2> : <h2>Đăng Nhập</h2>}
                            <p>Chào mừng bạn đến với NAD Shop</p>
                        </div>
                        <div className="rightspace">
                            <div className="loginInputContainer">

                                {signup && (
                                    <MaterialInput
                                        type="text"
                                        label="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                )}
                                {signup && (
                                    <MaterialInput
                                        type="text"
                                        label="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                )}

                                <MaterialInput
                                    type="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <MaterialInput
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <MaterialButton
                                    title={signup ? "Register" : "Login"}
                                    bgColor="#fb641b"
                                    textColor="#ffffff"
                                    style={{
                                        margin: "40px 0 20px 0",
                                    }}
                                    onClick={userLogin}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* Login modal end */}

            <div className="header-wrap">
                <div className="logo">
                    <a href="/">
                        <img src={nadshoplogo} className="logoimage" alt="logo nad shop" />
                    </a>
                </div>

                <div className="searchInputContainer">
                    {/* <form action="/search" >
                        <input
                            className="searchInput"
                            placeholder={"Nhập tên điện thoại, phụ kiện... cần tìm"}
                            value={keyword}
                            name={"keyword"}
                            onChange={(e) => { setKeyword(e.target.value) }}
                        />
                        <input type="submit" value="Submit"/>
                    </form> */}
                    <input
                        className="searchInput"
                        placeholder={"Nhập tên điện thoại, phụ kiện... cần tìm"}
                        value={keyword}
                        onChange={onChangeSearch}
                    />
                    <div className="searchIconContainer" onClick={onClickSearch}>
                        <IoIosSearch
                            style={{
                                color: "#fff",
                                fontSize: 24
                            }}
                        />
                    </div>
                </div>

                {/* right side menu */}
                <div className="rightMenu">
                    {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>Thông Tin Hay</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            { label: "Tin mới", href: "", icon: null },
                            { label: "Khuyến mãi", href: "", icon: null },
                            { label: "Thủ thuật", href: "", icon: null },
                            { label: "For Gamers", href: "", icon: null },
                            { label: "Video hot", href: "", icon: null },
                            { label: "Đánh giá, tư vấn", href: "", icon: null },
                            { label: "App & Game", href: "", icon: null },
                            { label: "Sự kiện", href: "", icon: null },
                        ]}
                    />
                    <div>
                        <a href={`/cart`} className="cart">
                            <Cart count={Object.keys(cart.cartItems).length} />
                            <span style={{ margin: "0 10px" }}>Giỏ Hàng</span>
                        </a>
                    </div>
                </div>
                {/* right side menu ends here */}
            </div>
        </div>
    );
};

export default Header;