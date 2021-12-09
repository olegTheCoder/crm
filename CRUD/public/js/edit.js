// const clientUpdate = document.querySelector('#changeForm')
// console.log(clientUpdate);
// clientUpdate.addEventListener('submit', async (e) => {
//   e.preventDefault()

//   const userData = { name: clientUpdate.name.value, adress: clientUpdate.adress.value, comments: clientUpdate.comments.value }
//   const { divid } = clientUpdate.dataset
//   const respon = await fetch(`/clients/${divid}`, {
//     method: "PUT",
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(userData)
//   })
//   window.location.assign('/clients')


// })
