document.addEventListener('DOMContentLoaded',function(){


  // feature/task 1
  document.querySelector('#navbar-burger').addEventListener('click', function(){
    document.querySelector('#navbar-burger').classList.toggle("is-active")
    document.querySelector('#navbar-menu').classList.toggle("is-active")
  })

  // feature/task 2
  let form = document.querySelector('#search-job')
  let url = "https://still-spire-37210.herokuapp.com/positions.json"
  let counter = 2
  let tableContent = document.querySelector("#job-pannel")
  let formData = {}

  form.addEventListener('submit', function(e){
    e.preventDefault();
    document.querySelector("a.pagination-next").setAttribute("disabled","")
    counter = 2
    formData = 
      {
        "description": form.elements["description"].value,
        "location": form.elements["location"].value,
        "full_time": form.elements["full_time"].checked
      }

  // feature/task 3
    fetch(getUri(formData))
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      tableContent.innerHTML = ""
      myJson.map(function(data){
        tableContent.innerHTML += postHTML(data)
      });
      if(myJson.length === 50)
      {
        fetch(getUri(formData) + pagination(getUri(formData)))
        .then(function(resp) {
          return resp.json();
        })
        .then(function(p2) {
          if(p2.length > 0){
            document.querySelector("a.pagination-next").removeAttribute("disabled");
          }
        })
      }    
    });

    document.querySelector("a.pagination-next").addEventListener('click', function(e){
      e.preventDefault();
      if(document.querySelector("a[disabled]") === null){
        fetch(getUri(formData) + pagination(getUri(formData)))
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          myJson.map(function(data){
            tableContent.innerHTML += postHTML(data)
          });
          if(myJson.length < 50){
            document.querySelector("a.pagination-next").setAttribute("disabled", "")
          }
          counter++;
        })
      }
    })

  })

  function getUri(data){
    let searchUrl = Object.keys(data).reduce(function(accu, e){
      if(data[`${e}`].length === 0 || data[`${e}`] === false){
        return accu
      }else if(data[`${e}`] === true && accu.length === 0){
        return accu + e + "=on"
      }else if(data[`${e}`] === true && accu.length !== 0){
        return accu + "&" + e + "=on"
      }else if(data[`${e}`].length !== 0 && accu.length !== 0){
        return accu + "&" + e + "=" + data[`${e}`]
      }else{
        return accu + e + "=" + data[`${e}`]
      }
    }, "")
    if(searchUrl.length === 0){
      return url
    }else{
      return url + "?" + searchUrl
    }
  }

  function pagination(s){
    if(/.json/.test(s.slice(-5))){
      return `?page=${counter}`
    }else{
      return `&page=${counter}`
    }
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