'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export interface CarouselItem {
  id: number;
  url: string;
  title: string;
  href?: string;
}

interface ThumbnailsProps {
  items: CarouselItem[];
  index: number;
  setIndex: (index: number) => void;
}

interface DragCarouselProps {
  items: CarouselItem[];
}

const FULL_WIDTH_PX = 80;
const COLLAPSED_WIDTH_PX = 24;
const GAP_PX = 2;
const MARGIN_PX = 2;

function Thumbnails({ items, index, setIndex }: ThumbnailsProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
      }

      scrollPosition += MARGIN_PX;

      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
      scrollPosition -= centerOffset;

      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className='overflow-x-auto'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className='flex gap-[2px] h-12 sm:h-16 pb-2 mt-4' style={{ width: 'fit-content' }}>
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: {
                width: FULL_WIDTH_PX * 1.5,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
                opacity: 1
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX * 1.5,
                marginLeft: 0,
                marginRight: 0,
                opacity: 0.4
              },
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className='relative shrink-0 h-full overflow-hidden hover:opacity-80 transition-opacity'
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              sizes="150px"
              className='object-cover pointer-events-none select-none'
              loading="eager"
              quality={75}
            />
            {i === index && (
              <div className="absolute inset-0 border border-[#E6D5B8]/50" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function DragCarousel({ items }: DragCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  return (
    <div className='w-full max-w-6xl mx-auto'>
      <div className='flex flex-col'>
        {/* Main Carousel */}
        <div className='relative overflow-hidden group' ref={containerRef}>
          <motion.div
            className='flex'
            drag='x'
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const offset = info.offset.x;
              const velocity = info.velocity.x;

              let newIndex = index;

              // If fast swipe, use velocity
              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1;
              }
              // Otherwise use offset threshold (30% of container width)
              else if (Math.abs(offset) > containerWidth * 0.3) {
                newIndex = offset > 0 ? index - 1 : index + 1;
              }

              // Clamp index
              newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
              setIndex(newIndex);
            }}
            style={{ x }}
          >
            {items.map((item) => (
              <div key={item.id} className='shrink-0 w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative'>
                {item.href ? (
                  <Link href={item.href} className="block w-full h-full relative cursor-[ew-resize]">
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      className='object-cover select-none pointer-events-none'
                      priority={item.id === 1}
                      quality={95}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 md:p-16">
                      <div className="overflow-hidden mb-2">
                        <motion.h3 
                          className="text-white font-playfair text-3xl sm:text-4xl md:text-5xl font-light tracking-wide origin-bottom"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.title.split(' - ')[0]}
                        </motion.h3>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div 
                          className="flex items-center gap-4"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <span className="w-8 h-[0.5px] bg-[#E6D5B8]"></span>
                          <span className="text-[#E6D5B8] uppercase tracking-[0.3em] text-[10px] sm:text-xs">
                            {item.title.split(' - ')[1] || 'French Riviera'}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    className='object-cover select-none pointer-events-none'
                    priority={item.id === 1}
                    quality={95}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Previous Button */}
          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border border-white/30 text-white backdrop-blur-sm transition-all duration-500 z-10 hover:bg-white hover:text-black group-hover:opacity-100
              ${index === 0 ? 'opacity-0 cursor-not-allowed pointer-events-none' : 'opacity-0 sm:opacity-0 cursor-pointer'}`}
          >
            <svg
              className='w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-300 -translate-x-0.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M15 19l-7-7 7-7' />
            </svg>
          </motion.button>

          {/* Next Button */}
          <motion.button
            disabled={index === items.length - 1}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border border-white/30 text-white backdrop-blur-sm transition-all duration-500 z-10 hover:bg-white hover:text-black group-hover:opacity-100
              ${index === items.length - 1 ? 'opacity-0 cursor-not-allowed pointer-events-none' : 'opacity-0 sm:opacity-0 cursor-pointer'}`}
          >
            <svg
              className='w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-300 translate-x-0.5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M9 5l7 7-7 7' />
            </svg>
          </motion.button>

          {/* Image Counter */}
          <div className='absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-3 z-10 mix-blend-difference pointer-events-none'>
            <span className="text-white font-sans text-xs tracking-[0.2em]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-6 h-[0.5px] bg-white"></span>
            <span className="text-white/60 font-sans text-xs tracking-[0.2em]">
              {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <Thumbnails items={items} index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}
