
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
function createCompany(activity,  name){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    const company = new Company(activity,  name);
    companies.push(company);
}

function hireStudent(idCompany, idStudent ,profession){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    // const student = students.find(item => item.id == idStudent);
    if(companies[idCompany] === undefined || students[idStudent] === undefined){
        console.error(`inncorect data, student didn't hire`);
        return false;
    }
    companies[idCompany].hire(students[idStudent], profession);
}

function hireStudents(idCompany, jobs){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }    
    if(companies[idCompany] === undefined){
        console.error(`inncorect data, student didn't hire`);
        return false;
    }
    students.sort((a, b) => b.avgMark - a.avgMark);    
    // let bestStudents = students.slice(0 , 5);
    for (let i = 0; i < 5; i++) {
        hireStudent(idCompany, i, jobs[i]);        
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
createStudents();

// - getBaseInfo - вивести ім'я прізвище ВНЗ і середній бал
console.log(getBaseInfoFunc(5));

// updateHistory - оновліює історію роботи
updateHistoryFunc(1 , ['Global Logic', 2020, 2020]);

// task 2)Створити 2 компанії
createCompany("Website development", "First Company");
createCompany("Software development", "Second Company");

// - hire - приймає екземпляр класу студент і створює на основі нього екземпляр класу працівник і додає до себе в масив працівників
hireStudent(0, 1, 'frontend');

// task 3) Кожна компанія повинна найняти по 5 студентів(спочатку найкращих, базуючись по середньому балу)
hireStudents(0, ['backend', 'frontend','backend', 'frontend','backend']);
hireStudents(1, ['backend', 'frontend','backend', 'frontend','backend']);

// - getWorkingInfo - виводить ім'я прізвище професію і історію
console.log(getWorkingInfoFunc(1));

// task 4) Відобразити всіх сутдентів, що не отримали роботу
console.log(students);

// task 5) Звільнити 2 людей з 1 компанії
fireWorker(0, 0);
fireWorker(0, 0);
console.log(companies);

// task 6) Найняти 1 звільнену людину в 2 компанії
hireUnemployedWorker(1, 0);

// task 7) Відобразити всіх працівників без роботи.
console.log(workersUnemployer);

// task 8) Закрити 1 компанію
// - close - закрити компанію, всі працівники будут звільнені
closeCompany(0);

// task 9) Відобразити всіх працівників ( з їх історіями і робочим статусом)
console.log(showWorkers());



