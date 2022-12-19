let title = document.querySelectorAll('.title')
let categoriesName = document.querySelectorAll('.categories-name')
let menuIconContainers = document.querySelectorAll('.menu-icon--container')
let sidebar = document.querySelector('.sidebar')
let navItemContainer = document.querySelector('.nav .nav-item--container')

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