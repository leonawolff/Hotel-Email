import React, { Component } from "react";
import Popup from "reactjs-popup";
import App from './App';

class Hotel extends Component {
    render()
    {
        return(
            <Popup trigger={<button className="button"> Book Minder </button>}
            modal
            closeOnDocumentClick>
            <App/>
            </Popup>

        );

    }
}


export default Hotel;
