import React, { useState } from 'react'
import Display from './pages/display.jsx'
import MathExamples from './components/MathExamples.jsx'
import SubjectSelector from './components/SubjectSelector.jsx'

const App = () => {
  const [currentView, setCurrentView] = useState('subjects') // 'subjects', 'exam', 'examples'
  const [selectedSubject, setSelectedSubject] = useState(null)

  const handleSubjectSelect = (subjectData) => {
    setSelectedSubject(subjectData)
    setCurrentView('exam')
  }

  const handleBackToSubjects = () => {
    setSelectedSubject(null)
    setCurrentView('subjects')
  }

  const handleShowExamples = () => {
    setCurrentView('examples')
  }

  const handleBackFromExamples = () => {
    setCurrentView(selectedSubject ? 'exam' : 'subjects')
  }

  // Math Examples View
  if (currentView === 'examples') {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleBackFromExamples}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Back
          </button>
        </div>
        <MathExamples />
      </div>
    )
  }

  // Subject Selection View
  if (currentView === 'subjects') {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleShowExamples}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          >
            View Math Examples
          </button>
        </div>
        <SubjectSelector onSubjectSelect={handleSubjectSelect} />
      </div>
    )
  }

  // Exam View
  if (currentView === 'exam' && selectedSubject) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleShowExamples}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          >
            View Math Examples
          </button>
        </div>
        <Display 
          questionsData={selectedSubject.questions}
          subjectInfo={selectedSubject}
          onBackToSubjects={handleBackToSubjects}
        />
      </div>
    )
  }

  // Fallback
  return <SubjectSelector onSubjectSelect={handleSubjectSelect} />
}

export default App