import { Building2, Menu } from "lucide-react";

type MobileHeaderProps = {
  onMenuOpen: () => void;
};

const MobileHeader = ({
  onMenuOpen,
}: MobileHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 flex shrink-0 items-center justify-between border-b border-(--color-border) bg-(--color-surface-soft)]/95 px-4 py-3 backdrop-blur sm:px-6 xl:hidden">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-(--color-primary) text-white shadow-sm">
          <Building2
            size={18}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        <div>
          <h1 className="text-base font-semibold tracking-tight text-(--color-text)">
            LocalHost
          </h1>

          <p className="text-[11px] text-(--color-text-muted)">
            Property operations
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={onMenuOpen}
        className="flex size-10 cursor-pointer items-center justify-center rounded-xl text-(--color-text-muted) transition hover:bg-(--color-background) hover:text-(--color-text)"
      >
        <Menu
          size={21}
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </button>
    </header>
  );
};

export default MobileHeader;