import Note from '../model/note'

type RootStackParamList = {
  NotesList: {
    notes?: Note[]
    newOrUpdatedNote?: Note
    noteSaved?: (note: Note) => void
  }
  NoteView: { note: Note; saved: (note: Note) => void; notes: Note[] }
}

export default RootStackParamList
