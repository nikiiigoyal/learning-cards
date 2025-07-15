export interface Topic {
    id: string;
    title: string;
   keyPoints: string[];
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: string;

}
export interface Subject {
    id: string;
    name: string;
    description: string;
    topics: Topic[];
    color: string;
    icon: string;
}