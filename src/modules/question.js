export class Question {
    static create(question) {
        return fetch('https://question-app-85d33-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            question.id = data.name
            return question
        })
        .then(addToLocalStorage)
        .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionFromLocalStorage()

        const html = questions.length
        ? questions.map(toCard).join('')
        : `<div>Вопросов нет</div>`

        const list = document.querySelector('.list')
        list.innerHTML = html
    }

    //!!!1
    static fetch(token) {
        if (!token) {
            return Promise.resolve(`<p class = 'error'>Нет токена</p>`)
        }
        return fetch(`https://question-app-85d33-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
        .then(response => response.json())
        .then(response => {
            if (response && response.error) {
                return `
                <p class = 'error'>${response.error}</p>
                `
            }

            return response
            ? Object.keys(response).map(key => ({
                ...response[key],
                id: key
            }))
            : []
        })
    }

    static listToHTML(questions) {
        return questions.length
        ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol`
        : `<p>Вопросов нет</p>`
    }
    //!!!1
}

function addToLocalStorage(question) {
    const all = getQuestionFromLocalStorage()
    all.unshift(question)
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    return `
    <div>
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>
    ${question.text}
    </div>
    `
}