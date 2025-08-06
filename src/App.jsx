
import './App.css'
import {Route ,Routes} from "react-router-dom"
import Home from './pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
function App() {

  return (
    <>
      <div>

       <Routes>
         <Route path="/" index element={<Home/>}/>
         <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>

         </Routes>
      </div>
    </>
  )
}

export default App

     

