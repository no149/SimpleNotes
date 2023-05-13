import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import Note from '../model/note'
import RootStackParamList from '../types/notesListNavigator'
import style from '../styles/notesList'
import MiniNote from '../components/listNote'
import SearchBar from '../components/searchBar'
import React from 'react'
import NoteView from './note'
import noteService from '../core/services/noteService'

type Props = {
  notes: Note[]
  newOrUpdatedNote?: Note
  noteSaved?: (note: Note) => void
  noteSelected: (note: Note) => void
}
//NativeStackScreenProps<RootStackParamList, 'NotesList', 'MyStack'>
type state = { notes: Note[] }

export default class NotesList extends React.Component<Props, state> {
  noteSrv = new noteService()
  constructor(props: Props) {
    super(props)
    const notes = props.notes
    console.log('notes cnt 2:' + notes.length)

    this.state = { notes: notes }
  }
  search(text: string) {
    const result = this.noteSrv.findNotes(text, text)

    this.setState({ notes: result })
  }

  render() {
    // const { navigation } = this.props
    const { notes } = this.props
    console.log('notes cnt 3:' + notes.length)

    const updateNote = (note: Note): void => {
      this.setState({
        notes: [
          ...notes.filter((n) => n.id != note.id),
          { id: note.id, title: note.title, contents: note.contents },
        ],
      })
    }

    console.log(this.props.noteSelected)
    return (
      <View style={{ flex: 1 }}>
        <View>
          <SearchBar searcher={this.search.bind(this)} />
        </View>
        <FlatList
          data={notes}
          renderItem={(item) =>
            renderNote(item, notes, this.props.noteSelected)
          }
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>
      </View>
    )
  }
}

function renderNote(
  info: ListRenderItemInfo<Note>,
  // navigation: NativeStackNavigationProp<RootStackParamList, 'NotesList'>,
  notes: Note[],
  // noteUpdated: (note: Note) => void,
  noteSelected: (note: Note) => void,
) {
  return (
    //<TouchableOpacity
    //onPress={() =>
    // navigation.navigate('NoteView', {
    //   note: info.item,
    //   notes: notes,
    //   saved(note) {
    //     noteUpdated(note)
    //   },
    // })
    //noteSelected(info.item)
    //}
    //>
    <MiniNote title={info.item.title} content={info.item.contents} />
    //</TouchableOpacity>
  )
}
