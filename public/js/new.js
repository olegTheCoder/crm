const { postForm } = document.forms;

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(postForm));


  if (formData.isAdmin === 'on') { formData.isAdmin = 'true'; } else formData.isAdmin = 'false';

  if (formData.login && formData.password && formData.isAdmin) {
    const response = await fetch('/admin/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      window.location = `${window.location.origin}/admin`;
    } else {
      document.getElementById('error').innerHTML = `<p style="color:red;">
      <b>Неверные данные</b></p>`;
    }
  } else {
    document.getElementById('error').innerHTML = `<p style="color:red;">
  <b>Не заполнены необходимые поля.</b></p>`;
  }
});
