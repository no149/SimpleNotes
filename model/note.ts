import contentType from '../types/contentType'

export default class Note {
  title: string
  contents: NoteContent<contentType>[]
  id: number = 0
  static unsavedId: number = 0
}

export class NoteContent<type> {
  id: number
  content: type
  constructor(id: number, content: type) {
    this.id = id
    this.content = content
  }
}

export class ImageContent extends NoteContent<{ uri: string } | number> {
  width = 0
  height = 0
  constructor(
    content: { uri: string } | number,
    width: number,
    height: number,
    id?: number,
  ) {
    super(id, content)
    this.height = height
    this.width = width
  }
}

export class TextContent extends NoteContent<string> {
  constructor(id: number, content: string) {
    super(id, content)
  }
}
export class SoundContent extends NoteContent<Blob> {}
