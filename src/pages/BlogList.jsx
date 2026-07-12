import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogData } from '../data/blogData';
import { useSEO } from '../hooks/useSEO';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  })
};

const BlogList = () => {
  useSEO({
    title: 'Writing & Insights',
    description: 'Thoughts, case studies, and essays on UX design, SaaS products, AI interfaces, and design systems.'
  });

  return (
    <div className="ug-page" style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#F4F3F0' }}>
      
      {/* Top Navigation Bar */}
      <div className="ug-nav">
        <Link to="/" className="ug-back hover-target">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <main className="main-content" style={{ padding: '6rem 2rem' }}>
        
        <header style={{ marginBottom: '6rem', maxWidth: '800px' }}>
          <motion.span 
            className="section-label"
            initial="hidden" animate="visible" variants={fadeUp} custom={0}
          >
            Insights & Writing
          </motion.span>
          <motion.h1 
            style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: '1rem', color: '#111' }}
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Thoughts on product, systems, and the future of SaaS.
          </motion.h1>
        </header>

        <div className="blog-list-grid" style={{ display: 'grid', gap: '4rem', maxWidth: '900px' }}>
          {blogData.map((post, i) => (
            <motion.article 
              key={post.id}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp} custom={i * 0.2}
            >
              <Link to={`/blog/${post.slug}`} className="blog-card hover-target">
                
                {/* Image Column */}
                {post.coverImage && (
                  <div className="blog-card-image-wrap">
                    <img src={post.coverImage} alt={post.title} className="blog-card-img" />
                  </div>
                )}

                {/* Text Column */}
                <div style={{ flex: '1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '1rem', lineHeight: 1.2 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '800px' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, fontSize: '1rem' }}>
                    Read Article <ArrowRight size={16} className="blog-card-arrow" />
                  </div>
                </div>

              </Link>
            </motion.article>
          ))}
        </div>

      </main>
    </div>
  );
};

export default BlogList;
