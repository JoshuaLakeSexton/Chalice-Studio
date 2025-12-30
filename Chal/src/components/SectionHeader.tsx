interface SectionHeaderProps {
  title: string;
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="col-span-4 bg-[#362C28] border-t border-b border-[#C9BEAD] flex items-center h-12">
      <div className="h-full border-r border-[#C9BEAD] flex items-center justify-center px-6 min-w-[200px]">
        <span className="text-[#F7EED2] text-xs uppercase tracking-widest">{title}</span>
      </div>
    </div>
  );
};
