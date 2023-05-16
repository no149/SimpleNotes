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
import React, { useState, memo, ReactNode } from 'react'
import NoteView from './note'
import noteService from '../core/services/noteService'

type Props = {
  notes: Note[]
  newOrUpdatedNote?: Note
  noteSaved?: (note: Note) => void
  editNote: (noteId: number) => void
}
type state = { notes: Note[]; selectedNoteId: number }

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
const flatListRef: FlatList = null
export default ({ notes, editNote }: Props) => {
  const [selectedNoteId, setSelectedNoteId] = useState(NaN)

  const noteSelectedToggled = (note: Note) => {
    setSelectedNoteId(selectedNoteId == note.id ? NaN : note.id)
  }

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

  setTimeout(function () {}, 1000)
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
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ref={(flatlist) => {
          flatlist.scrollToIndex({ index: 5 })
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
}: {
  note: Note
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
        noteId={note.id}
      />
    </TouchableOpacity>
  )
}
