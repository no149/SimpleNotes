import { useState, useEffect } from 'react'
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ImageContent } from '../model/note'
import React from 'react'
import { isPropertyAccessOrQualifiedName } from 'typescript'
import showImagePicker from '../utility/ImagePicker'

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
  const [imageSource, setImageSource] = useState({
    content: image.content,
    width,
    height,
  })
  console.log('image source', imageSource)
  const imageComponent = (
    <Image
      source={imageSource.content}
      resizeMode="cover"
      style={[
        { minWidth: imageSource.width, minHeight: imageSource.height },
        style,
      ]}
    />
  )
  async function selectImage() {
    let selectedImage = await showImagePicker()
    if (selectedImage) {
      setImageSource({
        content: { uri: selectedImage.uri },
        height: selectedImage.height,
        width: selectedImage.width,
      })
    }
  }

  return editable ? (
    <TouchableOpacity onPress={showImagePicker}>
      {imageComponent}
    </TouchableOpacity>
  ) : (
    imageComponent
  )
}
