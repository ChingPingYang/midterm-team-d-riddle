const Note = require('../models/note');

exports.getHomePage = (req, res, next) => {
    res.render('home');
}

exports.writeNote = (req, res, next) => {
    res.render('write');
}

exports.postNote = (req, res, next) => {
    const note = new Note(req.body.author, req.body.title, req.body.content);
    note.saveNote();
    res.redirect('/');
}

exports.readNotes = (req, res, next) => {
    Note.getAll().then(notes => {
        res.render('read', {notes: notes});
    });
}

exports.seeNote = (req, res, next) => {
    const noteId = req.params.noteId;
    const isEditing = req.query.edit;

    Note.getAll().then(notes => {
        const note = notes.find((nt) => nt._id == noteId)

        res.render('see', {note: note, editMode: isEditing});
    });
}

exports.deleteNote = (req, res, next) => {
    const noteId = req.body.noteId;
    console.log(noteId);
    Note.deleteNote(noteId);
    res.redirect('/read');
}

exports.updateNote = (req, res, next) => {
    const noteId = req.body.noteId;
    const title = req.body.title;
    const content = req.body.content;

    Note.updateNote(noteId, title, content);
    res.redirect('/notes/' + noteId);
}