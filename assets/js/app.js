let titles = document.querySelectorAll('.title')
let categoriesName = document.querySelectorAll('.categories-name')
let menuIconContainers = document.querySelectorAll('.menu-icon--container')
let sidebar = document.querySelector('.sidebar')
let navItemContainer = document.querySelector('.nav .nav-item--container')
let categoriesCreateContainer = document.querySelector('.categories-create--container')
let categoryAddInput = categoriesCreateContainer.querySelector('.categories-add--input')
let categoryAddBtn = categoriesCreateContainer.querySelector('.categories-add--btn')
let categoriesItemContainer = document.querySelector('.categories-item--container')
let addNoteContainer = document.querySelector('#add-note--container')
let newNoteContainer = addNoteContainer.querySelector('.note')
let newNoteBtn = document.querySelector('#new-note--btn')
let notes = document.querySelector('.notes')


let emptyCategoryText = 'The category is empty'
let emptyNoteText = 'The note is empty'

titles.forEach(title=>{
    marquee(title)
})
createCategoryEl(1, 'Default')
    // createNoteEl('')
empty(emptyNoteText, notes)

newNoteBtn.addEventListener('click', e => {
    show([addNoteContainer])
})

newNoteContainer.addEventListener('click', e => {
    newNoteContainerClick(e.target)
})

function newNoteContainerClick(el) {
    let elParent = getTargetParent(el, 'note')
    switch (true) {
        case el.classList.contains('save'):
            createNoteEl('new note')
            hide([addNoteContainer])
            console.log(elParent.querySelector('.note-bottom .input-dialog').files)
            break;
        case el.classList.contains('minimize'):
            hide([addNoteContainer])
            break;
        case el.classList.contains('cancel'):
            hide([addNoteContainer])
            break;
        case getTargetParent(el, 'btn-label--add-container').classList.contains('btn-label--add-container'):
            noteFileDialog(elParent)
            break;
    }
}


categoriesCreateContainer.addEventListener('click', e => {
    addCategoryToggle()
})

categoriesCreateContainer.addEventListener('submit', e => {
    e.preventDefault();
    let value = categoryAddInput.value;
    createCategoryEl(1, value)
    categoryAddInput.value = ''
    console.log('submited')
})

function noteClick(el) {
    let elParent = getTargetParent(el, 'note')
    console.log(el)
    switch (true) {
        case el.classList.contains('edit'):
            console.log('edited')
            noteEdit(elParent)
            break;
        case el.classList.contains('save'):
            noteSave(elParent)
            break;
        case el.classList.contains('delete'):
            noteDelete(elParent)
            break;
        case el.classList.contains('cancel'):
            noteCancel(elParent)
            break;
        case getTargetParent(el, 'btn-label--add-container').classList.contains('btn-label--add-container'):
            noteFileDialog(elParent)
            break;
    }
}

function noteEdit(el) {
    let noteTextInput = el.querySelector('.note-text--input')
    let noteText = el.querySelector('.note-text')
    let editBtn = el.querySelector('.note-top .edit')
    let deleteBtn = el.querySelector('.note-top .delete')
    let cancelBtn = el.querySelector('.note-top .cancel')
    show([noteTextInput, cancelBtn])
    hide([noteText, editBtn, deleteBtn])
    noteTextInput.focus()
}

function noteSave(el) {
    console.log(el.querySelector('.note-bottom .input-dialog').files)
}

function noteDelete(el) {
    el.remove()
    empty(emptyNoteText, notes)
}

function noteCancel(el) {
    let noteTextInput = el.querySelector('.note-text--input')
    let noteText = el.querySelector('.note-text')
    let editBtn = el.querySelector('.note-top .edit')
    let deleteBtn = el.querySelector('.note-top .delete')
    let cancelBtn = el.querySelector('.note-top .cancel')
    hide([noteTextInput, cancelBtn])
    show([noteText, editBtn, deleteBtn])
}

function noteFileDialog(el) {
    let fileDialog = el.querySelector('.note-bottom .input-dialog')
    fileDialog.click()
}

function categoryClick(el) {
    let elParent = getTargetParent(el, 'categories-item')
    switch (true) {
        case el.classList.contains('edit'):
            categoryEdit(elParent)
            break;
        case el.classList.contains('save'):
            console.log('hello edit')
            break;
        case el.classList.contains('delete'):
            categoryDelete(elParent)
            break;
        case el.classList.contains('cancel'):
            categoryCancel(elParent)
            break;
    }
}

