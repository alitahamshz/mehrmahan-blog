export default function ImageSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-200">
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}
