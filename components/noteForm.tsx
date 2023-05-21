import { View, TextInput, Button, StyleSheet, Text } from 'react-native'
import React from 'react'
import { ViewStyle } from 'react-native/types'
import Container from './container'
import contentType from '../types/contentType'
import {
  ImageContent,
  NoteContent as NoteContentModel,
  TextContent,
} from '../model/note'
import NoteModel from '../model/note'
import { Appbar, FAB } from 'react-native-paper'
import NoteContent from './noteContent'
import ImagePicker from 'expo-image-picker'
import showImagePicker from '../utility/ImagePicker'
interface props extends state {
  saved: (
    noteId: number,
    title: string,
    content: NoteContentModel<contentType>[],
  ) => void
  closed: () => void
  deleted: (noteId: number) => void
  visible: boolean
  noteTitle: string
  noteId: number
}

interface state {
  noteTitle: string
  noteContent: NoteContentModel<contentType>[]
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
    const selectImage = async () => {
      let selectedImage = await showImagePicker()
      if (selectedImage) {
        this.setState({
          noteContent: [
            ...this.state.noteContent,
            new ImageContent(
              NoteModel.unsavedId,
              { uri: selectedImage.uri },
              selectedImage.width,
              selectedImage.height,
            ),
          ],
        })
      }
    }
    console.log('contents len', this.state.noteContent.length)
    return (
      <Container navigation={navigation} visible={visible}>
        <Appbar style={[styles.bottom]}>
          <Appbar.Action icon="image" onPress={selectImage} />
          <Appbar.Action icon="music" onPress={() => {}} />
          <FAB mode="flat" size="medium" icon="plus" onPress={() => {}} />
        </Appbar>
        <View style={style.mainContainer}>
          <View>
            <TextInput
              placeholder="Title"
              defaultValue={noteTitle}
              onChangeText={this.setNoteTitle.bind(this)}
              style={[
                style.input,
                { fontSize: 20, paddingVertical: 4, paddingRight: 2 },
              ]}
            />

            <NoteContent
              contents={this.state.noteContent}
              height={undefined}
              containerStyle={{ paddingTop: 10, alignItems: 'center' }}
              imageContentStyle={{ maxHeight: 100, maxWidth: 100 }}
              textContentStyle={{}}
              editable={true}
              isNew={this.props.noteId == NoteModel.unsavedId}
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
const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
})
