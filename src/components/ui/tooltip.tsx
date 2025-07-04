
import * as React from "react"

// Create a context for tooltip state management
const TooltipContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});

const TooltipProvider = ({ 
  children,
  delayDuration,
  ...props 
}: { 
  children: React.ReactNode;
  delayDuration?: number;
  [key: string]: any;
}) => {
  return <>{children}</>;
};

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
    children: React.ReactNode;
  }
>(({ children, asChild, ...props }, ref) => {
  const { setOpen } = React.useContext(TooltipContext);
  
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    } as any);
  }
  
  return (
    <div 
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
});

TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
  }
>(({ children, className = "", side = "top", align = "center", sideOffset = 4, ...props }, ref) => {
  const { open } = React.useContext(TooltipContext);
  
  if (!open) return null;
  
  const baseClasses = "absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-md";
  const sideClasses = {
    top: "bottom-full mb-1",
    bottom: "top-full mt-1", 
    left: "right-full mr-1",
    right: "left-full ml-1"
  };
  
  const alignClasses = {
    start: side === "top" || side === "bottom" ? "left-0" : "top-0",
    center: side === "top" || side === "bottom" ? "left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2",
    end: side === "top" || side === "bottom" ? "right-0" : "bottom-0"
  };
  
  return (
    <div
      ref={ref}
      className={`${baseClasses} ${sideClasses[side]} ${alignClasses[align]} ${className}`}
      style={{ zIndex: 9999 }}
      {...props}
    >
      {children}
    </div>
  );
});

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
