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

  // feature/tesk 3
    fetch(getUri(formData))
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      document.querySelector("#job-pannel").innerHTML = ""
      myJson.map(function(data){
        document.querySelector("#job-pannel").innerHTML += postHTML(data)
      });
    });
  })

  function getUri(data){
    return `https://still-spire-37210.herokuapp.com/positions.json?description=${data.description}&location=${data.location}&full_time=${data.full_time}`
  }

  function postHTML(data){
    return `<tr>
    <td>
      <h4><a href="${data.url}">${data.title}</a></h4>
      <p class="source">
      <a class="company" href="${data.company_url}">${data.company}</a>
      –
      <strong class="fulltime">${data.type}</strong>
      </p>
    </td>
    <td class="meta">
      <span class="location">${data.location}</span>
    </td>
  </tr>`
  }

})