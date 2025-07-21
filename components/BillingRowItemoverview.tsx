import { BillingRow } from "@/data/billingData";

type Props = {
  row: BillingRow;
};

export default function BillingRowItemoverview({ row }: Props) {
  const net = row.gross - row.discount;

  return (
    <tr className="border-t text-gray-900">
      <td className="p-2">{row.patientId}</td>
      <td className="p-2">{row.name}</td>
      <td className="p-2">{row.invoiceDate}</td>
      <td className="p-2">{row.invoiceNumber}</td>
      <td className="p-2">{row.patientType}</td>
      <td className="p-2">{row.doctor}</td>
      <td className="p-2">{row.gross.toFixed(2)}</td>
      <td className="p-2">{row.discount.toFixed(2)}</td>
      <td className="p-2">{net.toFixed(2)}</td>
    </tr>
  );
}
