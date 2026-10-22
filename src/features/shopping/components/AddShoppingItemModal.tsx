import { useState } from "react";

import Modal from "../../../components/ui/Modal";

import type {
  ShoppingItem,
  ShoppingItemPriority,
} from "../../../types/shoppingItem";

type AddShoppingItemModalProps = {
  onClose: () => void;
  onAdd: (item: ShoppingItem) => void;
};

const AddShoppingItemModal = ({
  onClose,
  onAdd,
}: AddShoppingItemModalProps) => {
  const [name, setName] = useState("");
  const [priority, setPriority] =
    useState<ShoppingItemPriority>("normal");
  const [note, setNote] = useState("");
  const [photoUrl, setPhotoUrl] =
    useState<string>();

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPhotoUrl(undefined);
      return;
    }

    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    const newItem: ShoppingItem = {
      id: crypto.randomUUID(),
      propertyId: "property-1",
      name: trimmedName,
      priority,
      note: note.trim() || undefined,
      photoUrl,
      addedByStaffId: "staff-1",
      createdAt: new Date().toISOString(),
      isBought: false,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <Modal
      title="Add shopping item"
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-4 p-4 sm:p-5">
          <div>
            <label
              htmlFor="shopping-item-name"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Item name
            </label>

            <input
              id="shopping-item-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="e.g. Coffee capsules"
              className="w-full rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)"
            />
          </div>

          <div>
            <label
              htmlFor="shopping-item-priority"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Priority
            </label>

            <select
              id="shopping-item-priority"
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target
                    .value as ShoppingItemPriority,
                )
              }
              className="w-full cursor-pointer rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)"
            >
              <option value="normal">
                Normal
              </option>

              <option value="buy-soon">
                Buy soon
              </option>

              <option value="urgent">
                Urgent
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="shopping-item-note"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Note
            </label>

            <textarea
              id="shopping-item-note"
              rows={3}
              value={note}
              onChange={(event) =>
                setNote(event.target.value)
              }
              placeholder="Optional note..."
              className="w-full resize-y rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)"
            />
          </div>

          <div>
            <label
              htmlFor="shopping-item-photo"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Photo
            </label>

            <input
              id="shopping-item-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full cursor-pointer rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2 text-sm text-(--color-text-muted)"
            />

            {photoUrl && (
              <img
                src={photoUrl}
                alt="Shopping item preview"
                className="mt-3 h-32 w-full rounded-xl object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-(--color-border) p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-xl border border-(--color-border-strong) px-4 py-2.5 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-soft) sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
          >
            Add item
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddShoppingItemModal;