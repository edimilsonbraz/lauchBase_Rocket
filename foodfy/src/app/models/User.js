const db = require('../../config/db')
const { hash } = require('bcryptjs')


module.exports = {
    async list() {
        const query = `
        SELECT * FROM users
        ORDER BY updated_at DESC
        `

        const results = await db.query(query)
        return results.rows        
    },
    async findOne(filters) {
        let query = `SELECT * FROM users`

       Object.keys(filters).map(key => {
           //where | or | and
           query = `${query}
           ${key}
           `

           Object.keys(filters[key]).map(field => {
               query = `${query} ${field} = '${filters[key] [field]}'`
           })
       })

       const results = await db.query(query)

       return results.rows[0]
    },
    async create(data) {
         try {
             const query = `
             INSERT INTO users (
                 name,
                 email,
                 password,
                 is_admin
             ) VALUES ($1, $2, $3, $4)    
             RETURNING id, email
             `
             if(data.seedPassword) {
                const values = [
                    data.name,
                    data.email,
                    data.seedPassword,
                    data.is_admin || false
                ]
            }
             //hash of password
             let randomPassword = Math.random().toString(36).slice(-5)
             const passwordHash = await hash(randomPassword, 8)
 
             let values = [
                 data.name,
                 data.email,
                 passwordHash,
                 data.is_admin || false
             ]

             if(data.seedPassword) {
                values = [
                    data.name,
                    data.email,
                    data.seedPassword,
                    data.is_admin || false
                ]
            }
 
             const results = await db.query(query, values)
            //  return results.rows[0].id 
            return {
                id: results.rows[0].id,
                email: results.rows[0].email,
                password: randomPassword
            }
 
         } catch (err) {
             console.error (err)
         }
    },
    async put(id, fields) {
        try {
            let query = "UPDATE users SET"
    
            Object.keys(fields).map((key, index, array) => {
                if ((index + 1) < array.length) {
                    query = `${query}
                        ${key} = '${fields[key]}',
                    `
                } else {
                    query = `${query}
                        ${key} = '${fields[key]}'
                        WHERE id = ${id}
                    `
                }
            })
    
            await db.query(query)
    
            return

        }catch(error) {
            console.log(`Database PUT Error => ${error}`)
        }
    },
    async delete(id) {
        const query = `
            DELETE FROM users WHERE id = $1
        `;

        return db.query(query, [id]);
    }
}