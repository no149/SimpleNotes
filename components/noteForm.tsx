import noteStyle from '../styles/note'
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native'
import React from 'react'
import { ViewStyle } from 'react-native/types'
import Container from './container'
import contentType from '../types/contentType'
import { ImageContent, NoteContent, TextContent } from '../model/note'

interface props extends state {
  saved: (
    noteId: number,
    title: string,
    content: NoteContent<contentType>[],
  ) => void
  closed: () => void
  deleted: (noteId: number) => void
  visible: boolean
  noteTitle: string
  noteId: number
}

interface state {
  noteTitle: string
  noteContent: NoteContent<contentType>[]
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
            {/*add editing content*/}

            {noteContent.map((content) => {
              if (content instanceof TextContent) {
                return <Text>{content.content}</Text>
              } else if (content instanceof ImageContent) {
                return <Image source={content.content} />
              }
            })}
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
