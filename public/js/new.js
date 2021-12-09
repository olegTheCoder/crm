const postForm = document.forms.postForm

postForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(postForm));
  console.log('client---->', formData);

  if (formData.login && formData.password && formData.isAdmin) {
    const response = await fetch('/admin/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (response.ok) {
      window.location = `${window.location.origin}/admin`
    } else {
      document.getElementById('error').innerHTML = `<p style="color:red;">
      <b>Не заполнены необходимые поля.</b></p>`
    }
  } else {
    document.getElementById('error').innerHTML = `<p style="color:red;">
  <b>Не заполнены необходимые поля.</b></p>`}
})
