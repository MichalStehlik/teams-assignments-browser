import {AppContext} from "../../providers/AppProvider";
import {useEffect, useContext} from "react";
import { Flex } from '@fluentui/react-northstar';
import {ReactComponent as AppLogo} from "../../assets/icons/bigIcon.svg";

const Configuration = props => {
    const [state, dispatch] = useContext(AppContext);
    useEffect(()=>{
        if (state.teamsApp)
        {
            state.teamsApp.settings.registerOnSaveHandler(saveEvent => {
                state.teamsApp.settings.setSettings({
                  contentUrl: window.location.origin,
                  entityId: window.location.origin
                });        
                saveEvent.notifySuccess();
            });
            state.teamsApp.settings.setValidityState(true);
        }
        
    },[dispatch, state.teamsApp]);
    return(
        <Flex padding="padding.medium" fill={true} vAlign="center" hAlign="center" >
            <AppLogo />
        </Flex>
    );
}

export default Configuration;