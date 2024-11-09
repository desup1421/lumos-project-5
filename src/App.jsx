import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentsContainer from './containers/StudentsContainer';
import StudentDetailContainer from './containers/StudentDetailContainer';
import FormsContainer from './containers/FormsContainer';

//Import LangContext
import LangContext from './context/LangContext';


const App = () => {
  //Toggle Lang
  const [lang, setLang] = useState('id');
  const toggleLang = () => {
    setLang(lang === 'id' ? 'en' : 'id');
  };

  //Select Student for Edit Form
  const [selectedStudent, setSelectedStudent] = useState(null);
  const selectStudent = (student) => {
    setSelectedStudent(student);
  };
  
  return (
    <>
    <LangContext.Provider value={{ lang, toggleLang }}>
      <Router>
        <Routes>
          <Route path="/" element={<StudentsContainer setSelectedStudent={selectStudent} />} />
          <Route path="student/:id" element={<StudentDetailContainer  />} />
          <Route path='form'>
            <Route path="add" element={<FormsContainer />} />
            <Route path="edit/:id" element={<FormsContainer selectedStudent={selectedStudent} />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </LangContext.Provider>
    </>
  )
}

export default App