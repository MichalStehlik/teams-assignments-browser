import { useEffect, useState, useMemo } from "react"; 
import { Flex, Button } from '@fluentui/react-northstar';
import { useAppContext } from "../../providers/AppProvider";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from '@azure/msal-browser';

const Home = props => {
    const [state] = useAppContext();
    const [teamsContext, setTeamsContext] = useState(null);
    const [username, setUsername] = useState("");
    const [scopes, setScopes] = useState(["user.read"]);
    const [accessToken, setAccessToken] = useState(null);
    useEffect(() => {
        if (state.teamsApp)
        {
            state.teamsApp.getContext(context => {
                setTeamsContext(context);
                setUsername(context.userPrincipalName);
            })
        }
    }, [state.teamsApp]);
    const loginRequest = useMemo(() => ({loginHint: username, scopes: scopes}),[username, scopes]);
    const {login, loginResult, loginError} = useMsalAuthentication(InteractionType.Silent, loginRequest);
    useEffect(() => {
        if (loginError) {
            login(InteractionType.Popup, loginRequest);
        }
    }, [loginError, loginRequest, login, loginResult]);
    const {instance, accounts, inProgress} = useMsal();
    useEffect(()=>{
        if (inProgress === "none" && accounts.length > 0) {
            setUsername(accounts[0].username);
            instance.acquireTokenSilent({account: accounts[0], scopes})
            .then(response => {
                if (response.accessToken) {
                    setAccessToken(response.accessToken);
                }
                else
                {
                    setAccessToken(null);
                }
            })
        }
    },[instance, accounts, inProgress, scopes]);
    return(
        <>
            <AuthenticatedTemplate>
                {teamsContext ? teamsContext.teamId : "Nejsme v Teams"}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>No users are signed in!</p>
            </UnauthenticatedTemplate>
        </>
    );
}

export default Home;