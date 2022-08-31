import { useEffect, useState } from 'react'

import { arrayUnion, doc, onSnapshot, updateDoc } from '@firebase/firestore'
import {
    CheckCircleIcon,
    PencilAltIcon,
    ReplyIcon,
} from '@heroicons/react/outline'
import Note from 'components/Note'
import { Link, useParams } from 'react-router-dom'
import { dbService } from '../firebase'

function JobDetail() {
    let { jobId } = useParams()
    const [newNote, setNewNote] = useState('')
    const [jobDetail, setJobDetail] = useState()
    const [changeStatus, setChangeStatus] = useState('')
    const [editing, setEditing] = useState(false)

    const docRef = doc(dbService, 'jobs', `${jobId}`)

    useEffect(() => {
        onSnapshot(docRef, (doc) => {
            let job = doc.data()
            setJobDetail(job)
        })
    }, [jobId])

    const toggleEditing = () => {
        setEditing((prev) => !prev)
    }

    const inputChangeHandler = (event) => {
        setNewNote(event.target.value)
    }

    const statusChangeHandler = (event) => {
        setChangeStatus(event.target.value)
    }

    const addNote = async (event) => {
        event.preventDefault()
        await updateDoc(docRef, {
            notes: arrayUnion(newNote),
        })
        setNewNote('')
    }

    const editStatus = async (event) => {
        event.preventDefault()
        await updateDoc(docRef, { status: changeStatus })
        setEditing(false)
    }
    const generateTime = (value) => {
        const time = new Date(value).toLocaleString('en-NZ', {
            timeZone: 'Pacific/Auckland',
        })
        return time
    }

    if (jobDetail)
        return (
            <div className="container px-5 py-12 mx-auto">
                <Link to="/" className="navigate">
                    Back to Job Lists
                </Link>
                <h1 className="text-3xl text-indigo-500 text-center my-8 uppercase">
                    Job Detail
                </h1>
                <div className="w-3/4 md:w-2/3   space-y-4 mx-auto bg-white rounded-lg p-8 flex flex-col md:ml-auto mt-24 md:mt-12 relative z-10 shadow-md ">
                    <div className="flex justify-between">
                        <p className="label">Job ID </p>
                        <p>#{jobId}</p>
                    </div>
                    <div className="">
                        {editing ? (
                            <div className="flex justify-between items-center">
                                <form action="">
                                    <select
                                        onChange={statusChangeHandler}
                                        name="changeStatus"
                                        className="selectBox"
                                        id="changeStatus"
                                        value={changeStatus}
                                        required
                                    >
                                        <option value="scheduled">
                                            scheduled
                                        </option>
                                        <option value="active">active</option>
                                        <option value="invoicing">
                                            invoicing
                                        </option>
                                        <option value="to priced">
                                            to priced
                                        </option>
                                        <option value="completed">
                                            completed
                                        </option>
                                    </select>
                                </form>
                                <div className="flex">
                                    <CheckCircleIcon
                                        onClick={editStatus}
                                        className="h-7 w-7 text-indigo-500"
                                    />
                                    <ReplyIcon
                                        className="h-7 w-7 text-indigo-500 ml-2"
                                        onClick={toggleEditing}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="">
                                <p className="label">Status </p>
                                <div className="flex justify-between items-center">
                                    <p className="status">
                                        {' '}
                                        {jobDetail.status}
                                    </p>
                                    <PencilAltIcon
                                        onClick={toggleEditing}
                                        className="h-6 w-6 text-indigo-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <p className="label">Customer Name </p>
                        <p>{jobDetail.customerName}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="label">Customer Info </p>
                        <p>{jobDetail.customerContact}</p>
                    </div>
                    <div className="">
                        <p className="label">Notes </p>
                        <ul>
                            {jobDetail.notes.map((note, index) => (
                                <Note key={index} jobId={jobId} note={note} />
                            ))}
                        </ul>
                    </div>
                    <form action="" onSubmit={addNote} className="space-y-4">
                        <input
                            type="text"
                            name="newNote"
                            value={newNote}
                            className="input"
                            onChange={inputChangeHandler}
                            placeholder="Write additional note!"
                        />
                        <button className="addNewBtn w-full" type="submit">
                            Add Note
                        </button>
                    </form>
                    <div className="flex justify-between items-center">
                        <p className="label">Created at </p>
                        <p>{generateTime(jobDetail.createdAt)}</p>
                    </div>
                </div>
            </div>
        )
}

export default JobDetail
