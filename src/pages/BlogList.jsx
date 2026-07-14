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
    <div className="ug-page">
      


      <main className="main-content" style={{ padding: '6rem 2rem' }}>
        
        <header style={{ marginBottom: '6rem', maxWidth: '800px' }}>
          <motion.span 
            className="section-label"
            initial="hidden" animate="visible" variants={fadeUp} custom={0}
          >
            Insights & Writing
          </motion.span>
          <motion.h1 
            className="text-h1"
            style={{ marginTop: '1rem' }}
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Thoughts on product, systems, and the future of SaaS.
          </motion.h1>
        </header>

        <div className="bento-blog-grid">
          {blogData.map((post, i) => {
            const isFeatured = i === 0;

            return (
              <motion.article 
                key={post.id}
                className={`bento-card ${isFeatured ? 'bento-featured' : 'bento-standard'}`}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp} custom={i * 0.15}
              >
                <Link to={`/blog/${post.slug}`} className="bento-link hover-target">
                  
                  {/* Image Area */}
                  {post.coverImage && (
                    <div className="bento-image-wrapper">
                      <img src={post.coverImage} alt={post.title} className="bento-img" />
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="bento-content">
                    <div className="bento-meta">
                      <span className="bento-category">{post.category}</span>
                      <span className="bento-dot">•</span>
                      <span>{post.date}</span>
                    </div>
                    
                    <h2 className="bento-title">
                      {post.title}
                    </h2>
                    
                    <p className="bento-excerpt">
                      {post.excerpt}
                    </p>
                    
                    <div className="bento-action">
                      Read Article <ArrowRight size={16} className="bento-arrow" />
                    </div>
                  </div>

                </Link>
              </motion.article>
            );
          })}
        </div>

      </main>
    </div>
  );
};

export default BlogList;
