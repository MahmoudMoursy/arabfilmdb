
import './App.css'
import React  from 'react';
import {Route ,Routes} from "react-router-dom"
import Home from './Pages/Home';
import Register from './Pages/Register'
import Login from './Pages/Login'
import Footer from './componet/Footer'
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfUse from './Pages/TermsOfUse';
import IntellectualPropertyRights from './Pages/IntellectualPropertyRights';
import AddFilmForm from './Dashboard/AddFilmForm';
import ResetPassword from './Pages/ResetPassword';
function App() {
  
  return (
    <>
      <div> 
       <Routes>
         <Route path="/" index element={<Home/>}/>
         <Route path="/Register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Footer" element={<Footer/>}/>
          <Route path="/TermsOfUse" element={<TermsOfUse/>}/>
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/> 
          <Route path="/IntellectualPropertyRights" element={<IntellectualPropertyRights/>}/>
          <Route path="/AddFilmForm" element={<AddFilmForm/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
         </Routes>
      </div>
    </>
  )
}

export default App



// useEffect(() => {
//     const handleKeyPress = (event) => {
//       // You can add keyboard navigation here if needed
//       // For now, the MediaSlider handles its own navigation
//       if (event.key === 'ArrowRight') {
//         // Navigate to the next slide
//       } else if (event.key === 'ArrowLeft') {
//         // Navigate to the previous slide
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, []);
