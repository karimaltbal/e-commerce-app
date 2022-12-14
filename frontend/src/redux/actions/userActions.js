import {
    LOGIN_REQUSET,
    LOGIN_SUCCSESS,
    LOGIN_FAIL,
    RIGESTER_REQUSET,
    RIGESTER_SUCCSESS,
    RIGESTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,


    CLEAR_ERRORS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
} from "../constants/userConstants";
import axios from "axios";




const loginAction = (email, password)=>{
    return async (dispatch)=>{
        try {
            dispatch({
                type: LOGIN_REQUSET,
            });

            const config = { headers: { "Content-Type": "application/json" } };
            const userData = { email, password };
            const { data } = await axios.post("/api/v1/user/login", userData, config);

            dispatch({
                type: LOGIN_SUCCSESS,
                payload: data.user,
            });

        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response && error.response.data.message
            });
        }
        
    }
}



const rigesterAction = (rigesterData)=>{
    return async (dispatch)=>{
        try {
            dispatch({
                type: RIGESTER_REQUSET,
            });

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            console.log(typeof rigesterData);
            const { data } = await axios.post("/api/v1/user/register", rigesterData, config);


            dispatch({
                type: RIGESTER_SUCCSESS,
                payload: data.user,
            });
        } catch (error) {
            dispatch({
                type: RIGESTER_FAIL,
                payload: error.response && error.response.data.message
            });
        }
        
    }
}



// Load User
const loadUser = () =>{
    return async (dispatch) => {
        try {
            dispatch({
                type: LOAD_USER_REQUEST,
            });

            const { data } = await axios.get(`/api/v1/profile`);

            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data.user,
            });
        } catch (error) {
            dispatch({
                type: LOAD_USER_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    };  
};




// Logout User
const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/user/logout`);

        dispatch({ 
            type: LOGOUT_SUCCESS 
        });
        
    } catch (error) {
        dispatch({ 
            type: LOGOUT_FAIL, 
            payload: error.response && error.response.data.message
        });
    }
};



// Update Profile
const updateProfile = (userData) =>{
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_PROFILE_REQUEST,
            });

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            const { data } = await axios.put( `/api/v1/profile/update`, userData, config);

            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: data.success,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    }; 
};




// get All Users
const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/users`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};




// get  User Details
const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
        });
    }
};


// Delete User
const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
        });
    }
};





const clearError = ()=>{
    return async (dispatch) => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };
}

export {
    loginAction,
    rigesterAction,
    loadUser,
    logout,
    updateProfile,
    getAllUsers,
    deleteUser,
    getUserDetails,
    updateUser,
    clearError,
};