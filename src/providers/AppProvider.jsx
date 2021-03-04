import { createContext, useReducer, useContext } from "react";
import { teamsTheme } from '@fluentui/react-northstar';
import {config} from "../configuration/authentication";

const initialState = {theme: teamsTheme, teamsApp: null, activeClassroom: null, username: null, scopes: config.scopes};

export const SET_THEME = "SET_THEME";
export const SET_TEAMS_APP = "SET_TEAMS_APP";
export const SET_ACTIVE_CLASSROOM = "SET_ACTIVE_CLASSROOM";
export const SET_LOGIN = "SET_LOGIN";

const appReducer = (state, action) => {
    switch (action.type) {
        case SET_THEME: {
            return {...state, theme: action.payload};
        }
        case SET_TEAMS_APP: {
            return {...state, teamsApp: action.payload};
        }
        case SET_ACTIVE_CLASSROOM: {
            return {...state, activeClassroom: action.payload};
        }
        case SET_LOGIN: {
            return {...state, username: action.payload};
        }
        default: {
            return state;
        }
    }
}

export const AppContext = createContext();
export const AppProvider = ({children, ...rest}) => {
    const [store, dispatch] = useReducer(appReducer, initialState);   
    return (
        <AppContext.Provider value={[store, dispatch]}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);