import React from "react";
import "components/Button.scss";
const classnames = require('classnames');

//---------BUTTON COMPONENT THAT WILL BE USED BY THE APPOINTMENT COMPONENT--------
export default function Button(props) {
   const buttonClass = classnames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });

   return (
     <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
     >
     {props.children}
     </button>
   );
 }