// console.log('Client side js file is loaded')

const url = '/weather?address='

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

//  msgOne.textContent = 'From JS'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    msgOne.textContent = 'Loading ...'
    msgTwo.textContent = ''

    fetch(url+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msgOne.textContent = data.error
            } 
            else{
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })
})