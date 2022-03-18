import { Question } from "./question";
import { isValidate } from "./validation"

const one = () => {
    window.addEventListener('load', Question.renderList)

    const form = document.querySelector('#form')
    console.log(form);
    const input = form.querySelector('#input-question')
    const submitBtn = form.querySelector('.mui-btn')

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


}

export default one
