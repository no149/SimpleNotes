import {
  AppRegistry,
  Modal,
  PlatformColor,
  TouchableOpacity,
} from 'react-native'
import {
  MD3DarkTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import { Button, StyleSheet, Text, View } from 'react-native'

import NotesList from './screens/notesList'
import Note from './model/note'
import NoteView from './screens/note'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RootStackParamList from './types/notesListNavigator'
import noteService from './core/services/noteService'
import NoteCommandBar from './components/noteCommandBar'
import NotelistCommandBar from './components/notelistCommandBar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import mainStyle from './styles/main'
import Container from './components/container'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default class App extends React.Component<
  any,
  { isNoteEditMode: boolean; note: Note; notes: Note[] }
> {
  noteSrv = new noteService()
  constructor(props) {
    super(props)
    this.state = {
      isNoteEditMode: false,
      note: new Note(),
      notes: [],
    }
  }
  componentDidMount(): void {
    this.noteSrv.getNotes().then((notes) => {
      this.setState({ notes: notes })
    })
  }

  createNote() {
    let newNote = new Note()
    this.setState({ note: newNote, isNoteEditMode: true })
  }
  noteSelected(selectedNote: Note) {
    console.log('selected note id:' + selectedNote.id)
    this.setState({ isNoteEditMode: true, note: selectedNote })
  }
  noteDeleted(noteId: number) {
    const notes = this.noteSrv.deleteNote(noteId)
    this.setState({ isNoteEditMode: false, notes: notes })
  }
  noteSaved(noteId: number, title: string, content: string) {
    const { notes } = this.state
    const isNew = noteId == 0
    const note = isNew ? new Note() : notes.filter((n) => n.id == noteId).at(0)

    note.title = title
    // note.contents = content
    this.setState({
      notes: [...notes.filter((n) => n.id != noteId), note],
      isNoteEditMode: false,
    })
  }

  render(): React.ReactNode {
    const { isNoteEditMode } = this.state
    const { note } = this.state
    const { notes } = this.state
    const nav = <Button title="New note" onPress={this.createNote.bind(this)} />
    console.log('notes cnt 1:' + notes.length)

    return (
      <SafeAreaView
        style={{
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Container
          style={mainStyle.mainContainer}
          navigation={nav}
          visible={!isNoteEditMode}
        >
          <NotesList
            notes={notes}
            noteSelected={this.noteSelected.bind(this)}
          />
        </Container>
        <Modal style={mainStyle.mainContainer} visible={isNoteEditMode}>
          <NoteView
            note={note}
            saved={this.noteSaved.bind(this)}
            style={{ height: '100%' }}
            closed={() => this.setState({ isNoteEditMode: false })}
            visible={isNoteEditMode}
            deleted={this.noteDeleted.bind(this)}
          />
        </Modal>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

AppRegistry.registerComponent('ToDo', () => App)
