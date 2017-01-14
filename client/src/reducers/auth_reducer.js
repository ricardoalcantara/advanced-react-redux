import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from '../actions/type';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:{
            return {...state, error: '', authenticated: true};
        }
        case UNAUTH_USER: {
            return {...state, authenticated: false};
        }
        case AUTH_ERROR: {
            return {...state, error: action.payload };
        }
        case FETCH_MESSAGE: {
            //redux-thunk
            //return {...state, message: action.payload }
            //redux-promise
            return {...state, message: action.payload.data.message };
        }
    }

    return state;
}