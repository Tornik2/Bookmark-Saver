const addBtn = document.querySelector('.modal-button')
const addBookmarkBtn = document.querySelector('.add-btn')
const nameInp = document.getElementById('name')
const urlInp = document.getElementById('URL')
const modal = document.getElementById('modal')
const modalContainer = document.getElementById('modal-container')
const bookmarksDiv = document.querySelector('.bookmarks')
const deleteBtn = document.querySelector('.delete-btn')
const closeModal = document.getElementById('close-modal')
let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))


if (bookmarks) {
    renderBookmarks()
} else {
    bookmarks = []
}
 
addBtn.addEventListener('click', handleButton)
addBookmarkBtn.addEventListener('click', () => {
    modalContainer.style.display = 'flex'
    modalContainer.style.backgroundColor = 'rgb(255 255 255/ 15%)'
})

function handleButton() {
    const siteName = nameInp.value
    const siteUrl = urlInp.value.split(' ').join('')
    
    if (siteName && siteUrl) {
        bookmarks.push({name: siteName, url: siteUrl})
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        renderBookmarks()
        nameInp.value = ''
        urlInp.value = ''
        modalContainer.style.display = 'none'
    }
}

function renderBookmarks() {
    bookmarksDiv.innerHTML = ''
    bookmarks.forEach(bookmark => {
        bookmarksDiv.innerHTML += `
        <div class="added-bookmark">
            <i class="delete-btn fa-solid fa-xmark " id=${bookmark.url}></i>
            <a id=${bookmark.url} href='https://www.${bookmark.url}' target= '_blank'>${bookmark.name}</a>
        </div>
        `
    })
}

document.body.addEventListener('click', (e)=> {
    
   if(e.target.classList[0] === 'delete-btn') {
    console.log(bookmarks)
    
    bookmarks = bookmarks.filter(bookmark=> {
        return bookmark.url !== e.target.id
    })
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    renderBookmarks()
    }    
})

closeModal.addEventListener('click', ()=> {
    modalContainer.style.display = 'none'

})

modalContainer.addEventListener('click', (e)=>{    
    if (e.target.id === 'modal-container') {
        modalContainer.style.display = 'none'
    }
})