import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../urlConfig";
import { IoIosArrowForward } from "react-icons/io";

import "./style.css";
import { Breed } from "../../components/MaterialUI";

/**
 * @author
 * @function OrderPage
 **/
const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order, index) => {

          return (
            <>
            <div style={{display: "flex"}}>

              <h5 style={{marginRight: "100px"}}> Đơn hàng : {index + 1}</h5>
              <h5 style={{marginRight: "100px"}}> Tổng tiền : {formatCash(order.record.totalRecord)} ₫</h5>
              <h5 style={{color: "green"}}>Trạng Thái : {order.paymentStatus}</h5>
            </div>
              {order.record.itemRecords.map((item) => (
                <Card style={{ display: "block", margin: "5px 0" }}>
                  <Link
                    to={`/order_details/${order._id}`}
                    className="orderItemContainer"
                  >
                    <div className="orderImgContainer">
                      {
                        // item.productId && item.productId.productImages.length > 0 ?
                        item.productImage ?
                          <img
                            className="orderImg"
                            src={generatePublicUrl(item.productImage)}
                            alt="aa"
                          />
                          : null
                      }
                    </div>
                    <div className="orderRow">
                      <div className="orderName">{item.productName}</div>
                      <div className="orderPrice">
                        {item.productQty} Cái
                      </div>
                      <div className="orderPrice">
                        {formatCash(item.productPrice)} ₫
                      </div>
                  
                    </div>
                  </Link>
                </Card>
              ))
              }
            </>
          );
        })}
      </div>
    </Layout >
  );
};

export default OrderPage;