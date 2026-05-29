function renderEffectsText(text: string) {
  const parts = text.split(/([↑↓])/g);

  return parts.map((part, index) => {
    if (part === "↑" || part === "↓") {
      return (
        <span key={index} className="text-accent">
          {part}
        </span>
      );
    }

    return part;
  });
}

export function EffectsText({ text }: { text: string }) {
  return (
    <p className="font-body text-[14px] leading-[22px] text-foreground/90">
      {renderEffectsText(text)}
    </p>
  );
}
