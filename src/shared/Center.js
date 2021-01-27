import React, {Component} from "react";
import "./../index.css"

export class Center extends Component {
    /*
    * Расположить элемент по центру экрана \ блока
    * */
    render() {
        return (
            <div className={"center  h100"}>
                <div className="column-center">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
