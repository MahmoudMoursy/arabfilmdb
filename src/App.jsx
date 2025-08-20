
import './App.css'
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom"
import Home from './Pages/Home';
import Register from './Pages/Register'
import Login from './Pages/Login'
import Footer from './componet/Footer'
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfUse from './Pages/TermsOfUse';
import IntellectualPropertyRights from './Pages/IntellectualPropertyRights';
import Dashboard from './Dashboard/Dashboard';
import ResetPassword from './Pages/ResetPassword';
import MovieFilterDemo from './Pages/MovieFilterDemo';
import SeriesFilterDemo from './Pages/SeriesFilterDemo';
import Details from './Pages/Details';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  return children;
};

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
         <Route 
           path="/dashboard" 
           element={
             <ProtectedRoute>
               <Dashboard />
             </ProtectedRoute>
           } 
         />
         <Route path="/MovieFilterDemo" element={<MovieFilterDemo />} />
         <Route path="/SeriesFilterDemo" element={<SeriesFilterDemo />} />
          <Route path="/Details" element={<Details />} />
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
