import noteStyle from '../styles/note'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'
import React from 'react'
import { ViewStyle } from 'react-native/types'
import Container from './container'

interface props extends state {
  saved: (noteId: number, title: string, content: string) => void
  closed: () => void
  deleted: (noteId: number) => void
  visible: boolean
  noteTitle: string
  noteContent: string
  noteId: number
}

interface state {
  noteTitle: string
  noteContent: string
  noteId: number
}

export default class Note extends React.Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      noteTitle: props.noteTitle,
      noteContent: props.noteContent,
      noteId: props.noteId,
    }
  }

  setNoteTitle(v) {
    this.setState({ noteTitle: v })
  }
  setNoteDescription(v) {
    this.setState({ noteContent: v })
  }
  render() {
    const { noteTitle } = this.props
    const { noteContent } = this.props
    const { visible } = this.props

    const navigation = (
      <>
        <View style={style.navButton}>
          <Button
            title="Save"
            onPress={() =>
              this.props.saved(
                this.props.noteId,
                this.state.noteTitle,
                this.state.noteContent,
              )
            }
          />
        </View>
        <View style={style.navButton}>
          <Button onPress={this.props.closed} title="Show notes list" />
        </View>
        <View style={style.navButton}>
          <Button
            onPress={() => this.props.deleted(this.props.noteId)}
            title="Delete"
          />
        </View>
      </>
    )

    return (
      <Container navigation={navigation} visible={visible}>
        <View style={style.mainContainer}>
          <View>
            <TextInput
              placeholder="Title"
              defaultValue={noteTitle}
              onChangeText={this.setNoteTitle.bind(this)}
              style={style.input}
            />
            <TextInput
              onChangeText={this.setNoteDescription.bind(this)}
              placeholder="Description"
              multiline={true}
              defaultValue={noteContent}
              style={style.input}
              numberOfLines={10}
              textAlignVertical="top"
              scrollEnabled={true}
            />
          </View>
        </View>
      </Container>
    )
  }
}
const style = StyleSheet.create({
  mainContainer: {},
  topContainer: {
    //    minheight: '90%',

    paddingBottom: '2%',
    flex: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    maxHeight: '100%',
  },
  description: {},
  navButton: { marginLeft: 10 },
})
