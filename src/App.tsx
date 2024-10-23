import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import JobDetails from "./pages/Job/JobDetails";
import AddJob from "./pages/Job/AddJob";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { initializeAuth } from "./features/authSlice";
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return (
    <div>
      <Toaster reverseOrder={false} position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/add-job" element={
            <PrivateRoute>
              <AddJob />
            </PrivateRoute>
          } />
          <Route path="/jobs/:id" element={ <JobDetails /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
 
export default App;