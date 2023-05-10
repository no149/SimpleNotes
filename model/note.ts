export default class Note {
  title: string
  content: ImageContent[] | SoundContent[] | TextContent[]
  id: number = 0
  static unsavedId: number = 0
}

class NoteContent<type> {
  content: type
  constructor() {}
}

export class ImageContent extends NoteContent<Blob> {}

export class TextContent extends NoteContent<string> {}
export class SoundContent extends NoteContent<Blob> {}
