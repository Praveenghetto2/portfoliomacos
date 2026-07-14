import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './CaseStudy.css';

/* ═══════════════════════════════════════════════
   CASE STUDY DATA
   ═══════════════════════════════════════════════ */
const caseStudies = {
  'revlitix-saas': {
    title: 'Revlitix',
    subtitle: 'Turning Scattered Revenue Data Into Confident, Real-Time Decisions',
    category: 'SaaS & B2B Analytics',
    number: '01',
    heroImage: '/assets/revlitix_hero_v3.jpg',
    meta: {
      industry: 'SaaS, Revenue Operations, B2B Analytics',
      role: 'UI/UX Designer',
      scope: 'Product Thinking, Data Visualization, Dashboard Design System'
    },
    sections: [
      {
        type: 'hero',
        src: '/assets/swiss_hero_dashboard.jpg'
      },
      {
        type: 'text-huge',
        content: 'Turning Scattered Revenue Data Into Confident, Real-Time Decisions'
      },
      {
        type: 'editorial-text',
        watermark: '01',
        label: 'Overview',
        title: 'Revlitix',
        content: [
          "Revlitix is a B2B revenue intelligence platform built for growing companies that need one trusted place to understand how their business is really performing.",
          "The platform brings together funnel tracking, revenue reporting, and AI-assisted analysis so sales, marketing, and growth teams can move from raw numbers to clear action, without stitching together spreadsheets and disconnected tools."
        ]
      },
      {
        type: 'image-cluster',
        images: [
          { src: '/assets/revlitix_hero_main.jpg', alt: 'Platform Overview' },
          { src: '/assets/revlitix_funnel.jpg', alt: 'Funnel Tracking' },
          { src: '/assets/revlitix_waterfall_v2.jpg', alt: 'Revenue Reporting' }
        ],
        caption: 'From raw numbers to clear comparisons.'
      },
      {
        type: 'list-massive',
        watermark: '02',
        label: 'Challenges',
        title: 'Challenges',
        description: "The existing reporting workflow across teams was slow, fragmented, and hard to trust. I was responsible for designing a unified analytics platform that made complex revenue data easier to understand, easier to compare, and easier to act on. Here are the key problems I needed to solve:",
        items: [
          { title: "Fragmented data sources", text: "Teams pulled numbers from multiple spreadsheets and tools, leading to inconsistent reporting and duplicated manual work." },
          { title: "Poor decision visibility", text: "Users couldn't quickly see where deals were slowing down or which channels were actually driving revenue." },
          { title: "Overwhelming, unstructured dashboards", text: "Metrics were displayed without clear hierarchy, making it hard to know what to look at first." },
          { title: "Slow interpretation", text: "Even when data was available, users needed extra time and effort to translate numbers into next steps." }
        ]
      },
      {
        type: 'editorial-text',
        watermark: '03',
        label: 'Research',
        title: 'Research Insights',
        content: [
          "I ran discovery sessions with sales, marketing, and RevOps stakeholders to understand exactly which questions they needed answered daily, and how quickly they needed those answers.",
          "This shaped a core design principle I carried through the project: design around decisions, not just data categories."
        ]
      },
      {
        type: 'editorial-text',
        watermark: '04',
        label: 'System',
        title: 'Design System',
        content: [
          "I built a modular dashboard design system that could scale as new reporting modules were added, anchored by a clean typographic scale (Heading 1, Heading 2, Sub-heading, Body), a purple-and-orange color system, and consistent spacing and grid rules to keep dense information legible.",
          "Every chart, card, and table component was designed to work consistently across reporting modules, so the platform felt like one connected system rather than a patchwork of screens."
        ]
      },
      {
        type: 'image-cluster',
        images: [
          { src: '/assets/revlitix_design_system_v3.jpg', alt: 'Design System' },
          { src: '/assets/revlitix_wireframe_v3.jpg', alt: 'Wireframe Layouts' },
          { src: '/assets/revlitix_process_wireframe.jpg', alt: 'Wireframe Details' }
        ],
        caption: 'Strict typographic control and data restraint.'
      },
      {
        type: 'editorial-text',
        watermark: '05',
        label: 'Features',
        title: 'Funnel Overview',
        content: [
          "See Exactly Where Deals Are Won or Lost.",
          "I designed a funnel overview that gives users an immediate, visual read on how leads and opportunities move through each stage. Instead of piecing together numbers from separate reports, users can spot drop-off points at a glance and know exactly where to investigate further."
        ]
      },
      {
        type: 'editorial-text',
        watermark: '06',
        label: 'Reports',
        title: 'Reports, Built for Real Decisions',
        content: [
          "From Raw Numbers to Clear Comparisons.",
          "I designed flexible reporting views that let teams compare performance across channels, campaigns, and time periods side by side. This was critical because users weren't just checking numbers — they needed to understand why something changed and whether it mattered."
        ]
      },
      {
        type: 'image-panel',
        src: '/assets/revlitix_waterfall_v3.jpg',
        alt: 'Waterfall Pipeline UI Mockup',
        caption: 'Comparison views built for fast decision making.'
      },
      {
        type: 'editorial-text',
        watermark: '07',
        label: 'AI',
        title: 'AI Analyst Dashboard',
        content: [
          "Your Data, Interpreted for You.",
          "I designed the AI Analyst Dashboard to bridge the gap between raw reporting and interpretation. Rather than requiring users to manually parse every chart, this layer surfaces what's changed and what deserves attention, making the platform useful even for less data-savvy stakeholders."
        ]
      },
      {
        type: 'image-cluster',
        images: [
          { src: '/assets/revlitix_process_journey.jpg', alt: 'AI Data Interpretation' },
          { src: '/assets/revlitix_outcomes_1783016439002.jpg', alt: 'Actionable Insights' },
          { src: '/assets/revlitix_process_1783016419496.jpg', alt: 'AI Data Model' }
        ],
        caption: 'AI Analyst Dashboard: Bridging raw data to action.'
      },
      {
        type: 'editorial-text',
        watermark: '08',
        label: 'Clarity',
        title: 'Designed for Clarity at Scale',
        content: [
          "Structure Over Clutter.",
          "Every screen I designed was built around visual restraint: generous spacing, modular cards, and disciplined use of color, so dense revenue data never felt overwhelming.",
          "This mattered because trust in an analytics product is shaped as much by how it feels as by how accurate it is."
        ]
      },
      {
        type: 'editorial-text',
        watermark: '09',
        label: 'Outcome',
        title: 'Impact',
        content: [
          "The result was a unified reporting experience I designed to replace fragmented spreadsheets and disconnected dashboards with one connected, decision-ready platform. Key impact areas:",
          "• Consolidated multi-tool reporting into a single source of truth",
          "• Reduced cognitive load through funnel-first structure and clear visual hierarchy",
          "• Made trend and performance analysis accessible to non-technical stakeholders",
          "• Shortened the path from raw data to confident action via AI-assisted insights"
        ]
      },
      {
        type: 'editorial-text',
        watermark: '10',
        label: 'Retrospective',
        title: 'What I Learned',
        content: [
          "This project sharpened my thinking around designing for ambiguity in dense, data-heavy products.",
          "The most valuable decisions I made weren't visual — they were about what to prioritize on the first screen, how deep comparison views needed to go, and how to keep a complex domain approachable without flattening it."
        ]
      }
    ],
    nextProject: { id: 'sonic', title: 'Revlitix Sonic AI' },
  },
  'sonic': {
    title: 'Sonic AI',
    subtitle: 'Talking to your data. Literally.',
    category: 'AI Interface Design',
    number: '02',
    heroImage: '/assets/revlitix_website_product_images/6896089a9b458a0e5d353212_Frame 1321315474.png',
    meta: {
      industry: 'SaaS, Revenue Operations, B2B Analytics',
      role: 'UI/UX Designer',
      scope: 'Product Thinking, Data Visualization, Dashboard Design System'
    },
    sections: [
      {
        type: 'hero',
        src: '/assets/revlitix_website_product_images/6896089a9b458a0e5d353212_Frame 1321315474.png'
      },
      {
        type: 'text-huge',
        content: 'Turning Conversational AI Into a Trusted GTM Analytics Assistant'
      },
      {
        type: 'editorial-text',
        watermark: '01',
        label: 'Overview',
        title: 'Sonic AI',
        content: [
          "Sonic AI is Revlitix's AI-powered GTM analytics assistant that lets users interact with their revenue data in natural language, instantly generate reports, and receive AI-crafted insights, all within a single interface.",
          "The design challenge was to make complex GTM analytics feel simple, conversational, and immediately actionable."
        ]
      },
      {
        type: 'list-massive',
        watermark: '02',
        label: 'Challenges',
        title: 'Challenges',
        description: "Traditional dashboards were overwhelming users across sales, marketing, and RevOps teams. I was responsible for designing an intuitive interface that felt like talking to an analyst, while ensuring speed, clarity, and trust. Here are the key problems I needed to solve:",
        items: [
          { title: "Cluttered Data", text: "Data scattered across multiple reports, forcing users to piece together their own picture of performance." },
          { title: "Steep Learning Curves", text: "Difficult for non-technical GTM teams who weren't comfortable navigating traditional BI tools." },
          { title: "Slow Insights", text: "Required manual report-building instead of providing quick, on-demand answers." }
        ]
      },
      {
        type: 'editorial-text',
        watermark: '03',
        label: 'Research',
        title: 'Research Insights',
        content: [
          "I ran user interviews with RevOps, Sales, and Marketing teams to understand where existing tools were failing them. Consistently, they sent us back the same signals: consistency across dashboards was lacking, narrative-driven insights were more valuable than raw numbers, and most analytics tools still relied on manual report creation and static dashboards.",
          "Competitive benchmarking confirmed the same gap across the market, reinforcing that a conversational, insight-first approach was the real opportunity."
        ]
      },
      {
        type: 'list-massive',
        watermark: '04',
        label: 'Goals',
        title: 'Design Goals',
        description: "I anchored the entire product around four goals:",
        items: [
          { title: "Conversational UX", text: "Natural language input and output." },
          { title: "Clarity in Visuals", text: "Clean, minimal charts paired with narrative summaries." },
          { title: "Smart Consistency", text: "Filters and metrics applied uniformly across all reports." },
          { title: "Trust and Security", text: "Visual reassurance that data is private and secure." }
        ]
      },
      {
        type: 'image-cluster',
        images: [
          { src: '/assets/revlitix_website_product_images/6896135103e8ca6406b070d3_Frame 1321315475.png', alt: 'Query processing flow' },
          { src: '/assets/revlitix_website_product_images/689c7481b7d7f7e179fa247e_website12.png', alt: 'Product Website' },
          { src: '/assets/revlitix_website_product_images/68960bded69109f50c5ac276_outcomesimg.png', alt: 'Outcomes Diagram' }
        ],
        caption: 'Translating text into structured schemas instantly.'
      },
      {
        type: 'list-massive',
        watermark: '05',
        label: 'Process',
        title: 'UX Process',
        description: "I structured my process around three phases:",
        items: [
          { title: "Information Architecture", text: "I replaced a 'dashboards-first' navigation with a chat-first workflow, where reports, charts, and insights are stacked conversationally for easy scrolling." },
          { title: "Wireframes & Prototypes", text: "I explored a chatbot-style interface and a hybrid UI combining pinned reports with quick actions. The final design blended both: conversational flow plus structured insights." },
          { title: "Design Refinement", text: "I iterated on component behavior and layout until conversational and structured elements worked as one coherent system." }
        ]
      },
      {
        type: 'editorial-text',
        watermark: '06',
        label: 'System',
        title: 'Design System',
        content: [
          "I built a visual system tuned specifically for a conversational analytics product: a dark-mode-first charcoal and vibrant gradient palette, a modern sans-serif typeface with slightly tighter tracking for narrative body text, a grid-based layout with rounded modular cards for insights, and micro-interactions that smoothly animate on card load and style updates when filters change."
        ]
      },
      {
        type: 'image-cluster',
        images: [
          { src: '/assets/revlitix_website_product_images/68961de44ae404323fc2a4bf_SZj7gmTHfxZ.png', alt: 'Sonic dashboard layouts' },
          { src: '/assets/revlitix_product_images/68959de2d249e7fc38c769dc_mainimg11.png', alt: 'Design Mockup' },
          { src: '/assets/revlitix_product_images/689c781cfda6c429f035deac_Frame 1321315482.png', alt: 'Component System' }
        ],
        caption: 'Clean layouts, sleek inputs.'
      },
      {
        type: 'editorial-text',
        watermark: '07',
        label: 'Input',
        title: 'Conversational Query Input',
        content: [
          "Ask a Question, Get an Instant Report.",
          "I designed the query input with smart autocomplete for metrics, so users can type queries like 'Show me funnel drop-offs by region' and instantly receive a formatted report, no manual dashboard building required."
        ]
      },
      {
        type: 'editorial-text',
        watermark: '08',
        label: 'Reports',
        title: 'Dynamic Reports and Charts',
        content: [
          "Reports That Load in the Conversation, Not a Separate Tab.",
          "Reports load directly inline within the modular cards, combining chart visualizations, key metrics, and AI-generated summaries in one glance. Cards are stackable and shareable, making it easy to hand off insights across teams."
        ]
      },
      {
        type: 'editorial-text',
        watermark: '09',
        label: 'Narratives',
        title: 'AI Narrative Insights',
        content: [
          "Beside the Charts, Short and Sharp Takeaways.",
          "Alongside every chart, I designed short narrative takeaways such as 'Funnel drop-off increased by 12% in APAC, suggest shifting budget to EMEA.' This provides an action-oriented explanation, not just numbers to interpret on their own."
        ]
      },
      {
        type: 'editorial-text',
        watermark: '10',
        label: 'Filters',
        title: 'Global Filter Consistency',
        content: [
          "One Filter Update, Every Report Reflects It.",
          "One filter update (e.g., 'Quarter to Q2') propagates across all reports globally, reducing repetitive filter setup and ensuring accuracy across every view."
        ]
      },
      {
        type: 'editorial-text',
        watermark: '11',
        label: 'Trust',
        title: 'Data Privacy Cues',
        content: [
          "Built for Trust, Not Just for Speed.",
          "I added a clear 'Secure inside Revlitix' indicator across every interaction, building confidence in handling sensitive GTM data conversationally."
        ]
      },
      {
        type: 'list-massive',
        watermark: '12',
        label: 'Outcome',
        title: 'Outcome and Impact',
        description: "The result was a conversational analytics experience that transformed how GTM teams engaged with their data:",
        items: [
          { title: "Reduced Complexity", text: "Users get insights in seconds without reading dashboards." },
          { title: "Improved Adoption", text: "Non-technical GTM team members engage with analytics daily." },
          { title: "Faster Decision-Making", text: "AI summaries turn raw data into actionable strategy." },
          { title: "Trust and Security", text: "Users are reassured that sensitive GTM data stays safe." }
        ]
      },
      {
        type: 'editorial-text',
        watermark: '13',
        label: 'Takeaway',
        title: 'Final Takeaway',
        content: [
          "Sonic AI transforms GTM analytics from static dashboards to a conversational experience.",
          "By combining natural language, dynamic visual reports, and AI-driven narratives, I designed a platform that helps teams move from data overload to insight-driven action, intuitively."
        ]
      }
    ],
    nextProject: { id: 'revlitix-saas', title: 'Revlitix' },
  }
};

