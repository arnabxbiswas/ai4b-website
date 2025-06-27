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
  cover_image?: { src: string; alt: string; caption?: string } | null;
  authors?: Array<{ name: string; affiliationId?: string }>;
  affiliations?: Array<{ id: string; name: string }>;
  publication_links?: Array<{ text: string; url: string; icon?: string }>;
  sections?: Array<any>;
  team?: { students?: Array<{ name: string }>; advisors?: Array<{ name: string }>; contacts?: Array<{ name: string; email?: string }> };
  bibtex?: string;
}

async function getAllBlogPosts(): Promise<Blog[]> {
  const res = await fetch(`${API_URL}/news/`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.error('Failed to fetch all blog posts:', res.status, res.statusText);
    return [];
  }
  return res.json();
}

async function getBlogPost(id: string): Promise<Blog> {
  const res = await fetch(`${API_URL}/news/${id}/`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.error(`Failed to fetch blog post with ID ${id}:`, res.status, res.statusText);
    if (res.status === 404) notFound();
    throw new Error('Failed to fetch blog post');
  }
  return res.json();
}

export async function generateStaticParams() {
  const blogs = await getAllBlogPosts();
  return blogs.map((blog) => ({ id: blog.id.toString() }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = await getBlogPost(params.id);
  return {
    title: `${blog.title} | AI4Bharat Blog`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.image || (blog.cover_image?.src ? [blog.cover_image.src] : []),
      url: `https://ai4bharat.iitm.ac.in/blog/${blog.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: blog.image || (blog.cover_image?.src ? [blog.cover_image.src] : []),
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = await getBlogPost(params.id);
  return <BlogContentDisplay blog={blog} />;
}
