import React, { useContext, useState, useEffect } from "react"
import { EntryContext } from "./EntryProvider"
import { MoodContext } from "./mood/MoodProvider"
import { TagContext } from "./tag/TagProvider"


export const EntryForm = (props) => {
    const { addEntry, updateEntry, entry, setEntry } = useContext(EntryContext)
    const { moods, getMoods } = useContext(MoodContext)
    const {tags, getTags } = useContext(TagContext)

    const [editMode, editModeChanged] = useState(false)
    const [entryTags, setEntryTags] = useState([])

    useEffect(() => {
        getMoods()
        getTags()
    }, [])

    useEffect(() => {
        if ('id' in entry) {
            editModeChanged(true)
        }
        else {
            editModeChanged(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, entry)
        newEntry[event.target.name] = event.target.value
        setEntry(newEntry)
    }



    const constructNewEntry = () => {

        if (editMode) {
            updateEntry({
                id: entry.id,
                concept: entry.concept,
                journal_entry: entry.entry,
                date: entry.date,
                mood_id: parseInt(entry.moodId)
            })
        } else {
            addEntry({
                concept: entry.concept,
                journal_entry: entry.entry,
                date: new Date().toLocaleDateString(),
                mood_id: parseInt(entry.moodId),
                tags: entryTags
            })
        }
        setEntry({ concept: "", entry: "", moodId: 0 })
    }

    return (
        <form className="EntryForm">
            <h2 className="EntryForm__title">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="concept">Concept: </label>
                    <input type="text" name="concept" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Concept"
                        value={entry.concept}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entry">Entry: </label>
                    <input type="text" name="entry" required className="form-control"
                        proptype="varchar"
                        placeholder="Entry"
                        value={entry.entry}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="moodId">Mood: </label>
                    <select name="moodId" className="form-control"
                        proptype="int"
                        value={entry.moodId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a mood</option>
                        {moods.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
          <div className="center posts  blueText">
              {tags.map(tag => (
                <>
                <input type="checkbox" key={tag.id} value={tag.id} onClick={event => {
                  const copyEntryTags = [...entryTags]
                  const idPosition = copyEntryTags.indexOf(tag)
                  if (idPosition >= 0) {
                    copyEntryTags.splice(idPosition, 1)
                  }
                  else {
                    copyEntryTags.push(tag)
                  }
                  setEntryTags(copyEntryTags)
                }}/>
                <div>{tag.name}</div>
                </>
              ))}
          </div>
        </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEntry()
                }}
                className="btn btn-primary">
                {editMode ? "Update" : "Save"}
            </button>
        </form>
    )
}