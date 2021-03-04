import { useEffect, useState } from "react";
import useAuth from "../../authentication/useAuth";
import { useAppContext } from "../../../providers/AppProvider";
import { List, ListItem, Loader, Alert, Status } from '@fluentui/react-northstar';
import axios from "axios";

const Assignments = ({setSelectedAssignment}) => {
    const accessToken = useAuth();
    const [{ activeClassroom }] = useAppContext();
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (accessToken && activeClassroom)
        {
            console.log("fetching assignments");
            setIsLoading(true);
            setError(false);
            axios.get("https://graph.microsoft.com/beta/education/classes/" + activeClassroom + "/assignments?orderby=dueDateTime DESC", {
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
            <List selectable>
            {response.value.map((item, index)=>{
                let state = "unknown";
                switch (item.status)
                {
                    case "published": state = "info"; break;
                    case "assigned": state = "success"; break;
                    case "draft": state = "unknown"; break;
                    case "scheduled": state = "warning"; break;
                    default: state = "unknown"; break;
                }
                let date = new Date(item.dueDateTime);
                return (
                <ListItem 
                   key={index} 
                   content={date.toLocaleDateString() + " " + date.toLocaleTimeString()} 
                   header={<b>{item.displayName}</b>} 
                   media={<Status state={state} size="larger" />}
                   onClick={e => setSelectedAssignment(item.id)}
                />
                );
            })}
            </List>
        )       
    }
    else
    {
        return <Loader />
    }
}

export default Assignments;