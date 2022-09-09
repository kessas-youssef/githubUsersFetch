/* AJAX Procedure */

// Select buttons
const [allUsersBtn, oneUserInput] = [document.querySelector('.nav__btn--allUsers'), document.querySelector('.nav__input')]


// Get all users
allUsersBtn.addEventListener('click', () => getData((users) => {
    let output = ''
    output += '<h1>All USERS</h1>'
    users.forEach(user => {
        output += `<div class="user">
        <img class="user__img" src="${user.avatar_url}" alt="avatar of login: ${user.login}, id: ${user.id}">
        <ul class="user__list">
        <li class="user__infos">Login : ${user.login}</li>
        <li class="user__infos">ID : ${user.id}</li>
        </ul>
        </div>`
    });
    document.querySelector("main").innerHTML += output
}
    ,
    'https://api.github.com/users'))


// Get user by "Login"
oneUserInput.addEventListener('input', () => getData((user) => {

    let output = ''
    output += '<h1 class="successFound">Found successfully :</h1>'

    output += `<div class="user">
            <img class="user__img" src="${user.avatar_url}" alt="avatar of login: ${user.login}, id: ${user.id}">
            <ul class="user__list">
            <li class="user__infos">Login : ${user.login}</li>
            <li class="user__infos">ID : ${user.id}</li>
            </ul>
            </div>`
    document.querySelector('main').innerHTML += output
}
    ,
    `https://api.github.com/users/${document.querySelector('.nav__input').value}`))


function getData(whatToDo, source) {
    emptyMain()
    const xhr = new XMLHttpRequest()
    xhr.open('GET', source, true)

    xhr.onload = function () {
        if (this.status == 200) {
            const data = JSON.parse(this.responseText)
            whatToDo(data)
        }
        else if (this.status == 404) {
            document.querySelector('main').innerHTML += '<h1 class="errorNotFound"> Not Found!</h1'
        }
    }
    xhr.send()
}

const emptyMain = () => {
    // Empty the display Area
    document.querySelector('main').remove()
    let error = document.querySelector('.errorNotFound')
    if (error)
        error.remove()

    // Recreate the Main tag
    let main = document.createElement('main')
    document.body.appendChild(main)
}
