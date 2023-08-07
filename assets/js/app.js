const addButton = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementsByClassName("task-list-box")[0];

addButton.addEventListener("click", function () {
  AddTask(taskInput);
  InputValueRemove(taskInput);
});

let index = 0;

function AddTask(input) {
  if (input.value.trim() != "") {
    if(taskList.childElementCount==0){
        taskList.style.visibility="visible";
    }
    index++;
    taskList.innerHTML += `
       <div class="list-item">
       <span class="index">${index}</span>
       <p class="text">${input.value}</p>
       <div class="operation-box">
           <button class="edit">
               Edit
           </button>
           <button class="delete">
               Delete
           </button>
       </div>
       </div>
       `;
  } else {
    alert("Xananı boş saxlamıyın");
  }

  RemoveTask(document.querySelectorAll(".delete"));
}

function InputValueRemove(input) {
  input.value = "";
}

function RemoveTask(deleteBtn) {
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = function () {
      index--;
      for (let j = i; j < deleteBtn.length; j++) {
        let count = deleteBtn[j].parentElement.parentElement.children[0];
        count.innerText = parseInt(count.innerText) - 1;
      }
      this.parentElement.parentElement.remove();
    };
  }
}
