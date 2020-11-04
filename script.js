
class Student{
    static id = 0;
    constructor( name, surname, university, avgMark){
        this.id = ++Student.id;
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
        history.sort();
        const result = {
            "WorkPlace" : history[2],
            "From" : history[0],
            "To" : history[1],
        }
        this._history.push(result);
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
    static id = 0;
    constructor(activity, workers, name){
        this.id = ++Company.id;
        this.name = name;
        this.activity = activity;
        this.workers = workers;
        this.countWorkers = this.workers.length;
    }
    setSalaryForWorker(worker){
        worker.salary = (worker.avgMark + worker.university.prestige) * 2000;
    }
    hire(student, profession){
        let worker = new Worker(student.name, student.surname, student.university, student.avgMark, "work", profession);
        this.setSalaryForWorker(worker);
        this.workers.push(worker);
        this.countWorkers = this.workers.length;
    }
    fire(worker){
        let date = new Date;
        date = date.getFullYear();
        this.workers = this.workers.filter(item => item != worker);
        worker.workStatus = "unemployed";
        worker.salary = 0;
        worker.updateHistory([this.name, date, worker.dateHire]);
        delete worker.dateHire;
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
function getBaseInfoFunc(id){
    let people = [...students];
    if(workers != undefined){
        people = [...people, ...workers];
    }
    for (let i = 0; i < people.length; i++) {
        return people[i].getBaseInfo();        
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
    let correctWorker = false;
    for (let i = 0; i < workers.length; i++) {
        if(workers[i].id === id){
            return workers[i].getWorkingInfo();
        }
        
    }

    if(!correctWorker){
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

// ============= company functions ==================
function createCompany(activity, id, name, date){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    const companyWorkers = workers.filter( item => {
        for(let i = 0; i < id.length; i++) {
            if(item.id === id[i]) {
                item["dateHire"] = date;
                return true;
            } 
        }})
    const company = new Company(activity, companyWorkers, name);
// - setSalaryForWorker - розраховує заробітну плату працівнику базуючись на його середньому балу атестату і престижності ВНЗ
    companyWorkers.forEach(worker => {
        company.setSalaryForWorker(worker);
    });
    companies.push(company);
}

function hireStudent(idCompany, idStudent ,profession){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    const company = companies.find(item => item.id == idCompany);
    const student = students.find(item => item.id == idStudent);
    if(company === undefined || student === undefined){
        console.error(`inncorect data, student didn't hire`);
        return false;
    }
    company.hire(student, profession);
}

function fireWorker(idCompany, idWorker){
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    const company = companies.find(item => item.id == idCompany);
    const worker = company.workers.find(item => item.id == idWorker);
    if(company === undefined || worker === undefined){
        console.error(`inncorect data, worker didn't fire`);
        return false;
    }
    company.fire(worker);
}

function closeCompany(idCompany) {
    if(validate(arguments, arguments.callee.length) === false){
        console.error(`inncorect data`);
        return false;
    }
    let correctCompany = false;
    for (let i = 0; i < companies.length; i++) {
        if(companies[i].id === idCompany){
            companies[i].close();
            delete companies[i];   
            correctCompany = true;         
        }        
    }
    if(!correctCompany){
        console.error(`inncorect data, company didn't close`);
        return false;
    }
    companies = companies.filter(company => company != undefined)
}

let students = [];
let workers = [];
let companies = [];

createStudent('Ivan', 'Ivanov', ['Lviv Polytehnic University', 2], 10);
createStudent('Petya', 'Petrov', ['Ivan Franko University', 3], 9);
createStudent('Nataly', 'Ivanova', ['Lviv Forest engineering University',1], 8);
createStudent('Yuliya', 'Petrova', ['Ivan Franko University', 3], 7);
createStudent('Ostap', 'Ostapov', ['Lviv Polytehnic University', 2], 6);
createStudent('Mikola', 'Mikolayev', ['Ivan Franko University', 3], 10);
createStudent('Serhiy', 'Serhiyev', ['Lviv Forest engineering University',1], 8);
createStudent('Olena', 'Ostapova', ['Ivan Franko University', 3], 10);
createStudent('Vitaliy', 'Vitaliyev', ['Lviv Polytehnic University', 2], 9);
createStudent('Taras', 'Tarasov', ['Ivan Franko University', 3], 5);
createStudent('Olexandr', 'Olexandrov', ['Lviv Forest engineering University',1], 5);
createStudent('Khrustyna', 'Olexandrova', ['Ivan Franko University', 3], 9);
createStudent('Nazar', 'Nazarov', ['Lviv Polytehnic University', 2], 4);
createStudent('Pavlo', 'Pavlov', ['Ivan Franko University', 3], 10);
createStudent('Andtiy', 'Andtiyev', ['Lviv Forest engineering University',1], 9);
createStudent('Oksana', 'Pavlova', ['Ivan Franko University', 3], 6);
createStudent('Stepan', 'Stepanov', ['Lviv Polytehnic University', 2], 9);
createStudent('Bogdan', 'Bogdanov', ['Ivan Franko University', 3], 6);
createStudent('Igor', 'Igorov', ['Lviv Forest engineering University',1], 8);
createStudent('Maryana', 'Bogdanova', ['Ivan Franko University', 3], 7);

createWorker('Vasya', 'Vasylyov', ['Lviv Forest engineering University',1], 8, 'work', 'frontend',  [ 2018, 2019,'SoftServe'], ['Lasoft', 2019, 2020]);
createWorker('Ivan', 'Ivanov', ['Ivan Franko University', 3], 7, 'work', 'frontend',  ['SoftServe', 2017, 2018], ['Lasoft', 2018, 2019]);

createWorker('Maryan', 'Maryanov', ['Lviv Forest engineering University',1], 8, 'work', 'backend', [ 2018, 2019,'Global Logic']);
createWorker('Lida', 'Igorova', ['Ivan Franko University', 3], 7, 'work', 'backtend', ['Lasoft', 2018, 2019]);

createCompany("Website development", [21, 23], "First Company", 2020);
createCompany("Software development", [22, 24], "Second Company", 2019);

// - getBaseInfo - вивести ім'я прізвище ВНЗ і середній бал
console.log(getBaseInfoFunc(5));
// - getWorkingInfo - виводить ім'я прізвище професію і історію
console.log(getWorkingInfoFunc(21));
// updateHistory - оновліює історію роботи
updateHistoryFunc(21 , ['Global Logic', 2020, 2020]);
// - hire - приймає екземпляр класу студент і створює на основі нього екземпляр класу працівник і додає до себе в масив працівників
hireStudent(1, 1, 'frontend');
// - fire - звільняє працівника
fireWorker(1, 21);
// - close - закрити компанію, всі працівники будут звільнені
closeCompany(1);

console.log(students);
console.log(workers);
console.log(companies);
