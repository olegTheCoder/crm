const adminForm = document.querySelector('[data-admin]');


adminForm.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.dataset.type === 'delete') {
    const oneadmin = event.target.closest('[data-userid]');
    const id = oneadmin.dataset.userid;
    const response = await fetch(`${window.location.origin}/admin/${id}/edit`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id
      }),
    });
    if (response.ok) {
      oneadmin.parentNode.parentNode.remove();
    } else {
      alert('Ошибка удаления');
    }
  }
  if (event.target.dataset.type === 'edit') {
    const oneadmin = event.target.closest('[data-userid]');
    const id = oneadmin.dataset.userid;
    const status = oneadmin.dataset.status;
    const response = await fetch(`${window.location.origin}/admin/${id}/edit`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    const data = await response.json();
    if (response.status === 200) {
      const button = document.getElementById(`${id}`)
      button.innerText = data.newStatus
    } else {
      alert('Ошибка');
    }
  }
});

