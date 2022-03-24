export function isValidate(value) {
    return value.length >= 10
}

export function createModal(title, context) {
    const modal = document.createElement('div')
    modal.classList.add('modal')

    modal.innerHTML = `
        <h1>${title}</h1>
        <div class = 'modal-content'>${context}</div>
    `

    mui.overlay('on', modal)
}