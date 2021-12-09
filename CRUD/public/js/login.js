const logForm = document.forms.logForm
const error = document.getElementById('error')

logForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const inputs = Object.fromEntries(new FormData(logForm));

  const response = await fetch('/user', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ inputs })
  })

  if (response.ok) {
    window.location = '/client'
  } else {
    document.getElementById('error').innerHTML = `<p style="color:red;">
    <b>Не подходят учётные данные или у вас пустые поля.</b></p>`
  }

});