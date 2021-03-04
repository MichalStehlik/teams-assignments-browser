import { useEffect, useState, useMemo } from "react";
import { useAppContext, SET_LOGIN } from "../../providers/AppProvider";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';

const useAuth = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [{username, scopes}, dispatch] = useAppContext();
    const loginRequest = useMemo(() => ({loginHint: username, scopes: scopes}),[username, scopes]);
    const {login, loginResult, loginError} = useMsalAuthentication(InteractionType.Silent, loginRequest);
    useEffect(() => {
        console.log("Processing authentication", loginError, loginResult, login);
        if (loginError) {
            console.log("Silent authentication failed");
            login(InteractionType.Popup, loginRequest);
        }
    }, [loginError, login, loginResult]);
    const {instance, accounts, inProgress} = useMsal();
    useEffect(()=>{
        if (inProgress === "none" && accounts.length > 0) {
            instance.acquireTokenSilent({account: accounts[0], scopes})
            .then(response => {
                if (response.accessToken) {
                    setAccessToken(response.accessToken);
                    dispatch({type: SET_LOGIN, payload: accounts[0].username});
                }
                else
                {
                    setAccessToken(null);
                }
            })
        }
    },[instance, accounts, inProgress, scopes]);
    return accessToken;
}

export default useAuth;