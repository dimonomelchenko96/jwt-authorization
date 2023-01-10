import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_URL } from '../http';
import AuthService from '../services/AuthService';

const initialState = {
    user : {},
    isAuth: false,
    isLoading: false,
}


export const login =  (email, password) => (dispatch) => {
    AuthService().login(email, password)
        .then((res => {
            console.log(res)
            localStorage.setItem('token', res.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(res.data.user))
        }))
        .catch(e => {
            console.log(e.response?.data?.message);
        })
}

export const registration = (email, password) => (dispatch) => {
    console.log(email)
    AuthService().registration(email, password)
        .then((res => {
            console.log(res)
            localStorage.setItem('token', res.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(res.data.user))
        }))
        .catch(e => {
            console.log(e);
        })
}

export const logout = () => (dispatch) => {
    const response = AuthService().logout();
    response
        .then((res => {
            console.log(res)
            localStorage.removeItem('token');
            dispatch(setAuth(false));
            dispatch(setUser({}))
        }))
        .catch(e => {
            console.log(e.response?.data?.message);
        })
}

export const checkAuth = () => (dispatch) => {
    dispatch(setLoading(true))
    axios.get(`${API_URL}/refresh`, {withCredentials: true})
        .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(res.data.user))
        })
        .finally(() => {
            dispatch(setLoading(false))
        }) 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        setAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        }
    }
})

export default authSlice.reducer;

export const {setAuth, setUser, setLoading} = authSlice.actions;