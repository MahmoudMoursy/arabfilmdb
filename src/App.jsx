import "./App.css";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Footer from "./componet/Footer";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfUse from "./Pages/TermsOfUse";
import IntellectualPropertyRights from "./Pages/IntellectualPropertyRights";
import Dashboard from "./Dashboard/Dashboard";
import ResetPassword from "./Pages/ResetPassword";
import MovieFilterDemo from "./Pages/MovieFilterDemo";
import SeriesFilterDemo from "./Pages/SeriesFilterDemo";
import Details from "./Pages/Details";
import AdminDashboard from "./Dashboard/AdminDashboard";
import Profile from "./Pages/Profile";
import AddForm from "./Dashboard/AddForm";
import Contact from "./Pages/Contact";

const ProtectedRoute = ({ children, roles = ["admin"] }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  //   // const { user } = useSelector(state => state.user);
  //   // const dispatch = useDispatch();
  //   useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     dispatch(setUser(JSON.parse(storedUser)));
  //   }
  // }, []);
  // console.log(user);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/TermsOfUse" element={<TermsOfUse />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route
            path="/IntellectualPropertyRights"
            element={<IntellectualPropertyRights />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["admin", "publisher"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute roles={["admin", "publisher"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AddForm"
            element={
              <ProtectedRoute roles={["admin", "publisher"]}>
                <AddForm />
              </ProtectedRoute>
            }
          />
          {/* Public Routes - No authentication required */}
          <Route path="/MovieFilterDemo" element={<MovieFilterDemo />} />
          <Route path="/SeriesFilterDemo" element={<SeriesFilterDemo />} />
          <Route path="/Details/:id" element={<Details />} />

          {/* Protected Routes - Authentication required */}
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute roles={["user", "admin", "publisher"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/edit/:id"
            element={
              <ProtectedRoute roles={["admin", "publisher"]}>
                <AddForm />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
      
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#1f2937',
          color: '#ffffff',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
        }}
      />
    </>
  );
}

export default App;

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
