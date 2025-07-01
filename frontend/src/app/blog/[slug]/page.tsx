import React from 'react';
import { API_URL } from '../../config';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogContentDisplay from './BlogContentDisplay';

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
    type: "table" | "image" | "examples" | "markdown"; // ✅ Fixed: Specific string literals instead of generic string
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

async function getAllBlogPosts(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_URL}/news/`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      console.error('Failed to fetch all blog posts:', res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function getBlogPostByPageUrl(pageUrl: string): Promise<Blog> {
  const blogs = await getAllBlogPosts();
  
  const blog = blogs.find(blog => blog.page_url === pageUrl);
  
  if (!blog) {
    console.error(`Blog post with page_url "${pageUrl}" not found`);
    notFound();
  }
  
  return blog;
}

export async function generateStaticParams() {
  const blogs = await getAllBlogPosts();
  
  const params = blogs
    .filter(blog => blog.page_url && blog.page_url.trim() !== '')
    .map((blog) => ({ slug: blog.page_url }));
  
  return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const blog = await getBlogPostByPageUrl(params.slug);
    
    const imageUrl = blog.image || blog.cover_image?.src;
    const images = imageUrl ? [imageUrl] : [];
    
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
        url: `https://ai4bharat.iitm.ac.in/blog/${blog.page_url}`,
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
      alternates: {
        canonical: `https://ai4bharat.iitm.ac.in/blog/${blog.page_url}`,
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
    };

    return metadata;
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | AI4Bharat',
      description: 'AI4Bharat blog post - Advancing AI for Indian languages',
    };
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  try {
    const blog = await getBlogPostByPageUrl(params.slug);
    return <BlogContentDisplay blog={blog} />;
  } catch (error) {
    console.error('Error in BlogDetailPage:', error);
    notFound();
  }
}
