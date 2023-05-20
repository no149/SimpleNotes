import { useState, useEffect } from 'react'
import { Image, ImageStyle, StyleProp, StyleSheet } from 'react-native'
import Base64ArrayBuffer from 'base64-arraybuffer'
import { ImageContent } from '../model/note'
import React from 'react'

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
  return <Image source={image.content} resizeMode="cover" style={style} />
}