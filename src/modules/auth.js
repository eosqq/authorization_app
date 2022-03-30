export function getAuthForm() {
  return `
  <form class="mui-form" id="auth-form">
  <div class="mui-textfield mui-textfield--float-label">
    <input type="text" id="email" required>
    <label for="email">Email</label>
  </div>
  <div class="mui-textfield mui-textfield--float-label">
    <input type="text" id="password" required>
    <label for="password">Пароль</label>
  </div>
  <button
      type="submit"
      class="mui-btn mui-btn--raised mui-btn--primary"
      id="enter-btn"
      >
      Войти
  </button>
</form>
  `
}

//!!!
export function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyA7kOhOqQ3va8sLgc0r7ukIwBB_I6j4psE'

  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email: email, password: password, returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => data.idToken)
}
//!!!
