import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Account from './pages/Account'
import Signup from './pages/Signup'

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  return (
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          {isUserSignedIn && <Route path='/account' element={<Account />}/>}
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      </div>
  )
}

export default App
