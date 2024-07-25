import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user,setuser] = useState(null);
    const [ready,isready] = useState(false)

    useEffect(() => {
      
        if(!user){
            axios.get("/profile").then(({data})=>{
                setuser(data)
                isready(true)
            })
        }


    }, [])
    

    return(
        <UserContext.Provider value={{ready,user,setuser}}>
        {children}
        </UserContext.Provider>
    )
}