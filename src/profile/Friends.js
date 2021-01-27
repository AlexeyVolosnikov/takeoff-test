import React, {Component} from "react";
import {v4 as uuid} from "uuid";
import {get_data} from "../queries/getFromDB";
import "./friends.scss";
import {Friend} from "./Friend";

export class Friends extends Component {
    constructor() {
        super();
        this.state = {
            friends : [],
            filter : "",
            editing : []
        }
        this.searchboxRef     = React.createRef(uuid());
        this.newFriendName    = React.createRef(uuid());
        this.newFriendSurname = React.createRef(uuid());
        this.handleSearch     = this.handleSearch.bind(this);
        this.addFriend        = this.addFriend.bind(this);
    }
    get_friendlist(){
        get_data().then(data=>{
            let friends = [...this.props.friends];
            this.setState({friends:friends})
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.friends) !== JSON.stringify(this.props.friends)) {
            this.get_friendlist()
        }
    }
    filter(who) {
        // применить фильтр друзей
        let filtered_friends = []
        for (let friend of this.props.friends) {
            if (friend.name.toLowerCase().includes(who)
                ||
                friend.surname.toLowerCase().includes(who)) {
                filtered_friends.push(friend)
            }
        }
        this.setState({
            friends : filtered_friends,
            filter : who
        })
    }
    handleSearch() {
        // фильтр друзей по имени или фамилии
        // в будущем в случае слишком большого списка наилучшим способо решения задачи
        // будет применение бинарного поиска
        let who = this.searchboxRef.current.value.toLowerCase();
        if (who === "") {
            // сбросить фильтр
            this.get_friendlist()
        }
        else {
            // отфильтровать текущие еще раз по обновлениям фильтра
            this.filter(who)
        }
    }
    delete(index) {
        // удалить друга под индексом index
        let friends = [...this.state.friends]
        friends.splice(index, 1)
        this.setState({
            friends,
            // убрать все редактирования, тк друг был удален
            editing : []
        })
    }
    closeEdit(index) {
        let editing = [...this.state.editing]
        editing.splice(editing.indexOf(index), 1)
        this.setState({editing})
    }
    openEdit(index) {
        // редактировать друга под индексом index
        let editing = [...this.state.editing]
        editing.push(index)
        this.setState({
            editing
        })
    }
    edit(index, name, surname) {
        this.closeEdit(index)
        let friends = [...this.state.friends]
        friends[index] = {name, surname}
        this.setState({friends})
    }
    addFriend() {
        // добавить друга
        let name = this.newFriendName.current.value;
        let surname = this.newFriendSurname.current.value;
        let friends = [...this.state.friends]
        friends.push({name, surname})
        this.setState({friends})
        // опустошить поля
        this.newFriendName.current.value = ""
        this.newFriendSurname.current.value = ""
    }
    render() {
        return (
            <div className={"w100"}>
                {/*Поисковая строка*/}
                <div className={'searchbox-wrapper'}>
                    <input
                        onChange={this.handleSearch}
                        ref={this.searchboxRef}
                        placeholder={"Поиск друга по имени или фамилии"}
                        className={"searchbox"}
                        type="text"
                        name="search"
                    />
                    <div className="row">
                        <input
                            ref={this.newFriendName}
                            placeholder={"Имя"}
                            className={"name name-surname-add"}
                            type="text"
                        />
                        <input
                            ref={this.newFriendSurname}
                            placeholder={"Фамилия"}
                            className={"surname name-surname-add"}
                            type="text"
                        />
                        <input
                            onClick={this.addFriend}
                            className={"add-friend"}
                            type="submit"
                            value="Добавить друга"
                        />
                    </div>
                </div>
                {/* Шапка */}
                <div className="friend-wrapper row">
                    <div className={"friend-id"}>#</div>
                    <div className={"friend-cell white"}>Имя</div>
                    <div className={"friend-cell white"}>Фамилия</div>
                    <div className={"btns-wrapper white"}>
                        Действия
                    </div>
                </div>
                {/* Список друзей */}
                {
                    this.state.friends.map((friend,index) => {
                        return <Friend
                            parent={this}
                            key={uuid()}
                            info={friend}
                            number={index}
                            isEditingOn={this.state.editing.includes(index)}
                        />
                    })
                }
            </div>
        );
    }
}
