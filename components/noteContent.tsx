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
  content,
  containerStyle,
  imageContentStyle,
  textContentStyle,
  height,
  editable,
  isNew,
}: {
  content: NoteContent<contentType>
  height?: number | string
  containerStyle: StyleProp<ViewStyle>
  imageContentStyle: StyleProp<ImageStyle>
  textContentStyle: StyleProp<TextStyle>
  editable: boolean
  isNew: boolean
}) => {
  console.log('height', height)
  return (
    <View style={[containerStyle, { maxHeight: height }]}>
      {content instanceof ImageContent && (
        <Image
          image={content}
          style={imageContentStyle}
          editable={editable}
          height={content.height}
          width={content.width}
        />
      )}
      {content instanceof TextContent &&
        (!editable ? (
          <Text style={textContentStyle}>{content.content}</Text>
        ) : (
          <TextInput
            defaultValue={content.content}
            multiline={true}
            style={style.textInput}
          />
        ))}

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
