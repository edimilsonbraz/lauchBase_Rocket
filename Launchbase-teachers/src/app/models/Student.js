const Base = require('./Base')

const db = require('../../config/db')

Base.init({ table: 'students' })

module.exports = {
    ...Base,
    async find(id) {
        const query = `
        SELECT students.*, teachers.name AS teacher_name 
        FROM students 
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`

        const results = await db.query(query, [id])

        return results.rows[0]

    },
    async teachersSelectOptions() {
        const results = await db.query(`SELECT name, id FROM teachers`)

        return results.rows
    
    },
    paginate(params) {
        const { filter, limit, offset} = params

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
            ) AS total
            `;
        }

        query = `
        SELECT students.*, ${totalQuery} 
        FROM students
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `;

        return db.query(query, [limit, offset]); 
    },

}








