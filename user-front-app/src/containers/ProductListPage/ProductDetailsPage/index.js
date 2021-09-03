import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getProductDetailsById } from '../../../actions';
import Layout from '../../../components/Layout'
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';
import { IoIosArrowForward, IoIosStar, IoMdCart } from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MaterialButton } from '../../../components/MaterialUI';
/**
* @author
* @function ProductDetailsPage
**/

export const ProductDetailsPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    useEffect(() => {
        const { productId } = props.match.params;
        console.log(props);
        const payload = {
            params: {
                productId,
            },
        };
        dispatch(getProductDetailsById(payload));
    }, []);

    const formatCash=(cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }

    return (
        <Layout>
            {/* <div>{product.productDetails.name}</div> */}
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {
                            product.productDetails.productImages.map((thumb, index) =>
                                <div className="thumbnail">
                                    <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                                </div>
                            )
                        }
                        {/* <div className="thumbnail active">
                {
                  product.productDetails.productImages.map((thumb, index) => 
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
                }
              </div> */}
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img src={generatePublicUrl(product.productDetails.productImages[0].img)} alt={`${product.productDetails.productImages[0].img}`} />
                        </div>

                        {/* action buttons */}
                        <div className="flexRow">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: '5px'
                                }}
                                icon={<IoMdCart />}
                                onClick={() => {
                                    const { _id, name, price } = product.productDetails;
                                    const img = product.productDetails.productImages[0].img;
                                    dispatch(addToCart({ _id, name, price, img }));
                                    // Nhay link den /cart
                                    props.history.push(`/cart`);
                                    console.log( "props.history", props.history)
                                  }}
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: '5px'
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div>

                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li><a href="#">Home</a><IoIosArrowForward /></li>
                            <li><a href="#">{product.productDetails.name}</a></li>
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{product.productDetails.name}</p>
                        <div>
                            <span className="ratingCount">5.0 <IoIosStar /></span>
                            <span className="ratingNumbersReviews">9,999 Ratings</span>
                        </div>
                        {/* <div className="extraOffer">Extra <BiRupee />4500 off </div> */}
                        <div className="flexRow priceContainer">
                            <span className="price">{formatCash(product.productDetails.price)} VNĐ</span>
                            <span className="discount" style={{ margin: '0 10px' }}>0% off</span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p style={{
                                color: '#212121',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>Ưu đãi: 0%</p>
                            <p style={{ display: 'flex' }}>
                                <span style={{
                                    width: '100px',
                                    fontSize: '12px',
                                    color: '#878787',
                                    fontWeight: '600',
                                    marginRight: '20px'
                                }}>Description</span>
                                <span style={{
                                    fontSize: '12px',
                                    color: '#212121',
                                }}>{product.productDetails.description}</span>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </Layout>
    )

}