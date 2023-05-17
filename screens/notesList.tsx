import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from 'react-native'
import Note from '../model/note'
import RootStackParamList from '../types/notesListNavigator'
import style from '../styles/notesList'
import ListNote from '../components/listNote'
import SearchBar from '../components/searchBar'
import React, { useState, memo, ReactNode, useEffect } from 'react'
import NoteView from './note'
import noteService from '../core/services/noteService'

type Props = {
  notes: Note[]
  newOrUpdatedNote?: Note
  noteSaved?: (note: Note) => void
  editNote: (noteId: number) => void
  deleteNote: (noteId: number) => void
}
function search(text: string) {
  const result = this.noteSrv.findNotes(text, text)

  this.setState({ notes: result })
}
// const updateNote = (note: Note): void => {
//   this.setState({
//     notes: [
//       ...notes.filter((n) => n.id != note.id),
//       { id: note.id, title: note.title, contents: note.contents },
//     ],
//   })
// }
let flatListRef: FlatList<Note> = null
export default ({ notes, editNote, deleteNote }: Props) => {
  const [selectedNoteId, setSelectedNoteId] = useState(NaN)
  const noteSelectedToggled = (note: Note) => {
    setSelectedNoteId(selectedNoteId == note.id ? NaN : note.id)
  }
  useEffect(() => {
    console.log('use effect called')
    if (selectedNoteId) {
      const hitNoteIx = notes.findIndex((n) => n.id == selectedNoteId)
      console.log(hitNoteIx, 'hit note index')
      setTimeout(
        () => flatListRef.scrollToIndex({ index: hitNoteIx, viewPosition: 0 }),
        50,
      )
    }
  })
  //   const ListMemo = memo(
  //     function ({
  //       notes,
  //       selectedNoteId,
  //     }: {
  //       notes: Note[]
  //       // noteUpdated: (note: Note) => void,
  //       selectedNoteId: number
  //     }) {
  //       return (
  //         <FlatList
  //           data={notes}
  //           renderItem={(i) => (
  //             <ListItem
  //               isSelected={selectedNoteId == i.item.id}
  //               note={i.item}
  //               noteSelectedToggled={noteSelectedToggled}
  //             />
  //           )}
  //           keyExtractor={(item) => item.id.toString()}
  //         ></FlatList>
  //       )
  //     },
  //     () => true,
  //   )

  return (
    <View style={{ flex: 1 }}>
      <View>
        <SearchBar searcher={search.bind(this)} />
      </View>
      <FlatList
        data={notes}
        renderItem={(i) => (
          <ListItem
            isSelected={selectedNoteId == i.item.id}
            note={i.item}
            noteSelectedToggled={noteSelectedToggled}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ref={(flatlist) => {
          flatListRef = flatlist
        }}
      ></FlatList>
    </View>
  )
}

function ListItem({
  note,
  noteSelectedToggled: noteSelectToggled,
  isSelected,
  editNote,
  deleteNote,
}: {
  note: Note
  deleteNote: (noteId: number) => void

  // noteUpdated: (note: Note) => void,
  noteSelectedToggled: (note: Note) => void
  isSelected: boolean
  editNote: (noteId: number) => void
}) {
  return (
    <TouchableOpacity onPress={() => noteSelectToggled(note)}>
      <ListNote
        title={note.title}
        content={note.contents}
        isSelected={isSelected}
        editNote={editNote}
        deleteNote={deleteNote}
        noteId={note.id}
      />
    </TouchableOpacity>
  )
}
