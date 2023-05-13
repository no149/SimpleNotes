import { useState, useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import Base64ArrayBuffer from 'base64-arraybuffer'
import { ImageContent } from '../model/note'
import React from 'react'

export default ({
  image,
  width,
  height,
}: {
  image: ImageContent
  width: number
  height: number
}) => {
  let style = StyleSheet.create({ image: { height: height } })
  if (width)
    style = StyleSheet.create({ image: { height: height, width: width } })

  return <Image source={image.content} style={style.image} />
}
