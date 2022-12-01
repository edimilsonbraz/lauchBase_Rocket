const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
        SELECT * 
        FROM students
        ORDER BY name ASC`, function(err, results) {
            if(err) throw "Database Error!Index"


            callback(results.rows)
        })
    },
    create(data, callback ) {
       
        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                created_at,
                teacher_id
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.email,
            data.school_year,
            data.subjects,
            data.workload,
            date(Date.now()).iso,
            data.teacher

        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error!Create ${err}`

            callback(results.rows[0])
            
        })
    },
    find(id, callback) {
        db.query(`
        SELECT students.*, teachers.name AS teacher_name 
        FROM students 
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`, [id], function(err, results) {
                if(err) throw "Database Error!Find"

                callback(results.rows[0])

        })
    },
    update(data, callback) {
        const query = `
        UPDATE students SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            email=($4),
            school_year=($5),
            subjects=($6),
            workload=($7),
            teacher_id=($8)
        WHERE id = $9
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.school_year,
            data.subjects,
            data.workload,
            data.teacher,
            data.id
        ]
        db.query(query, values, function(err, results) {
            if(err) throw `Database Error!Update ${err}`


            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error!Delete ${err}`

            return callback()

        })
    },
    teachersSelectOptions(callback) {
        db.query(`SELECT name, id FROM teachers`, function(err, results) {
            if (err) throw 'Database Error!SelectOpt'

            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM students
            ) AS total`


           if ( filter ) {
            filterQuery = `
            WHERE students.name ILIKE '%${filter}%'
            OR students.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM students
                ${filterQuery}
            ) as total`
        }

        query = `
        SELECT students.*, ${totalQuery} 
        FROM students
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw 'Database Error! Paginate'

            callback(results.rows)
        })
    }
}