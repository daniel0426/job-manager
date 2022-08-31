import React, { useState } from 'react'

import { dbService } from '../firebase'
import { addDoc, collection } from '@firebase/firestore'

import { Link, useNavigate } from 'react-router-dom'

function JobForm() {
    let navigate = useNavigate()

    const [note, setNote] = useState('')
    const [notes, setNotes] = useState([])

    const [formState, setFormState] = useState({
        customerName: '',
        customerContact: '',
        status: '',
    })

    const inputChangeHandler = (event) => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const noteChangeHandler = (event) => {
        setNote(event.target.value)
        setNotes([event.target.value])
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        try {
            const jobObj = {
                ...formState,
                notes,
                createdAt: Date.now(),
            }

            await addDoc(collection(dbService, 'jobs'), jobObj)

            setFormState({
                customerName: '',
                customerContact: '',
                status: '',
            })
            setNote('')
            navigate('/')
        } catch (error) {
            console.log('Error adding document', error)
        }
    }

    return (
        <div className="container px-5 py-24 mx-auto ">
            <Link to="/" className="navigate">
                Back to Job Lists
            </Link>
            <form
                onSubmit={submitHandler}
                className="lg:w-1/2 md:w-1/2  space-y-4 mx-auto bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-24 md:mt-12 relative z-10 shadow-md "
            >
                <div>
                    <label htmlFor="customerName" className="label">
                        Customer Name
                    </label>
                    <input
                        onChange={inputChangeHandler}
                        className="input"
                        name="customerName"
                        type="text"
                        id="customerName"
                        value={formState.customerName}
                        placeholder="Type customer name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="customerContact" className="label">
                        Customer Contact Info
                    </label>
                    <input
                        onChange={inputChangeHandler}
                        className="input"
                        name="customerContact"
                        type="text"
                        id="customerContact"
                        value={formState.customerContact}
                        placeholder="Type customer contact info"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Status" className="label">
                        Status
                    </label>
                    <select
                        onChange={inputChangeHandler}
                        className="selectBox"
                        name="status"
                        id="Status"
                        value={formState.status}
                        required
                    >
                        <option value="scheduled">scheduled</option>
                        <option value="active">active</option>
                        <option value="invoicing">invoicing</option>
                        <option value="to priced">to priced</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="note" className="label">
                        Notes
                    </label>
                    <input
                        type="text"
                        className="input"
                        id="note"
                        name="note"
                        onChange={noteChangeHandler}
                        value={note}
                    />
                </div>
                <button type="submit" className="button">
                    Add Job
                </button>
            </form>
        </div>
    )
}

export default JobForm
