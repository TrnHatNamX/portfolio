// src/types/index.ts

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: 'web' | 'game' | 'bot';
    githubUrl?: string;
    demoUrl?: string;
    imageOrGif?: string; // Đường dẫn tới ảnh hoặc file GIF demo (optional)
}