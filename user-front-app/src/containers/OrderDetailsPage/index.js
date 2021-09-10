import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { generatePublicUrl } from "../../urlConfig";

import "./style.css";

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
 const formatCash=(cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.record)) {
    return (
      <>
      ssss
      </>
    );
  }

  return (
    <Layout>
      <div
        style={{
          width: "1160px",
          margin: "10px auto",
        }}
      >
        <Card
          style={{
            margin: "10px 0",
          }}
        >
          <div className="delAdrContainer">
            <div className="delAdrDetails">
              <div className="delTitle">Địa Chỉ Giao Hàng</div>
              <div className="delName">{orderDetails.record.nameRecord}</div>
              <div className="delAddress">{orderDetails.record.addressRecord}</div>
              <div className="delPhoneNumber">
                Số Điện Thoại : {orderDetails.record.phoneRecord}
              </div>
            </div>
            <div className="delMoreActionContainer">
              <div className="delTitle">Tổng Tiền: {formatCash(orderDetails.record.totalRecord)} VNĐ</div>
            </div>
          </div>
        </Card>

        {orderDetails.record.itemRecords.map((item, index) => (
          <Card
            style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
          >
            <div className="flexRow">
              <div className="delItemImgContainer">
                <img src={generatePublicUrl(item.productImage)} alt="" />
              </div>
              <div style={{ width: "250px" }}>
                <div className="delItemName">{item.productName}</div>
                <div className="delItemName">Giá : {formatCash(item.productPrice)} VNĐ</div>
                <div className="delItemName">Số Lượng:{item.productQty}</div>
              </div>
            </div>
            <div style={{ padding: "25px 50px" }}>
              <div className="orderTrack">
                {orderDetails.orderStatus.map((status) => (
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
            </div>
            <div style={{ fontWeight: "500", fontSize: 14 }}>
              {orderDetails.orderStatus[3].isCompleted &&
                `Đã giao Hàng vào ${formatDate2(orderDetails.orderStatus[3].date)}`}
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;