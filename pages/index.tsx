import Details from '@/components/Details';
import BillingDashboard from '@/layouts/BillingDashboard';
import InvoiceList from '@/layouts/InvoiceList';
import React from 'react'

function index() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen p-4 sm:p-6 md:p-10 max-w-screen-xl mx-auto space-y-6">
      <Details />
      <BillingDashboard />
      <InvoiceList/>
    </div>
  )
}

export default index;
