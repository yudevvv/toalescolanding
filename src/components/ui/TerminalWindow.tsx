export function TerminalWindow({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm dark:shadow-none ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-200 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-amber-400" />
        <span className="w-3 h-3 rounded-full bg-emerald-400" />
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 ml-2 truncate">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
