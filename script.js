
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
            this.setSalaryForWorker(worker);
            this.workers.push(worker);
            this.countWorkers = this.workers.length;
            worker.dateHire = date;
            workers.push(worker);
            students = students.filter(item => person != item);
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
            workersUnemployer.push(worker);
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
    outTask1.innerHTML = out;
    document.querySelector("#btn-task-2").removeAttribute("disabled");
}

function getBaseInfoFunc(id){
    let people = [...students];
    if(workers != undefined){
        people = [...people, ...workers];
    }
    return people[id].getBaseInfo();        
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
    str = "Workers History and Worker Status \n";
    workers.forEach(worker => {
        str +=  worker.surname + " " + worker.name + "\n";
        str += "Worker Status: " + worker.workStatus + "\n";
        str +=  "History: \n";
        if(worker.history.length == 0){
            str += "no history \n"
        } else {
            worker.history.forEach(item => {
                str += item.WorkPlace + "\n";
                str += "Years: " + item.From + "-" + item.To + "\n\n";
            })
        }

        str+= '\n' + '=================' + '\n';
    });

    return str;
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

    document.querySelector("#out-task-2").innerHTML += "New company: " + company.name +  "</br>";
    document.querySelector("#btn-task-3").removeAttribute("disabled");
    let optionTask3= document.createElement("option");
    optionTask3.innerHTML = company.name;
    optionTask3.value = company.name;
    document.querySelector("#task-3-select").appendChild(optionTask3);

    companies.push(company);

    if (companies.length == 2) {
        document.querySelector("#btn-task-2").removeEventListener("click", createCompany);
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
    let idCompany;
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
            console.log(i);
            hireStudent(idCompany, i, jobs[i]); 
            document.querySelector("#out-task-3").innerHTML += "<strong>Company - " + `"${companies[idCompany].name}"` + "</strong> " + student.surname + " " + student.name + " " + jobs[i] + " developer" +"</br>";
        }
    } else {
        for (let i = 0; i < 5; i++) {
            let student = students[i];
            console.log(students);
            hireStudent(idCompany, i, jobs[i]); 
            document.querySelector("#out-task-3").innerHTML += "<strong>Company - " + `"${companies[idCompany].name}"` + "</strong> " + student.surname + " " + student.name + " " + jobs[i] + " developer" +"</br>";
        }
    }

    if(students.length < 5){
        document.querySelector("#btn-task-3").setAttribute("disabled", "disabled");
    }
}

function hireUnemployedWorker(idCompany, idWorker){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }    
    if(workersUnemployer[idWorker] === undefined ){
        console.error(`inncorect data, worker didn't hire`);
        return false;
    }
    companies[idCompany].hire(workersUnemployer[idWorker]);
}

function fireWorker(idCompany, idWorker){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    if(companies[idCompany] === undefined || workers[idWorker] === undefined){
        console.error(`inncorect data, worker didn't fire`);
        return false;
    }
    companies[idCompany].fire(companies[idCompany].workers[idWorker]);
}

function closeCompany(idCompany) {
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    if(!companies[idCompany]){
        console.error(`inncorect data, company didn't close`);
        return false;
    }
    companies[idCompany].close();
    delete companies[idCompany];   
    companies = companies.filter(company => company != undefined)
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

// - getWorkingInfo - виводить ім'я прізвище професію і історію
// console.log(getWorkingInfoFunc(1));

// // task 4) Відобразити всіх сутдентів, що не отримали роботу
// console.log(students);

// // task 5) Звільнити 2 людей з 1 компанії
// fireWorker(0, 0);
// fireWorker(0, 0);
// console.log(companies);

// // task 6) Найняти 1 звільнену людину в 2 компанії
// hireUnemployedWorker(1, 0);

// // task 7) Відобразити всіх працівників без роботи.
// console.log(workersUnemployer);

// // task 8) Закрити 1 компанію
// // - close - закрити компанію, всі працівники будут звільнені
// closeCompany(0);

// // task 9) Відобразити всіх працівників ( з їх історіями і робочим статусом)
// console.log(showWorkers());



