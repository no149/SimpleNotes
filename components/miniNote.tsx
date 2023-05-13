import { Text, TouchableOpacity, View } from 'react-native'
import style from '../styles/miniNote'
import contentType from '../types/contentType'
import NoteContentView from './noteContent'
import { NoteContent } from '../model/note'
import React from 'react'

export default ({
  title,
  content,
}: {
  title: string
  content: NoteContent<contentType>[]
}) => {
  return (
    <View style={style.listItem}>
      <Text style={style.listItemHeader}>{title}</Text>
      <NoteContentView contents={content} imageHeight={50} />
    </View>
  )
}
