import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/login",{username, password})
      const token = response.data.token
      alert("Login Successful")
      setUsername('')
      setPassword('')
      navigate('/account')
      window.location.reload()
      localStorage.setItem('token', token)
      console.log(token)
    } catch(error) {
      console.error("Login error")
      alert('Invalid Credentials')
    }
  }

  return (
    <div className="w-full h-screen flex">
    <div className="w-1/2 h-full bg-[#1a1a1a] flex justify-center items-center">
        <form onSubmit={handleLogin} className="text-white text-center border rounded-lg w-[600px] h-[400px] p-9 ">
            <label>Username</label>
            <br/>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Please Enter Username" className="text-center pl-2 w-2/3 h-[40px] rounded-xl bg-zinc-700"></input>
            <br/>
            <label>Password</label>
            <br/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Please Enter Password" className="text-center pl-2 w-2/3 h-[40px] rounded-xl bg-zinc-700"></input>
            <button type="submit" className="w-[200px] h-[50px] border hover:bg-teal-900 mt-[10px]">LOGIN</button>
        </form>
    </div>
    <div className="w-1/2 h-full flex justify-center items-center bg-teal-800">
        <h2 className="text-white text-3xl">LOGIN</h2>
    </div>
    </div>
  )
}
export default Login