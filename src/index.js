import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from 'components/App'
import JobForm from 'components/JobForm'
import JobDetail from 'components/JobDetail'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path=":jobId" element={<JobDetail />} />
            <Route path="job-form" element={<JobForm />} />
        </Routes>
    </BrowserRouter>
)
