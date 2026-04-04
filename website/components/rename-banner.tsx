export function RenameBanner() {
  return (
    <div className="max-w-[860px] mx-auto px-4 md:px-10">
      <div className="bg-accent text-background text-center text-sm py-2 px-4 font-medium" style={{ "--sel-bg": "var(--background)", "--sel-color": "var(--accent)" } as React.CSSProperties}>
        <strong>Lunal is now Confidential AI (Conf for short).</strong> Same team. Same mission. New name.
      </div>
    </div>
  );
}
