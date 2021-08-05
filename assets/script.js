let list = document.getElementById("list");
let input_text = document.getElementById("input-text");

let url = `https://610990bad71b6700176399bd.mockapi.io/todos`;
let tasks = [];
let tasksLoad = fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((e) => {
      tasks.push(e);
      addToDo(e.title, e.completed, e.id);
    });
  });

let addToDo = (title, completed, id) => {
  let clicked = completed ? "clicked" : "";
  let item = `
              <li  class = ${clicked}>
            <span><i class="fas fa-check"></i></span>
            <span onclick="complete_task(this,${id})">${title}</span>
           <span onclick="delete_task(this,${id})"><i class="fas fa-times"></i></span>
          </li>            
    `;

  let position = "beforeend";

  list.insertAdjacentHTML(position, item);
};

let insertTask = () => {
  event.preventDefault();
  let id = parseInt(tasks[tasks.length - 1].id) + 1;
  let title = input_text.value;
  if (title) {
    addToDo(title, false, id);
    let data = { title: title, completed: false, id: id };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  input_text.value = "";
};

let complete_task = (element, id) => {
  let completed = element.parentElement.classList.toggle("clicked");
  let data = tasks.find((e) => e.id == id);
  data = { ...data, completed: completed };

  fetch(url + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

let delete_task = (element, id) => {
  fetch(url + `/${id}`, {
    method: "DELETE",
  });
  element.parentElement.remove();
};
