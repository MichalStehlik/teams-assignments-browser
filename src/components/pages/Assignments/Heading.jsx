import { useEffect, useState } from "react";
import useAuth from "../../authentication/useAuth";
import { useAppContext } from "../../../providers/AppProvider";
import { Loader, Alert, Header } from '@fluentui/react-northstar';
import axios from "axios";

const Heading = props => {
    const accessToken = useAuth();
    const [{ activeClassroom }] = useAppContext();
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (accessToken && activeClassroom)
        {
            setIsLoading(true);
            setError(false);
            axios.get("https://graph.microsoft.com/beta/education/classes/" + activeClassroom, {
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
    },[accessToken, activeClassroom]);
    if (isLoading) 
    {
        return <Loader />
    }
    else if (error) 
    {
        return <Alert danger>Při získávání dat došlo k chybě.</Alert>;
    }
    else if (response)
    {
        return (
            <Header content={response.displayName} description="Zadání třídy" styles={{padding: "0 .5em", gridColumn: "1", gridRow: "0"}} />   
        )       
    }
    else
    {
        return <Loader />
    }
}

export default Heading;