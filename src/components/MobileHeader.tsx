type MobileHeaderProps = {
  onMenuOpen: () => void;
};

const MobileHeader = ({
  onMenuOpen,
}: MobileHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6 xl:hidden">
      <h1 className="text-xl font-bold">
        LocalHost
      </h1>

      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={onMenuOpen}
        className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        Menu
      </button>
    </header>
  );
};

export default MobileHeader;