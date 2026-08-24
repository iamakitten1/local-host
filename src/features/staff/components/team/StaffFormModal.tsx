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
    setWorkTypes(
      (currentWorkTypes) =>
        currentWorkTypes.includes(
          workType,
        )
          ? currentWorkTypes.filter(
              (type) =>
                type !== workType,
            )
          : [
              ...currentWorkTypes,
              workType,
            ],
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
        <div className="space-y-4 p-4 sm:p-5">
          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* First name + Last name */}
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="staff-first-name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
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
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="staff-last-name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
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
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label
                htmlFor="staff-email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
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
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>

            <div className="min-w-0">
              <label
                htmlFor="staff-phone"
                className="mb-1.5 block text-sm font-medium text-gray-700"
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
                className="w-full min-w-0 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
              />
            </div>
          </div>

          {/* Role + Status */}
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
                className="mb-1.5 block text-sm font-medium text-gray-700"
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
                className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-gray-500"
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
                    className="mb-1.5 block text-sm font-medium text-gray-700"
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
                        event.target
                          .value ===
                          "active",
                      )
                    }
                    className="w-full min-w-0 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-gray-500"
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

          {/* Work types */}
          {role !== "owner" && (
            <div className="min-w-0">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Work types
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
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
                  />

                  Cleaning
                </label>

                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
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
                  />

                  Event
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 p-4 sm:flex-row sm:justify-end sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 sm:w-auto"
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