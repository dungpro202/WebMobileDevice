import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./style.css";

/**
 * @author
 * @function Card
 **/

const Card = (props) => {

  const [show, setShow] = useState(false);

  const onShowChildren = () => {
    setShow(!show)
  }

  return (
    <div className="card" {...props}>
      {(props.headerLeft || props.headerRight) && (
        <div className="cardHeader">
          {props.headerLeft && <div>{props.headerLeft}</div>}
          {props.headerRight && props.headerRight}
          {props.headerRight2 && <div className="cardRight2">{props.headerRight2}</div>}
          <Button onClick={onShowChildren}></Button>
        </div>
      )}

      {show?
      props.children:null
      }
    </div>
  );
};

export default Card;