export type BillingRow = {
  patientId: string;
  name: string;
  invoiceDate: string;
  invoiceNumber: string;
  patientType: string;
  doctor: string;
  gross: number;
  discount: number;
  patientShare: number;
  netExcludingPatientShare: number;
  taxAmount: number;
  invoiceDue: number;
  billedBy: string;
};

export const billingData: BillingRow[] = [
  {
    patientId: "P-1001",
    name: "John Doe",
    invoiceDate: "2025-07-09",
    invoiceNumber: "INV-001",
    patientType: "Cash Patient",
    doctor: "Dr. Smith",
    gross: 2000,
    discount: 200,
    patientShare: 100,
    netExcludingPatientShare: 1700,
    taxAmount: 50,
    invoiceDue: 0,
    billedBy: "Alice"
  },
  {
    patientId: "P-1002",
    name: "Jane Smith",
    invoiceDate: "2025-07-08",
    invoiceNumber: "INV-002",
    patientType: "Insurance Patient",
    doctor: "Dr. Patel",
    gross: 2500,
    discount: 300,
    patientShare: 150,
    netExcludingPatientShare: 2050,
    taxAmount: 70,
    invoiceDue: 80,
    billedBy: "Bob"
  },
  {
    patientId: "P-1003",
    name: "Bob Johnson",
    invoiceDate: "2025-07-07",
    invoiceNumber: "INV-003",
    patientType: "Corporate",
    doctor: "Dr. Adams",
    gross: 1800,
    discount: 150,
    patientShare: 120,
    netExcludingPatientShare: 1530,
    taxAmount: 60,
    invoiceDue: 0,
    billedBy: "Carol"
  }
];
