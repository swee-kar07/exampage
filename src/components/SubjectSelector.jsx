import React, { useState, useEffect } from 'react';

const SubjectSelector = ({ onSubjectSelect, onBack }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define available subjects with their metadata
    const availableSubjects = [
      {
        id: 'physics1',
        name: 'Physics',
        description: 'Mechanics, Energy, and Motion',
        icon: '⚡',
        color: 'from-blue-500 to-blue-700',
        file: 'physics1.json',
        totalQuestions: 10,
        difficulty: 'Intermediate',
        duration: '8-10 minutes'
      },
      {
        id: 'maths1',
        name: 'Mathematics',
        description: 'Calculus, Algebra, and Linear Algebra',
        icon: '📐',
        color: 'from-green-500 to-green-700',
        file: 'maths1.json',
        totalQuestions: 20,
        difficulty: 'Advanced',
        duration: '15-20 minutes'
      }
    ];

    // Simulate loading time for better UX
    setTimeout(() => {
      setSubjects(availableSubjects);
      setLoading(false);
    }, 500);
  }, []);

  const handleSubjectSelect = async (subject) => {
    try {
      // Dynamically import the selected question file
      const questionData = await import(`../../questions/${subject.file}`);
      onSubjectSelect({
        ...subject,
        questions: questionData.default.questions || questionData.questions
      });
    } catch (error) {
      console.error('Error loading questions:', error);
      alert('Error loading questions. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📚 Exam Portal by <span className="text-purple-600">Sweekar</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your subject to begin the examination
          </p>
          {onBack && (
            <button
              onClick={onBack}
              className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
            >
              ← Back to Main Menu
            </button>
          )}
        </div>

        {/* Subject Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleSubjectSelect(subject)}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{subject.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{subject.name}</h3>
                      <p className="text-blue-100 text-sm">{subject.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">
                      {subject.difficulty}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{subject.totalQuestions}</div>
                    <div className="text-gray-600 text-sm">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{subject.duration}</div>
                    <div className="text-gray-600 text-sm">Duration</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    Mathematical equations with LaTeX rendering
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    Timed examination with auto-submit
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    Instant results and performance analysis
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full bg-gradient-to-r ${subject.color} text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-105`}>
                  Start {subject.name} Exam
                </button>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-6 py-3 border-t">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>📊 Detailed Analytics</span>
                  <span>🏆 Performance Tracking</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🎯 Examination Features
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">⚡</span>
                <span className="font-medium">Fast Loading</span>
                <span>Optimized performance</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">🔒</span>
                <span className="font-medium">Secure</span>
                <span>Protected examination</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">📱</span>
                <span className="font-medium">Responsive</span>
                <span>Works on all devices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelector;
