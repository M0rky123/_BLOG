export default function Logo({ size }: { size: number }) {
  return (
    <div style={{ width: `${size}px`, height: `${size}px` }} className="bg-[--blue] font-bold flex items-center justify-center">
      <span style={{ fontSize: `${size / 2}px` }}>iB</span>
    </div>
  );
}
