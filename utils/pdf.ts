import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BillingRow } from "@/data/billingData";

export const generateInvoicePDF = (row: BillingRow) => {
  const doc = new jsPDF();

  const netBill =
    row.gross - row.discount + row.patientShare + row.taxAmount;
  const isPaid = row.invoiceDue === 0;

  doc.setFontSize(18);
  doc.text("MEDICARE CLINIC", 20, 20);
  doc.setFontSize(11);
  doc.text("123 Health Street, Wellness City", 20, 28);
  doc.text("Email: contact@medicare.com", 20, 34);

  doc.setFontSize(14);
  doc.text("INVOICE", 150, 20);
  doc.setFontSize(11);
  doc.text(`Invoice #: ${row.invoiceNumber}`, 150, 28);
  doc.text(`Date: ${row.invoiceDate}`, 150, 34);

  doc.setFontSize(12);
  doc.text("Patient Details:", 20, 50);
  doc.setFontSize(10);
  doc.text(`Name: ${row.name}`, 20, 58);
  doc.text(`Patient ID: ${row.patientId}`, 20, 64);
  doc.text(`Patient Type: ${row.patientType}`, 20, 70);
  doc.text(`Doctor: ${row.doctor}`, 20, 76);

  autoTable(doc, {
    startY: 90,
    head: [["Description", "Amount ($)"]],
    body: [
      ["Gross Charges", row.gross.toFixed(2)],
      ["Discount", `- ${row.discount.toFixed(2)}`],
      ["Patient Share", `+ ${row.patientShare.toFixed(2)}`],
      ["Tax", `+ ${row.taxAmount.toFixed(2)}`],
      ["Net Bill", netBill.toFixed(2)],
    ],
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(10);
  doc.text(`Amount Due: $${row.invoiceDue.toFixed(2)}`, 20, finalY);
  doc.text(`Status: ${isPaid ? "Paid" : "Unpaid"}`, 20, finalY + 6);
  doc.text(`Billed By: ${row.billedBy}`, 20, finalY + 12);

  doc.setFontSize(9);
  doc.text(
    "Thank you for choosing Medicare Clinic. Get well soon!",
    20,
    finalY + 24
  );

  doc.output("dataurlnewwindow");
};
