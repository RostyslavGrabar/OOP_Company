
class Student{
    constructor( name, surname, university, avgMark){
        this.name = name;
        this.surname = surname;
        this.university = university;
        this.avgMark = avgMark;
    }

    getBaseInfo() {
        return "Name :" + this.name +" \nSurname: " + this.surname +'\n' + "universityName: " + this.university.name + '\n' + "avgMark: " + this.avgMark;
    }
}

class Worker extends Student{
    constructor( name, surname, university, avgMark, workStatus, profession){
        super(name, surname, university, avgMark);
        this.workStatus = workStatus;
        this.profession = profession;
        this.salary;
        this._history = [];
    }

    set history(history){
        this._history.push(history);
    }

    get history(){
        return this._history;
    }
    
    getWorkingInfo(){
        let resHistory = "\n";
        this.history.forEach(element => {
            for (const key in element) {
                resHistory += key + ": " + element[key] +'\n';
            }
            resHistory += "\n";
        });
        return "Name :" + this.name +"\nSurname: " + this.surname +"\nProfession: " + this.profession + '\n' + "History: \n" + resHistory;       
    }

    updateHistory(history){
        this.history = history;
    }
}

class Company{
    constructor(activity, name){
        this.name = name;
        this.activity = activity;
        this.workers = [];
        this.countWorkers = this.workers.length;
    }
    setSalaryForWorker(worker){
        worker.salary = (worker.avgMark + worker.university.prestige) * 2000;
    }
    hire(person, profession){
        let date = new Date().getFullYear();
        if(person.__proto__ === Student.prototype){            
            let worker = new Worker(person.name, person.surname, person.university, person.avgMark, "work", profession);
            let out = `<tr data-id-worker="${person.surname}" data-id-company="${this.name}">`;
            this.setSalaryForWorker(worker);
            this.workers.push(worker);
            this.countWorkers = this.workers.length;
            worker.dateHire = date;
            workers.push(worker);
            students = students.filter(item => person != item);
            if(document.querySelector("#company-workers")){            
                showCompanyWorkers()
            }
            document.querySelector("#btn-task-5").removeAttribute("disabled");
        } else {
            this.setSalaryForWorker(person);
            this.workers.push(person);
            person.workStatus = "work";
            person.dateHire = date;
            this.countWorkers = this.workers.length;
            workersUnemployer = workersUnemployer.filter(item => item != person);
        }    

    }
    fire(worker){
        let date = new Date().getFullYear();
        this.workers = this.workers.filter(item => item != worker);
        worker.workStatus = "unemployed";
        worker.salary = 0;
        worker.updateHistory({"WorkPlace" :this.name,"From" :  worker.dateHire,  "To" : date,});
        delete worker.dateHire;
        workersUnemployer.push(worker);
    }
    close(){
        this.workers.forEach(worker => {
            this.fire(worker);
        });
        for (const key in this) {
            delete this[key];
        }       
    }
}

// ============= general functions ==================
function validate(argumentsFunc, len){
    if(argumentsFunc === undefined || argumentsFunc.length < len){
        return false;
    }
    for (let i = 0; i < argumentsFunc.length; i++) {
        if(typeof(argumentsFunc[i]) === "object"){
            for (let j = 0; j < argumentsFunc[i].length; j++) {
                if(typeof(argumentsFunc[i][j]) === "string"){
                    argumentsFunc[i][j] = argumentsFunc[i][j].trim();
                }
                if(argumentsFunc[i][j] === '' || argumentsFunc[i][j] === undefined){
                    return false;
                }
            }
        }else {
            if(typeof(argumentsFunc[i]) === "string"){
                argumentsFunc[i] = argumentsFunc[i].trim();
            }
            if(argumentsFunc[i] === '' || argumentsFunc[i] === undefined){                            
                return false;
            }
        }
    }
}


