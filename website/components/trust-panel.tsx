export function TrustPanel() {
  return (
    <section className="mt-16 pt-10 border-t border-border">
      <p className="text-center text-xs text-muted uppercase tracking-wider mb-6">Member of</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center justify-items-center">
        <img
          src="/assets/CCC_MemberBadges_Final-Horizontal.svg"
          alt="Confidential Computing Consortium Member"
          className="h-12 sm:h-14 w-auto max-w-full"
        />
        <img
          src="/assets/Inception%20Badges/for-screen/nvidia-inception-program-badge-rgb-for-screen.svg"
          alt="NVIDIA Inception Program"
          className="h-12 sm:h-14 w-auto max-w-full"
        />
        <img
          src="/assets/LF_MemberLevel_silver.svg"
          alt="Linux Foundation Silver Member"
          className="h-20 sm:h-24 w-auto max-w-full"
        />
      </div>
    </section>
  );
}
