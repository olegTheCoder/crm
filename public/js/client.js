

const btn = document.querySelectorAll('.btnDeleteClient')
// console.log(btn);
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', async (e) => {
    e.preventDefault()

    console.log(e.target);
    const { divid } = e.target.dataset
    // console.log(e.target.dataset);
    console.log('------>', divid);
    const respon = await fetch(`/clients/${divid}`, {
      method: "DELETE"
    })
    e.target.closest('.clientDiv').remove()

  })

}



const btnOrd = document.querySelectorAll('.btnDeleteOrder')
console.log(btnOrd);
for (let i = 0; i < btnOrd.length; i++) {
  btnOrd[i].addEventListener('click', async (e) => {
    e.preventDefault()

    console.log(e.target);
    const { divid } = e.target.dataset
    // console.log(e.target.dataset);
    console.log('------>', divid);
    const respon = await fetch(`/clients/basket/${divid}`, {
      method: "DELETE"
    })
    e.target.closest('.orderDiv').remove()

  })

}

if (document.querySelector('#changeForm')) {
  const clientUpdate = document.querySelector('#changeForm')
  clientUpdate.addEventListener('submit', async (e) => {
    e.preventDefault()

    const userData = { name: clientUpdate.name.value, adress: clientUpdate.adress.value, comments: clientUpdate.comments.value }
    const { divid } = clientUpdate.dataset
    const respon = await fetch(`/clients/${divid}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    window.location.assign('/clients')


  })
}



if (document.getElementById('changeFormBasket')) {
  const orderUpdate = document.getElementById('changeFormBasket')
  console.log(orderUpdate);
  orderUpdate.addEventListener('submit', async (e) => {
    e.preventDefault()

    console.log(123123123);

    const orderData = {
      orderNumber: orderUpdate.orderNumber.value,
      type: orderUpdate.type.value,
      price: orderUpdate.price.value,
      // deliveryCost: orderUpdate.deliveryCost.value,
      // setupCost: orderUpdate.setupCost.value,
      comments: orderUpdate.comments.value,
      deliveryDate: orderUpdate.deliveryDate.value,
      setupDate: orderUpdate.setupDate.value,
      courierTeam: orderUpdate.courierTeam.value,
      setupTeam: orderUpdate.setupTeam.value,
      status: orderUpdate.status.value
    }
    console.log("------------------->");
    const { divid } = orderUpdate.dataset
    const respon = await fetch(`/clients/basket/change/${divid}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(orderData)
    })

    const result = await respon.json()
    console.log(result);
    window.location.assign(`/clients/${result.superId}`)

  })
}




