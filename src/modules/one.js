import { createModal, isValidate } from "./utils"
import { Question } from './question'
import { authWithEmailAndPassword, getAuthForm } from "./auth"

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
                console.log(question);
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

            const email = e.target.querySelector('#email').value
            const password = e.target.querySelector('#password').value

            authWithEmailAndPassword(email, password)
            .then(Question.fetch)
            // .then((token) => {
            //     return Question.fetch(token)
            // })
        }, {once: true})
    })
}

export default one
