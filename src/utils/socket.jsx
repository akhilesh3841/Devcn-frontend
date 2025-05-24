import io from "socket.io-client";
import { Base_url } from "./helper";

export const createSocketConnection=()=>{

    if(location.hostname==="localhost"){
         return io(Base_url);     
    }
    else{
        return io("/",{path:"/api/socket.io"})
    }
} 