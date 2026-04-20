"use client";

type Props = {
  text: string;
  className?: string;
};

export default function AnimatedText({ text, className }: Props) {
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block opacity-0 animate-fade-up"
          style={{
            animationDelay: `${index * 0.15}s`,
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}
