import React from "react";
import NavigatorComponent from "./navigator";
import Products from "./products";

const BodyComponent = () => {
    return (
        <div>
            <NavigatorComponent />
            <Products />
        </div>
    )
}

export default BodyComponent;