function categoryEdit(el) {
    let editInput = el.querySelector('.categories-edit--input')
    let categoriesName = el.querySelector('.categories-name')
    let saveBtn = el.querySelector('.save')
    let editBtn = el.querySelector('.edit')
    let deleteBtn = el.querySelector('.delete')
    let cancelBtn = el.querySelector('.cancel')
    show([editInput, saveBtn, cancelBtn])
    hide([categoriesName, editBtn, deleteBtn])
}

function categorySave(el) {

}

function categoryDelete(el) {
    el.remove()
    empty(emptyCategoryText, categoriesItemContainer)
}

function categoryCancel(el) {
    let editInput = el.querySelector('.categories-edit--input')
    let categoriesName = el.querySelector('.categories-name')
    let saveBtn = el.querySelector('.save')
    let editBtn = el.querySelector('.edit')
    let deleteBtn = el.querySelector('.delete')
    let cancelBtn = el.querySelector('.cancel')
    hide([editInput, saveBtn, cancelBtn])
    show([categoriesName, editBtn, deleteBtn])
}

function show(elements) {
    elements.forEach(el => {
        el.classList.remove('hidden')
    })
}

function hide(elements) {
    elements.forEach(el => {
        el.classList.add('hidden')
    })
}

function addCategoryToggle() {
    categoryAddInput.classList.toggle('hidden')
    if (!categoryAddInput.classList.contains('hidden')) {
        categoryAddBtn.classList.remove('hidden')
        categoryAddInput.focus();
    } else {
        categoryAddBtn.classList.add('hidden')
    }
}
menuIconContainers.forEach(menuIconContainer => {
    menuIconContainer.addEventListener('click', e => {
        menuIconContainer.classList.toggle('close')
        if (getTargetParent(e.target, 'nav').classList.contains('nav')) {
            navbarToggle()
        } else if (getTargetParent(e.target, 'sidebar').classList.contains('sidebar')) {
            sidebarToggle()
        }
    })
})

function navbarToggle() {
    if (menuIconContainers[0].classList.contains('close')) {
        navItemContainer.classList.add('show-nav--menu')
    } else {
        navItemContainer.classList.remove('show-nav--menu')
    }
}

function sidebarToggle() {
    if (menuIconContainers[1].classList.contains('close')) {
        sidebar.classList.add('show-sidebar')
    } else {
        sidebar.classList.remove('show-sidebar')
    }
}

function marquee(tag) {
    if (exceedsLimit(tag)) {
        let marquee = document.createElement('marquee');
        marquee.textContent = tag.textContent;
        tag.innerHTML = '';
        tag.append(marquee);
    }
    document.querySelector('#new-tag').remove()
}

function exceedsLimit(tag) {
    let newTag = document.createElement(tag.tagName)
    newTag.id = 'new-tag'
    newTag.style.width = 'fit-content'
    newTag.style.position = 'absolute'
    newTag.style.visibility = 'hidden'
    document.body.append(newTag)
    newTag.innerHTML = tag.textContent;
    if (newTag.getBoundingClientRect().width > tag.getBoundingClientRect().width) {
        return true;
    } else {
        return false;
    }
}

function getTargetParent(el, parentClass) {
    let newEl = el;
    while (!newEl.classList.contains(parentClass)) {
        if (newEl.tagName.toLowerCase() == 'body') {
            break;
        }
        newEl = newEl.parentElement;
    }
    return newEl;
}

function createCategoryEl(id, value) {
    let li = document.createElement('li')
    let a = document.createElement('a')
    let input = document.createElement('input')
    let span = document.createElement('span')
    let div = document.createElement('div')
    let spanSave = document.createElement('span')
    let spanEdit = document.createElement('span')
    let spanDel = document.createElement('span')
    let spanCancel = document.createElement('span')
    li.setAttribute('data-id', id)
    li.setAttribute('class', 'categories-item')
    a.setAttribute('class', 'categories-link')
    a.setAttribute('href', '#')
    span.setAttribute('class', 'categories-name')
    input.setAttribute('class', 'categories-edit--input hidden')
    div.setAttribute('class', 'categories-tools')
    spanSave.setAttribute('class', 'save hidden')
    spanEdit.setAttribute('class', 'edit')
    spanDel.setAttribute('class', 'delete')
    spanCancel.setAttribute('class', 'cancel hidden')
    input.value = value
    span.textContent = value
    spanSave.textContent = 'save'
    spanEdit.textContent = 'edit'
    spanDel.textContent = 'delete'
    spanCancel.textContent = 'cancel'
    div.append(spanSave)
    div.append(spanEdit)
    div.append(spanDel)
    div.append(spanCancel)
    a.append(span)
    a.append(input)
    a.append(div)
    li.append(a)
    li.addEventListener('click', e => {
        e.preventDefault();
        categoryClick(e.target)
    })
    categoriesItemContainer.insertBefore(li, categoriesItemContainer.firstElementChild)
    empty(emptyCategoryText, categoriesItemContainer)
    marquee(span)
}

