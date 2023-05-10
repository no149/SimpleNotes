import { Button, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Note from '../model/note'
import style from './../styles/noteCommandBar'
import noteService from '../core/services/noteService'
import { NavigationProp } from '@react-navigation/native'
import RootStackParamList from '../types/notesListNavigator'

export default function NoteCommandBar({
  note,
  saved,
}: {
  note?: Note
  saved?: (note: Note) => void
}) {
  return (
    <View style={style.container}>
      <Button title="Delete" disabled={note == undefined} />
      <Button
        onPress={() => {
          save(note.content, note.title, note.id, saved)
        }}
        title="Save"
      />
    </View>
  )
}

function save(
  description: string,
  title: string,
  noteId: number,
  saved: (note: Note) => void,
) {
  const noteSrv = new noteService()
  const note = noteId
    ? noteSrv
        .getNotes()
        .filter((x) => x.id == noteId)
        .pop()
    : new Note()
  if (note == undefined) console.warn('note not found')
  else {
    note.content = description
    note.title = title
    noteSrv.saveNote(note)
    saved(note)
  }
  console.log('note title:' + title)
}
