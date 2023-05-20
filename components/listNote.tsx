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
  editNote,
  deleteNote,
  noteId,
}: {
  title: string
  content: Note<contentType>[]
  isSelected: boolean
  editNote: (noteId: number) => void
  deleteNote: (noteId: number) => void

  noteId: number
}) => {
  return (
    <View
      style={[
        style.listItem,
        isSelected
          ? {
              elevation: 10,
              backgroundColor: '#ebe3e3',
              borderWidth: 4,
              borderBottomWidth: 4,
              alignSelf: 'stretch',
              width: '100%',
            }
          : {},
      ]}
    >
      {isSelected && (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <Button onPress={(i) => editNote(noteId)} title="Edit" />
          </View>
          <View style={{ flexGrow: 1 }}>
            <Button onPress={(i) => deleteNote(noteId)} title="Delete" />
          </View>
        </View>
      )}
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Text style={style.listItemHeader}>{title}</Text>
        <NoteContent
          contents={content}
          height={isSelected ? undefined : 50}
          containerStyle={{ paddingTop: 10, alignItems: 'center' }}
          imageContentStyle={{}}
          textContentStyle={{}}
          editable={false}
        />
      </View>
    </View>
  )
}
