import { Skeleton } from "../ui/skeleton";

export const AnimeGridLoader = ({ length = 18 }: { length?: number }) => {
  return (
    <ul className="grid h-full grid-cols-2 gap-3 md:grid-cols-6">
      {Array.from({ length }).map((_, i) => (
        <Skeleton key={i} className="h-[262px] md:h-[440px]" />
      ))}
    </ul>
  );
};
