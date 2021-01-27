import React, {Component} from "react";
import {Center} from "../shared/Center";
import {get_data} from "../queries/getFromDB";
import {v4 as uuid} from "uuid";
import "./authorization.scss";
import {ErrorPopup} from "../errorPopup/ErrorPopup";
import {setCookie} from "../cookies/operations";

export class Authorization extends Component {
    constructor() {
        super();
        this.state = {
            loginError : "",
            pwdError   : "",
            authBtnHidden : true,
            errPopup : false,
            errPopupMsg : ""
        }
        // рефы для полей ввода логина и пароля
        this.loginInputRef  = React.createRef(uuid());
        this.pwdInputRef    = React.createRef(uuid());
        this.authWrapperRef = React.createRef(uuid());
        // бинд контекста
        this.handleTerms = this.handleTerms.bind(this);
        this.handleAuth  = this.handleAuth.bind(this);
        this.closeError  = this.closeError.bind(this);
        this.handleForgotData = this.handleForgotData.bind(this);
    }
    validate(login, pwd) {
        let valid = false;
        let id = -1
        get_data().then(data => {
            let users = data.users;
            for (const [user_id, user_info] of Object.entries(users)) {
                let db_login = user_info.login,
                    db_pwd = user_info.password
                if (login === db_login && pwd === db_pwd) {
                    valid = true;
                    id = user_id;
                    break;
                }
            }
            if (valid) {
                // логин и пароль верны, идем на профильную страницу
                setCookie("id", id);
                window.location += "profile"
            }
            else {
                // Вывести ошибку о том, что логин или пароль не верны
                this.setState({
                    errPopup : true,
                    errPopupMsg : "Логин или пароль введены не верно, пожалуйста, повторите попытку"
                })
            }
        })
    }
    handleTerms() {
        this.setState({
            authBtnHidden : !this.state.authBtnHidden
        })
    }
    handleAuth(e) {
        // возможно мне стоило использовать redux для валидации форм,
        // но здесь мне проще сделать вручную, тк поля всего 2 и обращение к ним
        // не затруднено количественным показателем

        e.preventDefault();

        let login = this.loginInputRef.current.value.trim(),
            pwd   = this.pwdInputRef.current.value.trim()
        let err = {}
        err.login = (login.length <= 3) ? "Слишком короткий логин" : ""
        err.pwd   = (pwd === "")        ? "Поле обязательно для заполнения" : ""
        let no_errors = true;
        for (const [_, value] of Object.entries(err)) {
            no_errors = (value === "");
        }
        if (no_errors) {
            this.validate(login, pwd)
        }
        else {
            this.setState({
                loginError : err.login,
                pwdError : err.pwd
            })
        }
    }
    closeError() {
        this.setState({
            errPopup : !this.state.errPopup
        })
    }
    handleForgotData(){
        this.setState({
            errPopup : true,
            errPopupMsg : "Доступные логины были написаны на странице репозитория текущего тестового задания. Один из них : mylogin, mypassword"
        })
    }
    render() {
        return (
            <Center>
                <div className={"auth-wrapper "} ref={this.authWrapperRef}>
                    <form className={"column"}>
                        <div className={"title"}>
                            <p>
                                ВХОД
                            </p>
                        </div>
                        <label
                            className={"input-label"}
                            htmlFor={"login-input"}
                        >Ваш логин</label>
                        <input
                            id={"login-input"}
                            type="text"
                            name={"login"}
                            placeholder={"Логин"}
                            autoComplete={"off"}
                            ref={this.loginInputRef}
                        />
                        <label className={"error"}>{this.state.loginError}</label>
                        <label
                            className={"input-label"}
                            htmlFor={"password-input"}
                        >Ваш пароль</label>
                        <input
                            id={"password-input"}
                            type="password"
                            name={"password"}
                            placeholder={"Пароль"}
                            autoComplete={"off"}
                            ref={this.pwdInputRef}
                        />
                        <label className={"error"}>{this.state.pwdError}</label>
                        <div className={"terms-wrapper row"} onChange={this.handleTerms}>
                            <input  type="checkbox" id={"accept-terms"}/>
                            <label  className={"accept-terms"} htmlFor="accept-terms">Я принимаю <a href="#">условия  конфиденциальности</a></label>
                        </div>
                        <input
                            type="submit"
                            value="Войти"
                            onClick={e=>{this.handleAuth(e)}}
                            disabled={(this.state.authBtnHidden) ? "disabled" : ""}
                        />
                        <Center>
                            <a className={"forgot-pwd"} onClick={this.handleForgotData}>
                                Забыли пароль?
                            </a>
                        </Center>
                    </form>
                </div>
                {
                    this.state.errPopup
                    &&
                    <ErrorPopup
                        error={this.state.errPopupMsg}
                        parent={this}
                    />
                }

            </Center>
        );
    }
}
