import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";

/**
 * Standard section header: mono index label + gradient rule + eyebrow,
 * then the display title. Keeps every page on the same visual system.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <FadeIn className={className}>
      <div className={cn(align === "center" && "flex flex-col items-center text-center")}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-violet-300/80">
            [ {index} ]
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-violet-400/70 to-transparent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-300">
            {eyebrow}
          </span>
        </div>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