// ============= student functions ==================
function createStudent(name, surname, university, avgMark){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    university.sort();
    universityInfo = {
        "name": university[1],
        "prestige": university[0],

    }
    students.push(new Student(name, surname, universityInfo, avgMark));
}
function createStudents(){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    let studentsArray = [
        new Student('Ivan', 'Ivanov', {"name": 'Lviv Polytehnic University', "prestige": 2}, 10),
        new Student('Petya', 'Petrov', {"name": 'Ivan Franko University', "prestige": 2}, 9),
        new Student('Nataly', 'Ivanova', {"name": 'Lviv Forest engineering University', "prestige": 1}, 8),
        new Student('Yuliya', 'Petrova', {"name": 'Ivan Franko University', "prestige": 3}, 7),
        new Student('Ostap', 'Ostapov', {"name": 'Lviv Polytehnic University', "prestige": 2}, 6),
        new Student('Mikola', 'Mikolayev', {"name": 'Ivan Franko University', "prestige": 3}, 10),
        new Student('Serhiy', 'Serhiyev', {"name": 'Lviv Forest engineering University', "prestige": 1}, 8),
        new Student('Olena', 'Ostapova',  {"name": 'Ivan Franko University', "prestige": 3}, 10),
        new Student('Vitaliy', 'Vitaliyev', {"name": 'Lviv Polytehnic University', "prestige": 2}, 9),
        new Student('Taras', 'Tarasov', {"name": 'Ivan Franko University', "prestige": 3}, 5),
        new Student('Olexandr', 'Olexandrov', {"name": 'Lviv Forest engineering University', "prestige": 1}, 9),
        new Student('Khrustyna', 'Olexandrova', {"name": 'Ivan Franko University', "prestige": 3}, 9),
        new Student('Nazar', 'Nazarov', {"name": 'Lviv Polytehnic University', "prestige": 2}, 4),
        new Student('Pavlo', 'Pavlov', {"name": 'Ivan Franko University', "prestige": 3}, 10),
    
        new Student('Andtiy', 'Andtiyev',{"name": 'Lviv Forest engineering University', "prestige": 1}, 9),
        new Student('Oksana', 'Pavlova', {"name": 'Ivan Franko University', "prestige": 3}, 6),
        new Student('Stepan', 'Stepanov', {"name": 'Lviv Polytehnic University', "prestige": 2}, 9),
        new Student('Bogdan', 'Bogdanov', {"name": 'Ivan Franko University', "prestige": 3}, 6),
        new Student('Igor', 'Igorov', {"name": 'Lviv Forest engineering University', "prestige": 1}, 8),
        new Student('Maryana', 'Bogdanova', {"name": 'Ivan Franko University', "prestige": 3}, 7),
    ];
    students.push(...studentsArray);

    let btnTask1 = document.querySelector("#btn-task-1");
    let outTask1 = document.querySelector("#out-task-1");

    btnTask1.removeEventListener("click", createStudents);
    btnTask1.setAttribute("disabled", "disabled");
    let out = `<table cellspacing="2" border="1" cellpadding="5"> <thead> <tr> <th> <strong> № </strong> </th>`;

    for (let key in students[0]) {
        key = key.toUpperCase();
        out += `<th align="center"> <strong> ${key} </strong> </th>`;
    }
    for (let i = 0; i < studentsArray.length; i++) {
        out += `<tr> <td> ${i+1} </td> `;
        for (const key in studentsArray[i]) {
            if(key == "university"){
                out += `<td align="center"> ${studentsArray[i][key]['name']} </td>`;
            } else {
                out += `<td align="center"> ${studentsArray[i][key]} </td>`;
            }
        }
        out += `</tr> `
    }
    out += `</table> `
    outTask1.innerHTML = out;
    document.querySelector("#btn-task-2").removeAttribute("disabled");
    document.querySelector("#btn-task-4").removeAttribute("disabled");
}

function getBaseInfoFunc(id){
    let people = [...students];
    if(workers != undefined){
        people = [...people, ...workers];
    }
    return people[id].getBaseInfo();        
}

function showUnemployedStudents(){
    let out = `<table id="unemployed-students" cellspacing="2" border="1" cellpadding="5"> <thead> <tr> <th> <strong> № </strong> </th>`;
    let outTask4 = document.querySelector("#out-task-4");
    for (let key in students[0]) {
        key = key.toUpperCase();
        out += `<th align="center"> <strong> ${key} </strong> </th>`;
    }
    for (let i = 0; i < students.length; i++) {
        out += `<tr> <td> ${i+1} </td> `;
        for (const key in students[i]) {
            if(key == "university"){
                out += `<td align="center"> ${students[i][key]['name']} </td>`;
            } else {
                out += `<td align="center"> ${students[i][key]} </td>`;
            }
        }
        out += `</tr> `
    }
    out += `</table> `

    outTask4.innerHTML = out;
    if (students.length === 0) {
        document.querySelector("#btn-task-4").setAttribute("disabled", "disabled");
        outTask4.innerHTML = "";
    }
}
// ============= worker functions ==================
function createWorker(name, surname, university, avgMark,  workStatus, profession, salary, ...history){
    if(validate(arguments, 7) === false){
        console.error(`inncorect data`);
        return false;
    }
    university.sort();
    universityInfo = {
        "name": university[1],
        "prestige": university[0],

    }
    let worker = new Worker(name, surname, universityInfo, avgMark, workStatus, profession, salary);
    for (let i = 0; i < history.length; i++) {
        worker.history = history[i];        
    }
    workers.push(worker);
}

