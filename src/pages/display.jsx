import React, { useState, useEffect } from 'react'
import '../index.css'
import questionsData from '../datas.json'

const Display = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [examStarted, setExamStarted] = useState(false)
  const [examFinished, setExamFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const questions = questionsData.questions
  const currentQuestion = questions[currentQuestionIndex]
  
  // Calculate total exam time (sum of all question durations)
  const totalExamTime = questions.reduce((total, q) => total + q.duration, 0)

  useEffect(() => {
    if (examStarted && timeRemaining > 0 && !examFinished) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setExamFinished(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [examStarted, timeRemaining, examFinished])

  const startExam = () => {
    setExamStarted(true)
    setTimeRemaining(totalExamTime)
  }

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.qid]: answer
    })
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const submitExam = () => {
    setExamFinished(true)
    setShowResults(true)
  }

  const calculateResults = () => {
    let correct = 0
    let attempted = 0
    
    questions.forEach(q => {
      if (selectedAnswers[q.qid]) {
        attempted++
        if (selectedAnswers[q.qid] === q.answer) {
          correct++
        }
      }
    })

    return {
      correct,
      incorrect: attempted - correct,
      unattempted: questions.length - attempted,
      totalMarks: correct * questions[0].marks,
      percentage: ((correct / questions.length) * 100).toFixed(1)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const restartExam = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTimeRemaining(0)
    setExamStarted(false)
    setExamFinished(false)
    setShowResults(false)
  }

  if (!examStarted) {
    return (
      <div className='bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4'>
        <div className='bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>Physics Exam Portal by <span className='text-blue-600'>Sweekar</span></h1>
          <div className='space-y-4 text-gray-600'>
            <p><span className='font-semibold'>Total Questions:</span> {questions.length}</p>
            <p><span className='font-semibold'>Total Time:</span> {formatTime(totalExamTime)}</p>
            <p><span className='font-semibold'>Subject:</span> {questions[0].subject}</p>
            <p><span className='font-semibold'>Marks per Question:</span> {questions[0].marks}</p>
          </div>
          <button 
            onClick={startExam}
            className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105'
          >
            Start Exam
          </button>
        </div>
      </div>
    )
  }

  if (showResults) {
    const results = calculateResults()
    return (
      <div className='bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen flex items-center justify-center p-4'>
        <div className='bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full'>
          <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Exam Results</h1>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-green-100 p-4 rounded-lg text-center'>
                <p className='text-2xl font-bold text-green-600'>{results.correct}</p>
                <p className='text-green-700'>Correct</p>
              </div>
              <div className='bg-red-100 p-4 rounded-lg text-center'>
                <p className='text-2xl font-bold text-red-600'>{results.incorrect}</p>
                <p className='text-red-700'>Incorrect</p>
              </div>
              <div className='bg-yellow-100 p-4 rounded-lg text-center'>
                <p className='text-2xl font-bold text-yellow-600'>{results.unattempted}</p>
                <p className='text-yellow-700'>Unattempted</p>
              </div>
              <div className='bg-blue-100 p-4 rounded-lg text-center'>
                <p className='text-2xl font-bold text-blue-600'>{results.percentage}%</p>
                <p className='text-blue-700'>Score</p>
              </div>
            </div>
            <div className='text-center pt-4'>
              <p className='text-lg font-semibold text-gray-700'>
                Total Marks: {results.totalMarks} / {questions.length}
              </p>
            </div>
          </div>
          <button 
            onClick={restartExam}
            className='mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300'
          >
            Restart Exam
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-4'>
      {/* Header */}
      <div className='bg-white shadow-lg rounded-lg p-4 mb-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>Physics Exam</h1>
            <p className='text-gray-600'>Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          <div className='text-right'>
            <div className={`text-2xl font-bold ${timeRemaining <= 60 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeRemaining)}
            </div>
            <p className='text-gray-600'>Time Remaining</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className='mt-4'>
          <div className='bg-gray-200 rounded-full h-2'>
            <div 
              className='bg-blue-600 h-2 rounded-full transition-all duration-300'
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className='bg-white shadow-lg rounded-lg p-6 mb-6'>
        <div className='mb-6'>
          <div className='flex justify-between items-start mb-4'>
            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold'>
              Q{currentQuestion.qid}
            </span>
            <span className='text-gray-500 text-sm'>
              {currentQuestion.marks} mark{currentQuestion.marks > 1 ? 's' : ''}
            </span>
          </div>
          <h2 className='text-lg font-medium text-gray-800 leading-relaxed'>
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options */}
        <div className='space-y-3'>
          {['optiona', 'optionb', 'optionc', 'optiond'].map((optionKey, index) => {
            const optionLetter = ['a', 'b', 'c', 'd'][index]
            const isSelected = selectedAnswers[currentQuestion.qid] === optionLetter
            
            return (
              <button
                key={optionKey}
                onClick={() => handleAnswerSelect(optionLetter)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 text-black' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-black'
                }`}
              >
                <div className='flex items-center'>
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 text-sm font-semibold ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-500 text-black' 
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {optionLetter.toUpperCase()}
                  </span>
                  <span className='flex-1'>{currentQuestion[optionKey]}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className='bg-white shadow-lg rounded-lg p-4'>
        <div className='flex justify-between items-center'>
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className='bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition duration-300'
          >
            Previous
          </button>

          <div className='flex space-x-3'>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={submitExam}
                className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300'
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300'
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Question Navigation Grid */}
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <p className='text-sm text-gray-600 mb-3'>Jump to question:</p>
          <div className='grid grid-cols-10 gap-2'>
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded text-xs font-semibold transition-all duration-200 ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[questions[index].qid]
                    ? 'bg-green-200 text-green-800 hover:bg-green-300'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Display