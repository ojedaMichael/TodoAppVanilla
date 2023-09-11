  const taskInput = document.getElementById("tasksInput");
  const addTaskBtn = document.getElementById("botonAdd");
  const taskList = document.getElementById("tasks");
  const allBtn = document.getElementById("all");
  const activeBtn = document.getElementById("active");
  const completedBtn = document.getElementById("complete");
  const clearCompletedBtn = document.getElementById("clearCompletedBtn");
  const option = document.querySelectorAll(".option")
  const contents = document.querySelectorAll(".content")
  
  
  option.forEach((Elem, index)=>{
    Elem.addEventListener("click", () =>{
      option.forEach((op)=>{
        if(op.classList[1]=== "active"){
          op.classList.remove("active")
  
        }
      })
    
      
  
      Elem.classList.toggle("active")
    })
  })

  // Cargar tareas desde el localStorage al cargar la página
  loadTasksFromLocalStorage();

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const taskItem = createTaskElement(taskText, false);
      taskList.appendChild(taskItem);
      saveTaskToLocalStorage(taskText, false);
      taskInput.value = "";
    }
  });

  // Crear un elemento de tarea con el texto y el estado proporcionados
  function createTaskElement(text, completed) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <div id="tasksItem">
        <input type="checkbox" ${completed ? "checked" : ""}>
        <span ${completed ? 'class="completed"' : ''}>${text}</span>
      </div>
     
      <div><i id="icon1" class="fa-regular fa-trash-can deleteBtn"></i></div>
    `;

    const deleteBtn = taskItem.querySelector(".deleteBtn");
    const checkbox = taskItem.querySelector("input[type='checkbox']");
    
    checkbox.addEventListener("change", () => {
      taskItem.querySelector("span").classList.toggle("completed", checkbox.checked);
      updateTaskInLocalStorage(text, checkbox.checked);
    });

    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(taskItem);
      deleteTaskFromLocalStorage(text);
    });

    return taskItem;
  }

  allBtn.addEventListener("click", () => {
    showAllTasks();
  });

  activeBtn.addEventListener("click", () => {
    showActiveTasks();
  });

  completedBtn.addEventListener("click", () => {
    showCompletedTasks();
  });

  clearCompletedBtn.addEventListener("click", () => {
    clearCompletedTasks();
  });

  function showAllTasks() {
    taskList.querySelectorAll("li").forEach(taskItem => {
      taskItem.style.display = "flex";
    });
  }

  function showActiveTasks() {
    taskList.querySelectorAll("li").forEach(taskItem => {
      const checkbox = taskItem.querySelector("input[type='checkbox']");
      if (!checkbox.checked) {
        taskItem.style.display = "flex";
      } else {
        taskItem.style.display = "none";
      }
    });
  }
  console.log(4);
  function showCompletedTasks() {
    taskList.querySelectorAll("li").forEach(taskItem => {
      const checkbox = taskItem.querySelector("input[type='checkbox']");
      if (checkbox.checked) {
        taskItem.style.display = "flex";
      } else {
        taskItem.style.display = "none";
      }
    });
  }

  function clearCompletedTasks() {
    taskList.querySelectorAll("li").forEach(taskItem => {
      const checkbox = taskItem.querySelector("input[type='checkbox']");
      if (checkbox.checked) {
        taskList.removeChild(taskItem);
        deleteTaskFromLocalStorage(taskItem.querySelector("span").textContent);
      }
    });
  }

  // Guardar tarea en el localStorage
  function saveTaskToLocalStorage(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Actualizar tarea en el localStorage
  function updateTaskInLocalStorage(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.text === text);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  // Eliminar tarea del localStorage
  function deleteTaskFromLocalStorage(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  // Cargar tareas desde el localStorage
  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
      const taskItem = createTaskElement(task.text, task.completed);
      taskList.appendChild(taskItem);
    });
  }

  