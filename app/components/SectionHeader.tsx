'use client';

type SectionHeaderProps = {
  eyebrow?: string;
  index?: string | number;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  eyebrowClassName?: string;
};

export default function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = 'left',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  eyebrowClassName = '',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const showEyebrow = eyebrow || index !== undefined;

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {showEyebrow && (
        <div className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-grigio/60 font-light ${eyebrowClassName}`}>
          {eyebrow && <span>{eyebrow}</span>}
          {index !== undefined && index !== null && <span className="text-grigio/50">[{index}]</span>}
        </div>
      )}
      <h2 className={`font-display text-[32px] lg:text-[40px] font-medium text-sabbia leading-[1.1] ${titleClassName}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-[15px] lg:text-[17px] leading-[1.65] text-sabbia/75 font-light ${align === 'center' ? 'max-w-3xl' : 'max-w-[720px]'} ${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
}
