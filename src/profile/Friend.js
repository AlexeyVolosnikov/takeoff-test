import React, {Component} from "react";
import {v4 as uuid} from "uuid";
import "./friend.scss";

export class Friend extends Component {
    constructor() {
        super();
        this.state = {
            name : "",
            surname : ""
        }

        this.editNameRef   = React.createRef(uuid());
        this.editSurameRef = React.createRef(uuid());

        this.propsToState = this.propsToState.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit   = this.handleEdit.bind(this);
        this.openEdit     = this.openEdit.bind(this);
    }
    propsToState() {
        // делаем полную копию пропса
        let {name, surname} = JSON.parse(JSON.stringify(this.props.info))
        let number = JSON.parse(JSON.stringify(this.props.number))
        let isEditingOn = JSON.parse(JSON.stringify(this.props.isEditingOn))
        // и кладем в стейт, чтобы их можно было менять
        this.setState({
            number,
            name,
            surname,
            isEditingOn
        })
    }
    componentDidMount() {
        this.propsToState()
    }
    openEdit() {
        this.props.parent.openEdit(this.state.number)
    }
    handleEdit() {
        let name = this.editNameRef.current.value,
            surname = this.editSurameRef.current.value
        this.props.parent.edit(this.state.number, name, surname)
    }
    handleDelete() {
        this.props.parent.delete(this.state.number)
    }
    render() {
        return (
            <div className={"friend-wrapper row"}>
                <div className={"friend-id"}>{this.state.number}</div>
                {
                    !this.props.isEditingOn
                    &&
                    <div className={"friend-cell"}>{this.state.name}</div>
                }
                {
                    this.props.isEditingOn
                    &&
                    <input
                        ref={this.editNameRef}
                        placeholder={"Имя"}
                        type="text"
                        className={"searchbox name"}
                        defaultValue={this.state.name}
                    />
                }
                {
                    !this.props.isEditingOn
                    &&
                    <div className={"friend-cell"}>{this.state.surname}</div>
                }
                {
                    this.props.isEditingOn
                    &&
                    <input
                        ref={this.editSurameRef}
                        placeholder={"Фамилия"}
                        type="text"
                        className={"searchbox surname"}
                        defaultValue={this.state.surname}
                    />
                }
                <div className={"btns-wrapper"}>
                    {
                        !this.state.isEditingOn
                        &&
                        <input
                            onClick={this.openEdit}
                            className={"edit borders"}
                            type="submit"
                            value="РЕД"
                        />
                    }
                    {
                        this.state.isEditingOn
                        &&
                        <div className="row">
                            <input
                                onClick={this.handleEdit}
                                className={"doedit borders"}
                                type="submit"
                                value="Ок"
                            />
                            <input
                                onClick={()=>{
                                    this.props.parent.closeEdit(this.state.number)
                                }}
                                className={"noedit borders"}
                                type="submit"
                                value="Отмена"
                            />
                        </div>
                    }
                    <input onClick={this.handleDelete} className={"delete borders"} type="submit" value="X"/>
                </div>
            </div>
        );
    }
}
