// project import
// import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeRoutes from 'routes/index';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //


const InactivityHandler = () => {
  const navigate = useNavigate();
  let timeout;

  // Function to reset the inactivity timer
  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      navigate("/"); 
    },
    
    15 * 60 * 1000
  
  ); 
  };

  useEffect(() => {
    // Set event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Start timer initially

    return () => {
      // Cleanup event listeners
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  return null;
};





const App = () => (
  <ThemeCustomization>
    <InactivityHandler />
    <ScrollTop>
      <ThemeRoutes />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
