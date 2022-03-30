import { Question } from "./question"
import { createModal, isValidate } from "./utils"
import { getAuthForm, authWithEmailAndPassword } from "./auth"

const one = () => {
    window.addEventListener('load', Question.renderList)

    const form = document.querySelector('#form')
    const input = form.querySelector('#input-question')
    const submitBtn = form.querySelector('#submit-btn')
    const modalBtn = document.querySelector('#modal-btn')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (isValidate(input.value)) {
            const question = {
                text: input.value.trim(),
                date: new Date().toJSON()
            }
            submitBtn.disabled = true
            Question.create(question).then(() => {
                console.log('question', question);
                input.value = ''
                input.className = ''
                submitBtn.disabled = false    
            })
        }
    })

    input.addEventListener('input', (e) => {
        submitBtn.disabled = !isValidate(input.value)
    })

    modalBtn.addEventListener('click', (e) => {
        createModal('Авторизация', getAuthForm())
        const authForm = document.querySelector('#auth-form')
        
        authForm.addEventListener('submit', (e) => {
            e.preventDefault()

            //!!!1
            const enterBtn = e.target.querySelector('#enter-btn')
            enterBtn.disabled = true
            //!!!1

            const email = e.target.querySelector('#email').value
            const password = e.target.querySelector('#password').value

            //!!!2
            authWithEmailAndPassword(email, password)
                .then(Question.fetch)
                // .then(token => {
                //     return Question.fetch(token)
                // })
                .then(renderModalAfterAuth)
                .then(() => enterBtn.disabled = false)
            //!!!2
        })
    })
    //!!!3
    function renderModalAfterAuth(content) {
        if (typeof content === 'string') {
            createModal('Ошибка!', content)
        } else {
            createModal('Список вопросов', Question.listToHTML(content))
        }
    }
    //!!!3
}

export default one