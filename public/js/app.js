console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const error = document.querySelector('#error')
const responseText = document.querySelector('#response')

responseText.textContent =''
error.textContent =''

weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  error.textContent = 'Loading....'
  responseText.textContent ='';
  const address = search.value
  if (!address) {
      //return console.log("Please provide an address")
      return error.textContent = 'Please provide an address'
  }
  fetch('/weather?address='+address).then((response)=> {
    response.json().then((data)=>{
       if (data.error) {
           //return console.log(data.error)
           return error.textContent = data.error
       }
       const {forecast, place_name} = data
       error.textContent = ''
       responseText.textContent = "In "+place_name+' '+forecast
       console.log(data)
    })
 })
})