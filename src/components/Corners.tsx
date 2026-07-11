import { cn } from "@/lib/utils";

/** HUD-style corner brackets layered over a container */
export function Corners({ className }: { className?: string }) {
  const base = "absolute h-3.5 w-3.5 border-zinc-500/40";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-3 z-10", className)}>
      <span className={cn(base, "left-0 top-0 border-l border-t")} />
      <span className={cn(base, "right-0 top-0 border-r border-t")} />
      <span className={cn(base, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(base, "bottom-0 right-0 border-b border-r")} />
    </div>
  );
}
