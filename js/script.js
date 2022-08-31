let tasks = [{
        id: "1",
        title: "Brainstorming amazing project",
        priority: false,
        done: false,
    },
    {
        id: "2",
        title: "Merge branches on repository",
        priority: false,
        done: true,
    },
    {
        id: "3",
        title: "Schedule daily meeting",
        priority: true,
        done: false,
    },
    {
        id: "4",
        title: "Send mail to John",
        priority: false,
        done: false,
    },
    {
        id: "5",
        title: "Fix code on personal site",
        priority: true,
        done: true,
    }
]


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

    //Rimuove tutti i listeners
    const saveModalButton = document.querySelector('#saveTaskButton');
    saveModalButton.replaceWith(saveModalButton.cloneNode(true));

    const deleteModalButton = document.querySelector('#deleteModalButton');
    deleteModalButton.replaceWith(deleteModalButton.cloneNode(true))

    const closeModalButton = document.querySelector('#closeModalButton');
    closeModalButton.removeEventListener('click', closeModal)
    backdrop.removeEventListener('click', closeModal)
}
//=======