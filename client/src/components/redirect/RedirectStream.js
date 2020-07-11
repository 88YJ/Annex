import React from "react";
import { Redirect } from "react-router-dom";

const RedirectStream = ({ component: Component, ...rest }) => {
 return <Redirect to='/stream' />;
};

export default RedirectStream;
