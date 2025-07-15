// components/TopicCard.tsx
'use client';

import { Topic } from '@/lib/types';
import { useCardStore } from '../../store/cardStore';
import { Clock,  ArrowRight } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const { setSelectedTopic } = useCardStore();

  const handleClick = () => {
    setSelectedTopic(topic);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-800 flex-1">{topic.title}</h4>
        <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
      </div>
      
      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{topic.description}</p>
      
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
          {topic.difficulty}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{topic.estimatedTime}</span>
        </div>
      </div>
      
      <div className="border-t pt-3">
        <p className="text-xs text-gray-500 mb-2">Key Points:</p>
        <div className="flex flex-wrap gap-1">
          {topic.keyPoints.slice(0, 3).map((point, index) => (
            <span 
              key={index} 
              className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
            >
              {point}
            </span>
          ))}
          {topic.keyPoints.length > 3 && (
            <span className="inline-block bg-gray-50 text-gray-500 px-2 py-1 rounded text-xs">
              +{topic.keyPoints.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}