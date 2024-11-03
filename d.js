function toggleForm() {
    var form = document.getElementById("list-add");
    form.classList.toggle("hidden");
  }
  
  let titleInput = document.getElementById("title");
  let dateInput = document.getElementById("date");
  let listInput = document.getElementById("list");
  let selectInput = document.getElementById("select");
  let descriptionInput = document.getElementById("description");
  let submitInput = document.getElementById("submet");
  let updateInput = document.getElementById("update");
  
  let array = [];
  let editingIndex = -1;
  const oldDate = new Date('2024-11-06');
  
  submitInput.addEventListener("click", function(event) { 
    if (titleInput.value !== "" && dateInput.value !== "" && listInput.value !== "" && selectInput.value !== "" && descriptionInput.value !== "") { 
      let userDate = new Date(dateInput.value); 
      if (userDate < oldDate) { 
        alert('Please enter a more recent date.'); 
      } else { 
        add_to_array(titleInput.value, dateInput.value, listInput.value, selectInput.value, descriptionInput.value); 
        renderTask(); 
        toggleForm(); 
      } 
    } else { 
      alert("Please fill all fields!"); 
    } 
  });
  
  updateInput.addEventListener("click", function(event) {
    if (titleInput.value !== "" && dateInput.value !== "" && listInput.value !== "" && selectInput.value !== "" && descriptionInput.value !== "") {
        array[editingIndex] = {
            title: titleInput.value,
            date: dateInput.value,
            status: listInput.value,
            priority: selectInput.value,
            desc: descriptionInput.value
        };
        renderTask();
        toggleForm();
        submitInput.classList.remove("hidden");
        updateInput.classList.add("hidden");
    } else {
        alert("please fill all fields!");
    }
  });
  
  function add_to_array(title, date, status, priority, description) {
    let card_object = {
        title: title,
        date: date,
        status: status,
        priority: priority,
        desc: description
    };
    array.push(card_object);
    clearFormInputs();
  }
  
  function renderTask() {
    let todoList = document.querySelector(".todo");
    let doingList = document.querySelector(".doing");
    let doneList = document.querySelector(".done");
  
    let todoCount = 0;
    let doingCount = 0;
    let doneCount = 0;

    todoList.innerHTML = "";
    doingList.innerHTML = "";
    doneList.innerHTML = "";
  
    array.forEach(function(item, index, ) {
        let li = document.createElement("li");
        li.classList.add('border', 'p-2', 'mb-2', 'rounded', 'break-words');
  
        if (item.priority === "p1") {
            li.classList.add('bg-red-500');
        } else if (item.priority === "p2") {
            li.classList.add('bg-orange-500');
        } else if (item.priority === "p3") {
            li.classList.add('bg-green-500');
        }

        li.innerHTML =
            ` <div> <p><strong>Title:</strong> ${item.title}</p>
              <p><strong>Date:</strong> ${item.date} </p><br>
              <div class="flex justify-between" >
            <button class="delete-btn bg-red-600 text-white border-none rounded-full px-4 py-2 mr-2 hover:bg-red-700" onclick="deleteTask(${index})">Delete</button> 
            <button class="edit-btn bg-blue-600 text-white border-none rounded-full px-4 py-2 hover:bg-blue-700" onclick="editTask(${index})">Edit</button>
              </div>`;
  
        if (item.status === "To do") {
            todoList.appendChild(li);
            todoCount++;
        } else if (item.status === "Doing") {
            doingList.appendChild(li);
            doingCount++;
        } else if (item.status === "Done") {
            doneList.appendChild(li);
            doneCount++;
        }
    });

    todoCounter.textContent = todoCount;
    doingCounter.textContent = doingCount;
    doneCounter.textContent = doneCount;
  }


  function editTask(index) {
    editingIndex = index;
    let item = array[index];
    titleInput.value = item.title;
    dateInput.value = item.date;
    listInput.value = item.status;
    selectInput.value = item.priority;
    descriptionInput.value = item.desc;
  
    toggleForm();
    submitInput.classList.add("hidden");
    updateInput.classList.remove("hidden");
  }
  function deleteTask(index) { 
    array.splice(index, 1); 
    renderTask();
    }
  function clearFormInputs() {
    titleInput.value = "";
    dateInput.value = "";
    listInput.value = "";
    selectInput.value = "";
    descriptionInput.value = "";
  }