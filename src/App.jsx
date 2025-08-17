
import './App.css'
import React from 'react';
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home';
import Register from './Pages/Register'
import Login from './Pages/Login'
import Footer from './componet/Footer'
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfUse from './Pages/TermsOfUse';
import IntellectualPropertyRights from './Pages/IntellectualPropertyRights';
import AddForm from './Dashboard/AddForm';
import ResetPassword from './Pages/ResetPassword';
import MovieFilterDemo from './Pages/MovieFilterDemo';
import SeriesFilterDemo from './Pages/SeriesFilterDemo';
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
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          <Route path="/AddForm" element={<AddForm />} />
          <Route path="/MovieFilterDemo" element={<MovieFilterDemo />} />
          <Route path="/SeriesFilterDemo" element={<SeriesFilterDemo />} />
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
