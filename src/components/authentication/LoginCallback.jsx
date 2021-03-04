import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { Redirect } from "react-router-dom";
import { useAppContext } from "../../providers/AppProvider";

const LoginCallback = props => {
    const [state] = useAppContext();
    const { instance, accounts, inProgress } = useMsal();
    useEffect(()=>{
        if (accounts.length > 0)
        {
            instance.acquireTokenSilent();
            instance.acquireTokenPopup();
            instance.acquireTokenRedirect();
            if (state.teamsApp)
                state.teamsApp.getContext(context => {
                    state.teamsApp.authentication.notifySuccess();
                });        
        }
        else
        {
            if (state.teamsApp)
                state.teamsApp.getContext(context => {
                    state.teamsApp.authentication.notifyFailure("Something bad happened");
                });  
        }
    },[instance]);
    return <Redirect to="./" />;
}

export default LoginCallback;