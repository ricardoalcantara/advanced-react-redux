import { 
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_MESSAGE
} from '../actions/type';
import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {

                dispatch({type: AUTH_USER });

                localStorage.setItem('token', response.data.token);

                browserHistory.push('/feature')
            })
            .catch(() => {
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    
     return {
        type: UNAUTH_USER
    };
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {

                dispatch({type: AUTH_USER });

                localStorage.setItem('token', response.data.token);

                browserHistory.push('/feature')
            })
            // .catch(({ response }) => {
            // .catch(({ response: { data: { error } }}) => {
            //     dispatch(authError(error));
            // });
            .catch(({ response }) => {
                dispatch(authError(response.data.error));
            });
    }
}

//redux-thunk
// export function fetchMessage() {
//     return function(dispatch) {
//         axios.get(ROOT_URL, {
//             headers: { authorization: localStorage.getItem("token")}
//         })
//         .then(response => {
//             dispatch({
//                 type: FETCH_MESSAGE,
//                 payload: response.data.message
//             })
//         });
//     }
// }

//redux-promise
export function fetchMessage() {
    const request = axios.get(ROOT_URL, {
        headers: { authorization: localStorage.getItem("token")}
    });

    return {
        type: FETCH_MESSAGE,
        payload: request
    };
}