import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Page from './Layout/Page';

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Page />} />
          {/* <Route path="/about" element={<Page />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
