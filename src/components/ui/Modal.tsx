import {
  useEffect,
  type ReactNode,
} from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({
  title,
  children,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/40"
      />

      {/* Modal window */}
      <div className="relative z-10 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:max-h-[calc(100dvh-2rem)]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 sm:px-5">
          <h2 className="min-w-0 text-lg font-semibold text-gray-900 sm:text-xl">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 cursor-pointer rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* Scrollable modal content */}
        <div className="min-h-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;