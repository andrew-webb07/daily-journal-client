import React, { useContext } from "react";
import { EntryContext } from "./EntryProvider";

export const Entry = ({ entry, moods }) => {

  const mood = moods.find(m => m.id === entry.moodId)
  const { deleteEntry, getEntryById } = useContext(EntryContext)

  return (

    <section className="entry">
      <div className="entry__concept">Concept: {entry.concept}</div>
      <div className="entry__entry">Description: {entry.entry}</div>
      <div className="entry__date">Entry Date: {entry.date}</div>
      <div className="entry__mood">Mood: {entry.mood.label}</div>
      {entry.tags.map(tag => {
        return <div>Tag: {tag.name}</div>
      })}

      <button onClick={
        () => {
          deleteEntry(entry)
        }
      }>Delete</button>
      <button onClick={
        () => {
          getEntryById(entry.id)
        }
      }>Edit</button>
    </section>
  )
};
