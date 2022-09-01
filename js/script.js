let tasks = []


init();

function init(){
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    drawTasks();
}


function drawTasks() {
    const todoContainer = document.querySelector('#todo-list');
    const doneContainer = document.querySelector('#done-list');


    todoContainer.innerHTML = '';
    doneContainer.innerHTML = '';

    const todos = tasks.filter(task => !task.done)
    const done = tasks.filter(task => task.done)

    todos.forEach(task => {
        const taskDom = drawTaskNode(task);
        todoContainer.append(taskDom)

        /*  const taskDom = drawTaskHTML(task);
         todoContainer.innerHTML += taskDom; */
    })

    done.forEach(task => {
        const taskDom = drawTaskNode(task);
        doneContainer.append(taskDom)

        /*  const taskDom = drawTaskHTML(task);
         doneContainer.innerHTML += taskDom; */
    })

    //setUpdateEvents();

}


function drawTaskNode(task) {
    const taskContainer = document.createElement('div')
    taskContainer.classList.add('task');
    taskContainer.id = 'task-' + task.id;

    if (task.priority) {
        const priority = document.createElement('span');
        priority.classList.add('priority');
        taskContainer.append(priority)
    }

    const label = document.createElement('label')
    label.setAttribute('for', 'task-checkbox-' + task.id)
    label.classList.add('title');
    label.innerText = task.title;

    const icon = document.createElement('i');
    icon.classList.add('bi-pencil');

    label.append(icon);
    taskContainer.append(label);

    const input = document.createElement('input');
    input.id = "task-checkbox-" + task.id
    input.setAttribute('type', 'checkbox')
    input.checked = task.done;

    input.addEventListener('change', () => {
        task.done = input.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks))
        drawTasks();
    })

    icon.addEventListener('click', (event) => {
        event.preventDefault()
        openModal();
        editTask(task)
    })

    taskContainer.append(input);

    return taskContainer

}
/*
function drawTaskHTML(task) {
    return `<div class="task" id="task-${task.id}">
        ${
            task.priority ? 
            '<span class="priority"></span>'
            : ''
        }
        <label for="task-checkbox-${task.id}"  class="title">
        ${task.title}
        <i class="bi-pencil" ></i>
        </label>
        <input id="task-checkbox-${task.id}" data-id="${task.id}" type="checkbox" ${task.done ? 'checked' : ''}>
    </div>`
} */

/* function setUpdateEvents() {
    document.querySelectorAll('.task')
        .forEach(taskDom => {
            const icon = taskDom.querySelector('i');
            const input = taskDom.querySelector('input')

            input.addEventListener('change',
                (event) => {
                    const task = tasks.find(task => task.id == input.dataset.id)
                    handleDoneCheckboxChange(task, event.target.checked)
                }
            )

            icon.addEventListener('click', event => {
                event.preventDefault();
                const task = tasks.find(task => task.id == input.dataset.id)
                openUpdateModal(task)
            })
        })
}
 */


function editTask(task) {
    const titleInput = document.querySelector('#title')
    const priorityCheckbox = document.querySelector('#priority')

    titleInput.value = task.title;
    priorityCheckbox.checked = task.priority;

    document.querySelector('#saveTaskButton')
        .addEventListener('click', () => {
            task.title = titleInput.value;
            task.priority = priorityCheckbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks))
            drawTasks()
            closeModal()
        });

    const deleteModalButton = document.querySelector('#deleteModalButton')
    deleteModalButton.style.display = 'block';
    deleteModalButton.addEventListener('click', () => {
        deleteTask(task)
    })
}

function deleteTask(task) {
    tasks = tasks.filter(element => element.id !== task.id)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    drawTasks();
    closeModal()
}




const fab = document.querySelector('.fab');
fab.addEventListener('click', () => {
    openModal();
    addTask();
})

function addTask() {
    const titleInput = document.querySelector('#title')
    const priorityCheckbox = document.querySelector('#priority')

    document.querySelector('#saveTaskButton')
        .addEventListener('click', () => {
            const newTask = {
                id: Date.now(),
                title: titleInput.value,
                priority: priorityCheckbox.checked,
                done: false
            };

            if (!newTask.title) {
                alert('Inserire il titolo del task');
                return;
            }

            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks))
            const taskDom = drawTaskNode(newTask);
            const todoContainer = document.querySelector('#todo-list');
            todoContainer.append(taskDom);

            closeModal()
        })


}


//==== MODAL
function openModal() {
    const modal = document.querySelector('#taskModal');
    const backdrop = document.querySelector('#backdrop');

    backdrop.classList.add('open');
    modal.style.display = 'block';

    const closeModalButton = document.querySelector('#closeModalButton')
    closeModalButton.addEventListener('click', closeModal)
    backdrop.addEventListener('click', closeModal)
}

function closeModal() {
    const modal = document.querySelector('#taskModal');
    const backdrop = document.querySelector('#backdrop');

    backdrop.classList.remove('open')
    modal.style.display = 'none';

    const titleInput = document.querySelector('#title')
    const priorityCheckbox = document.querySelector('#priority')

    titleInput.value = '';
    priorityCheckbox.checked = false;

    const saveModalButton = document.querySelector('#saveTaskButton')
    saveModalButton.replaceWith(saveModalButton.cloneNode(true))

    document.querySelector('#deleteModalButton')
        .style.display = 'none'

    const deleteModalButton = document.querySelector('#deleteModalButton');
    deleteModalButton.replaceWith(deleteModalButton.cloneNode(true))

    const closeModalButton = document.querySelector('#closeModalButton');
    closeModalButton.removeEventListener('click', closeModal)
    backdrop.removeEventListener('click', closeModal)
}
//=======