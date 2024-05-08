import './App.css';
import JobSection from './components/JobSection';
import JobDesc from './components/JobDesc'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<JobDesc />} /> 
          <Route path="/" element={<JobSection />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
