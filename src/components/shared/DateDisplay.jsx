const DateDisplay = ({datetime, limit}) => {
    let dateTime = new Date(datetime);
    let localeTime = dateTime.toLocaleTimeString();
    let localeDate = dateTime.toLocaleDateString();
    if (datetime)
        return <span style={{color: limit === undefined ? "" : datetime > limit ? "red" : "green"}}>{localeDate}&nbsp;{localeTime}</span>;
    else
        return null;
}

export default DateDisplay;