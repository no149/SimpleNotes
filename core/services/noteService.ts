import Note from '../../model/note'

export default class {
  deleteNote(noteId: number) {
    this.notes = this.notes.filter((n) => n.id != noteId)
    return this.notes
  }
  private notes: Note[] = [
    { id: 1, title: 'note 1', content: 'content 1' },
    { title: 'note 2', content: 'content 2', id: 2 },
    { title: 'note 3', content: 'content 3', id: 3 },
    { title: 'note 4', content: 'content 4', id: 4 },
    { title: 'note 5', content: 'content 5', id: 5 },
    { title: 'note 6', content: 'content 6', id: 6 },
  ]

  getNotes() {
    return this.notes
  }
  saveNote(note: Note) {
    note.id++
    this.notes.push(note)
  }
  findNotes(title: string, content: string) {
    return this.notes.filter(
      (n) => n.content.includes(content) || n.title.includes(title),
    )
  }
}
