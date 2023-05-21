import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  TextInput,
  StyleSheet,
} from 'react-native'
import { ImageContent, NoteContent, TextContent } from '../model/note'
import Image from './Image'
import contentType from '../types/contentType'
import React from 'react'

export default ({
  contents,
  containerStyle,
  imageContentStyle,
  textContentStyle,
  height,
  editable,
  isNew,
}: {
  contents: NoteContent<contentType>[]
  height: number
  containerStyle: StyleProp<ViewStyle>
  imageContentStyle: StyleProp<ImageStyle>
  textContentStyle: StyleProp<TextStyle>
  editable: boolean
  isNew: boolean
}) => {
  return (
    <View style={[containerStyle, { maxHeight: height }]}>
      {contents.map((c) => {
        console.log('content', c)
        if (c instanceof ImageContent) {
          return (
            <Image
              image={c}
              style={imageContentStyle}
              editable={editable}
              height={c.height}
              width={c.width}
            />
          )
        } else if (c instanceof TextContent) {
          return !editable ? (
            <Text style={textContentStyle}>{c.content}</Text>
          ) : (
            <TextInput
              defaultValue={c.content}
              multiline={true}
              style={style.textInput}
            />
          )
        }
      })}
      {isNew && (
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={style.textInput}
        />
      )}
    </View>
  )
}

const style = StyleSheet.create({
  textInput: { width: '100%', fontSize: 16 },
})