function getWorkingInfoFunc(id){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    if (workers[id]) {
        return workers[id].getWorkingInfo();
    } else {
        console.error(`inncorect data, worker didn't find`);
        return false;
    }  
}

function updateHistoryFunc(id , history){
    let worker = workers.filter( item => item.id == id);
    workers.forEach(item => {
        if(item.id == id){
            item.updateHistory(history);
        }
    })
    if(worker === undefined){
        console.error(`inncorect data, worker didn't find`);
    }
}

function unemployedWorkers(){
    return workers.filter(item => item.workStatus === "unemployed");
}

function showWorkers(){

    this.innerHTML = "update";
    let outTask9 = document.querySelector("#out-task-9");
    let out = `<table id="unemployed-students" cellspacing="2" border="1" cellpadding="5"> <thead>  <tr> <th align="center"> Name </th> <th align="center"> Surname </th> <th align="center"> Status </th> <th align="center"> History </th>  </tr></thead>`;    
    workers.forEach(worker => {
        out += `<tr><td align="center"> ${worker.name} </td>`;
        out += `<td align="center"> ${worker.surname} </td>`;
        out += `<td align="center"> ${worker.workStatus} </td>`;
        if(worker.history.length === 0){
            out += `<td align="center"> no history`;
        } else {
            out += `<td align="center"> `;
            for (let i = 0; i < worker.history.length; i++) {     
                out += `${worker.history[i]["WorkPlace"]}: ${worker.history[i]["From"]} - ${worker.history[i]["To"]} </br>`;                
            }
        }
        out +=`</td></tr>`; 
    })
    out +=`</table>`; 
    outTask9.innerHTML = out;
}

// ============= company functions ==================
function createCompany(){
    let name = document.querySelector("input[name='companyName']").value;
    let activity = document.querySelector("input[name='companyActivity']").value;
    let infoError = document.querySelector("#error-task-2");
    if(name === '' && activity === ''){
        infoError.innerHTML = "inncorect data";
        return false;
    }
    for (let i = 0; i < companies.length; i++) {
        if(companies[i].name === name){
            infoError.innerHTML = "company already exists";
            return false;
        }
    }
    infoError.innerHTML = "";
    const company = new Company(activity,  name);
    let taskSelects = ["#task-3-select","#task-6-select", "#task-8-select"];

    document.querySelector("#out-task-2").innerHTML = "New company: " + company.name +  "</br>";
    document.querySelector("#btn-task-3").removeAttribute("disabled");
    document.querySelector("#btn-task-8").removeAttribute("disabled");

    for (let i = 0; i < taskSelects.length; i++) {
        document.querySelector(`${taskSelects[i]}`).removeAttribute("disabled");
        let option= document.createElement("option");
        option.innerHTML = company.name;
        option.value = company.name;
        document.querySelector(`${taskSelects[i]}`).appendChild(option);
    }

    companies.push(company);

    if (companies.length == 2) {
        document.querySelector("#btn-task-2").setAttribute("disabled", "disabled");        
    }
    if(students.length < 5){
        document.querySelector("#btn-task-3").setAttribute("disabled", "disabled");
    }

}

function hireStudent(idCompany, idStudent ,profession){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    if(companies[idCompany] === undefined || students[idStudent] === undefined){
        console.error(`inncorect data, student didn't hire`);
        return false;
    }
    companies[idCompany].hire(students[idStudent], profession);
}

