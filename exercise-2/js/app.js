var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add");
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString, completed) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  checkBox.checked = completed;
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  if (completed) {
    completedTasksHolder.appendChild(listItem);
  } else {
    incompleteTasksHolder.appendChild(listItem);
  }

  return listItem;
};

var addTask = function () {
  if (!taskInput.value) {
    alert("Task name could not be empty!");
    return;
  }
  var listItemName = taskInput.value;
  var data = localStorageTaskCreate({ value: listItemName, checked: false });
  var listItem = createNewTaskElement(listItemName, false);
  bindTaskEvents(listItem, taskCompleted, data);
  taskInput.value = "";
};

var editTask = function (el, data) {
  var listItem = el.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var button = listItem.querySelector("button.edit");
  var checkBox = listItem.querySelector("input[type=checkbox]");

  var containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
    label.innerText = editInput.value
    button.innerText = "Edit";
  } else {
    editInput.value = label.innerText
    button.innerText = "Save";
  }

  // Edit task name
  button.addEventListener("click", function () {
    var updatedData = localStorageTaskUpdate({
      ...data,
      value: editInput.value,
    });

    // Need to bind again for updated local storage data
    if (checkBox.checked) {
      bindTaskEvents(listItem, taskIncomplete, updatedData);
    } else {
      bindTaskEvents(listItem, taskCompleted, updatedData);
    }
  });

  listItem.classList.toggle("editMode");
};

var deleteTask = function (el, data) {
  var listItem = el.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  localStorageTaskDelete(data);
};

var transferListItem = function (el, target) {
  var oldListItem = el.parentNode;
  var newListItem = oldListItem.cloneNode(true);

  oldListItem.parentNode.removeChild(oldListItem);
  target.appendChild(newListItem);

  return newListItem;
}

var taskCompleted = function (el, data) {
  var newListItem = transferListItem(el, completedTasksHolder);
  data = localStorageTaskUpdate({ ...data, checked: true });
  bindTaskEvents(newListItem, taskIncomplete, data);
};

var taskIncomplete = function (el, data) {
  var newListItem = transferListItem(el, incompleteTasksHolder);
  data = localStorageTaskUpdate({ ...data, checked: false });
  bindTaskEvents(newListItem, taskCompleted, data);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler, data) {
  // Clone new list item to remove all existing event listeners
  var newTaskListItem = taskListItem.cloneNode(true);
  taskListItem.parentNode.replaceChild(newTaskListItem, taskListItem);

  var checkBox = newTaskListItem.querySelector("input[type=checkbox]");
  var editButton = newTaskListItem.querySelector("button.edit");
  var deleteButton = newTaskListItem.querySelector("button.delete");

  editButton.addEventListener('click', function () {
    editTask(this, data);
  });
  deleteButton.addEventListener('click', function () {
    deleteTask(this, data);
  });
  checkBox.addEventListener('change', function () {
    checkBoxEventHandler(this, data);
  });
};

addButton.addEventListener("click", addTask);

/**
 * Manage LocalStorage Tasks
 */

var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

for (var i = 0; i < tasks.length; i++) {
  var listItem = createNewTaskElement(tasks[i].value, tasks[i].checked);
  bindTaskEvents(listItem, tasks[i].checked ? taskIncomplete : taskCompleted, tasks[i]);
}

var generateTaskId = function () {
  return Math.random().toString(36).substring(7);
}

var getTaskIndex = function (id) {
  for (var i = 0; i < tasks.length; i ++) {
    if (tasks[i].id === id) {
      return i;
    }
  }

  return -1;
}

var localStorageTaskCreate = function (data) {
  data.id = generateTaskId();
  tasks.push(data);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return data;
}

var localStorageTaskUpdate = function (data) {
  var index = getTaskIndex(data.id);

  if (index !== -1) {
    tasks[index] = data;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  return data;
}

var localStorageTaskDelete = function (data) {
  var index = getTaskIndex(data.id);

  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
