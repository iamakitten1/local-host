import { useState } from "react";

import type {
  Staff,
  StaffRole,
  StaffWorkType,
} from "../../../../types/staff";

import Modal from "../../../../components/ui/Modal";

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

  const [firstName, setFirstName] = useState(
    member?.firstName ?? "",
  );

  const [lastName, setLastName] = useState(
    member?.lastName ?? "",
  );

  const [email, setEmail] = useState(
    member?.email ?? "",
  );

  const [phone, setPhone] = useState(
    member?.phone ?? "",
  );

  const [role, setRole] = useState<StaffRole>(
    member?.role ?? "staff",
  );

  const [workTypes, setWorkTypes] = useState<
    StaffWorkType[]
  >(member?.workTypes ?? []);

  const [isActive, setIsActive] = useState(
    member?.isActive ?? true,
  );

  const [error, setError] = useState("");

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
        className="space-y-4 p-5"
      >
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            First name
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(event) =>
              setFirstName(
                event.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Last name
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(event) =>
              setLastName(
                event.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Phone
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(
                event.target.value,
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Role
          </label>

          <select
            value={role}
            onChange={(event) =>
              setRole(
                event.target
                  .value as StaffRole,
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
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

        {role !== "owner" && (
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Work types
            </p>

            <div className="flex flex-wrap gap-4">
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

        {isEditing &&
          role !== "owner" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
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

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
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