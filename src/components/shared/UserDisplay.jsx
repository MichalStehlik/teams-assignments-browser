import {useEffect, useState} from "react";
import axios from "axios";
import { Loader, Alert } from '@fluentui/react-northstar';

const UserDisplay = ({id, accessToken}) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (accessToken && id)
        {
            setIsLoading(true);
            setError(false);
            axios.get("https://graph.microsoft.com/beta/education/users/" + id, {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            setResponse(response.data);
        })
        .catch(error => {
            if (error.response) {
                setError({status: error.response.status, text: error.response.statusText});
            }
            else
            {
                setError({status: 0, text: "Neznámá chyba"});
            }
        })
        .then(()=>{setIsLoading(false);});  
        }         
    },[accessToken, id]);
    if (isLoading)
        return <Loader />;
    else if (error)
        return <Alert>{id}</Alert>;
    else if (response)
        return response.displayName;
    else
        return <Loader />;
}

export default UserDisplay;