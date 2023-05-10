import NoteCommandBar from '../components/noteCommandBar'
import RouteParams from '../types/notesListNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import NoteModel from '../model/note'
import NoteForm from '../components/noteForm'
import Note from '../model/note'
import { ViewStyle } from 'react-native/types'
import { View } from 'react-native'
type Props = {
  note: Note
  saved: (noteId: number, title: string, content: string) => void
  closed: () => void
  deleted: (noteId: number) => void
  style: ViewStyle
  visible: boolean
} //NativeStackScreenProps<RouteParams, 'NoteView', 'MyStack'>

export default ({ note, saved, closed, style, visible, deleted }: Props) => {
  const [noteTitle, setNoteTitle] = useState(note.title)
  const [noteContent, setNoteContent] = useState(note.content)
  const [noteId] = useState(note.id)

  console.log('test:' + note.title)
  return (
    <View style={style}>
      <NoteForm
        noteTitle={note.title}
        noteContent={note.content}
        noteId={note.id}
        saved={saved}
        closed={closed}
        deleted={deleted}
        visible={visible}
      />
    </View>
  )
}
