import { useState, useEffect } from 'react'
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { ImageContent } from '../model/note'
import React from 'react'
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
  const [selected, setSelected] = useState(false)
  const imageComponent = (
    <View style={{ height: height }}>
      <Image
        source={imageSource.content}
        resizeMode="contain"
        style={[
          { minWidth: imageSource.width, minHeight: imageSource.height },
          style,
        ]}
      />
    </View>
  )

  const toggleSelect = () => {
    setSelected(!selected)
  }
  return imageComponent
}
