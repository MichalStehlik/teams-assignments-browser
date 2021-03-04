import Navigation from "../common/Navigation";

const DashboardLayout = props => (
    <div style={{display: "flex", height: "100%", width: "100%", flexDirection: "column"}}>
        <Navigation />
        <div style={{overflow: "auto"}}>
        {props.children}
        </div>
    </div>
);

export default DashboardLayout;