import { Text, TouchableOpacity, View } from 'react-native'
import style from '../styles/miniNote'
import contentType from '../types/contentType'
import NoteContent from './noteContent'
import { NoteContent as Note } from '../model/note'
import React from 'react'
import { useState } from 'react'
import { Button } from 'react-native'

export default ({
  title,
  content,
  isSelected,
}: {
  title: string
  content: Note<contentType>[]
  isSelected: boolean
}) => {
  return (
    <View style={style.listItem}>
      {isSelected && (
        <Button onPress={() => console.log('edit touched')} title="Edit" />
      )}
      <Text style={style.listItemHeader}>{title}</Text>
      <NoteContent contents={content} height={isSelected ? undefined : 50} />
    </View>
  )
}
