import { ReactNode } from 'react'
import { Modal, View, ViewStyle } from 'react-native'
import mainStyle from '../styles/main'
import React from 'react'

export default ({
  style,
  children,
  navigation,
  visible,
}: {
  style?: ViewStyle
  children: ReactNode
  navigation: ReactNode
  visible: boolean
}) => {
  console.log('children:' + children)
  return visible ? (
    <View style={mainStyle.mainContainer}>
      <View style={mainStyle.navbar}>{navigation}</View>
      <View style={mainStyle.mainContent}>{children}</View>
    </View>
  ) : (
    <></>
  )
}
