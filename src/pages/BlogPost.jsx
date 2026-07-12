import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogData } from '../data/blogData';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'framer-motion';
import './Home.css';

// Simple Markdown parser for our specific blog needs
const parseMarkdown = (md) => {
  let html = md;
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 1.5rem; font-weight: 600; margin-top: 2.5rem; margin-bottom: 1rem;">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="font-size: 2rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1rem; letter-spacing: -0.01em;">$1</h2>');
  // Bold
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  // Italics
  html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" style="text-decoration: underline; text-underline-offset: 4px;">$1</a>');
  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li style="margin-bottom: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">$1</li>');
  html = html.replace(/<\/li>\n<li/gim, '</li><li');
  // Paragraphs
  html = html.replace(/^(?!<h|<l)(.+)$/gim, '<p style="margin-bottom: 1.5rem; font-size: 1.125rem; line-height: 1.7; color: #444;">$1</p>');
  
  return html;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const foundPost = blogData.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/blog');
    }
  }, [slug, navigate]);

  useSEO({
    title: post ? post.title : 'Loading...',
    description: post ? post.metaDescription : ''
  });

  if (!post) return null;

  return (
    <div className="ug-page" style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#F4F3F0' }}>
      
      {/* Top Navigation Bar */}
      <div className="ug-nav">
        <Link to="/blog" className="ug-back hover-target">
          <ArrowLeft size={16} /> Back to Insights
        </Link>
      </div>

      <main className="main-content" style={{ padding: '4rem 2rem 8rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        
        <motion.article 
          initial="hidden" animate="visible" variants={fadeUp}
        >
          {/* SEO Semantic Header */}
          <header style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>{post.category}</span>
              <span>•</span>
              <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#111', marginBottom: '1.5rem' }}>
              {post.title}
            </h1>
            <p style={{ fontSize: '1.35rem', color: '#555', lineHeight: 1.5 }}>
              {post.excerpt}
            </p>
          </header>

          {post.coverImage && (
            <div style={{ marginBottom: '4rem', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', backgroundColor: '#eaeaea', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.05)' }}>
              <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          {/* SEO Semantic Content Body */}
          <section 
            className="blog-content-body"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          />
        </motion.article>

      </main>
    </div>
  );
};

export default BlogPost;
