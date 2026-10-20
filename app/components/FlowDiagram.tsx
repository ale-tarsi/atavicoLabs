import Reveal from './Reveal';

type FlowDiagramProps = {
  steps: string[];
  label?: string;
};

export default function FlowDiagram({ steps, label }: FlowDiagramProps) {
  return (
    <ol
      aria-label={label}
      className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0"
    >
      {steps.map((step, i) => (
        <Reveal as="li" key={i} delay={i * 0.12} y={10} className="flex flex-col md:flex-row md:flex-1 items-stretch">
          <div className="flex-1 flex items-center gap-3 border border-grigio/20 bg-grafite/30 px-4 py-5">
            <span className="font-mono text-[11px] text-oliva/70">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-[14px] leading-snug text-sabbia/80">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="self-center py-1 md:py-0 md:px-2 text-oliva/70 rotate-90 md:rotate-0"
            >
              →
            </span>
          )}
        </Reveal>
      ))}
    </ol>
  );
}
