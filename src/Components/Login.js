import { useState, useContext } from 'react';
import TokenContext from '../context/TokenContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [user, setUser] = useState({
        email:"", password:"",
    })

    let [error, setError] = useState()
    let [success, setSuccess] = useState()
    let {token, setToken} = useContext(TokenContext)

    const navigate = useNavigate();
    let {email, password} = user;

    console.log("Token from context", token);

    function addUser(e){
        e.preventDefault();

        //validation
        if(!email){
            setError("Please enter email")
            setSuccess('')
            return
        }

        if(!password){
            setError('Enter your password')
            setSuccess('')
            return
        }

        axios.post("https://instagram-express-app.vercel.app/api/auth/login",
        {
            email, password
        })
        .then(response => {
            setSuccess(response.data.message)
            setToken(response.data.data.token)
            setError("")
            setTimeout(()=>{
                navigate('/dashboard');
            },2000);
            
        })
        .catch(err =>{
            setError(err.response.data.message)
            setSuccess("")
        })
    }


    return(
        <div>
            <h1 className="text-center">Login</h1><br/>
            {
                error && <h4 className='error'>{error}</h4>
            }
            {
                success && <h4 className='success'>{success}</h4>
            }
            <form onSubmit={addUser}>
                <label htmlFor='email' id='email'>Email :</label>
                <input type='email' id='email' value={email} onChange={(e)=>setUser({...user, email:e.target.value})}/>
                <label htmlFor='password' id='password'>Password</label>
                <input type='password' id='password' value={password} onChange={(e)=>setUser({...user, password:e.target.value})}/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )

    
}

export default Login