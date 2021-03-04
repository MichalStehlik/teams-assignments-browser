import { useState } from "react";
import useAuth from "../../authentication/useAuth";
import { useAppContext } from "../../../providers/AppProvider";
import { Alert } from '@fluentui/react-northstar';
import Assignments from "./Assignments";
import Heading from "./Heading";
import Detail from "./Detail";

const AssignmentsWrapper = props => {
    const accessToken = useAuth();
    const [{ activeClassroom }] = useAppContext();
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    if (accessToken === null)
    {
        return <Alert>Získávání autorizačních dat.</Alert>;
    }
    else if(activeClassroom === null)
    {
        return <Alert>Vyberte nějakou třídu.</Alert>;
    }
    else
    {
        return (
            <div style={{display: "flex", flexDirection: "row", height: "100%", width: "100%"}}>
                <div style={{display: "flex", flexDirection: "column", flexGrow: 0, flexShrink: 0, flexBasis: "280px"}}>
                    <div>
                        <Heading />
                    </div>
                    <div style={{overflow: "auto"}}>
                        <Assignments setSelectedAssignment={setSelectedAssignment} />
                    </div>
                </div>
                <div style={{flexGrow: 1, overflow: "auto", padding: "1em"}}>
                    <Detail selectedAssignment={selectedAssignment} />
                </div>
            </div>
        );
    }
}

export default AssignmentsWrapper;