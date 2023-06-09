import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native'
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
  noteContents: NoteContentModel<contentType>[]
  noteId: number
  selectedContents: number[]
}

export default class Note extends React.Component<props, state> {
  constructor(props: props) {
    super(props)
    this.state = {
      noteTitle: props.noteTitle,
      noteContents: props.noteContents,
      noteId: props.noteId,
      selectedContents: [],
    }
  }

  setNoteTitle(v) {
    this.setState({ noteTitle: v })
  }
  setNoteDescription(v) {
    this.setState({ noteContents: v })
  }
  render() {
    const { noteTitle } = this.props
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
                this.state.noteContents,
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

    async function selectImage() {
      let selectedImage = await showImagePicker()
      if (selectedImage) {
        // setImageSource({
        //   content: { uri: selectedImage.uri },
        //   height: selectedImage.height,
        //   width: selectedImage.width,
        // })
      }
    }

    const toggleSelect = async (contentId: number) => {
      console.log('selecting content',contentId);
      if (!contentId && contentId!=0) {
        console.log('clear selected')
        this.setState({ selectedContents: [] })
      } else
        this.state.selectedContents.indexOf(contentId) == -1
          ? this.setState({
              selectedContents: [...this.state.selectedContents, contentId],
            })
          : this.setState({
              selectedContents: [
                ...this.state.selectedContents.filter((v) => v != contentId),
              ],
            })
    }
    const isSelected = (id: number) => {
      let selected = this.state.selectedContents.indexOf(id) != -1
      console.log('selected', selected)
      return selected
    }

    const deleteContent = ()=>{
      this.setState({noteContents:this.state.noteContents.filter(nc=>!this.state.selectedContents.includes( nc.id)),
      selectedContents:[]})
    }
    const addImageContent = async () => {
      console.log('addImageContent')

      let imageAsset = await showImagePicker()
      if (!imageAsset) return

      const imageContent = new ImageContent(
        { uri: imageAsset.uri },
        imageAsset.width,
        imageAsset.height,
      )
      this.setState({
        noteContents: [...this.state.noteContents, imageContent],
      })
    }
    return (
      <Container navigation={navigation} visible={visible}>
        <ScrollView style={style.mainContainer}>
          <Pressable
            onPress={() => toggleSelect(null)}
            style={{ height: '100%' }}
          >
            <TextInput
              placeholder="Title"
              defaultValue={noteTitle}
              onChangeText={this.setNoteTitle.bind(this)}
              style={[
                style.input,
                {
                  fontSize: 20,
                  paddingVertical: 4,
                  paddingRight: 2,
                  borderWidth: 0,
                  marginBottom: 5,
                  borderBottomWidth: 1,
                },
              ]}
              onPressIn={() => toggleSelect(null)}
            />
            {this.state.noteContents.map((content) => {
              return (
                <TouchableOpacity
                  onLongPress={
                    content instanceof TextContent == false
                      ? () => toggleSelect(content.id)
                      : () => {}
                  }
                  style={
                    isSelected(content.id)
                      ? {
                          backgroundColor: 'rgba(247, 206, 245, 0.58)',
                        }
                      : {}
                  }
                >
                  <NoteContent
                    content={content}
                    containerStyle={{ paddingTop: 10, alignItems: 'center' }}
                    imageContentStyle={{ maxHeight: 100, maxWidth: 100 }}
                    textContentStyle={{}}
                    editable={true}
                    isNew={this.props.noteId == NoteModel.unsavedId}
                  />
                </TouchableOpacity>
              )
            })}
          </Pressable>
        </ScrollView>
        <Appbar style={[styles.bottom]}>
          {this.state.selectedContents.length > 0 && (
            <>
              <Appbar.Action icon="delete" onPress={deleteContent} />
            </>
          )}
          {this.state.selectedContents.length == 0 && (
            <>
              <Appbar.Action icon="music" onPress={() => {}} />
              <Appbar.Action icon="image" onPress={addImageContent} />
              <FAB mode="flat" size="medium" icon="plus" onPress={() => {}} />
            </>
          )}
        </Appbar>
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