function createNoteEl(data) {
    let note = document.createElement('div')
    let noteTop = document.createElement('div')
    let noteMiddle = document.createElement('div')
    let noteBottom = document.createElement('div')
    let noteTitle = document.createElement('input')
    let categoriesTools = document.createElement('div')
    let saveBtn = document.createElement('span')
    let editBtn = document.createElement('span')
    let deleteBtn = document.createElement('span')
    let cancelBtn = document.createElement('span')
    let noteTextInput = document.createElement('textarea')
    let noteText = document.createElement('p')
    let attachmentContainer = document.createElement('div')
    let attachments = document.createElement('span')
    let attachmentsAddContainer = document.createElement('div')
    let attachmentsAddLabel = document.createElement('span')
    let attachmentsAddBtn = document.createElement('div')
    let inputDialog = document.createElement('input')
    note.setAttribute('class', 'note')
    noteTop.setAttribute('class', 'note-top')
    noteMiddle.setAttribute('class', 'note-middle')
    noteBottom.setAttribute('class', 'note-bottom')
    noteTitle.setAttribute('class', 'note-title')
    noteTitle.setAttribute('type', 'text')
    categoriesTools.setAttribute('class', 'categories-tools')
    saveBtn.setAttribute('class', 'save')
    editBtn.setAttribute('class', 'edit')
    deleteBtn.setAttribute('class', 'delete')
    cancelBtn.setAttribute('class', 'cancel hidden')
    noteTextInput.setAttribute('class', 'note-text--input hidden')
    noteText.setAttribute('class', 'note-text')
    attachmentContainer.setAttribute('class', 'attachment-container')
    attachments.setAttribute('class', 'attachments')
    attachmentsAddContainer.setAttribute('class', 'btn-label--add-container')
    attachmentsAddLabel.setAttribute('class', 'add-btn--label')
    attachmentsAddBtn.setAttribute('class', 'add-btn--container')
    inputDialog.setAttribute('type', 'file')
    inputDialog.setAttribute('accept', 'image/*')
    inputDialog.multiple = true
    inputDialog.setAttribute('class', 'input-dialog hidden')
    noteTitle.value = 'Edit title'
    saveBtn.textContent = 'save'
    editBtn.textContent = 'edit'
    deleteBtn.textContent = 'delete'
    cancelBtn.textContent = 'cancel'
    noteText.textContent = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, facilis numquam. Iusto ex quam tempore unde fuga ea voluptas, reprehenderit nemo, magni exercitationem omnis esse saepe impedit quia eligendi reiciendis.'
    attachments.innerHTML = 'images <sup class="attachments-count">5</sup>'
    attachmentsAddLabel.textContent = 'add images'
    categoriesTools.append(saveBtn)
    categoriesTools.append(editBtn)
    categoriesTools.append(deleteBtn)
    categoriesTools.append(cancelBtn)
    noteTop.append(noteTitle)
    noteTop.append(categoriesTools)
    noteMiddle.append(noteTextInput)
    noteMiddle.append(noteText)
    attachmentsAddContainer.append(attachmentsAddLabel)
    attachmentsAddContainer.append(attachmentsAddBtn)
    attachmentContainer.append(attachments)
    attachmentContainer.append(attachmentsAddContainer)
    attachmentContainer.append(inputDialog)
    noteBottom.append(attachmentContainer)
    note.append(noteTop)
    note.append(noteMiddle)
    note.append(noteBottom)
    note.addEventListener('click', e => {
        // e.preventDefault()
        noteClick(e.target)
    })
    notes.insertBefore(note, notes.firstElementChild)
    empty(emptyNoteText, notes)
}

function empty(value = '', container) {
    let emptyEl;
    if (container.children.length == 0) {
        emptyEl = document.createElement('span')
        emptyEl.id = 'empty-el'
        emptyEl.textContent = value
        container.append(emptyEl)
    } else {
        emptyEl = container.querySelector('#empty-el')
        if (emptyEl != null) {
            emptyEl.remove()
        }
    }
}