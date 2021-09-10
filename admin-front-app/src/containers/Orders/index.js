import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "../../urlConfig";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";

import "./style.css";

/**
 * @author
 * @function Orders
 **/

const formatCash = (cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// var x = 5200000;

// const testCash = (cash) => {
//   cash = cash.toLocaleString('vi', { style: 'currency', currency: 'VND' });
// }


const Orders = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const toggleClass = (e) => {
    const tag = e.target.parentElement.parentElement
    console.log('tag', tag)
    tag.classList.toggle("mystyle");
  };


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
      <Table bordered hover size="sm" variant="">
        <thead>
          <tr>
            <th>#</th>
            <th>Người Nhận</th>
            <th>Địa Chỉ Giao Hàng</th>
            <th>Loại Địa Chỉ</th>
            <th>Số Điện Thoại</th>
            <th>Mã đơn hàng</th>
            <th>Số Tiền Thanh Toán</th>
            <th>Trang Thai Don Hang</th>
            <th>Chi Tiết</th>
          </tr>
        </thead>
        <tbody>
          {order.orders.map((orderItem, index) => (
            <>
              <tr >
                <td>{index + 1}</td>
                <td>{orderItem.record.nameRecord}</td>
                <td style={{ maxWidth: '400px' }}>{orderItem.record.addressRecord}</td>
                <td>{orderItem.record.addressTypeRecord}</td>
                <td>{orderItem.record.phoneRecord}</td>
                <td>{orderItem._id}</td>
                <td>{orderItem.record.totalRecord}  ₫</td>
                <td>{orderItem.paymentStatus}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={(e) => { toggleClass(e) }}
                  >
                    =
                  </Button>
                </td>
              </tr>
              <tr className="hidden">
                <td colspan="9">
                  <div>
                    <div className="orderTop">
                      <Table variant="parimary">
                        <thead>
                          <tr>
                            <th className="title"></th>
                            <th className="title">Danh Sách Sản Phẩm</th>
                            <th className="title">Hình Ảnh</th>
                            <th className="title">Giá Tiền</th>
                            <th className="title">Số Lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItem.record.itemRecords.map((item, index) => (
                            <tr key={index}>
                              <td className="value">{index+1}</td>
                              <td className="value">{item.productName}</td>
                              <td className="value"><img width="50px" height="50px" src={generatePublicUrl(item.productImage)} alt={item.productName} /></td>
                              <td className="value">{formatCash(item.productPrice)} ₫</td>
                              <td className="value">{formatCash(item.productQty)}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colspan="2" className="title">Hình Thức Thanh Toán : {orderItem.paymentType}</td>
                            <td colspan="2" className="title">Tổng Tiền: {formatCash(orderItem.totalAmount)} ₫</td>
                            <td colspan="2" className="title">Trạng Thái: {orderItem.paymentStatus}</td>
                          </tr>
                        </tbody>
                      </Table>
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
                          <option value={""}>Trạng Thái</option>
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
                  </div>

                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </Layout>
  )
};

export default Orders;