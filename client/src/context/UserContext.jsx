import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    token:null,
    loggedIn:false
};

export const UserContext = createContext(INITIAL_STATE);

const UserReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                token:action.payload,
                loggedIn:true
            }
        case 'LOGOUT':
            return {
                token:null,
                loggedIn:false
            }
        default:
            return state;
    }

}

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    const login = (token) => {
        dispatch({type:'LOGIN', payload:token});
    }

    const logout = () => {
        dispatch({type:'LOGOUT', payload:null});
    }

    return (
        <UserContext.Provider
            value={{
                token: state.token,
                loggedIn: state.loggedIn,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
}