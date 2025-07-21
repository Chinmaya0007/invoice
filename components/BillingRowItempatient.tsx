import { BillingRow } from "@/data/billingData";

type Props = {
  row: BillingRow;
};

export default function BillingRowItempatient({ row }: Props) {
  const net = row.gross - row.discount;

  return (
    <tr className="border-t text-gray-900">
      <td className="p-2">{row.invoiceDate}</td>
      <td className="p-2">{row.patientType}</td>
      <td className="p-2">{row.gross.toFixed(2)}</td>
      <td className="p-2">{row.discount.toFixed(2)}</td>
      <td className="p-2">{net.toFixed(2)}</td>
      <td className="p-2">{row.patientShare.toFixed(2)}</td>
      <td className="p-2">{row.netExcludingPatientShare.toFixed(2)}</td>
    </tr>
  );
}
