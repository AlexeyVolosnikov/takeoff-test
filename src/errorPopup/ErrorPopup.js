import React, {Component} from "react";
import {v4 as uuid} from "uuid";
import $ from 'jquery';
import "./errorPopup.scss";

export class ErrorPopup extends Component {
    constructor() {
        super();
        this.popupRef = React.createRef(uuid());
    }
    moveLeft() {
        return new Promise((res, reject)=>{
            let y = parseInt($(".popup-wrapper").css("right"));
            setInterval(()=>{
                y = 15
                $(".popup-wrapper").css("right",  y + "px");
            }, 16)
        })
    }
    componentDidMount() {
        this.moveLeft()
    }
    render() {
        return (
            <div ref={this.popupRef} className={"popup-wrapper column"}>
                <div className={"error error-title row space-between"}>
                    <div>
                        <b>Ошибка!</b>
                    </div>
                    <div
                        className={"close"}
                        onClick={() => {
                            this.props.parent.closeError()
                        }}
                    />
                </div>
                <div className={"error-body"}>{this.props.error}</div>
            </div>
        );
    }
}
