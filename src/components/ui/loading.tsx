import { Spinner } from "@/components/ui";

export const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-zinc-100/75">
      <Spinner />
    </div>
  );
};
