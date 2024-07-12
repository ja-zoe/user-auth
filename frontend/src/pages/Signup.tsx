import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const[email, setEmail] = useState("")
    const[username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        axios
            .get('http://localhost:3001/users')
            .then((res) => {
                console.log(res)
            })
    }

    const handleRegister = (e: any) => {
        e.preventDefault()
        axios
            .post('http://localhost:3001/register', {
                email,
                username,
                password
            })
            .then((res) => {
                alert("Registration Successful")
                console.log(res)
                setEmail('')
                setUsername('')
                setPassword('')
                fetchUsers()
                navigate('/login')
            })
            .catch(() => {
                console.log('Unable to register user')
            })
    }

  return (
    <div className="w-full h-screen flex">
        <div className="w-1/2 h-full bg-[#1a1a1a] flex justify-center items-center">
            <form onSubmit={handleRegister} className="text-white text-center border rounded-lg w-[600px] h-[400px] p-9 ">
                <label>Email</label>
                <br/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Please Enter Email' className="text-center pl-2 w-2/3 h-[40px] rounded-xl bg-zinc-700 "></input>
                <br/>
                <label>Username</label>
                <br/>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Please Enter Username" className="text-center pl-2 w-2/3 h-[40px] rounded-xl bg-zinc-700"></input>
                <br/>
                <label>Password</label>
                <br/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Please Enter Password" className="text-center pl-2 w-2/3 h-[40px] rounded-xl bg-zinc-700"></input>
                <button type="submit" className="w-[200px] h-[50px] border hover:bg-teal-900 mt-[10px]"> Signup </button>
            </form>
        </div>
        <div className="w-1/2 h-full flex justify-center items-center bg-teal-800">
            <h2 className="text-white text-3xl">SIGNUP</h2>
        </div>
    </div>
  )
}
export default Signup