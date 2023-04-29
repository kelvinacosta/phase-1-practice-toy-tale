//const { create } = require("jsdom/lib/jsdom/living/generated/Blob");

let addToy = false;
function updateLikes(id, numberOfLikes){
  fetch(`http://localhost:3000/toys/${id}`,{
    
    method:"PATCH",  
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
      "likes": numberOfLikes
          })
      })
      .then(res => res.json())
}

/*
1. Access the list of toys from an API (mocked using JSON Server) and render
   each of them in a "card" on the page
2. Hook up a form that enables users to add new toys. Create an event listener
   so that, when the form is submitted, the new toy is persisted to the database
   and a new card showing the toy is added to the DOM
3. Create an event listener that gives users the ability to click a button to
   "like" a toy. When the button is clicked, the number of likes should be
   updated in the database and the updated information should be rendered to the
   DOM

*/
function createCardElement(toy){
  //make a <div class='card'>
  let card = document.createElement('div')
  //add card class
  card.classList.add('card')

  let h2 = document.createElement('h2')
  h2.textContent = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  img.classList.add('toy-avatar')

  let p = document.createElement('p')
  p.textContent = `${toy.likes} likes`



  let button = document.createElement('button')
  button.addEventListener('click',() =>{
    //update likes element
    p.textContent = `${toy.likes += 1} Likes`
    // patch 
    updateLikes(toy.id,toy.likes)
    
    })
  button.classList.add('like-btn')
  button.id = toy.id
  button.textContent = 'Like ❤️'

  card.append(h2, img, p, button)
  document.getElementById('toy-collection').appendChild(card)


}
function sendItOut(newToy){
  fetch('http://localhost:3000/toys',{
  
  method: "POST",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  
  body: JSON.stringify({
    ...newToy,
    "likes": 0
  })}).then((res)=> res.json())
  .then(responseToy => createCardElement(responseToy))
  
}


document.addEventListener("DOMContentLoaded", () => {
  
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(toy => createCardElement(toy)))

  const form = document.querySelector('form.add-toy-form')
  form.addEventListener('submit',(e) =>{
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    console.log(formData)
    sendItOut(formData)

  })
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});








