import { Alert } from "@mui/material";
import React from "react";

const AlertBox = (props) => {
  return (
   // console.log('props: ', {props.alert})
   // console.log('ab:',props.alert?.msg) 
   
   props.alert && (  
      <Alert variant="filled" severity={props.alert?.type}>
        {props.alert?.msg}
      </Alert>
    )
  );
};

export default AlertBox;
