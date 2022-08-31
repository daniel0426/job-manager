import React from 'react'
import { useNavigate } from 'react-router-dom'

function Job({ jobObj }) {
    let navigate = useNavigate()
    const navigateHandler = () => {
        navigate(`${jobObj.id}`)
    }

    const time = new Date(jobObj.createdAt).toLocaleString('en-NZ', {
        timeZone: 'Pacific/Auckland',
    })
    return (
        <div
            onClick={navigateHandler}
            className="space-y-4 flex flex-col justify-between bg-gray-100 bg-opacity-75 px-8 py-8 rounded-lg hover:bg-gray-200 transition cursor-pointer"
        >
            <div>
                <h4 className="subHeading">Job ID </h4>
                <p>#{jobObj.id}</p>
            </div>

            <div className="flex-1">
                <h4 className="subHeading">Notes</h4>
                <ul>
                    {jobObj.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            </div>
            <p className="status">{jobObj.status}</p>
            <div>
                <h4 className="subHeading">Created At</h4>
                <p>{time}</p>
            </div>
        </div>
    )
}

export default Job
