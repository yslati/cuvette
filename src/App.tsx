import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddJob from "./pages/Job/AddJob";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { initializeAuth } from "./features/authSlice";
import { Toaster } from 'react-hot-toast'
import Navbar from "./pages/Navbar";
import LoadingPage from "./components/Loading";

const App = () => {
  const dispatch = useAppDispatch();
  const { loading, initialized } = useAppSelector((state) => state.auth)

  
  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  if (loading || !initialized)
    return <LoadingPage />

  return (
    <div>
      <Toaster reverseOrder={false} position="top-right" />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/add-job" element={
            <PrivateRoute>
              <AddJob />
            </PrivateRoute>
          } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;