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
const current = new Date();
const day = current.getDate();
const month = current.getMonth() + 1;
const year = current.getFullYear();
const currentDate = `${month}-${day}-${year}`;
const minDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
let tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
let currentId = 0
let checkEdit = false
createdDate.innerText = `${currentDate}`
deadline.setAttribute('min', minDate);

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

addBtn.addEventListener("click",()=>{
    ourFormDiv.classList.add("left-0")
    ourFormDiv.classList.remove("left-6")
    currentId = 0
    let width = document.body.clientWidth;
    if(width < 1200){
        listContainer.classList.add("d-none")
    }
});

add.addEventListener("click",()=>{
    ourFormDiv.classList.add("left-0")
    ourFormDiv.classList.remove("left-6")
    currentId = 0
    let width = document.body.clientWidth;
    if(width < 1200){
        listContainer.classList.add("d-none")
    }
});

deadline.addEventListener("change",()=>{
    spandeadline.innerText = `${deadline.value ? deadline.value : "Undated"}`
});

saveBtn.addEventListener("click",()=>{
    ourFormDiv.classList.remove("left-0")
    ourFormDiv.classList.add("left-6")
    if(checkEdit)
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
        checkEdit = false
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
    checkEdit = true
    ourFormDiv.classList.add("left-0")
    ourFormDiv.classList.remove("left-6")
    let width = document.body.clientWidth;
    if(width < 1200){
        listContainer.classList.add("d-none")
    }
}

deleteBtn.addEventListener("click",()=>{
    tasksList = tasksList.filter(task => task.id !== currentId);
    title.value = ""
    description.value = ""
    deadline.value = ""
    spandeadline.innerText =  ""
    complete.checked = false
    checkEdit = false
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
                <div class="task-date col-3 d-none d-xl-block"><i class="fa-regular fa-calendar pe-2"></i>${task.deadline}</div>
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
}

window.edit = edit

// // const obj = {
// //     name: 'Alice',
// //     greet: function() {
// //         const innerArrowFunction = () => {
// //             name: "moaz",
// //             console.log(this.name); // Logs 'Alice'
// //         };
// //         innerArrowFunction();
// //     }
// // };
// // obj.greet();
// // function createCounter() {
// //     let counter = 0;
// //     function increment( ) {
// //     counter++;
// //     console.log(counter);
// //     }
// //     return increment;
// // }
// // function createCounter() {
// //         let count = 0;
    
// //         return {
// //             increment: function () {
// //                 count++;
// //                 return count;
// //             },
// //             decrement: function () {
// //                 count--;
// //                 return count;
// //             },
// //             getValue: function () {
// //                 return count;
// //             }
// //         };
// //     }
// let name = "moaz"
// let fuc = ()=>{
//     this.age = 25
//     console.log(name)
// }
// let obj = {name,fuc}
// name = "ahmed"
// obj.fuc()
// console.log(obj)
// // let count = createCounter();
// // console.log(count.increment())
// // console.log(count.increment())