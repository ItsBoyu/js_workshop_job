document.addEventListener('DOMContentLoaded',function(){

  // feature/tesk 1
  document.querySelector('#navbar-burger').addEventListener('click', function(){
    document.querySelector('#navbar-burger').classList.toggle("is-active")
    document.querySelector('#navbar-menu').classList.toggle("is-active")
  })

})