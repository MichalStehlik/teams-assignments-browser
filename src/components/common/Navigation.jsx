import {useState} from "react";
import { Menu, MenuItem } from '@fluentui/react-northstar';
import { useAppContext } from "../../providers/AppProvider";
import {NavLink} from "react-router-dom";

const Navigation = props => {
    const [selected, setSelected] = useState(0);
    const [{ username }] = useAppContext();
    return(
        <Menu primary style={{flexShrink: 0}}>
            <MenuItem as={NavLink} to="/login" active={selected === 0} isActive={(match, location)=>{if (match) setSelected(0)}} styles={{textDecoration: "none"}}>{username ? username : "Přihlášení"}</MenuItem>
            <MenuItem as={NavLink} to="/classes" active={selected === 1} isActive={(match, location)=>{if (match) setSelected(1)}} styles={{textDecoration: "none"}}>Výběr třídy</MenuItem>
            <MenuItem as={NavLink} to="/assignments" active={selected === 2} isActive={(match, location)=>{if (match) setSelected(2)}} styles={{textDecoration: "none"}}>Úlohy</MenuItem>
            {/*<MenuItem as={NavLink} to="/members" active={selected === 1} isActive={(match, location)=>{if (match) setSelected(1)}} styles={{textDecoration: "none"}}>Členové</MenuItem>*/}          
        </Menu>
    );
}

export default Navigation;