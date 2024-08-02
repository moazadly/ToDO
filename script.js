const addBtn = document.querySelector(".lists .todo .addnew");
const add = document.querySelector(".lists .todo .add");
const ourFormDiv = document.querySelector(".form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const complete = document.getElementById("complete");
const createdDate = document.getElementById("created-date");
const deadline = document.getElementById("deadline");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const todoList = document.querySelector(".todo ul");
const doneList = document.querySelector(".done ul");
const spandeadline = document.getElementById("spandeadline");
const search = document.getElementById("search-input");
const searchIcon = document.getElementById("searchIcon");
const listContainer = document.getElementById("list");

// get the current date
const current = new Date();
const day = current.getDate();
const month = current.getMonth() + 1;
const year = current.getFullYear();
const currentDate = `${month}-${day}-${year}`;
createdDate.innerText = `${currentDate}`


const minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
deadline.setAttribute('min', minDate);


let tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
let currentId = 0

renderData()

function clacID(){
    maxId = 0;
    for (let index = 0; index < tasksList.length; index++) {
        if(tasksList[index].id>maxId){
            maxId = tasksList[index].id;
        }
    }
    return ++maxId;
}

// set the deadline in form
deadline.addEventListener("change",()=>{
    spandeadline.innerText = `${deadline.value ? deadline.value : "Undated"}`
});

addBtn.addEventListener("click",()=>{
    ourFormDiv.classList.add("left-0")
    ourFormDiv.classList.remove("left-6")
    let width = document.body.clientWidth;
    if(width < 1200){
        listContainer.classList.add("d-none")
    }
});

add.addEventListener("click",()=>{
    ourFormDiv.classList.add("left-0")
    ourFormDiv.classList.remove("left-6")
    let width = document.body.clientWidth;
    if(width < 1200){
        listContainer.classList.add("d-none")
    }
});

saveBtn.addEventListener("click",()=>{
    ourFormDiv.classList.remove("left-0")
    ourFormDiv.classList.add("left-6")
    if(currentId != 0)
    {
        tasksList = tasksList.map((item) => {
            if (item.id === currentId) {
                item.title = title.value ? title.value : "Untitled";
                item.description = description.value ? description.value : "Unscripted";
                item.deadline = deadline.value ? deadline.value : "Undated";
                item.complete = complete.checked;
            }
            return item; 
        });
        currentId = 0
    }
    else{
        let task = {
            title: title.value ? title.value : "Untitled",
            description: description.value ? description.value : "unscripted",
            deadline: deadline.value ? deadline.value : "Undated",
            complete: complete.checked,
            id: clacID()
        }
        tasksList.push(task);
    }
    title.value = ""
    description.value = ""
    deadline.value = ""
    complete.checked = false
    spandeadline.innerText = ""
    let width = document.body.clientWidth;
    if(width < 1200){
        listContainer.classList.remove("d-none")
    }
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    renderData()
});  

function edit(task){
    title.value = task.title;
    description.value = task.description;
    deadline.value = task.deadline;
    spandeadline.innerText =  task.deadline;
    complete.checked = task.complete;
    currentId = task.id
    ourFormDiv.classList.add("left-0")
    ourFormDiv.classList.remove("left-6")
    let width = document.body.clientWidth;
    if(width < 1200){
        listContainer.classList.add("d-none")
    }
}

deleteBtn.addEventListener("click",()=>{
    tasksList = tasksList.filter(task => task.id !== currentId);
    currentId = 0
    title.value = ""
    description.value = ""
    deadline.value = ""
    spandeadline.innerText =  ""
    complete.checked = false
    renderData()
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
    ourFormDiv.classList.remove("left-0")
    ourFormDiv.classList.add("left-6")
    let width = document.body.clientWidth;
    if(width < 1200){
        listContainer.classList.remove("d-none")
    }
});

function renderData(filteredTasks = tasksList){
    todoList.innerHTML = ""
    doneList.innerHTML = ""
    filteredTasks.forEach((task)=>{
        const li = document.createElement("li");
        li.onclick = () => edit(task);
        if (task.complete){
            li.innerHTML =
            `
                <div class="task-title"><p class="ps-1">${task.title}</p></div>
            `
            doneList.append(li)
        }
        else{
            li.classList.add("d-flex","justify-content-between")
            li.innerHTML = 
            `
                <div class="task-title col-11 col-xl-8 break-word"><p class="ps-1">${task.title}</p></div>
                <div class="task-date col-4 col-xxl-3 d-none d-xl-block"><i class="fa-regular fa-calendar pe-2"></i>${task.deadline}</div>
            `
            todoList.append(li)
        }
    });
}

search.addEventListener("input",()=>
{
    let filter = search.value.toLowerCase();
    const filteredTasks = tasksList.filter((task)=>{
        let title = task.title.toLowerCase();
        return title.startsWith(filter);
    });
    renderData(filteredTasks);
});

function showSearch(){
    search.classList.toggle('visible');
    searchIcon.classList.toggle("search-animation")
    if(!search.classList.contains('visible')){
        search.value = "" 
        renderData()  
    }
}

window.edit = edit

