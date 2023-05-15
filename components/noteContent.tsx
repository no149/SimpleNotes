import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native'
import { ImageContent, NoteContent, TextContent } from '../model/note'
import Image from './ImageContent'
import contentType from '../types/contentType'
import React from 'react'

export default ({
  contents,
  containerStyle,
  imageContentStyle,
  textContentStyle,
  height,
}: {
  contents: NoteContent<contentType>[]
  height: number
  containerStyle: StyleProp<ViewStyle>
  imageContentStyle: StyleProp<ImageStyle>
  textContentStyle: StyleProp<TextStyle>
}) => {
  return (
    <View style={[containerStyle, { maxHeight: height }]}>
      {contents.map((c) => {
        if (c instanceof ImageContent) {
          return <Image image={c} style={imageContentStyle} />
        } else if (c instanceof TextContent)
          return <Text style={textContentStyle}>{c.content}</Text>
      })}
    </View>
  )
}
