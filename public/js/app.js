const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading Message'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=?'+location).then((response)=> {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            messageOne.textContent= data.error
        }
        else
        {
            messageOne.textContent = data.Location
            messageTwo.textContent = data.forecast
            console.log(data.Location)
            console.log(data.forecast)
        }
    })
    })
    
    console.log(location)
})