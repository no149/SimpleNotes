import { useState, useEffect } from 'react'
import { GestureResponderEvent, Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native'
import { ImageContent } from '../model/note'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { isPropertyAccessOrQualifiedName } from 'typescript';

export default ({
  image,
  width,
  height: height,
  style,
  editable,
}: {
  image: ImageContent
  width?: number
  height?: number
  style: StyleProp<ImageStyle>
  editable: boolean
}) => {
  const [imageSource,setImageSource] = useState({content:image.content,width,height})
   console.log('image source',imageSource)
  const imageComponent =  <Image source={imageSource.content} resizeMode="cover" style={[{minWidth:imageSource.width,minHeight:imageSource.height},style]} />
  async function showImagePicker() {
  
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection:false
    });
    if (!result.canceled) {
      let asset = result.assets[0];
setImageSource({content:{uri:result.assets[0].uri},height:asset.height,width:asset.width})
    } else {
      alert('You did not select any image.');
    }  }

  return (editable? <TouchableOpacity onPress={showImagePicker}>{imageComponent}</TouchableOpacity>:imageComponent)
}
