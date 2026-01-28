'use client';

type OfferSectionHeadingProps = {
  title: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function OfferSectionHeading({
  title,
  align = 'left',
  className = '',
}: OfferSectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const underlineAlign = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={`flex flex-col gap-2 ${alignment} ${className}`}>
      <h2 className="text-[22px] lg:text-[26px] font-medium text-sabbia">{title}</h2>
      <div className={`h-[2px] w-10 bg-white/10 ${underlineAlign}`} />
    </div>
  );
}
