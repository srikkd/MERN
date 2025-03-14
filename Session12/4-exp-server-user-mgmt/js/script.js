const nameInput = document.getElementById("name");
const emailInput = document.querySelector("#email");
const ageInput = document.querySelector("#age");
const contactInput = document.querySelector("#contact");
const addBtn = document.getElementById("btn");
const tBody = document.querySelector("tbody");

let users = [];
let updateIndex = "";

addBtn.addEventListener("click", function(event){
    event.preventDefault();
    if(!nameInput.value || !emailInput.value || !ageInput.value || !contactInput.value){
        alert("Pls enter data in all input fields !!!");
        return;
    }

    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        age: ageInput.value,
        contact: contactInput.value,
    }

    if(this.innerText === "Add Info"){        
        users.push(newUser);
    }
    else if(this.innerHTML === "Update Info"){
        const updatedUser = newUser;
        users = users.map((info, index)=>{
            if(index === updateIndex){
                return updatedUser;
            }
            return info;
        });
        this.innerHTML = "Add Info";
    }

    resetInputFields();
    updateTableAndLS();
});

function displayData(){
    users.forEach((user, index)=>{
        const name = document.createElement("td");
        const email = document.createElement("td");
        const age = document.createElement("td");
        const contact = document.createElement("td");
        const deleteBtn = document.createElement("td");
        const updateBtn = document.createElement("button");

        name.innerHTML = user.name;
        email.innerHTML = user.email;
        age.innerHTML = user.age;
        contact.innerHTML = user.contact;
        deleteBtn.innerHTML = `<button id="deleteBtn">Delete</button>`;
        updateBtn.innerHTML = "Update";

        deleteBtn.addEventListener("click", ()=>{
            removeUser(index);
        });

        updateBtn.addEventListener("click", ()=>{
            nameInput.value = user.name;
            emailInput.value = user.email;
            ageInput.value = user.age;
            contactInput.value = user.contact;
            addBtn.innerHTML = "Update Info";
            updateIndex = index;
        });

        const row = document.createElement("tr");
        row.append(name);
        row.append(email);
        row.append(age);
        row.append(contact);
        row.append(deleteBtn);
        row.append(updateBtn);

        tBody.append(row);
    });
}

function removeUser(id){
    const newUsers = users.filter((user, index)=>{
        return index !== id;
    });
    users = [...newUsers];
    updateTableAndLS();
}

function updateTableAndLS(){
    localStorage.setItem("users", JSON.stringify(users));
    tBody.innerHTML = "";
    displayData();
}

function resetInputFields(){
    nameInput.value = "";
    emailInput.value = "";
    ageInput.value = "";
    contactInput.value = "";
}

function init(){
    let lsUsersString = localStorage.getItem("users");
    users = lsUsersString ? JSON.parse(lsUsersString):[];
    displayData();
}
init();