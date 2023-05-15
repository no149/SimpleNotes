import { useState } from 'react'
import NoteForm from '../components/noteForm'
import Note, { NoteContent } from '../model/note'
import { ViewStyle } from 'react-native/types'
import { View } from 'react-native'
import contentType from '../types/contentType'
type Props = {
  note: Note
  saved: (
    noteId: number,
    title: string,
    content: NoteContent<contentType>[],
  ) => void
  closed: () => void
  deleted: (noteId: number) => void
  style: ViewStyle
  visible: boolean
}

export default ({
  note: note,
  saved,
  closed,
  style,
  visible,
  deleted,
}: Props) => {
  const [noteTitle, setNoteTitle] = useState(note.title)
  const [noteContent, setNoteContent] = useState(note.contents)
  const [noteId] = useState(note.id)

  console.log('test:' + note.title)
  return (
    <View style={style}>
      <NoteForm
        noteTitle={note.title}
        noteContent={note.contents}
        noteId={note.id}
        saved={saved}
        closed={closed}
        deleted={deleted}
        visible={visible}
      />
    </View>
  )
}
