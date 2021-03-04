import { useEffect, useState } from "react";
import useAuth from "../../authentication/useAuth";
import { useAppContext } from "../../../providers/AppProvider";
import { Loader, Alert, Status } from '@fluentui/react-northstar';
import axios from "axios";
import DateDisplay from "../../shared/DateDisplay";
import UserDisplay from "../../shared/UserDisplay";
import Resorces from "./Resources";

const Submissions = ({selectedAssignment, due}) => {
    const accessToken = useAuth();
    const [{ activeClassroom }] = useAppContext();
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (accessToken && activeClassroom && selectedAssignment)
        {
            setIsLoading(true);
            setError(false);
            axios.get("https://graph.microsoft.com/beta/education/classes/" + activeClassroom + "/assignments/" + selectedAssignment + "/submissions", {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            setResponse(response.data);
            console.log(response.data);
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
    },[accessToken, activeClassroom, selectedAssignment]);
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
            <table className="table">
                <thead>
                    <tr>
                        <th>Uživatel</th>
                        <th>Stav</th>
                        <th>Čas odevzdání</th>
                        <th>Čas vrácení</th>
                        <th>Soubory</th>
                    </tr>
                </thead>
                <tbody>
                {response.value.map((item, index) => (
                    <tr key={index}>
                        <td><UserDisplay id={item.recipient.userId} accessToken={accessToken} /></td>
                        <td><SubmissionStatus status={item.status} /> {item.status}</td>    
                        <td><DateDisplay limit={due} datetime={item.submittedDateTime} /></td>     
                        <td><DateDisplay datetime={item.returnedDateTime} /></td>
                        <td><Resorces resources={item.resources} accessToken={accessToken} due={due} /></td>          
                    </tr>
                ))}
                </tbody>
            </table>
        )       
    }
    else
    {
        return <Loader />
    }
}

const SubmissionStatus = ({status}) => {
    switch (status)
    {
        case "working" : return <Status state="error" />;
        case "submitted" : return <Status state="info" />;
        case "released" : return <Status state="warning" />;
        case "returned" : return <Status state="success" />;
        default : return <Status />
    }
}

export default Submissions;