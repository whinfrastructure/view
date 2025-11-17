"use client";
import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  reverse?: boolean;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: props.reverse ? "0%" : "-50%",
        }}
        initial={{
          translateY: props.reverse ? "-50%" : "0%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-4 rounded-lg border border-neutral-200 bg-white shadow-sm max-w-[240px] w-full" key={i}>
                  <div className="text-neutral-700 text-[11px] leading-snug line-clamp-4">{text}</div>
                  <div className="flex items-center gap-2 mt-3">
                    <img
                      width={28}
                      height={28}
                      src={image}
                      alt={name}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold tracking-tight leading-tight text-neutral-900 text-xs">{name}</div>
                      <div className="leading-tight text-neutral-500 text-[10px] tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
