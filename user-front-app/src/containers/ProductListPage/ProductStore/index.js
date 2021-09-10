import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
    const product = useSelector((state) => state.product);
    const priceRange = product.priceRange;
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return (
        <>
            {Object.keys(product.productsByPrice).map((key, index) => {
                return (
                    <Card
                        // headerLeft={`${props.match.params.slug} giá dưới ${formatCash(priceRange[key])} VNĐ`}
                        headerLeft={`${props.match.params.slug} giá dưới ${formatCash(priceRange[key])} VNĐ`}
                        headerRight={
                            <MaterialButton
                                title={"Xem tất cả"}
                                style={{
                                    width: "96px",
                                }}
                                bgColor="#2874f0"
                                fontSize="12px"
                            />
                        }
                        style={{
                            width: "calc(100% - 40px)",
                            margin: "20px",
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            {product.productsByPrice[key].map((product) => (
                                <Link
                                    to={`/${product.slug}/${product._id}/p`}
                                    style={{
                                        display: "block",
                                        textDecoration: "none",
                                        color: "#000",
                                    }}
                                    className="productContainer"
                                >
                                    <div className="productImgContainer">
                                        {product.productImages.length > 0 ?
                                            <img
                                                src={generatePublicUrl(product.productImages[0].img)}
                                                alt=""
                                            />
                                            :null
                                        }

                                    </div>
                                    <div className="productInfo">
                                        <div style={{ margin: "10px 0" }}>{product.name}</div>
                                        <div>
                                            <Rating value="5.0" />
                                            &nbsp;&nbsp;
                                            <span
                                                style={{
                                                    color: "#777",
                                                    fontWeight: "500",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                (9999)
                                            </span>
                                        </div>
                                        <Price value={formatCash(product.price)} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Card>
                );
            })}
        </>
    );
};

export default ProductStore;