function hireStudents(){
    const nameCompany = document.querySelector("#task-3-select").value;
    let jobs = ['backend', 'frontend','backend', 'frontend','backend'];  
    let outTask3 = document.querySelector("#out-task-3");
    let idCompany;
    let out = "";

    outTask3.innerHTML = "";

    companies.forEach((item, index) => {
       if(item.name === nameCompany){
           idCompany = index;
       }
    });
    if(companies[idCompany] === undefined){
        console.error(`inncorect data, student didn't hire`);
        return false;
    }
    students.sort((a, b) => a.avgMark - b.avgMark); 

    if(students.length == 5){
        for (let i = 4; i >= 0; i--) {
            let student = students[i];
            hireStudent(idCompany, i, jobs[i]); 
            outTask3.innerHTML += "<strong>Company - " + `"${companies[idCompany].name}"` + "</strong> " + student.surname + " " + student.name + " " + jobs[i] + " developer" +"</br>";
        }
    } else {
        for (let i = 0; i < 5; i++) {
            let student = students[i];
            hireStudent(idCompany, i, jobs[i]); 
            outTask3.innerHTML += "<strong>Company - " + `"${companies[idCompany].name}"` + "</strong> " + student.surname + " " + student.name + " " + jobs[i] + " developer" +"</br>";
        }
    }
    if(students.length < 5){
        document.querySelector("#btn-task-3").setAttribute("disabled", "disabled");
    }
    if(document.querySelector("#unemployed-students")){
        showUnemployedStudents();
    }
    document.querySelector("#btn-task-9").removeAttribute("disabled");
    
}

function hireUnemployedWorker(workerSurname, companyName){
    companies.forEach(item => {
        if(item.name === companyName){
            for (let i = 0; i < workersUnemployer.length; i++) {
                if(workersUnemployer[i].surname === workerSurname){
                    item.hire(workersUnemployer[i]);
                }
            }
        }
    })
    let fireWorkers = document.querySelectorAll(".fire-workers");
    fireWorkers.forEach(item => {
        if(item.dataset.idWorker === workerSurname){
            item.remove();
        }
    })
    if(workersUnemployer.length === 0){
        document.querySelector("#btn-task-7").setAttribute("disabled","disabled");
        document.querySelector("#out-task-6").innerHTML = "";
        document.querySelector("#out-task-7").innerHTML = ""; 
        document.querySelector("#btn-task-7").innerHTML = "Show workers";

    }
}

function showCompanyWorkers(){
    let outTask5 = document.querySelector("#out-task-5");
    outTask5.innerHTML = "";
    companies.forEach(company => {
        let div = document.createElement("DIV");
        div.setAttribute("data-id", company.name);
        let out = `<table id="company-workers" data-id="${company.name}" width="700" cellspacing="2" border="1" cellpadding="5"> <thead> <tr> <th colspan="5" align="center"><strong> ${company.name.toUpperCase()} </strong></th></tr>`;
        out += `<tr> <th align="center"> Name </th> <th align="center"> Surname </th> <th align="center"> Salary </th> <th align="center"> Profession </th> <th align="center"> Fire Worker </th></tr>`;    
        company.workers.forEach(worker => {
            out += `<tr data-id-worker="${worker.surname}" data-id-company="${company.name}">`;
            out += `<td align="center"> ${worker.name} </td>`;
            out += `<td align="center"> ${worker.surname} </td>`;
            out += `<td align="center"> ${worker.salary} </td>`;
            out += `<td align="center"> ${worker.profession} </td>`;
            out += `<td align="center"> <button class="fire" data-id-worker="${worker.surname}" data-id-company="${company.name}"> Fire </button> </td> </tr>`;
            
        })
        div.innerHTML = out;
        outTask5.appendChild(div);
        let btnFire = document.querySelectorAll(".fire");
        btnFire.forEach(fire => fire.addEventListener("click", fireWorker));
    });
    document.querySelector("#btn-task-5").innerHTML = "update";
    
}

function fireWorker(){
    nameCompany = this.dataset.idCompany;
    surnameWorker = this.dataset.idWorker;
    companies.forEach( company => {
        if(company.name === nameCompany){
            for (let i = 0; i < company.workers.length; i++) {
                if(company.workers[i]["surname"] === surnameWorker){
                    company.fire(company.workers[i]);
                    document.querySelector(`tr[data-id-worker="${this.dataset.idWorker}"][data-id-company="${this.dataset.idCompany}"]`).remove();
                    document.querySelector("#btn-task-6").removeAttribute("disabled");
                    document.querySelector("#btn-task-7").removeAttribute("disabled");
                    if(company.workers.length === 0){
                        document.querySelector(`div[data-id="${this.dataset.idCompany}"]`).remove();
                    }
                    return true;
                }
            }
        }
    });
}

