import { useState } from "react";
import DateDisplay from "../../shared/DateDisplay";
const Resources = ({resources, accessToken, due}) => {
    if (resources != null)
    {
        return (
            <div>
            {resources.map((res, index) => (
                <File key={index} resource={res} due={due} />
            ))}
            </div>
        );
    }
    else
    {
        return <div>nic</div>
    }
}

const File = ({resource, due}) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    console.log(resource);
    return (
        <div>
            {resource.resource.displayName} (<DateDisplay datetime={resource.resource.createdDateTime} limit={due} />)
        </div>
    );
}

export default Resources;