import { useMemo, useState } from "react";
import {
  Check,
  ShoppingBasket,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import AddShoppingItemModal from "../features/shopping/components/AddShoppingItemModal";
import AddToCartModal from "../features/shopping/components/AddToCartModal";

import {
  cartItems as initialCartItems,
  supplies as initialSupplies,
} from "../data/shoppingItems";

import { staff } from "../data/staff";

import type {
  CartItem,
  ShoppingPriority,
  SupplyItem,
} from "../types/shoppingItem";

const getPriorityClasses = (
  priority: ShoppingPriority,
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
  priority: ShoppingPriority,
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
  const [supplies, setSupplies] =
    useState<SupplyItem[]>(
      initialSupplies,
    );

  const [cartItems, setCartItems] =
    useState<CartItem[]>(
      initialCartItems,
    );

  const [
    isAddSupplyOpen,
    setIsAddSupplyOpen,
  ] = useState(false);

  const [
    selectedSupply,
    setSelectedSupply,
  ] = useState<SupplyItem | null>(
    null,
  );

  const sortedSupplies = useMemo(
    () =>
      [...supplies].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [supplies],
  );

  const handleAddSupply = (
    supply: SupplyItem,
  ) => {
    setSupplies((current) => [
      supply,
      ...current,
    ]);
  };

  const handleDeleteSupply = (
    supplyId: string,
  ) => {
    setSupplies((current) =>
      current.filter(
        (item) =>
          item.id !== supplyId,
      ),
    );

    setCartItems((current) =>
      current.filter(
        (item) =>
          item.supplyId !== supplyId,
      ),
    );
  };

  const handleAddToCart = (
    cartItem: CartItem,
  ) => {
    setCartItems((current) => {
      const alreadyExists =
        current.some(
          (item) =>
            item.supplyId ===
            cartItem.supplyId,
        );

      if (alreadyExists) {
        return current;
      }

      return [
        cartItem,
        ...current,
      ];
    });
  };

  const handleRemoveFromCart = (
    cartItemId: string,
  ) => {
    setCartItems((current) =>
      current.filter(
        (item) =>
          item.id !== cartItemId,
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
            Keep your regular supplies
            and add only what you need
            to the cart.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsAddSupplyOpen(true)
          }
          className="w-full cursor-pointer rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:w-auto"
        >
          + Add supply
        </button>
      </div>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <section className="min-w-0 overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-(--color-border) px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
                <ShoppingBasket
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h2 className="font-semibold text-(--color-text)">
                  Supplies
                </h2>

                <p className="text-xs text-(--color-text-muted)">
                  Permanent list
                </p>
              </div>
            </div>

            <span className="rounded-full bg-(--color-surface-soft) px-2.5 py-1 text-xs font-semibold text-(--color-text-muted)">
              {sortedSupplies.length}
            </span>
          </div>

          <div className="divide-y divide-(--color-border)">
            {sortedSupplies.map(
              (supply) => {
                const isInCart =
                  cartItems.some(
                    (item) =>
                      item.supplyId ===
                      supply.id,
                  );

                const addedBy =
                  staff.find(
                    (member) =>
                      member.id ===
                      supply.addedByStaffId,
                  );

                return (
                  <article
                    key={supply.id}
                    className="flex min-w-0 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5"
                  >
                    {supply.photoUrl && (
                      <img
                        src={
                          supply.photoUrl
                        }
                        alt={supply.name}
                        className="h-16 w-full shrink-0 rounded-xl object-cover sm:w-16"
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-(--color-text)">
                          {supply.name}
                        </h3>

                        {isInCart && (
                          <span className="rounded-full bg-(--color-primary-soft) px-2 py-0.5 text-xs font-semibold text-(--color-primary)">
                            In cart
                          </span>
                        )}
                      </div>

                      {supply.note && (
                        <p className="mt-1 text-sm text-(--color-text-muted)">
                          {supply.note}
                        </p>
                      )}

                      {addedBy && (
                        <p className="mt-1.5 text-xs text-(--color-text-muted)">
                          Added by{" "}
                          {
                            addedBy.firstName
                          }
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 sm:shrink-0">
                      <button
                        type="button"
                        disabled={isInCart}
                        onClick={() =>
                          setSelectedSupply(
                            supply,
                          )
                        }
                        className="flex-1 cursor-pointer rounded-xl border border-(--color-border-strong) px-3 py-2 text-sm font-medium text-(--color-text) transition hover:bg-(--color-primary-soft) disabled:cursor-default disabled:bg-(--color-surface-soft) disabled:text-(--color-text-muted) sm:flex-none"
                      >
                        {isInCart
                          ? "In cart"
                          : "Add to cart"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteSupply(
                            supply.id,
                          )
                        }
                        aria-label={`Delete ${supply.name}`}
                        className="flex size-9 cursor-pointer items-center justify-center rounded-xl text-(--color-text-muted) transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2
                          size={17}
                          strokeWidth={1.8}
                        />
                      </button>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        </section>

        <section className="min-w-0 overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-(--color-border) px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-(--color-primary-soft) text-(--color-primary)">
                <ShoppingCart
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h2 className="font-semibold text-(--color-text)">
                  Shopping Cart
                </h2>

                <p className="text-xs text-(--color-text-muted)">
                  What needs to be bought
                </p>
              </div>
            </div>

            <span className="rounded-full bg-(--color-primary-soft) px-2.5 py-1 text-xs font-semibold text-(--color-primary)">
              {cartItems.length}
            </span>
          </div>

          {cartItems.length > 0 ? (
            <div className="divide-y divide-(--color-border)">
              {cartItems.map(
                (cartItem) => {
                  const supply =
                    supplies.find(
                      (item) =>
                        item.id ===
                        cartItem.supplyId,
                    );

                  if (!supply) {
                    return null;
                  }

                  return (
                    <article
                      key={cartItem.id}
                      className="flex items-start gap-3 px-4 py-4 sm:px-5"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveFromCart(
                            cartItem.id,
                          )
                        }
                        aria-label={`Mark ${supply.name} as bought`}
                        className="mt-0.5 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md border border-(--color-border-strong) text-transparent transition hover:border-(--color-primary) hover:bg-(--color-primary-soft) hover:text-(--color-primary)"
                      >
                        <Check
                          size={15}
                          strokeWidth={2}
                        />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium text-(--color-text)">
                            {supply.name}
                          </h3>

                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getPriorityClasses(
                              cartItem.priority,
                            )}`}
                          >
                            {getPriorityLabel(
                              cartItem.priority,
                            )}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-(--color-text-muted)">
                          Quantity:{" "}
                          {
                            cartItem.quantity
                          }
                        </p>

                        {supply.note && (
                          <p className="mt-1 text-sm text-(--color-text-muted)">
                            {supply.note}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          ) : (
            <div className="px-4 py-12 text-center sm:px-5">
              <div className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-(--color-primary-soft) text-(--color-primary)">
                <Check
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-3 font-medium text-(--color-text)">
                Cart is empty
              </p>

              <p className="mt-1 text-sm text-(--color-text-muted)">
                Everything is taken care
                of.
              </p>
            </div>
          )}
        </section>
      </div>

      {isAddSupplyOpen && (
        <AddShoppingItemModal
          onClose={() =>
            setIsAddSupplyOpen(false)
          }
          onAdd={handleAddSupply}
        />
      )}

      {selectedSupply && (
        <AddToCartModal
          supply={selectedSupply}
          onClose={() =>
            setSelectedSupply(null)
          }
          onAdd={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ShoppingListPage;