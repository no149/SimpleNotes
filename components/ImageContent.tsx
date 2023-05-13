import { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import Base64ArrayBuffer from 'base64-arraybuffer'
import { ImageContent } from '../model/note'
import React from 'react'

export default ({
  image,
  width,
  height: height,
}: {
  image: ImageContent
  width?: number
  height?: number
}) => {
  return <Image source={image.content} resizeMode="cover" />
}
