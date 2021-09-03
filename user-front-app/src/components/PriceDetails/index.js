import React from "react";
import Card from "../../components/UI/Card";

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  const formatCash=(cash) => cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return (
    <Card headerLeft={"Thông Tin Thanh Toán"} style={{ maxWidth: "380px" }}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Giá ({props.totalItem} sản phẩm)</div>
          <div>{formatCash(props.totalPrice)} VNĐ</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Phí Vận Chuyển</div>
          <div>Miễn Phí</div>
        </div>
        <br/>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Tổng Tiền</div>
          <div>{formatCash(props.totalPrice)} VNĐ</div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;

