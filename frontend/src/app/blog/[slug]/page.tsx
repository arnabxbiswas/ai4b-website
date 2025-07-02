import React from 'react';
import { API_URL } from '../../config';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogContentDisplay from './BlogContentDisplay';

export const revalidate = 60;

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

async function getAllBlogPosts(): Promise<Blog[]> {
  const endpoint = `${API_URL}/news/`;

  try {
    const res = await fetch(endpoint, { 
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function getIdFromPageUrl(pageUrl: string): Promise<number> {
  const blogs = await getAllBlogPosts();
  
  let blog = blogs.find(blog => blog.page_url === pageUrl);
  
  if (!blog && !isNaN(Number(pageUrl))) {
    blog = blogs.find(blog => blog.id === Number(pageUrl));
  }
  
  if (!blog) {
    const decodedUrl = decodeURIComponent(pageUrl);
    blog = blogs.find(blog => blog.page_url === decodedUrl);
  }
  
  if (!blog) {
    notFound();
  }
  
  return blog.id;
}

async function getBlogPostById(id: number): Promise<Blog> {
  const endpoint = `${API_URL}/news/${id}`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      notFound();
    }
    
    const blog = await res.json();
    return blog;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogPosts();
    
    const params = blogs
      .filter(blog => blog.page_url && blog.page_url.trim() !== '')
      .map((blog) => ({ 
        slug: encodeURIComponent(blog.page_url) 
      }));
    
    return params;
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const decodedSlug = decodeURIComponent(params.slug);
    const blogId = await getIdFromPageUrl(decodedSlug);
    const blog = await getBlogPostById(blogId);
    
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
    };

    return metadata;
  } catch (error) {
    return {
      title: 'Blog Post | AI4Bharat',
      description: 'AI4Bharat blog post - Advancing AI for Indian languages',
    };
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  try {
    const decodedSlug = decodeURIComponent(params.slug);
    const blogId = await getIdFromPageUrl(decodedSlug);
    const blog = await getBlogPostById(blogId);
    
    return <BlogContentDisplay blog={blog} />;
  } catch (error) {
    notFound();
  }
}
