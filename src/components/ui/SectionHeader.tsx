export function SectionHeader({ title, description, light }: { title: string; description: string; light?: boolean }) {
  return (
    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${light ? "text-white" : "text-slate-900 dark:text-white"}`}>
        {title}
      </h2>
      <p className={`text-xs sm:text-sm font-mono max-w-2xl mx-auto leading-relaxed ${light ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
        {description}
      </p>
    </div>
  );
}
