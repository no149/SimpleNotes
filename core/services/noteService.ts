import { Asset } from 'expo-asset'
import Note, { TextContent, ImageContent } from '../../model/note'
import { readAsStringAsync } from 'expo-file-system'

export default class {
  deleteNote(noteId: number) {
    this.notes = this.notes.filter((n) => n.id != noteId)
    return this.notes
  }
  private notes: Note[]
  private notesInit = false
  async initNotes() {
    const img = new ImageContent(6, await this.getSamplePicture())

    this.notes = [
      {
        id: 1,
        title: 'title 1',
        contents: [
          new TextContent(
            1,
            'content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 11content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1content 1',
          ),
        ],
      },
      { id: 2, title: 'title 2', contents: [new TextContent(2, 'content 2')] },
      { id: 3, title: 'title 3', contents: [new TextContent(3, 'content 3')] },
      { id: 4, title: 'title 4', contents: [new TextContent(4, 'content 4')] },
      { id: 5, title: 'title 5', contents: [new TextContent(5, 'content 5')] },
      { id: 6, title: 'title 6', contents: [img] },
    ]
    this.notesInit = true
  }
  async getSamplePicture() {
    return require('../../assets/sample.jpg') as number
    //const asset = Asset.fromModule( require('../../assets/sample.jpg'))
    //   await asset.downloadAsync()
    // return {uri:asset.localUri??""}
    //  const file = await readAsStringAsync(asset.localUri??"")
    //  return new Blob([file],{type:"image/png"})
  }
  async getNotes() {
    if (!this.notesInit) await this.initNotes()

    return this.notes
  }
  saveNote(note: Note) {
    note.id++
    this.notes.push(note)
  }
  findNotes(title: string, content: string) {
    return []
    //return this.notes.filter(
    //(n) => n.contents.includes(content) || n.title.includes(title),
    //)
  }
}
