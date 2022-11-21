import React from "react";
import './button.css';

const ButtonSubmit = (props) => {
    if (props.Loading) {
        return (
            <a
                className="btn disable btn-primary btn-primary py-2 fw-normal"
            >Loading...</a>
        )
    }
    return (<a
        className="btn btn-primary py-2 fw-normal"
        onClick={props.handleSubmit}
    >Save</a>)
}

export default ButtonSubmit;