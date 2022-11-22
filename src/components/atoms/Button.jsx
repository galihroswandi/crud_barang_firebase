import React from "react";

const Button = ({ onClick, title, loading }) => {
    if (loading) {
        return (
            <button className="btn disable py-2 fs-5 fw-semibold mb-4">Loading...</button>
        )
    }
    return (
        <button className="btn py-2 fs-5 fw-semibold mb-4" onClick={onClick}>
            {title}
        </button>
    )
}

export default Button;