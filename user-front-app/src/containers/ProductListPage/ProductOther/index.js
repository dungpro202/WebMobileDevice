import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";

import "./style.css";
import { IoIosStar } from "react-icons/io";

/**
 * @author
 * @function ProductOther
 **/

const ProductOther = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  const formatCash=(cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return (
    <>
      
      <div className="cps-container">
        <div className="block-products">
          <div className="box-products">
            <div className="list-product">
              {product.products.map((product) => (
                <div className="item-product">
                  <div className="item-product__box-img">
                    <Link
                      to={`/${product.slug}/${product._id}/p`}
                    >
                      <img className="cpslazy loaded" alt="dd"
                        src={generatePublicUrl(product.productImages[0].img)} />
                    </Link>
                  </div>
                  <div className="item-product__sticker-percent"><p>Giảm 0%</p></div>
                  <div className="item-product__box-name">
                    <Link to={`/${product.slug}/${product._id}/p`}><h3>{product.name}</h3></Link>
                  </div>
                  <div className="item-product__box-price">
                    <p className="special-price">{formatCash(product.price)}&nbsp;₫</p>
                    <p className="old-price">{formatCash(product.price)}&nbsp;₫</p>
                  </div>
                  {/* <div className="promotion">dsds</div> */}
                  <div className="item-product__box-raiting">
                    <IoIosStar style={{ color: '#e67e22' }} />
                    <IoIosStar style={{ color: '#e67e22' }} />
                    <IoIosStar style={{ color: '#e67e22' }} />
                    <IoIosStar style={{ color: '#e67e22' }} />
                    <IoIosStar style={{ color: '#e67e22' }} />

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9999 đánh giá
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOther;