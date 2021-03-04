import { useEffect, useState } from "react";
import useAuth from "../authentication/useAuth";
import { useAppContext, SET_ACTIVE_CLASSROOM } from "../../providers/AppProvider";
import { List, ListItem, Loader, Alert } from '@fluentui/react-northstar';
import axios from "axios";

const Classes = props => {
    const accessToken = useAuth();
    const [{ activeClassroom }, dispatch] = useAppContext();
    const [classes, setClasses] = useState();
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (accessToken)
        {
            setIsLoading(true);
        setError(false);
        axios.get("https://graph.microsoft.com/beta/education/me/classes?orderby=displayName", {
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
    },[accessToken]);
    useEffect(()=>{
        if (response)
        {
            setClasses(response.value);
        }
    },[response])
    if (accessToken === null)
    {
        return <Alert>K použití aplikace se musíte přihlásit.</Alert>;
    }
    else if (isLoading) 
    {
        return <Loader />
    }
    else if (error) 
    {
        return <Alert danger>Při získávání dat došlo k chybě.</Alert>;
    }
    else if (classes)
    {
        return (
            <List selectable>
            {classes.map((item, index)=>(
                <ListItem 
                   key={index} 
                   content={item.description} 
                   header={item.displayName} 
                   selected={item.id === activeClassroom} 
                   onClick={e => {dispatch({type: SET_ACTIVE_CLASSROOM, payload: item.id})}}
                />
            ))}
            </List>
        )       
    }
    else
    {
        return <Loader />
    }
}

export default Classes;