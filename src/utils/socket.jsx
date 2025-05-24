import io from "socket.io-client";
import { Base_url } from "./helper";

export const createSocketConnection=()=>{

         return io(Base_url);     
    // }
    // else{
    //     return io("/",{path:"/socket.io"})
    // }
} 