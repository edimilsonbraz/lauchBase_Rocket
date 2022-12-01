const Teacher = require('./src/app/models/Teacher')
const Student = require('./src/app/models/Student')

const faker = require('faker')
const { date } = require('./src/lib/utils')

const totalTeachers = 6;
const totalStudents = 12;

let teachersIds = []

const classType = ['presencial', 'À distancia']

const educationLevel = ['EMC', 'ESC', 'MC', 'DC']

const schoolYear = ['5EF', '6EF', '7EF', '8EF', '9EF', '1EM', '2EM', '3EM' ]


async function createTeachers() {
    const teachers = []
   
    while (teachers.length < totalTeachers) {

        teachers.push({
            name: faker.name.firstName(),
            avatar_url: faker.image.imageUrl(),
            birth: date(faker.date.past()).iso,
            education_level: educationLevel[Math.floor(Math.random() * educationLevel.length)],
            class_type: classType[Math.round(Math.random())],
            subjects_taught: `${faker.name.jobArea()}, ${faker.name.jobArea()}, ${faker.name.jobArea()}`,

        })
    }

    const teachersPromise = teachers.map(teacher => Teacher.create(teacher) )

    teachersIds = await Promise.all(teachersPromise)
}

async function createStudents() {
    const students = []

    while (students.length < totalStudents) {

        students.push({
            name: faker.name.firstName(),
            avatar_url: faker.image.imageUrl(),
            birth: date(faker.date.past()).iso,
            email: faker.internet.email(),
            school_year: schoolYear[Math.round(Math.random())],
            subjects: `${faker.name.jobArea()}, ${faker.name.jobArea()}, ${faker.name.jobArea()}`,
            workload: faker.random.number(999),
            teacher_id: Math.ceil(Math.random() * totalTeachers)
            
        })
    }

    const studentsPromise = students.map(student => Student.create(student))

    studentsIds = await Promise.all(studentsPromise)

}


async function init() {
    await createTeachers()
    await createStudents()
}

init()
