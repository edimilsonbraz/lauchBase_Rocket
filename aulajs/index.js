
const classA = [
    {
        name: "Edimilson",
        grade: 7.8
    },
    {
        name: "Mayk",
        grade: 10
    },
    {
        name: "Valeska",
        grade: 4
    },
    {
        name: "Diego",
        grade: 10
    }
]

const classB = [
    {
        name: "Eduardo",
        grade: 7
    },
    {
        name: "Denis",
        grade: 6
    },
    {
        name: "Marcos",
        grade: 2
    },
    {
        name: "Aline",
        grade: 7
    }
]


function calculateAverage(students) {
    let sum = 0;
    for (let i = 0; i < students.length; i++) {
        sum = sum + students[i].grade
    }

    const average = sum / students.length

    return average

}

function sendMessage(average, turma) {
    if (average > 5) {
        console.log(`${turma} average: ${average}. Congrats`)
    } else {
        console.log(`${turma} Is not good!`)
    }
}

function markAsFlunked(student) {
    student.flunked = false;
    if (student.grade < 5) {
        student.flunked = true;
    }
}

function sendFlunkedMessage(student) {
    if (student.flunked) {
        console.log(`${student.name} flunked!`)
    }
}

function studentFlunked(students) {
    for (let student of students) {
        markAsFlunked(student);
        sendFlunkedMessage(student)
    }
}

const average1 = calculateAverage(classA)
const average2 = calculateAverage(classB)

sendMessage(average1, 'Class A')
sendMessage(average2, 'Class B')

studentFlunked(classA)
studentFlunked(classB)