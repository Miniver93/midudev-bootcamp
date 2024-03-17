// eslint-disable-next-line react/prop-types
export const Notification=({message})=>{
    if(message===null){
        return null
    }

    return(
        <div className="info_message">{message}</div>
    )
}