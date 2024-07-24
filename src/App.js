import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MultiStepForm from './components/MultiStepForm';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/"  element={<Home />} />
                    <Route path="/form/:resumeId"  element={<MultiStepForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
