import { useState } from "react";

import Modal from "../../../components/ui/Modal";

import type {
  CartItem,
  ShoppingPriority,
  SupplyItem,
} from "../../../types/shoppingItem";

type AddToCartModalProps = {
  supply: SupplyItem;
  onClose: () => void;
  onAdd: (item: CartItem) => void;
};

const AddToCartModal = ({
  supply,
  onClose,
  onAdd,
}: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [priority, setPriority] =
    useState<ShoppingPriority>("normal");

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    onAdd({
      id: crypto.randomUUID(),
      supplyId: supply.id,
      quantity,
      priority,
      addedAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <Modal
      title={`Add ${supply.name}`}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-4 p-4 sm:p-5">
          <div>
            <label
              htmlFor="cart-quantity"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Quantity
            </label>

            <input
              id="cart-quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) =>
                setQuantity(
                  Math.max(
                    1,
                    Number(event.target.value),
                  ),
                )
              }
              className="w-full rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)"
            />
          </div>

          <div>
            <label
              htmlFor="cart-priority"
              className="mb-1.5 block text-sm font-medium text-(--color-text)"
            >
              Priority
            </label>

            <select
              id="cart-priority"
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target
                    .value as ShoppingPriority,
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
            Add to cart
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddToCartModal;