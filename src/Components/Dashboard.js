import { useState, useContext, useEffect } from "react";
import TokenContext from "../context/TokenContext";
import axios from "axios";

const Dashboard = () =>{

    let {token} = useContext(TokenContext)
    const [name, setName] = useState("")
    const [zuku, setZuku] = useState('');

    useEffect(()=>{
        if(token){
            axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setName(response.data.data.user.name)
                setZuku(response.data.data.message)
            })
        }
    },[token])
    return(
        <div>
            <h1 className="text-center">Dashboard</h1><br/>
            <p>name: {name}</p>
            <p>Quotes: {zuku}</p>
        </div>
    )
}

export default Dashboard