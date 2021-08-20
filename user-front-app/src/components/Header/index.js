import React, { useEffect, useState } from 'react';
import './style.css';
import flipkartLogo from '../../images/logo/logo1.jpg';
import goldenStar from '../../images/logo/test.jpg';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu
} from '../MaterialUI';
import { useDispatch, useSelector } from 'react-redux';
import { login, signout } from '../../actions';

/**
* @author
* @function Header
**/

const Header = (props) => {

    const [loginModal, setLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const useLogin = () => {
        dispatch(login({ email, password }));
    }

    const logout = () => {
        dispatch(signout());
    }


    useEffect(() => {

        if (auth.authenticate) {
            setLoginModal(false)
        }

    }, [auth.authenticate]);

    const renderLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={<a className="fullName">{auth.user.fullName}</a>}
                menus={[
                    { label: "My Profile", href: "", icon: null },
                    { label: "SuperCoin Zone", href: "", icon: null },
                    { label: "Flipkart Plus Zone", href: "", icon: null },
                    {
                        label: "Orders",
                        href: `/account/orders`,
                        icon: null,
                    },
                    { label: "Wishlist", href: "", icon: null },
                    { label: "My Chats", href: "", icon: null },
                    { label: "Coupons", href: "", icon: null },
                    { label: "Rewards", href: "", icon: null },
                    { label: "Notifications", href: "", icon: null },
                    { label: "Gift Cards", href: "", icon: null },
                    { label: "Logout", href: "", icon: null, onClick: logout },
                ]}
            />
        )
    }

    const renderNonLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="loginButton" onClick={() => setLoginModal(true)}>
                        Login
                    </a>
                }
                menus={[
                    { label: 'My Profile', href: '', icon: null },
                    { label: 'Flipkart Plus Zone', href: '', icon: null },
                    { label: 'Orders', href: '', icon: null },
                    { label: 'Wishlist', href: '', icon: null },
                    { label: 'Rewards', href: '', icon: null },
                    { label: 'Gift Cards', href: '', icon: null },
                ]}
            />
        )
    }

    return (
        <div className="header">
            <Modal
                visible={loginModal}
                onClose={() => setLoginModal(false)}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="rightspace">

                            <div className="loginInputContainer">
                                <MaterialInput
                                    type="text"
                                    label="Enter Email/Enter Mobile Number"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <MaterialInput
                                    type="password"
                                    label="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    rightElement={<a href="#">Forgot?</a>}
                                />


                                <MaterialButton
                                    title="Login"
                                    bgColor="#fb641b"
                                    textColor="#ffffff"
                                    onClick={useLogin}
                                />
                                <p style={{ textAlign: 'center' }}>OR</p>
                                <MaterialButton
                                    title="Request OTP"
                                    bgColor="#ffffff"
                                    textColor="#2874f0"
                                    style={{ margin: '10px 0' }}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="subHeader">
                <div className="logo">
                    <a href="">
                        <img src={flipkartLogo} className="logoimage" alt="" />
                    </a>
                    <a style={{ marginTop: '-10px' }}>
                        <span className="exploreText">Explore</span>
                        <span className="plusText">Plus</span>
                        <img src={goldenStar} className="goldenStar" alt="" />
                    </a>
                </div>
                <div style={{
                    padding: '0 10px'
                }}>
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={'search for products, brands and more'}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch style={{
                                color: '#2874f0'
                            }} />
                        </div>

                    </div>
                </div>
                <div className="rightMenu">
                    {
                        auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()


                    }

                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>More</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            { label: 'Notification Preference', href: '', icon: null },
                            { label: 'Sell on flipkart', href: '', icon: null },
                            { label: '24x7 Customer Care', href: '', icon: null },
                            { label: 'Advertise', href: '', icon: null },
                            { label: 'Download App', href: '', icon: null }
                        ]}
                    />
                    <div>
                        <a className="cart">
                            <IoIosCart />
                            <span style={{ margin: '0 10px' }}>Cart</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Header