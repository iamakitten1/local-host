import {
  useEffect,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

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
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/30 backdrop-blur-[1px]"
      />

      <div className="relative z-10 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-[#e7e5df] bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)]">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#e7e5df] bg-[#fbfaf7] px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#5b7e72]">
              LocalHost
            </p>

            <h2 className="mt-0.5 min-w-0 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition hover:bg-[#f1f0eb] hover:text-gray-900"
          >
            <X
              size={18}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;