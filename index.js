document.addEventListener('DOMContentLoaded',function(){

  // feature/tesk 1
  document.querySelector('#navbar-burger').addEventListener('click', function(){
    document.querySelector('#navbar-burger').classList.toggle("is-active")
    document.querySelector('#navbar-menu').classList.toggle("is-active")
  })

  // feature/tesk 2
  let form = document.querySelector('#search-job')
  
  form.addEventListener('submit', function(e){
    e.preventDefault();
    let formData = 
      {
        "description": form.elements["description"].value,
        "location": form.elements["location"].value,
        "full_time": form.elements["full_time"].checked
      }

    fetch(getUri(formData))
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
    });
  })

  function getUri(data){
    return `https://still-spire-37210.herokuapp.com/positions.json?description=${data.description}&location=${data.location}&full_time=${data.full_time}`
  }


})