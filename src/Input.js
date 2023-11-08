import React, { useState } from "react";

// could validate url here and show error if it's not
// of correct format
const validateUrl = (url) => {
    if (!url) return false;
    return true;
};

const Input = ({ onAddItem, errorMessage }) => {
    const [value, setValue] = useState("");

    const onClick = () => {
        if (validateUrl(value)) {
            onAddItem(value);
            setValue("");
        }
        return "";
    };

    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <div className="input-container">
            <div className="links">

                <a href="https://sjc1.vultrobjects.com/moments/demo/retail/1.jpg">ladies handbag </a>
                <a href= "https://sjc1.vultrobjects.com/moments/ads/square-emoji.png">Square emoji</a>
                <a href= " https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/coca-cola-short.mp4">Coca Cola Short</a>
                <a href="https://ewr1.vultrobjects.com/moments/videos/car-parts.mp4">Car parts</a>
                <a href="https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/vbqr.png">videoByte</a>
                <a href="https://s3.us-east-2.amazonaws.com/vb-dev-media/moments/ads/reupload/avatar2-trailer-short.mp4">Avatar </a>
                {/*<a href="https://placekitten.com/300/200">placekitten.com</a> */}
            </div>
            <div className="input">
                <input value={value} onChange={onChange} />
                <button onClick={onClick}>Submit</button>
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
    );
};

export default Input;
