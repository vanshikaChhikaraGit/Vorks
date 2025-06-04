import { cn } from "@/lib/utils";

const ServiceAvatar = ({ className, src, alt }: { className?: string; src: string; alt: string }) => (
  <div className={cn(
    "w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-lg",
    "animate-[float_3s_ease-in-out_infinite]", // Just use the animation class
    className
  )}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

export default ServiceAvatar;