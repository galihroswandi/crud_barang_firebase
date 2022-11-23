import React from "react";
import NavigatorComponent from "./navigator";
import Products from "./products";

const BodyComponent = (props) => {
    return (
        <div>
            <NavigatorComponent />
            <Products user_id={props.user_id} handleDelete={(id, img) => props.handleDelete(id, img)} />
        </div>
    )
}

export default BodyComponent;

