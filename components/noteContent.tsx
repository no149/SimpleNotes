import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
  TextInput,
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
}: {
  contents: NoteContent<contentType>[]
  height: number
  containerStyle: StyleProp<ViewStyle>
  imageContentStyle: StyleProp<ImageStyle>
  textContentStyle: StyleProp<TextStyle>
  editable: boolean
}) => {
  return (
    <View style={[containerStyle, { maxHeight: height }]}>
      {contents.map((c) => {
        if (c instanceof ImageContent) {
          return (
            <Image image={c} style={imageContentStyle} editable={editable} />
          )
        } else if (c instanceof TextContent)
          return editable ? (
            <Text style={textContentStyle}>{c.content}</Text>
          ) : (
            <TextInput defaultValue={c.content} />
          )
      })}
    </View>
  )
}
