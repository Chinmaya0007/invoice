import React from 'react'

function Details() {
    return (
        <header className="bg-[#009688] text-white p-4 rounded">
            <h1 className="text-3xl font-bold">A1 Hospital</h1>
            <p className="text-sm">
                123 Main Street, Cityville, State, 123456<br />
                Contact: +1 (555) 123-4567 | Website: <a className="underline" href="#">www.A1hospital.com</a><br />
                Appointment Line: +1 (555) 000-1234
            </p>
        </header>
    )
}

export default Details
