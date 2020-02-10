import React, {Component} from 'react';
import { Mutation } from 'react-apollo';

import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

const initialState = {
    username: '',
    password: ''
};

class Login extends Component{
    state = {
        ...initialState
    };

    onChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    };

    formValidate = () => {          //Anlık form kontrolü yapılıyor textler dolu mu  hepsi tamam ise buton aktif oluyor.
        const { username, password } = this.state;

        return (!username || !password );
    };

    resetState = () => {
        this.setState({
            ...initialState
        })
    };

    onSubmit = (e, signinUser) => {
        e.preventDefault();
        signinUser().then(data => {
            this.resetState();
        })
    };

    render(){
        const { username, password } = this.state;
        return(
            <div>
                <Mutation mutation={SIGNIN_USER} variables={ { username, password } }>
                    { ( signinUser, { loading, error }) =>(
                        <form
                            onSubmit={e => {
                                this.onSubmit(e, signinUser)
                            }}
                            className="user-form">
                            <label>
                                <input
                                    onChange={this.onChange}
                                    name="username"
                                    type="text"
                                    value={username}
                                    placeholder="username"/>
                            </label>
                            <label>
                                <input
                                    onChange={this.onChange}
                                    name="password"
                                    type="password"
                                    value={password}
                                    placeholder="password"/>
                            </label>
                            <label>
                                <button disabled={loading || this.formValidate() }>Login</button>
                            </label>

                            { loading && <div>loading...</div> }
                            { error && <div> <Error error={error}/> </div> }
                        </form>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default Login;