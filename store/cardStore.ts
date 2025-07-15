// store/cardStore.ts
import { create } from 'zustand';
import { Subject, Topic } from '@/lib/types';

interface CardState {
  subjects: Subject[];
  currentSubject: Subject | null;
  selectedTopic: Topic | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setSubjects: (subjects: Subject[]) => void;
  addSubject: (subject: Subject) => void;
  setCurrentSubject: (subject: Subject | null) => void;
  setSelectedTopic: (topic: Topic | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useCardStore = create<CardState>((set) => ({
  subjects: [],
  currentSubject: null,
  selectedTopic: null,
  isLoading: false,
  error: null,
  
  setSubjects: (subjects) => set({ subjects }),
  
  addSubject: (subject) => set((state) => ({ 
    subjects: [...state.subjects, subject] 
  })),
  
  setCurrentSubject: (subject) => set({ 
    currentSubject: subject,
    selectedTopic: null // Reset selected topic when changing subject
  }),
  
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),
}));