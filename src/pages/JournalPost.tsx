import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { journalPosts } from '../data/journal';
import { ChevronLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function JournalPost() {
  const { id } = useParams<{ id: string }>();
  const post = journalPosts.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <main className="pt-24 px-5 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <p className="font-editorial text-2xl text-ivory-dim mb-4">Article not found</p>
        <Link to="/journal" className="text-xs tracking-[0.2em] uppercase text-burgundy-light">
          Return to Journal
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-16 md:pt-20">
      {/* Back */}
      <div className="px-5 md:px-10 lg:px-16 py-4">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-ivory-dim hover:text-ivory transition-colors min-h-[44px]"
        >
          <ChevronLeft size={14} />
          Journal
        </Link>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="px-5 md:px-10 lg:px-16 mb-12"
      >
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-noir-light">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-5 md:px-10 lg:px-16 pb-20 md:pb-32 max-w-3xl"
      >
        <header className="mb-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-burgundy-light mb-4">
            {post.category} — {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-4">
            {post.title}
          </h1>
          <p className="font-editorial text-xl md:text-2xl text-ivory-dim italic mb-4">
            {post.subtitle}
          </p>
          <p className="text-xs tracking-[0.15em] uppercase text-ivory-dim/50">
            By {post.author}
          </p>
        </header>

        <div className="space-y-6">
          {post.content.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className={`text-base md:text-lg leading-relaxed ${
                i === 0 ? 'font-editorial text-xl md:text-2xl text-ivory' : 'text-ivory-dim'
              } ${
                paragraph.startsWith('"') || paragraph.startsWith('"')
                  ? 'font-editorial text-2xl md:text-3xl italic text-ivory/80 border-l border-burgundy pl-6 py-2 my-8'
                  : ''
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Related posts */}
        <div className="mt-16 pt-12 border-t border-noir-mid">
          <p className="text-[10px] tracking-[0.2em] uppercase text-ivory-dim mb-6">Continue Reading</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {journalPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.id}
                  to={`/journal/${related.id}`}
                  className="group"
                >
                  <div className="aspect-[16/9] overflow-hidden mb-3 bg-noir-light">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-burgundy-light mb-1">
                    {related.category}
                  </p>
                  <h4 className="font-editorial text-lg group-hover:text-burgundy-light transition-colors duration-300">
                    {related.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </motion.article>
    </main>
  );
}
