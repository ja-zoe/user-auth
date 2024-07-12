import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const isUserSignedIn = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-[#464646] text-zinc-300 absolute w-full'>
      <Link to={"/"}><h1 className='text-3xl text-red-300'>AuthDB</h1></Link>
      <ul className='flex gap-6'>
        { isUserSignedIn ? (<> 
        <Link to='/account'><li>Account</li></Link> 
        <li><button onClick={handleSignOut}>Sign Out</button></li>
        </>)
        :(
        <>
        <Link to="/login"><li>Login</li></Link>
        <Link to={"/signup"}><li>Sign Up</li></Link>
        </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar