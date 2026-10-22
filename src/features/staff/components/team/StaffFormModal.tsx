import { useState } from "react";

import Modal from "../../../../components/ui/Modal";

import type {
  Staff,
  StaffRole,
  StaffWorkType,
} from "../../../../types/staff";

type StaffFormModalProps = {
  member?: Staff;
  onClose: () => void;
  onSubmit: (member: Staff) => void;
};

const fieldClasses =
  "w-full min-w-0 rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-3 py-2.5 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary-muted) focus:ring-2 focus:ring-(--color-primary-soft)";

const StaffFormModal = ({
  member,
  onClose,
  onSubmit,
}: StaffFormModalProps) => {
  const isEditing = Boolean(member);

  const [firstName, setFirstName] =
    useState(member?.firstName ?? "");

  const [lastName, setLastName] =
    useState(member?.lastName ?? "");

  const [email, setEmail] =
    useState(member?.email ?? "");

  const [phone, setPhone] =
    useState(member?.phone ?? "");

  const [role, setRole] =
    useState<StaffRole>(
      member?.role ?? "staff",
    );

  const [workTypes, setWorkTypes] =
    useState<StaffWorkType[]>(
      member?.workTypes ?? [],
    );

  const [isActive, setIsActive] =
    useState(member?.isActive ?? true);

  const [error, setError] =
    useState("");

  const handleWorkTypeChange = (
    workType: StaffWorkType,
  ) => {
    setWorkTypes((currentWorkTypes) =>
      currentWorkTypes.includes(workType)
        ? currentWorkTypes.filter(
            (type) => type !== workType,
          )
        : [...currentWorkTypes, workType],
    );
  };

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim()
    ) {
      setError(
        "Please fill in all required fields.",
      );
      return;
    }

    if (
      role !== "owner" &&
      workTypes.length === 0
    ) {
      setError(
        "Please select at least one work type.",
      );
      return;
    }

    setError("");

    const staffMember: Staff = {
      id:
        member?.id ??
        `staff-${Date.now()}`,

      propertyId:
        member?.propertyId ??
        "property-1",

      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),

      phone:
        phone.trim() || undefined,

      role,

      workTypes:
        role === "owner"
          ? []
          : workTypes,

      isActive:
        role === "owner"
          ? true
          : isActive,
    };

    onSubmit(staffMember);
    onClose();
  };

  return (
    <Modal
      title={
        isEditing
          ? "Edit Staff Member"
          : "Add Staff Member"
      }
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="min-w-0"
      >
        <div className="space-y-5 p-4 sm:p-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="staff-first-name"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                First name
              </label>

              <input
                id="staff-first-name"
                type="text"
                value={firstName}
                onChange={(event) =>
                  setFirstName(
                    event.target.value,
                  )
                }
                className={fieldClasses}
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="staff-last-name"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Last name
              </label>

              <input
                id="staff-last-name"
                type="text"
                value={lastName}
                onChange={(event) =>
                  setLastName(
                    event.target.value,
                  )
                }
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="staff-email"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Email
              </label>

              <input
                id="staff-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
                className={fieldClasses}
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="staff-phone"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Phone
              </label>

              <input
                id="staff-phone"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(
                    event.target.value,
                  )
                }
                className={fieldClasses}
              />
            </div>
          </div>

          <div
            className={`grid min-w-0 grid-cols-1 gap-4 ${
              isEditing &&
              role !== "owner"
                ? "sm:grid-cols-2"
                : ""
            }`}
          >
            <div className="min-w-0">
              <label
                htmlFor="staff-role"
                className="mb-1.5 block text-sm font-medium text-(--color-text)"
              >
                Role
              </label>

              <select
                id="staff-role"
                value={role}
                onChange={(event) =>
                  setRole(
                    event.target
                      .value as StaffRole,
                  )
                }
                className={`${fieldClasses} cursor-pointer`}
              >
                <option value="staff">
                  Staff
                </option>

                <option value="operations">
                  Operations
                </option>

                <option value="owner">
                  Owner
                </option>
              </select>
            </div>

            {isEditing &&
              role !== "owner" && (
                <div className="min-w-0">
                  <label
                    htmlFor="staff-status"
                    className="mb-1.5 block text-sm font-medium text-(--color-text)"
                  >
                    Status
                  </label>

                  <select
                    id="staff-status"
                    value={
                      isActive
                        ? "active"
                        : "inactive"
                    }
                    onChange={(event) =>
                      setIsActive(
                        event.target.value ===
                          "active",
                      )
                    }
                    className={`${fieldClasses} cursor-pointer`}
                  >
                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>
                  </select>
                </div>
              )}
          </div>

          {role !== "owner" && (
            <div className="min-w-0">
              <p className="mb-2 text-sm font-medium text-(--color-text)">
                Work types
              </p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    workTypes.includes(
                      "cleaning",
                    )
                      ? "border-(--color-primary-muted) bg-(--color-primary-soft)"
                      : "border-(--color-border) bg-(--color-surface) hover:bg-(--color-surface-soft)"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={workTypes.includes(
                      "cleaning",
                    )}
                    onChange={() =>
                      handleWorkTypeChange(
                        "cleaning",
                      )
                    }
                    className="size-4 accent-(--color-primary)"
                  />

                  <span className="text-sm font-medium text-(--color-text)">
                    Cleaning
                  </span>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    workTypes.includes(
                      "event",
                    )
                      ? "border-(--color-primary-muted) bg-(--color-primary-soft)"
                      : "border-(--color-border) bg-(--color-surface) hover:bg-(--color-surface-soft)"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={workTypes.includes(
                      "event",
                    )}
                    onChange={() =>
                      handleWorkTypeChange(
                        "event",
                      )
                    }
                    className="size-4 accent-(--color-primary)"
                  />

                  <span className="text-sm font-medium text-(--color-text)">
                    Event
                  </span>
                </label>
              </div>
            </div>
          )}
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
            {isEditing
              ? "Save Changes"
              : "Add Staff"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StaffFormModal;