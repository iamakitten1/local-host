import { useMemo, useState } from "react";

import AddShoppingItemModal from "../features/shopping/components/AddShoppingItemModal";

import { shoppingItems as initialShoppingItems } from "../data/shoppingItems";
import { staff } from "../data/staff";

import type {
  ShoppingItem,
  ShoppingItemPriority,
} from "../types/shoppingItem";

const getPriorityClasses = (
  priority: ShoppingItemPriority,
) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-700";

    case "buy-soon":
      return "bg-amber-100 text-amber-700";

    case "normal":
      return "bg-(--color-primary-soft) text-(--color-primary)";
  }
};

const getPriorityLabel = (
  priority: ShoppingItemPriority,
) => {
  switch (priority) {
    case "urgent":
      return "Urgent";

    case "buy-soon":
      return "Buy soon";

    case "normal":
      return "Normal";
  }
};

const ShoppingListPage = () => {
  const [items, setItems] =
    useState<ShoppingItem[]>(
      initialShoppingItems,
    );

  const [
    isAddModalOpen,
    setIsAddModalOpen,
  ] = useState(false);

  const activeItems = useMemo(
    () =>
      items.filter(
        (item) => !item.isBought,
      ),
    [items],
  );

  const handleAddItem = (
    item: ShoppingItem,
  ) => {
    setItems((currentItems) => [
      item,
      ...currentItems,
    ]);
  };

  const handleMarkBought = (
    itemId: string,
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isBought: true,
            }
          : item,
      ),
    );
  };

  const handleDelete = (
    itemId: string,
  ) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== itemId,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-(--color-primary-muted)">
            Property supplies
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-(--color-text)">
            Shopping List
          </h1>

          <p className="mt-1 text-sm text-(--color-text-muted)">
            Keep track of supplies the
            property needs.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddModalOpen(true)
          }
          className="w-full cursor-pointer rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
        >
          Add item
        </button>
      </div>

      <section className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm">
        <div className="border-b border-(--color-border) px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold text-(--color-text)">
              Needed items
            </h2>

            <span className="rounded-full bg-(--color-primary-soft) px-2.5 py-1 text-xs font-semibold text-(--color-primary)">
              {activeItems.length}
            </span>
          </div>
        </div>

        {activeItems.length > 0 ? (
          <div className="divide-y divide-(--color-border)">
            {activeItems.map((item) => {
              const addedBy =
                staff.find(
                  (member) =>
                    member.id ===
                    item.addedByStaffId,
                );

              return (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-5"
                >
                  {item.photoUrl && (
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      className="h-20 w-full shrink-0 rounded-xl object-cover sm:w-24"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-(--color-text)">
                        {item.name}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClasses(
                          item.priority,
                        )}`}
                      >
                        {getPriorityLabel(
                          item.priority,
                        )}
                      </span>
                    </div>

                    {item.note && (
                      <p className="mt-1 text-sm text-(--color-text-muted)">
                        {item.note}
                      </p>
                    )}

                    {addedBy && (
                      <p className="mt-2 text-xs text-(--color-text-muted)">
                        Added by{" "}
                        {addedBy.firstName}{" "}
                        {addedBy.lastName}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 sm:shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleMarkBought(
                          item.id,
                        )
                      }
                      className="flex-1 cursor-pointer rounded-xl border border-(--color-border-strong) px-3 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-surface-soft) sm:flex-none"
                    >
                      Bought
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          item.id,
                        )
                      }
                      className="flex-1 cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:flex-none"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="px-4 py-12 text-center sm:px-5">
            <p className="font-medium text-(--color-text)">
              Nothing to buy
            </p>

            <p className="mt-1 text-sm text-(--color-text-muted)">
              The shopping list is
              currently empty.
            </p>
          </div>
        )}
      </section>

      {isAddModalOpen && (
        <AddShoppingItemModal
          onClose={() =>
            setIsAddModalOpen(false)
          }
          onAdd={handleAddItem}
        />
      )}
    </div>
  );
};

export default ShoppingListPage;