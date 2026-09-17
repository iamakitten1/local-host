export type PaymentRecord = {
    id: string;
    propertyId: string;
    staffId: string;
  
    amount: number;
    paidAt: string;
  
    note?: string;
  };