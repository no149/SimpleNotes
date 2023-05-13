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
  imageWidth,
  imageHeight,
}: {
  contents: NoteContent<contentType>[]
  imageWidth?: number
  imageHeight: number
}) => {
  return (
    <>
      {contents.map((c) => {
        if (c instanceof ImageContent) {
          return <Image image={c} height={imageHeight} width={imageWidth} />
        } else if (c instanceof TextContent)
          return <TextInput defaultValue={c.content} />
      })}
    </>
  )
}
