// Select buttons

const [allUsersBtn, oneUserInput] = [document.querySelector('.nav__btn--allUsers'), document.querySelector('.nav__input')]

allUsersBtn.addEventListener('click', getAllUsers)
oneUserInput.addEventListener('input', getUser)

function getAllUsers() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.github.com/users', true)

    xhr.onload = function () {
        if (this.status == 200) {
            const users = JSON.parse(this.responseText)
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

    }
    xhr.send()

}

function getUser() {

    let inputValue = document.querySelector('.nav__input')

    // Empty the display Area
    document.querySelector('main').remove()
    let error = document.querySelector('.errorNotFound')
    if (error)
        error.remove()

    // Recreate the Main tag
    let main = document.createElement('main')
    document.body.appendChild(main)

    // AJAX the Github API
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `https://api.github.com/users/${inputValue.value}`, true)

    xhr.onload = function () {
        if (this.status == 200) {

            const user = JSON.parse(this.responseText)

            let output = ''
            output += 'Found successfully :'

            output += `<div class="user">
            <img class="user__img" src="${user.avatar_url}" alt="avatar of login: ${user.login}, id: ${user.id}">
            <ul class="user__list">
            <li class="user__infos">Login : ${user.login}</li>
            <li class="user__infos">ID : ${user.id}</li>
            </ul>
            </div>`
            document.querySelector('main').innerHTML += output
        } else if (this.status == 404) {
            document.querySelector("main").innerHTML += '<h1 class="errorNotFound"> Not Found!</h1'
        }
    }
    xhr.send()
}




