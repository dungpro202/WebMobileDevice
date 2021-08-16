import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import Layout from '../../components/Layout'
import { generatePublicUrl } from '../../urlConfig';
import './style.css'

/**
* @author
* @function ProductListPage
**/

const ProductListPage = (props) => {

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
        <Layout>

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
                                        <div className="productContainer" key={product._id}>
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
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }



        </Layout>
    )

}

export default ProductListPage