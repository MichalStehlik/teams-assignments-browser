import { useEffect, useState } from "react";
import useAuth from "../../authentication/useAuth";
import { useAppContext } from "../../../providers/AppProvider";
import { Loader, Alert, Table, Attachment } from '@fluentui/react-northstar';
import axios from "axios";
import Submissions from "./Submissions";
import DateDisplay from "../../shared/DateDisplay";

const Detail = ({selectedAssignment}) => {
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
            axios.get("https://graph.microsoft.com/beta/education/classes/" + activeClassroom + "/assignments/" + selectedAssignment, {
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
    if (selectedAssignment === null)
    {
        return <Alert content="Vyberte nějaké zadání." />
    }
    else if (isLoading) 
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
            <>
            <h2>{response.displayName}</h2>
            <h3>Zadání</h3>
            <div dangerouslySetInnerHTML={{__html: response.instructions.content }}></div>
            { response.resources.length > 0    
            ?
            <div>
                {response.resources.map((item, index) => {
                    return <FileDownload key={index} item={item} accessToken={accessToken} />
                })
                }
            </div>
            :
                ""
            }
            <h3>Termíny</h3>
            <Table compact
                header={["Vytvoření","Zpřístupnění","Odevzdání","Uzavření"]}
                rows={[
                    {key: 1, items: [
                        <DateDisplay datetime={response.createdDateTime} />, 
                        <DateDisplay datetime={response.assignedDateTime} />, 
                        <DateDisplay datetime={response.dueDateTime} />, 
                        <DateDisplay datetime={response.closeDateTime} />
                    ]}
                ]}
            />
            <h3>Odevzdané práce</h3>
            {selectedAssignment !== null ? <Submissions selectedAssignment={selectedAssignment} due={response.dueDateTime} /> : ""}
            </>
        )       
    }
    else
    {
        return <Loader />
    }
}

const FileDownload = ({item, accessToken}) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(()=>{
        if (accessToken && item)
        {
            setIsLoading(true);
            setError(false);
            axios.get(item.resource.fileUrl, {
            headers: {
                Authorization: "Bearer " + accessToken,
                "Content-Type": "application/json"
            }
            })
            .then(response => {
                setResponse(response.data);
            })
            .catch(error => {
                setError(true);
            })
            .then(()=>{
                setIsLoading(false);
            })
        }    
    },[item]);
    if (isLoading)
    {
        return <Loader />
    }
    else if (response)
    {
        return <Attachment header={item.resource.displayName} as="a" href={response.webUrl} download target="_blank" />
    }
    else if (error)
    {
        return <Attachment header={item.resource.displayName} />
    }
    else
    {
        return <Attachment header={item.resource.displayName} />
    }
}

export default Detail;