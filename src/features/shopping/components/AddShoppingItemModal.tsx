import { useState } from "react";

import Modal from "../../../components/ui/Modal";

import type { SupplyItem } from "../../../types/shoppingItem";

type AddShoppingItemModalProps = {
  onClose: () => void;
  onAdd: (item: SupplyItem) => void;
};

const AddShoppingItemModal = ({
  onClose,
  onAdd,
}: AddShoppingItemModalProps) => {
  const [name, setName] = useState("");
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

    const newItem: SupplyItem = {
      id: crypto.randomUUID(),
      propertyId: "property-1",
      name: trimmedName,
      note: note.trim() || undefined,
      photoUrl,
      addedByStaffId: "staff-1",
      createdAt: new Date().toISOString(),
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <Modal
      title="Add supply"
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
              Supply name
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
                alt="Supply preview"
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
            Add supply
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddShoppingItemModal;