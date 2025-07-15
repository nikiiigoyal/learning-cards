// app/page.tsx
'use client';


import { useCardStore } from '../../store/cardStore';
import SearchInput from '@/components/SearchInput';
import SubjectCard from '@/components/SubjectCard';
import TopicCard from '@/components/TopicCard';
import { ArrowLeft, AlertCircle, BookOpen, Target } from 'lucide-react';

export default function Home() {
  const { 
    subjects, 
    currentSubject, 
    selectedTopic, 
    error,
    addSubject,
    setCurrentSubject,
    setSelectedTopic,
    setLoading,
    setError,
    clearError
  } = useCardStore();

  const generateContent = async (subject: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject }),
      });

      const data = await response.json();
      
      if (data.success) {
        addSubject(data.data);
        setCurrentSubject(data.data);
      } else {
        setError(data.error || 'Failed to generate content');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSubjects = () => {
    setCurrentSubject(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI Learning Cards
          </h1>
          <p className="text-gray-600">
            Generate personalized learning content for any subject
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
            <button 
              onClick={clearError}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Topic Detail View */}
        {selectedTopic && (
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={handleBackToTopics}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Topics
            </button>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedTopic.title}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {selectedTopic.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedTopic.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    selectedTopic.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedTopic.difficulty}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedTopic.estimatedTime}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Key Learning Points
                </h3>
                <div className="grid gap-3">
                  {selectedTopic.keyPoints.map((point, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Topics Grid View */}
        {currentSubject && !selectedTopic && (
          <div className="max-w-6xl mx-auto">
            <button 
              onClick={handleBackToSubjects}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Subjects
            </button>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 ${currentSubject.color} rounded-xl flex items-center justify-center text-white text-3xl`}>
                  {currentSubject.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {currentSubject.name}
                  </h2>
                  <p className="text-gray-600">
                    {currentSubject.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSubject.topics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        )}

        {/* Main View - Search and Subjects */}
        {!currentSubject && (
          <>
            <SearchInput onSubmit={generateContent} />
            
            {subjects.length > 0 && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  Your Learning Subjects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjects.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}