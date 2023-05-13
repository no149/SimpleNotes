import { TextInput, View ,Text} from 'react-native'
import { ImageContent, NoteContent, SoundContent, TextContent } from '../model/note'
import Image from './ImageContent'
import contentType from '../types/contentType';
import React from 'react';

export default ({
  contents,
}: {
  contents: NoteContent<contentType>[]
}) => {
  return (
    contents.map((c) => {
      if(c instanceof ImageContent){
        console.log('image content:'+c.content.uri)
        return <Image image={c} />
      }
    else if(c instanceof TextContent)
    return <TextInput defaultValue={c.content}/>
    })

)
}