/* ═══════════════════════════════════════════════
   VERTICAL SECTIONS
   ═══════════════════════════════════════════════ */

const HeroImage = ({ src }) => (
  <div className="ug-section ug-hero-image-container">
    <motion.div 
      className="ug-floating-mockup"
      initial={{ y: 80, opacity: 0, rotateX: 15, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="ug-mockup-header">
        <span className="ug-dot red"></span>
        <span className="ug-dot yellow"></span>
        <span className="ug-dot green"></span>
      </div>
      <div className="ug-mockup-body">
        <img src={src} alt="Hero Mockup" />
      </div>
    </motion.div>
  </div>
);

const TextHugeSection = ({ content }) => (
  <div className="ug-section ug-text-huge">
    <h2 className="text-h2">{content}</h2>
  </div>
);

const EditorialTextSection = ({ section }) => (
  <div className="ug-section editorial-text-section">
    {section.watermark && <div className="editorial-watermark">{section.watermark}</div>}
    <div className="editorial-content">
      <div className="editorial-left">
        <span className="ug-label">{section.label}</span>
        <h2 className="text-h2">{section.title}</h2>
      </div>
      <div className="editorial-right">
        {section.content && section.content.map((p, i) => (
          <p key={i} style={{ marginBottom: i < section.content.length - 1 ? '1.5rem' : '0' }}>{p}</p>
        ))}
        {!section.content && section.text1 && <p>{section.text1}</p>}
        {!section.content && section.text2 && <p className="indent">{section.text2}</p>}
      </div>
    </div>
  </div>
);

const ImageClusterSection = ({ section }) => (
  <div className="ug-section image-cluster-section">
    <div className="image-cluster-grid">
      {section.images.map((img, i) => (
        <div key={i} className={`cluster-img-wrap cluster-img-${i + 1}`}>
          <img src={img.src} alt={img.alt} />
        </div>
      ))}
    </div>
    {section.caption && <span className="ug-caption">{section.caption}</span>}
  </div>
);

const QuoteSection = ({ text }) => (
  <div className="ug-section ug-quote">
    <blockquote>{text}</blockquote>
  </div>
);

const ImageFullbleedSection = ({ section }) => (
  <div className="ug-section ug-image-fullbleed">
    <img src={section.src} alt={section.alt} />
    {section.caption && <span className="ug-caption">{section.caption}</span>}
  </div>
);

const ImageSection = ({ section }) => (
  <div className="ug-section ug-image-standard">
    <div className="ug-image-inner">
      <img src={section.src} alt={section.alt} />
      {section.caption && <span className="ug-caption">{section.caption}</span>}
    </div>
  </div>
);

const ListMassiveSection = ({ section }) => (
  <div className="ug-section ug-list-massive">
    {section.watermark && <div className="editorial-watermark">{section.watermark}</div>}
    <div className="ug-list-header">
      <span className="ug-label">{section.label}</span>
      <h2 className="text-h2">{section.title}</h2>
    </div>
    <div className="ug-list">
      {section.items.map((item, i) => (
        <div key={i} className="ug-list-item">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const MetricsSection = ({ section }) => (
  <div className="ug-section ug-metrics">
    <div className="ug-metrics-header">
      <span className="ug-label">{section.label}</span>
      <h2 className="text-h2">{section.title}</h2>
    </div>
    <div className="ug-metrics-grid">
      {section.items.map((item, i) => (
        <div key={i} className="ug-metric">
          <span className="ug-metric-value">{item.prefix}{item.value}{item.suffix}</span>
          <span className="ug-metric-label">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const NextProjectSection = ({ project, navigate }) => (
  <div className="ug-section ug-next" onClick={() => navigate(`/case-study/${project.id}`)}>
    <div className="ug-next-content hover-target">
      <span className="ug-label">Next Project</span>
      <h2 className="text-h2">{project.title} <ArrowRight size={40} /></h2>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const study = caseStudies[id];

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!study) {
    return (
      <div className="ug-not-found">
        <h2 className="text-h2">Case Study Not Found</h2>
        <Link to="/" className="btn btn-outline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="ug-page">
      


      {/* Top Header Section */}
      <header className="ug-hero-header">
        <div className="ug-hero-header-inner">
          <span className="ug-project-category">{study.number} &mdash; {study.category}</span>
          <h1 className="text-h1">{study.title}</h1>
          <p className="ug-project-subtitle">{study.subtitle}</p>

          <div className="ug-meta-grid">
            {Object.entries(study.meta).map(([key, value]) => (
              <div key={key} className="ug-meta-item">
                <strong>{key}</strong>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Centered Scrolling Content */}
      <main className="ug-content">
        {study.sections.map((section, index) => {
          switch (section.type) {
            case 'hero':
              return <HeroImage key={index} src={section.src} />;
            case 'text-huge':
              return <TextHugeSection key={index} content={section.content} />;
            case 'editorial-text':
              return <EditorialTextSection key={index} section={section} />;
            case 'image-cluster':
              return <ImageClusterSection key={index} section={section} />;
            case 'text-split':
              return <EditorialTextSection key={index} section={section} />;
            case 'quote':
              return <QuoteSection key={index} text={section.text} />;
            case 'image-fullbleed':
              return <ImageFullbleedSection key={index} section={section} />;
            case 'image-panel':
              return <ImageSection key={index} section={section} />;
            case 'list-massive':
              return <ListMassiveSection key={index} section={section} />;
            case 'metrics':
              return <MetricsSection key={index} section={section} />;
            default:
              return null;
          }
        })}

        {study.nextProject && <NextProjectSection project={study.nextProject} navigate={navigate} />}
      </main>
    </div>
  );
};

export default CaseStudy;
