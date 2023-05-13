import { TextInput, View, Text } from 'react-native'
import {
  ImageContent,
  NoteContent,
  SoundContent,
  TextContent,
} from '../model/note'
import Image from './ImageContent'
import contentType from '../types/contentType'
import React from 'react'

export default ({
  contents,

  height,
}: {
  contents: NoteContent<contentType>[]
  height: number
}) => {
  return (
    <View style={{ maxHeight: height }}>
      {contents.map((c) => {
        if (c instanceof ImageContent) {
          return <Image image={c} />
        } else if (c instanceof TextContent) return <Text>{c.content}</Text>
      })}
    </View>
  )
}
