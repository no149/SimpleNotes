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
  console.log('max height:' + height)
  let style = StyleSheet.create({ image: { height: height } })
  if (width)
    style = StyleSheet.create({
      image: { height: height, maxWidth: width, aspectRatio: 1 },
    })

  return <Image source={image.content} style={style.image} resizeMode="cover" />
}
