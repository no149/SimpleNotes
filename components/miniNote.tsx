import { Text, TouchableOpacity, View } from 'react-native'
import style from '../styles/miniNote'

export default ({ title, content }: { title: string; content: string }) => {
  return (
    <View style={style.listItem}>
      <Text style={style.listItemHeader}>{title}</Text>
      <Text>{content}</Text>
    </View>
  )
}
