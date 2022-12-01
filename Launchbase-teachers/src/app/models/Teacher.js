const Base = require('./Base')

const db = require('../../config/db')


Base.init({ table: 'teachers' })

module.exports = {
    ...Base,
    async findBy(filter) {
        const query = `
        SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (teachers.id = students.teacher_id)
        WHERE teachers.name ILIKE '%${filter}%'
        OR teachers.subjects_taught ILIKE '%${filter}%'
        GROUP BY teachers.id
        ORDER BY total_students DESC`

        const results = await db.query(query, [id])

        return results.rows
        
    },
    paginate(params) {
        const { filter, limit, offset } = params;
    
        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM teachers
            ) AS total`;
    
        if (filter) {
            filterQuery = `
            WHERE teachers.name ILIKE '%${filter}%'
            OR teachers.subjects_taught ILIKE '%${filter}%' 
            `;
    
            totalQuery = `(
                SELECT count(*) FROM teachers
                    ${filterQuery}
                ) AS total
            `;
        }
    
        query = `
                SELECT teachers.*, ${totalQuery} ,count(students) AS total_students 
                FROM teachers
                LEFT JOIN students ON (teachers.id = students.teacher_id)
                ${filterQuery}
                GROUP BY teachers.id 
                LIMIT $1 OFFSET $2
            `;
    
        return db.query(query, [limit, offset]);
    },
       
}



    

   










