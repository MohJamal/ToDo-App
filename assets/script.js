let list = document.getElementById("list");
let input_text = document.getElementById("input-text")

let addToDo = (toDo) => {
    let item = `
              <li onclick="complete_task(this)">
            <span><i class="fas fa-check"></i></span>
            <span>${toDo}</span>
           <span onclick="delete_task(this)"><i class="fas fa-times"></i></span>
          </li>            
    `

    let position= 'beforeend'

    list.insertAdjacentHTML(position, item)

}


insertTask = () =>{
    event.preventDefault();
    let task = input_text.value;
    if(task){
            addToDo(task);
    }
    input_text.value="";
}


complete_task= (element) =>{
     element.classList.toggle("clicked");
     element.children[0].classList.toggle("visible");
     element.children[1].classList.toggle("lineThrough");
}

delete_task= (element) =>{
    element.parentElement.remove();
}