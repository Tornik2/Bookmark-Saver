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
    modalContainer.style.backgroundColor = 'rgb(106 192 192/ 30%)'
})
function handleButton() {
    const siteName = nameInp.value
    const siteUrl = urlInp.value
    console.log()
    if (siteName && siteUrl) {
        bookmarks.push({name: siteName, url: siteUrl})
        console.log(bookmarks)
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
            <button class="delete-btn" id=${bookmark.url}>X</button>
            <a id=${bookmark.url} href='https://www.${bookmark.url}' target= '_blank'>${bookmark.name}</a>
        </div>
        `
    })
}

document.body.addEventListener('click', (e)=> {
    
   if(e.target.classList[0] === 'delete-btn') {
    bookmarks = bookmarks.filter(bookmark=> bookmark.url !== e.target.id)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    renderBookmarks()
   
    }    
})

closeModal.addEventListener('click', ()=> {
    modalContainer.style.display = 'none'

})

modalContainer.addEventListener('click', (e)=>{
    console.log(e.target.id)
    
    if (e.target.id === 'modal-container') {
        e.stopPropagation()
        modalContainer.style.display = 'none'
    }
})