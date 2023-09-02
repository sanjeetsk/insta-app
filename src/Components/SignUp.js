import { useState, useContext } from 'react';
import TokenContext from '../context/TokenContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [user, setUser] = useState({
        name:"", email:"", password:"", cpassword:""
    })

    let [error, setError] = useState()
    let [success, setSuccess] = useState()
    let {token, setToken} = useContext(TokenContext)

    let {name, email, password, cpassword} = user;
    const navigate = useNavigate();

    console.log("Token from context", token);

    function addUser(e){
        e.preventDefault();

        //validation
        if(!name || !email || !password || !cpassword){
            setError("Please fill all the fields")
            setSuccess('')
            return
        }

        if(user.password !== user.cpassword){
            setError('Passwords do not match')
            setSuccess('')
            return
        }

        axios.post("https://instagram-express-app.vercel.app/api/auth/signup",
        {
            name, email, password, cpassword,
        })
        .then(response => {
            setSuccess(response.data.message)
            setToken(response.data.data.token)
            setError("")
            setTimeout(()=>{
                navigate('/login');
            },2000);
        })
        .catch(err =>{
            setError(err.response.data.message)
            setSuccess("")
        })
    }


    return(
        <div>
            <h1 className="text-center">Sign Up</h1><br/>
            {
                error && <h4 className='error'>{error}</h4>
            }
            {
                success && <h4 className='success'>{success}</h4>
            }
            <form onSubmit={addUser}>
                <label htmlFor='name' id='name'>Name :</label>
                <input type='text' id='name' value={name} onChange={(e)=>setUser({...user, name:e.target.value})}/>
                <label htmlFor='email' id='email'>Email :</label>
                <input type='email' id='email' value={email} onChange={(e)=>setUser({...user, email:e.target.value})}/>
                <label htmlFor='password' id='password'>Password</label>
                <input type='password' id='password' value={password} onChange={(e)=>setUser({...user, password:e.target.value})}/>
                <label htmlFor='password' id='cpassword'>Confirm Password</label>
                <input type='password' id='cpassword' value={cpassword} onChange={(e)=>setUser({...user, cpassword:e.target.value})}/>
                <button type='submit'>SignUp</button>
            </form>
        </div>
    )

    
}

export default SignUp