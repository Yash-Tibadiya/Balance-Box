import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

const LoginHeroPanel = () => {
  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <DotPattern
        glow={true}
        className={cn(
          "mask-[linear-gradient(to_bottom_right,white,transparent)]"
        )}
      />
      {/* <div className="bg-linear-to-br from-transparent to-neutral-950 z-50 h-full w-full"></div> */}
    </div>
  );
};

export default LoginHeroPanel;
