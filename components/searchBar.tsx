import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function SearchBar({
  searcher,
}: {
  searcher: (text: string) => void
}) {
  return (
    <View style={{ flexDirection: 'row-reverse', padding: 10 }}>
      <Text
        style={{ width: '20%', alignContent: 'center', alignSelf: 'center' }}
      >
        Search
      </Text>
      <View style={{ width: '80%' }}>
        <TextInput
          onChangeText={(ev) => searcher(ev)}
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            flexGrow: 1,
          }}
        ></TextInput>
      </View>
    </View>
  )
}
