import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";

import "./style.css";

/**
 * @author
 * @function Orders
 **/

 const formatCash=(cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');


const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Layout sidebar>
      {order.orders.map((orderItem, index) => (
        <Card
          style={{
            margin: "10px 0",
          }}
          key={index}
          headerLeft={`Mã đơn hàng: ${orderItem._id}`}
          headerRight={`Khách Hàng: ${orderItem.user.firstName} ${orderItem.user.lastName}`}
          headerRight2={`Trạng Thái: ${orderItem.paymentStatus}`}
        >
          <div className="orderTop">
            <div>
              <div className="title">Danh Sách Sản Phẩm</div>
              {orderItem.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId.name}
                </div>
              ))}
            </div>
            <div>
              <span className="title">Tổng Tiền</span>
              <br />
              <span className="value">{formatCash(orderItem.totalAmount)} ₫</span>
            </div>
            <div>
              <span className="title">Hình Thức Thanh Toán</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Trạng Thái</span> <br />
              <span className="value">{orderItem.paymentStatus}</span>
            </div>
          </div>

          <div
            className="orderBottom"
          >
            <div className="orderTrack">
              {orderItem.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${status.isCompleted ? "active" : ""
                    }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}

            </div>

            {/* select input to apply order action */}
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {orderItem.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>
            {/* button to confirm action */}

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <button className="btn btn-primary" onClick={() => onOrderUpdate(orderItem._id)}>
                Xác Nhận
              </button>
            </div>
          </div>
        </Card>
      ))}
    </Layout>
  );
};

export default Orders;