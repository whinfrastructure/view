"use client";

import { cn } from "@/lib/utils";

export interface GalleryItem {
  image: string;
  text: string;
  city?: string;
}

interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: GalleryItem[];
  fontClassName?: string;
  onDiscover?: (item: GalleryItem, index: number) => void;
}

const CircularGallery = ({
  items,
  className,
  fontClassName,
  onDiscover,
  ...props
}: CircularGalleryProps) => {
  const defaultItems: GalleryItem[] = [
    { image: "https://images.unsplash.com/photo-1719368472026-dc26f70a9b76?q=80&h=800&w=800&auto=format&fit=crop", text: "Villa 1" },
    { image: "https://images.unsplash.com/photo-1649265825072-f7dd6942baed?q=80&h=800&w=800&auto=format&fit=crop", text: "Villa 2" },
    { image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&h=800&w=800&auto=format&fit=crop", text: "Villa 3" },
    { image: "https://images.unsplash.com/photo-1729086046027-09979ade13fd?q=80&h=800&w=800&auto=format&fit=crop", text: "Villa 4" },
    { image: "https://images.unsplash.com/photo-1601568494843-772eb04aca5d?q=80&h=800&w=800&auto=format&fit=crop", text: "Villa 5" },
    { image: "https://images.unsplash.com/photo-1585687501004-615dfdfde7f1?q=80&h=800&w=800&auto=format&fit=crop", text: "Villa 6" },
  ];

  const galleryItems = items && items.length > 0 ? items : defaultItems;

  return (
    <div
      className={cn(
        "flex items-center gap-2 h-full w-full",
        className,
      )}
      {...props}
    >
      {galleryItems.map((item, idx) => (
        <div
          key={idx}
          className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-full duration-500 hover:w-full cursor-pointer"
          onClick={() => onDiscover?.(item, idx)}
        >
          <img
            className="h-full w-full object-cover object-center"
            src={item.image}
            alt={item.text}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 group-hover:from-black/80 transition-all duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <h3 className={cn("text-white font-semibold text-base md:text-lg drop-shadow-2xl", fontClassName)}>
                  {item.text}
                </h3>
                {item.city && (
                  <p className="text-white/90 text-sm mt-1 drop-shadow-lg">{item.city}</p>
                )}
              </div>
              
              {/* Bouton Découvrir en bas à droite, visible au hover */}
              <button
                className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white text-black px-5 py-2 rounded-full font-medium text-sm shadow-2xl hover:bg-white/90 whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  onDiscover?.(item, idx);
                }}
              >
                Découvrir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { CircularGallery };
