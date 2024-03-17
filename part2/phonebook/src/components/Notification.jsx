// eslint-disable-next-line react/prop-types
export const Notification=({messageInfo, messageError, messageType})=>{
    if(messageInfo===null && messageError===null){
        return null
    }
    if(messageType){
        return <div style={{color: "rgb(0, 121, 0, 1)"}}  className="message_info">{messageInfo}</div>
    }
    return(
        <div style={{color: "red"}} className="message_error">{messageError}</div>
    )
}