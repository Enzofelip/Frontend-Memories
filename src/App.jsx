import {Outlet} from "react-router-dom";
import Navbar from "./conteiner/Navbar";
import Footer from "./conteiner/Footer";
import './App.css'

import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar/>
      <div className="conteiner">
        <Outlet/> 
      </div>
      <Footer/>
    </div>
  )
}

export default App
