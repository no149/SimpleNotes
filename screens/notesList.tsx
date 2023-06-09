import {
  Animated,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Note from '../model/note'
import style from '../styles/notesList'
import ListNote from '../components/listNote'
import SearchBar from '../components/searchBar'
import React, { useState, useEffect, useRef } from 'react'
import NoteView from './note'
import noteService from '../core/services/noteService'
import mainStyle from './../styles/main'
import mainContainerStyle from './../styles/main'

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
      if (hitNoteIx >= 0)
        setTimeout(
          () =>
            flatListRef.scrollToIndex({ index: hitNoteIx, viewPosition: 0 }),
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
const screenWidth = Dimensions.get('screen').width
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
  const [opacity, setOpacity] = useState(1)
  const shouldDeleteNote = opacity < 0.3
  return (
    <ScrollView
      horizontal={!isSelected}
      pagingEnabled={!isSelected}
      showsHorizontalScrollIndicator={true}
      snapToInterval={screenWidth}
      onScroll={(e) => {
        if (
          (e.nativeEvent.contentOffset.x -
            mainContainerStyle.mainContainer.padding) /
            e.nativeEvent.contentSize.width ==
          0.5
        ) {
          setOpacity(1)
          return
        }

        setOpacity(
          ((2 * e.nativeEvent.contentOffset.x) /
            e.nativeEvent.contentSize.width) *
            0.6,
        )
        console.log('shouldDeleteNote', shouldDeleteNote)
      }}
      contentContainerStyle={{ opacity: opacity }}
      onScrollEndDrag={() => {
        if (shouldDeleteNote) {
          deleteNote(note.id)
          console.log('delet note called')
        }
      }}
    >
      <TouchableOpacity
        onPress={() => noteSelectToggled(note)}
        style={{
          width: screenWidth - mainContainerStyle.mainContainer.padding * 2,
        }}
      >
        <ListNote
          title={note.title}
          contents={note.contents}
          isSelected={isSelected}
          editNote={editNote}
          deleteNote={deleteNote}
          noteId={note.id}
        />
      </TouchableOpacity>
      <View style={{ width: screenWidth }}></View>
    </ScrollView>
  )
}
