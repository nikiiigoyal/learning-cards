'use client'
import { Search } from "lucide-react"
import { useState } from "react"


interface SearchInputProps {
    onSubmit: (subject: string) => void
}

export default function SearchInput({onSubmit} : SearchInputProps) {
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(input);
    }
    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
             <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter A subject to learn about (e.g., 'History','Mathematics', 'Programming'"  className="w-full pl-12 pr-24 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
             </input>
             <button 
             type="submit" 
             disabled={!input.trim()}  
             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"></button>
                </div>

            </form>
        
        </div>
    )
}