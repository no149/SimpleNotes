import { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import Base64ArrayBuffer from 'base64-arraybuffer'
import { ImageContent } from '../model/note'
import React from 'react'

export default ({
  image,
  width,
  maxheight: height,
}: {
  image: ImageContent
  width?: number
  maxheight: number
}) => {
  let style = StyleSheet.create({ image: { maxHeight: height } })
  if (width)
    style = StyleSheet.create({ image: { maxHeight: height, maxWidth: width } })

  return <Image source={image.content} style={style.image} resizeMode="cover" />
}
