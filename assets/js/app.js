const addButton = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementsByClassName("task-list-box")[0];

addButton.addEventListener("click", function () {
  addTask(taskInput);
  inputValueRemove(taskInput);
});

let index = 0;

function addTask(input) {
  if (input.value.trim() != "") {
    if (taskList.childElementCount === 0) {
      taskList.style.visibility = "visible";
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
    // alert("Xananı boş saxlamıyın");
    Swal.fire({
      text: 'Xananı boş saxlamıyın',
      icon: 'warning',
      confirmButtonText: 'Ok'
    })
  }
  editTask(document.querySelectorAll(".edit"))
  removeTask(document.querySelectorAll(".delete"));
}

function inputValueRemove(input) {
  input.value = "";
}

function removeTask(deleteBtn) {
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = function () {
      Swal.fire({
        title: "Do you want to delete the information?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          index--;
          for (let j = i; j < deleteBtn.length; j++) {
            let count = deleteBtn[j].parentElement.parentElement.children[0];
            count.innerText = parseInt(count.innerText) - 1;
          }
          this.parentElement.parentElement.remove();
          hideTaskListBox();
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    };
  }
}


function editTask(editBtn) {
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].onclick = function (e) {
      const taskTextElem = e.target.parentElement.parentElement.getElementsByClassName('text')[0];
      const taskText = taskTextElem.innerText;
      Swal.fire({
        title: "Edit your task",
        input: "text",
        inputValue: taskText,
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Edit",
      }).then((result) => {
        if (result.isConfirmed) {
          taskTextElem.innerText = result.value;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your wotaskrk has been edited",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });

    }
  }

}

function hideTaskListBox() {
  taskList.style.visibility = taskList.childElementCount > 0 ? 'visible' : 'hidden';
}

