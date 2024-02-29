import React from "react";
import MUIAlert from "@mui/material/Alert";

interface AlertProps {
  alertMessage: string;
}

const Alert = (props: AlertProps) => {
  return (
    <MUIAlert
      severity="info"
      className="!text-primary !font-semibold !bg-slate-100/50 !backdrop-blur-lg !shadow-black !absolute !bottom-5 !right-5"
    >
      {props.alertMessage}
    </MUIAlert>
  );
};

export default Alert;
