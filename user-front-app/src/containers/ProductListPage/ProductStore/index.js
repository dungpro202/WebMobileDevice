import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';

import './style.css'

/**
* @author
* @function ProductStore
**/

const ProductStore = (props) => {
    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000

    });
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, [])

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="cardHeader">
                                <div>{props.match.params.slug} Airport mobile under {priceRange[key]}</div>
                                <button>viewall</button>
                            </div>

                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link to={`/${product.slug}/${product._id}/p`} style={{ display: 'block' }} className="productContainer" key={product._id}>
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productImages[0].img)} alt="ff" />
                                            </div>
                                            <div className="ProductInfo">
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>4.3</span>
                                                    <span>3353</span>
                                                </div>
                                                <div className="productPrice">{product.price}</div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

}

export default ProductStore