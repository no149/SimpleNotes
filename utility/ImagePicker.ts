import * as ImagePicker from 'expo-image-picker'

export default async function showImagePicker() {
  console.log('ImagePicker', ImagePicker)
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: false,
    quality: 1,
    allowsMultipleSelection: false,
  })
  if (!result.canceled) {
    let asset = result.assets[0]
    return asset
  } else {
    return null
  }
}
