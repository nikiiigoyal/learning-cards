/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/generate-content/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Subject } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { subject, topicCount = 6 } = await request.json();
    
    if (!subject) {
      return NextResponse.json({ 
        success: false, 
        error: 'Subject is required' 
      }, { status: 400 });
    }

    // DeepSeek API configuration
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({ 
        success: false, 
        error: 'API key not configured' 
      }, { status: 500 });
    }

    const prompt = `Generate a comprehensive learning structure for the subject: "${subject}".

Please return a JSON object with the following structure:
{
  "name": "Subject Name",
  "description": "Brief description of the subject",
  "topics": [
    {
      "title": "Topic Title",
      "description": "Topic description",
      "keyPoints": ["Point 1", "Point 2", "Point 3"],
      "difficulty": "beginner|intermediate|advanced",
      "estimatedTime": "X hours"
    }
  ]
}

Generate exactly ${topicCount} topics, covering from beginner to advanced levels.
Ensure each topic has 3-5 key points and realistic time estimates.
Make the content educational and well-structured.`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educator. Generate well-structured learning content in valid JSON format only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    // Create the subject object
    const subjectData: Subject = {
      id: Date.now().toString(),
      name: parsedContent.name || subject,
      description: parsedContent.description || `Learn about ${subject}`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      topics: parsedContent.topics.map((topic: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        title: topic.title,
        description: topic.description,
        keyPoints: topic.keyPoints || [],
        difficulty: topic.difficulty || 'intermediate',
        estimatedTime: topic.estimatedTime || '2 hours'
      })),
      color: getRandomColor(),
      icon: getSubjectIcon(subject)
    };

    return NextResponse.json({
      success: true,
      data: subjectData
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate content'
    }, { status: 500 });
  }
}

// Helper functions
function getRandomColor(): string {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
    'bg-red-500', 'bg-yellow-500', 'bg-indigo-500',
    'bg-pink-500', 'bg-teal-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getSubjectIcon(subject: string): string {
  const subjectLower = subject.toLowerCase();
  
  if (subjectLower.includes('math') || subjectLower.includes('calculus')) return '📐';
  if (subjectLower.includes('science') || subjectLower.includes('physics')) return '⚗️';
  if (subjectLower.includes('history')) return '📚';
  if (subjectLower.includes('language') || subjectLower.includes('english')) return '📝';
  if (subjectLower.includes('art')) return '🎨';
  if (subjectLower.includes('music')) return '🎵';
  if (subjectLower.includes('computer') || subjectLower.includes('programming')) return '💻';
  if (subjectLower.includes('biology')) return '🧬';
  if (subjectLower.includes('chemistry')) return '🧪';
  if (subjectLower.includes('geography')) return '🌍';
  
  return '📖'; // Default icon
}