import { useHoursPayContext } from "../context/HoursPayContext";

import type { PaymentRecord } from "../../../types/payment";

type RecordPaymentInput = {
  propertyId: string;
  staffId: string;
  amount: number;
  paidAt: string;
  note?: string;
};

const roundMoney = (value: number) =>
  Math.round(
    (value + Number.EPSILON) * 100,
  ) / 100;

const usePayments = () => {
  const {
    workSessionList,
    paymentList,
    setPaymentList,
  } = useHoursPayContext();

  const recordPayment = ({
    propertyId,
    staffId,
    amount,
    paidAt,
    note,
  }: RecordPaymentInput) => {
    if (amount <= 0) {
      return {
        success: false,
        error:
          "Payment amount must be greater than zero.",
      };
    }

    if (!paidAt) {
      return {
        success: false,
        error:
          "Payment date is required.",
      };
    }

    const trimmedNote =
      note?.trim();

    const newPayment: PaymentRecord = {
      id: `payment-${Date.now()}`,
      propertyId,
      staffId,
      amount: roundMoney(amount),
      paidAt,
      ...(trimmedNote
        ? { note: trimmedNote }
        : {}),
    };

    setPaymentList(
      (currentPayments) => [
        ...currentPayments,
        newPayment,
      ],
    );

    return {
      success: true,
      error: null,
    };
  };

  const getStaffPaymentSummary = (
    staffId: string,
  ) => {
    const totalEarned =
      workSessionList
        .filter(
          (session) =>
            session.staffId === staffId &&
            session.status ===
              "completed",
        )
        .reduce(
          (total, session) =>
            total +
            session.earnedAmount,
          0,
        );

        const totalPaid =
        paymentList
          .filter(
            (payment: PaymentRecord) =>
              payment.staffId === staffId,
          )
          .reduce(
            (
              total: number,
              payment: PaymentRecord,
            ) => total + payment.amount,
            0,
          );

    const balance = roundMoney(
      totalEarned - totalPaid,
    );

    return {
      totalEarned:
        roundMoney(totalEarned),

      totalPaid:
        roundMoney(totalPaid),

      balance,

      amountDue:
        balance > 0
          ? balance
          : 0,

      credit:
        balance < 0
          ? Math.abs(balance)
          : 0,
    };
  };

  const getStaffPayments = (
    staffId: string,
  ) =>
    paymentList
      .filter(
        (payment: PaymentRecord) =>
          payment.staffId === staffId,
      )
      .sort(
        (
          a: PaymentRecord,
          b: PaymentRecord,
        ) =>
          b.paidAt.localeCompare(
            a.paidAt,
          ),
      );

  return {
    paymentList,
    recordPayment,
    getStaffPaymentSummary,
    getStaffPayments,
  };
};

export default usePayments;