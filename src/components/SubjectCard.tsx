'use client'

import { Subject } from "@/lib/types"
import { ArrowRight, BookOpen, Clock } from "lucide-react";

interface subjectCardProps {
    subject: Subject
}
export default function SubjectCard ({subject} : subjectCardProps) {
    return (
        <>
         <div 
      
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
          {subject.icon}
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{subject.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{subject.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          <span>{subject.topics.length} topics</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>
            {subject.topics.reduce((total, topic) => {
              const hours = parseInt(topic.estimatedTime.match(/\d+/)?.[0] || '0');
              return total + hours;
            }, 0)} hours
          </span>
        </div>
      </div>
    </div>
        </>
    )
}