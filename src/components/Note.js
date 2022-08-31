import { useState } from 'react'

import { dbService } from '../firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from '@firebase/firestore'

import {
    CheckCircleIcon,
    PencilAltIcon,
    ReplyIcon,
} from '@heroicons/react/outline'

function Note({ jobId, note }) {
    const [changeNote, setChangeNote] = useState(note)
    const [editing, setEditing] = useState(false)
    const docRef = doc(dbService, 'jobs', `${jobId}`)

    const editNote = async (event) => {
        event.preventDefault()
        if (changeNote === note) {
            return
        }
        await updateDoc(docRef, {
            notes: arrayRemove(`${note}`),
        })
        await updateDoc(docRef, {
            notes: arrayUnion(`${changeNote}`),
        })
        setEditing(false)
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev)
    }

    const noteChangeHandler = (event) => {
        setChangeNote(event.target.value)
    }

    return (
        <div>
            {editing ? (
                <div className="flex justify-between items-center mb-4">
                    <form action="">
                        <input
                            type="text"
                            placeholder="Edit your Note"
                            name="changeNote"
                            value={changeNote}
                            className="input"
                            onChange={noteChangeHandler}
                            required
                        />
                    </form>
                    <div className="flex">
                        <CheckCircleIcon
                            onClick={editNote}
                            className="h-7 w-7 text-green-600"
                        />
                        <ReplyIcon
                            className="h-7 w-7 text-red-500 ml-2"
                            onClick={toggleEditing}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-center mb-2">
                    <li>{note}</li>
                    <PencilAltIcon
                        onClick={toggleEditing}
                        className="h-7 w-7 text-indigo-500"
                    />
                </div>
            )}
        </div>
    )
}

export default Note
