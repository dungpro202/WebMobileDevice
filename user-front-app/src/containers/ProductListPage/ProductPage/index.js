import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';
/**
* @author
* @function ProductPage
**/

const ProductPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getParams(props.location.search);
        console.log({ params });
        const payload = {
            params
        }
        dispatch(getProductPage(payload));
    }, []);

    return (
        <>
            <div style={{ margin: '0 10px' }}>
                <h3>{page.title}</h3>
                <Carousel
                    renderThumbs={() => { }}

                >
                    {
                        page.banners && page.banners.map((banner, index) =>
                            <a
                                key={index}
                                style={{ display: 'block' }}
                                href={banner.navigateTo}
                            >
                                <img style={{ height: '500px' }} src={banner.img} alt="" />
                            </a>
                        )
                    }
                </Carousel>
                {
                    JSON.stringify(page.products)
                }
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '10px 0'
                }}>
                    {
                        page.products && page.products.map((product, index) =>
                            <Card
                                key={index}
                                style={{
                                    width: '400px',
                                    height: '200px',
                                    margin: '5px'
                                }}
                            >
                                <a
                                    key={index}
                                    style={{ display: 'block' }}
                                    href={product.navigateTo}
                                >
                                    <img style={{
                                        width: '100%',
                                        height: '100%'
                                    }} src={product.img} alt="" />
                                </a>

                            </Card>
                        )
                    }
                </div>
            </div>
        </>
    )

}

export default ProductPage