'use client';

type SectionDividerProps = {
  label: string;
};

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-grigio/60">
      <span className="h-px flex-1 bg-grigio/25" />
      <span className="shrink-0">{label}</span>
      <span className="h-px flex-1 bg-grigio/25" />
    </div>
  );
}
