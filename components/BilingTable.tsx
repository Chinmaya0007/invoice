import { generateInvoicePDF } from "@/utils/pdf";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { BillingRow } from "@/data/billingData";
import BillingTableRow from "./BillingTableRow";

type Props = {
    data: BillingRow[];
};

export default function BillingTable({ data }: Props) {
    const [selectedRow, setSelectedRow] = useState<BillingRow | null>(null);
    const invoiceRef = useRef<HTMLDivElement>(null);

    const handleInvoiceClick = (row: BillingRow) => {
        generateInvoicePDF(row);
    };

    const totals = data.reduce(
        (acc, row) => {
            const net = row.gross - row.discount;
            acc.gross += row.gross;
            acc.discount += row.discount;
            acc.net += net;
            acc.patientShare += row.patientShare;
            acc.netExcludingPatientShare += row.netExcludingPatientShare;
            return acc;
        },
        {
            gross: 0,
            discount: 0,
            net: 0,
            patientShare: 0,
            netExcludingPatientShare: 0,
        }
    );

    return (
        <>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left text-gray-900 rounded-lg border-collapse">
                    <thead className="bg-gray-100 rounded-t-lg">
                        <tr className="divide-x divide-gray-200">
                            <th className="p-3">S.No</th>
                            <th className="p-3">Invoice #</th>
                            <th className="p-3">Invoice Date</th>
                            <th className="p-3">Patient Name</th>
                            <th className="p-3">Doctor</th>
                            <th className="p-3">Gross Amount ($)</th>
                            <th className="p-3">Discount ($)</th>
                            <th className="p-3">Patient Share ($)</th>
                            <th className="p-3">Tax Amount ($)</th>
                            <th className="p-3">Net Bill ($)</th>
                            <th className="p-3">Invoice Due ($)</th>
                            <th className="p-3">Invoice Status</th>
                            <th className="p-3">Billed by</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((row, i) => (
                            <BillingTableRow
                                key={row.invoiceNumber}
                                row={row}
                                index={i}
                                onInvoiceClick={handleInvoiceClick}
                            />
                        ))}
                        <tr className="font-semibold bg-gray-50 divide-x divide-gray-200">
                            <td className="p-3">Total</td>
                            <td className="p-3">-</td>
                            <td className="p-3">-</td>
                            <td className="p-3">-</td>
                            <td className="p-3">-</td>
                            <td className="p-3">{totals.gross.toFixed(2)}</td>
                            <td className="p-3">{totals.discount.toFixed(2)}</td>
                            <td className="p-3">{totals.net.toFixed(2)}</td>
                            <td className="p-3">{totals.patientShare.toFixed(2)}</td>
                            <td className="p-3">{totals.netExcludingPatientShare.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
