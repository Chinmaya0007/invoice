import { useState } from "react";
import BillingTable from "@/components/BilingTable";
import { billingData } from "@/data/billingData";

const ITEMS_PER_PAGE = 2;

export default function InvoiceList() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [filteredData, setFilteredData] = useState(billingData);
    const [currentPage, setCurrentPage] = useState(1);

    const applyFilter = () => {
        const filtered = billingData.filter((row) => {
            const invoiceDate = new Date(row.invoiceDate);
            const from = fromDate ? new Date(fromDate) : null;
            const to = toDate ? new Date(toDate) : null;

            return (
                (!from || invoiceDate >= from) &&
                (!to || invoiceDate <= to)
            );
        });

        setFilteredData(filtered);
        setCurrentPage(1); 
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-950">Invoices List</h2>

            <div className="flex items-center gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">From</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border rounded px-2 py-1 text-gray-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">To</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border rounded px-2 py-1 text-gray-600"
                    />
                </div>

                <button
                    onClick={applyFilter}
                    className="text-sm mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Apply
                </button>
            </div>

            <BillingTable data={paginatedData} />

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded text-white ${currentPage === 1
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Previous
                </button>

                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded text-white ${currentPage === totalPages
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    Next
                </button>
            </div>

        </div>
    );
}
