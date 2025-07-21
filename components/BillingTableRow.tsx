import { BillingRow } from "@/data/billingData";

type Props = {
  row: BillingRow;
  index: number;
  onInvoiceClick: (row: BillingRow) => void;
};

export default function BillingTableRow({ row, index, onInvoiceClick }: Props) {
  const netBill = row.gross - row.discount + row.patientShare + row.taxAmount;
  const invoiceStatus = row.invoiceDue === 0 ? "Paid" : "Unpaid";

  return (
    <tr className="text-gray-900 divide-x divide-gray-100">
      <td className="p-3">{index + 1}</td>
      <td
        className="p-3 text-blue-600 underline cursor-pointer"
        onClick={() => onInvoiceClick(row)}
      >
        {row.invoiceNumber}
      </td>
      <td className="p-3">{row.invoiceDate}</td>
      <td className="p-3">{row.name}</td>
      <td className="p-3">{row.doctor}</td>
      <td className="p-3">{row.gross.toFixed(2)}</td>
      <td className="p-3">{row.discount.toFixed(2)}</td>
      <td className="p-3">{row.patientShare.toFixed(2)}</td>
      <td className="p-3">{row.taxAmount.toFixed(2)}</td>
      <td className="p-3">{netBill.toFixed(2)}</td>
      <td className="p-3">{row.invoiceDue.toFixed(2)}</td>
      <td className="p-3 font-semibold">
        <span className={invoiceStatus === "Paid" ? "text-green-600" : "text-red-600"}>
          {invoiceStatus}
        </span>
      </td>
      <td className="p-3">{row.billedBy}</td>
    </tr>
  );
}
