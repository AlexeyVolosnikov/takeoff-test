import React, {Component} from "react";
import {Personal} from "./Personal";
import {Friends} from "./Friends";
import {deleteCookie, getCookie} from "../cookies/operations";
import {get_data} from "../queries/getFromDB";
import "./profile.scss";

export class Profile extends Component {
    constructor() {
        super();
        this.state = {
            id : -1,
            name : "",
            surname : "",
            friends : []
        }
    }
    componentDidMount() {
        let id = getCookie("id");
        get_data().then(
            data => {
                let {name, surname, friends} = data.users[id]
                this.setState({
                    id,
                    name,
                    surname,
                    friends
                })
            }
        )
    }
    render() {
        return (
            <div className={"row"}>
                <Personal name={this.state.name} surname={this.state.surname} />
                <Friends friends={this.state.friends} />
            </div>
        );
    }
}
