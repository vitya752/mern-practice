import React, {useState, useEffect, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
    const [form, setForm] = useState({
        email: '', password: ''
    });

    const {request, error, loading, cleanError} = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);
    //с помощью AuthContex (Provider) в компоненте App передали
    //объект с свойствами и ф-циями (login, logout, token, userId и т.д.).
    //А с помощью хука useConext перехватываем объект, в качестве аргумента указываем,
    //какой именно нам нужен контекст

    useEffect(() => {
        message(error);
        cleanError();
    }, [error, message, cleanError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch(e) {
            console.log(e);
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            message(data.message);
            auth.login(data.token, data.userId);
            //по нажатию на кнопку делаем api запрос, отсылаем состояние формы
            //если без ошибок, то выводим message и посылаем id и token в метод login
            //и он сохраняет полученные данные в localeStorage
        } catch(e) {
            console.log(e);
        }
    }

    // state = {
    //     form: {
    //         email: '',
    //         password: ''
    //     }
    // }
    // setState({
    //     form: {
    //         ...this.state.form,
    //         [event.target.name]: event.target.value
    //     }
    // })

    return (
        <div className="row">
            <div className="col s12">
                <h1>Сократи ссылку</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div className="input-field">
                            <input 
                                id="email" 
                                type="email" 
                                name="email"
                                className="validate"
                                value={form.email}
                                onChange={changeHandler} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input 
                                id="password" 
                                type="password" 
                                name="password"
                                className="validate"
                                value={form.password}
                                onChange={changeHandler} />
                            <label htmlFor="password">Пароль</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-1 button-login"
                            onClick={loginHandler}
                            disabled={loading}>
                            Войти
                        </button>
                        <button 
                            className="btn gray lighten-1 dark-text"
                            onClick={registerHandler}
                            disabled={loading}>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
              
    )
};

export default AuthPage;