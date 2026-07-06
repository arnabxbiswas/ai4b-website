import React from 'react';
import { API_URL } from '../../config';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogContentDisplay from './BlogContentDisplay';

export const dynamicParams = true;
export const revalidate = 3600;
//added new features


interface Blog {
  id: number;
  title: string;
  description: string;
  published_on: string;
  image: string | null;
  related_link: string | null;
  markdown_content: string;
  page_url: string;
  cover_image?: { src: string; alt: string; caption?: string } | null;
  authors?: Array<{ name: string; affiliationId?: string }>;
  affiliations?: Array<{ id: string; name: string }>;
  publication_links?: Array<{ text: string; url: string; icon?: string }> | null;
  sections?: Array<{
    type: "table" | "image" | "examples" | "markdown"; 
    heading?: string;
    content?: string;
    headers?: string[];
    rows?: string[][];
    items?: Array<{ id: string; prompt: string; response: string }>;
    image?: { src: string; alt?: string; caption?: string };
  }>;
  team?: {
    students?: Array<{ name: string }>;
    advisors?: Array<{ name: string }>;
    contacts?: Array<{ name: string; email?: string }>;
  };
  bibtex?: string;
}

// Function to validate blog data
function validateBlogData(blog: any): blog is Blog {
  return blog && 
         typeof blog.id === 'number' && 
         typeof blog.title === 'string' &&
         typeof blog.page_url === 'string';
}

// Cache implementation
let cachedBlogs: Blog[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

async function getAllBlogPostsCached(): Promise<Blog[]> {
  const now = Date.now();
  
  if (cachedBlogs && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedBlogs;
  }

  const endpoint = `${API_URL}/news/`;

  try {
    // Check if we're in a build environment where API might not be accessible
    if (!API_URL) {
      console.warn('API_URL not defined, returning cached or empty data');
      return cachedBlogs || [];
    }

    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AI4Bharat-Website-Builder/1.0',
      },
      next: { 
        revalidate: 3600,
        tags: ['blog-list-v2'] 
      }
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch blogs: ${response.status}`);
      return cachedBlogs || [];
    }
    
    const text = await response.text();
    if (!text) {
      console.warn('Empty response body received from API');
      return cachedBlogs || [];
    }
    const data = JSON.parse(text);
    const blogs = Array.isArray(data) ? data : [];
    
    // Validate and filter blogs
    const validBlogs = blogs.filter(validateBlogData);
    
    cachedBlogs = validBlogs;
    cacheTimestamp = now;

    return validBlogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return cachedBlogs || [];
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogPostsCached();
    
    const params = blogs
      .filter(blog => blog.page_url && blog.page_url.trim() !== '')
      .map((blog) => ({ slug: blog.page_url }));
    
    if (params.length === 0) {
      return [{ slug: 'fallback' }];
    }
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ slug: 'fallback' }];
  }
}

async function getIdFromPageUrl(pageUrl: string): Promise<number> {
  try {
    const blogs = await getAllBlogPostsCached();
    const blog = blogs.find(blog => blog.page_url === pageUrl);
    
    if (!blog || !validateBlogData(blog)) {
      notFound();
    }
    
    return blog.id;
  } catch (error) {
    console.error("Error fetching blog by page URL:", error);
    notFound();
  }
}

async function getBlogPostById(id: number): Promise<Blog> {
  const endpoint = `${API_URL}/news/${id}/`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AI4Bharat-Website-Builder/1.0',
      },
      next: { 
        revalidate: 3600,
        tags: [`blog-${id}-v2`]
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }
    
    const blog = await res.json();
    
    if (!validateBlogData(blog)) {
      throw new Error('Invalid blog data structure');
    }
    
    return blog;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    notFound();
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const blogId = await getIdFromPageUrl(params.slug);
    const blog = await getBlogPostById(blogId);
    
    const imageUrl = blog.image || blog.cover_image?.src;
    const images = imageUrl ? [imageUrl] : [];
    
    // Structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.description,
      "datePublished": blog.published_on,
      "author": blog.authors?.map(a => ({ "@type": "Person", "name": a.name })) || [{ "@type": "Person", "name": "AI4Bharat Team" }],
      "publisher": {
        "@type": "Organization",
        "name": "AI4Bharat"
      }
    };
    
    const metadata: Metadata = {
      title: `${blog.title} | AI4Bharat Blog`,
      description: blog.description,
      keywords: [
        'AI4Bharat',
        blog.title,
        'artificial intelligence',
        'Indian languages',
        'research',
        'machine learning',
        'natural language processing'
      ].join(', '),
      authors: blog.authors?.map(author => ({ name: author.name })) || [{ name: 'AI4Bharat Team' }],
      openGraph: {
        title: blog.title,
        description: blog.description,
        images: images.map(img => ({
          url: img,
          width: 1200,
          height: 630,
          alt: blog.title
        })),
        url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${blog.page_url}`,
        type: 'article',
        publishedTime: blog.published_on,
        siteName: 'AI4Bharat',
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.description,
        images: images,
        creator: '@AI4Bharat',
        site: '@AI4Bharat',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      other: {
        'application/ld+json': JSON.stringify(structuredData),
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: 'Blog Post | AI4Bharat',
      description: 'AI4Bharat blog post - Advancing AI for Indian languages',
    };
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  try {
    const blogId = await getIdFromPageUrl(params.slug);
    const blog = await getBlogPostById(blogId);
    
    return <BlogContentDisplay blog={blog} />;
  } catch (error) {
    console.error("Error in BlogDetailPage:", error);
    notFound();
  }
}
