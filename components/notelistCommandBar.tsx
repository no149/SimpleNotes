import { Button, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Note from '../model/note'
import style from './../styles/noteCommandBar'
import noteService from '../core/services/noteService'
import { NavigationProp } from '@react-navigation/native'
import RootStackParamList from '../types/notesListNavigator'

export default function NoteCommandBar({ note }: { note?: Note }) {
  return (
    <View style={style.container}>
      <Button title="Delete" />
      <Button title="New note" />
    </View>
  )
}

function save(description: string, title: string, noteId: number) {
  const noteSrv = new noteService()
  const note = noteId
    ? noteSrv
        .getNotes()
        .filter((x) => x.id == noteId)
        .pop()
    : new Note()
  if (note == undefined) console.warn('note not found')
  else {
    note.contents = description
    note.title = title
    noteSrv.saveNote(note)
  }
  console.log('note title:' + title)
}
