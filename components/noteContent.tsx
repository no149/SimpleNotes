import { Image, View } from 'react-native'
import { ImageContent, SoundContent, TextContent } from '../model/note'

export default ({
  contents,
}: {
  contents: ImageContent[] | SoundContent[] | TextContent[]
}) => {
  contents.map((c) => {
    c instanceof ImageContent ? (
      <Image source={{}} />
    ) : c instanceof SoundContent ? (
      <></>
    ) : (
      <></>
    )
  })
}

function f(contents: ImageContent[] | SoundContent[] | TextContent[]) {}
f([new ImageContent(), new SoundContent()])