function showFireWorkers(){
    let out = `<table id="company-workers" width="700" cellspacing="2" border="1" cellpadding="5"> <thead> <tr>`;
    out += `<th align="center"> Name </th> <th align="center"> Surname </th>  <th align="center"> Hire Worker </th></tr>`; 
    workersUnemployer.forEach(worker => {
        out += `<tr class="fire-workers" data-id-worker="${worker.surname}" >`;
        out += `<td align="center"> ${worker.name} </td>`;
        out += `<td align="center"> ${worker.surname} </td>`;
        out += `<td align="center"> <button class="hire" data-id-worker="${worker.surname}" "> Hire </button> </tr>`;
    });   
    document.querySelector("#out-task-6").innerHTML = out;
    document.querySelector("#btn-task-6").innerHTML = "update";
    document.querySelectorAll(".hire").forEach(item => {
        item.addEventListener("click", () => hireUnemployedWorker(item.dataset.idWorker, document.querySelector("#task-6-select").value));
    })
}

function showUnemployedWorkers(){
    let out = `<table id="company-workers" width="700" cellspacing="2" border="1" cellpadding="5"> <thead> <tr>`;
    out += `<th align="center"> Name </th> <th align="center"> Surname </th> </tr>`; 
    workersUnemployer.forEach(worker => {
        out += `<tr> <td align="center"> ${worker.name} </td>`;
        out += `<td align="center"> ${worker.surname} </td> </tr>`;
    });   
    document.querySelector("#out-task-7").innerHTML = out;
    document.querySelector("#btn-task-7").innerHTML = "update";


}

function closeCompany() {
    let companyName = document.querySelector("#task-8-select").value;
    companies.forEach(company => {
        if(company.name === companyName){
            company.close();
            delete company;
            document.querySelector("#out-task-8").innerHTML = "Company: " + companyName + " closed";
            document.querySelector("#btn-task-8").setAttribute("disabled","disabled");
            companies = companies.filter(item => company != item);
        }
    })
    if(workersUnemployer.length != 0){
        document.querySelector("#btn-task-7").removeAttribute("disabled");            
    }
    let taskElements = ["#task-3-select","#task-6-select", "#task-8-select","#btn-task-5", "#btn-task-3", "#btn-task-6", "#btn-task-8"];
    let taskSelects = ["#task-3-select","#task-6-select", "#task-8-select"];
    for (let i = 0; i < taskSelects.length; i++) {
        let option = document.querySelector(`${taskSelects[i]}>option[value="${companyName}"]`);
        option.remove();
    }
    document.querySelector("#out-task-6").innerHTML = "";

    if(companies.length === 0){
        for (let i = 0; i < taskElements.length; i++) {
            document.querySelector(`${taskElements[i]}`).setAttribute("disabled","disabled");            
        }
    }

}

let students = [];
let workers = [];
let workersUnemployer = [];
let companies = [];

// task 1)Створити список з 20 студентів.
document.querySelector("#btn-task-1").addEventListener("click", createStudents);

// task 2)Створити 2 компанії
document.querySelector("#btn-task-2").addEventListener("click", createCompany);

// task 3) Кожна компанія повинна найняти по 5 студентів(спочатку найкращих, базуючись по середньому балу)
document.querySelector("#btn-task-3").addEventListener("click",hireStudents);

// task 4) Відобразити всіх сутдентів, що не отримали роботу
document.querySelector("#btn-task-4").addEventListener("click", showUnemployedStudents);

// task 5) Звільнити 2 людей з 1 компанії
document.querySelector("#btn-task-5").addEventListener("click", showCompanyWorkers);

// task 6) Найняти 1 звільнену людину в 2 компанії
document.querySelector("#btn-task-6").addEventListener("click", showFireWorkers);

// task 7) Відобразити всіх працівників без роботи.
document.querySelector("#btn-task-7").addEventListener("click", showUnemployedWorkers);

// task 8) Закрити 1 компанію
document.querySelector("#btn-task-8").addEventListener("click", closeCompany);

// // task 9) Відобразити всіх працівників ( з їх історіями і робочим статусом)
document.querySelector("#btn-task-9").addEventListener("click", showWorkers);

// console.log(showWorkers());



