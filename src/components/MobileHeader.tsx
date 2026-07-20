type MobileHeaderProps = {
    onMenuOpen: () => void;
  };
  
  const MobileHeader = ({ onMenuOpen }: MobileHeaderProps) => {
    return (
      <header className=" flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 lg:hidden">
        <h1 className="text-xl font-bold">LocalHost</h1>
  
        <button
          type="button"
          onClick={onMenuOpen}
          className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Menu
        </button>
      </header>
    );
  };
  
  export default MobileHeader;