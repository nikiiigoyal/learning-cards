export interface Topic {
    id: string;
    title: string;
    keypoints: string[];
    description: string;
    diffficulty: 'beginner' | 'intermediate' | 'advanced';
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