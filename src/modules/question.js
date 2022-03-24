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

    static fetch(token) {
        return fetch('https://question-app-85d33-default-rtdb.europe-west1.firebasedatabase.app/questions.json')
        .then(response => response.json())
        .then(questions => {
            console.log('Questions', questions);
        })
    }
}

function addToLocalStorage(question) {
    const all = getQuestionFromLocalStorage()
    all.push(question)
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
        <div>${question.text}</div>
        <br>
    `
}