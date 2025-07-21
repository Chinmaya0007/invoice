import React, { useState } from "react";
import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Select, SelectItem } from "@/components/Select";
import { CalendarIcon } from "lucide-react";
import { billingData as allBillingData, BillingRow } from "@/data/billingData";
import BillingRowItempatient from "@/components/BillingRowItempatient";
import BillingRowItemoverview from "@/components/BillingRowItemoverview";

const patientTypes = ["All", "Cash Patient", "Insurance Patient", "Corporate", "Charity", "Other"];

export default function BillingDashboard() {
    const [fromDate, setFromDate] = useState("2025-07-01");
    const [toDate, setToDate] = useState("2025-07-31");
    const [selectedType, setSelectedType] = useState("All");
    const [filteredData, setFilteredData] = useState<BillingRow[]>(allBillingData);
    const [activeTab, setActiveTab] = useState("overview");

    const handleFilter = () => {
        const filtered = allBillingData.filter((row) => {
            const rowDate = new Date(row.invoiceDate);
            const from = new Date(fromDate);
            const to = new Date(toDate);
            const matchesType = selectedType === "All" || row.patientType === selectedType;
            return rowDate >= from && rowDate <= to && matchesType;
        });
        setFilteredData(filtered);
    };

    const totals = filteredData.reduce(
        (acc, row) => {
            const net = row.gross - row.discount;
            acc.gross += row.gross;
            acc.discount += row.discount;
            acc.net += net;
            acc.patientShare += row.patientShare || 0;
            return acc;
        },
        { gross: 0, discount: 0, net: 0, patientShare: 0 }
    );


    const netExclPatientShare = totals.net - totals.patientShare;

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex space-x-6 border-b w-full md:w-auto">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`pb-2 ${activeTab === "overview" ? "text-[#009688] border-b-2 border-[#009688] font-medium" : "text-gray-500"}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab("patientWise")}
                        className={`pb-2 ${activeTab === "patientWise" ? "text-[#009688] border-b-2 border-[#009688] font-medium" : "text-gray-500"}`}
                    >
                        Patient-Wise
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto text-gray-500">
                    <label className="text-sm font-medium text-gray-700">Filter by Patient Type:</label>
                    <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        {patientTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
                <label className="text-sm text-gray-600">From:</label>
                <div className="flex items-center border rounded px-2 py-1">
                    <CalendarIcon className="w-4 h-4 text-gray-500 mr-2" />
                    <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border-0 p-0 text-gray-500" />
                </div>

                <label className="text-sm text-gray-600">To:</label>
                <div className="flex items-center border rounded px-2 py-1">
                    <CalendarIcon className="w-4 h-4 text-gray-500 mr-2" />
                    <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border-0 p-0 text-gray-500" />
                </div>

                <Button onClick={handleFilter} className="bg-[#009688] hover:bg-teal-700 text-white p-1.5 rounded-sm text-sm">
                    Apply Filter
                </Button>
            </div>

            <Card>
                <CardContent className="p-4 space-y-2 text-sm text-gray-700">
                    <p>Total Gross: <span className="float-right font-medium">${totals.gross.toFixed(2)}</span></p>
                    <p>Total Discount: <span className="float-right font-medium">${totals.discount.toFixed(2)}</span></p>
                    <p>Total Net (after Discount): <span className="float-right font-medium">${totals.net.toFixed(2)}</span></p>
                    <p>Total Patient Share: <span className="float-right font-medium">${totals.patientShare.toFixed(2)}</span></p>
                    <p className="font-semibold text-gray-900">
                        Total Net (excluding Patient Share): <span className="float-right">${netExclPatientShare.toFixed(2)}</span>
                    </p>
                </CardContent>
            </Card>
            {activeTab === "overview" && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border mt-4 bg-white">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-2">Patient ID</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Invoice Date</th>
                                <th className="p-2">Invoice Number</th>
                                <th className="p-2">Patient Type</th>
                                <th className="p-2">Doctor</th>
                                <th className="p-2">Gross ($)</th>
                                <th className="p-2">Discount ($)</th>
                                <th className="p-2">Net ($)</th>
                            </tr>

                        </thead>
                        <tbody>
                            {filteredData.map((row, idx) => (
                                <BillingRowItemoverview key={idx} row={row} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {activeTab === "patientWise" && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border mt-4 bg-white">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-2">Period</th>
                                <th className="p-2">Patient Type</th>
                                <th className="p-2">Gross ($)</th>
                                <th className="p-2">Discount ($)</th>
                                <th className="p-2">Net (after Discount) ($)</th>
                                <th className="p-2">Patient Share ($)</th>
                                <th className="p-2">Net (excluding Patient Share) ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, idx) => (
                                <BillingRowItempatient key={idx} row={row} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}