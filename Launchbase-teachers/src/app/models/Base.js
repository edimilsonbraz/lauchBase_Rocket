const db = require('../../config/db')


const base = {
    init({table}) {
        if(!table) throw new Error('Ivalid params')

        this.table = table  //this é = base

        return this
    },
    async find(id) {
        const results = await db.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])
        return results.rows[0]
    },
    async findAll() {
        try {
            const results = await db.query(`SELECT * FROM ${this.table}`)

            return results.rows
            
        } catch (error) {
            console.error(error)
        }
    },
    async create(fields) {
        try {
            let keys = [],
                values = []
            Object.keys(fields).map(key => {
                keys.push(key)
                values.push(`'${fields[key]}'`)
            })

            const query = `INSERT INTO ${this.table} (${keys.join(',')})
            VALUES (${values.join(',')})
            RETURNING id `

            const results = await db.query(query)
            return results.rows[0].id
            
        } catch (error) {
            console.error(error)
        }
    },
    update(id, fields) {
        try {
            let update = []

            Object.keys(fields).map(key => {
                const line = ` ${key} = '${fields[key]}'`

                update.push(line)
            })

            const query = `UPDATE ${this.table} SET 
                ${update.join(',')}
                WHERE id = ${id}
            `

            return db.query(query)
            
        } catch (error) {
            console.error(error)
        }
    },
    delete(id) {
        return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
    },

}


module.exports = base