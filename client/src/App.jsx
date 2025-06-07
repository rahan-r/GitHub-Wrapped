import './App.css'
import Main from './pages/Main'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapped from './pages/Wrapped';
import NotFound from './pages/NotFound';



function App() {


  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/wrap" element={<Wrapped />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
