import axios from 'axios';
// login
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export function login(email, password) {
    return dispatch => {
        dispatch({type: LOGIN_LOADING});

        const endpoint = 'http://localhost:5050/api/auth/login';
        const user = {
            email,
            password
        };

        axios
            .post(endpoint, user)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('firstName', res.data.firstName);
                localStorage.setItem('lastName', res.data.lastName);
                localStorage.setItem('user_id', res.data.user_id);

                dispatch({type: LOGIN_SUCCESS, payload: res.data});
                console.log(user)
            })
            .catch(err => {
                dispatch({type: LOGIN_FAILURE, payload: err})
            })
    }
};