import React, { useEffect, useState } from 'react'

import { dbService } from '../firebase'
import { collection, onSnapshot, query } from '@firebase/firestore'

import Job from 'components/Job'
import { Link } from 'react-router-dom'

function App() {
    const [jobs, setJobs] = useState([])
    const [status, setStatus] = useState('all')
    const [timeStamp, setTimeStemp] = useState('Ascending')

    useEffect(() => {
        const q = query(collection(dbService, 'jobs'))

        onSnapshot(q, (snapShot) => {
            const jobsArray = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setJobs(jobsArray)
        })
    }, [status])

    const sortByTime = () => {
        timeStamp === 'Ascending'
            ? setTimeStemp('Descending')
            : setTimeStemp('Ascending')

        if (timeStamp === 'Ascending') {
            setJobs([...jobs].sort((a, b) => a.createdAt - b.createdAt))
        } else if (timeStamp === 'Descending') {
            setJobs(
                [...jobs].sort((a, b) => a.createdAt - b.createdAt).reverse()
            )
        }
    }
    const statusChangeHandler = (event) => {
        setStatus(event.target.value)
    }

    const filterByStatus = (event) => {
        event.preventDefault()
        if (status === 'all') {
            setJobs([...jobs])
        } else {
            setJobs([...jobs].filter((job) => job.status === status))
        }
    }

    return (
        <div className="container px-5 py-24 mx-auto">
            <h1 className="text-4xl text-indigo-500 text-center mb-12">
                Your Job Lists
            </h1>
            <div className="flex justify-end items-center space-x-4 mb-6">
                <h2 className="text-xl">Sort by Date</h2>
                <button onClick={sortByTime} className="button">
                    {timeStamp}
                </button>
            </div>
            <div className="flex mb-12 justify-end items-center space-x-4 ">
                <h2 className="text-xl">Filter by Status</h2>
                <form action="" onSubmit={filterByStatus} className="flex ">
                    <select
                        onChange={statusChangeHandler}
                        className="selectBox"
                        name="status"
                        id="status"
                        value={status}
                    >
                        <option value="all">All</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="active">Active</option>
                        <option value="invoicing">Invoicing</option>
                        <option value="to priced">To Priced</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button className="button" type="submit">
                        Select
                    </button>
                </form>
            </div>
            <Link to="/job-form" className="addNewBtn">
                Add New Job
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-5 mt-12">
                {jobs.map((job) => (
                    <Job key={job.id} jobObj={job} />
                ))}
            </div>
        </div>
    )
}

export default App
