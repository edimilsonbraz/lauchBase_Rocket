const db = require('../../config/db')
// const { date } = require('../../lib/utils')
const fs = require('fs')


module.exports = {
    async all() {
        try {
          
            const results = await db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY created_at DESC
            `)

            return results.rows
        }catch (err) {
            console.error (err)
        }

    },
    create(data, userId) {
        try {
            const query = `
                INSERT INTO recipes (
                    chef_id,
                    user_id,
                    title,
                    ingredients,
                    preparation,
                    information
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id
            `
            const values = [
                data.chef,
                userId,
                data.title,
                data.ingredients,
                data.preparation,
                data.information
            ]
        
            return db.query(query, values) 
        }catch (err) {
            console.error (err)
        }

    },
    find(id) {
        try {
            return db.query (`
                SELECT recipes.*, 
                chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1`, [id])
        } catch (err) {
            console.error (err)
        }
        
    },
    update(data) {
        try {
            const query = `
                UPDATE recipes SET 
                    chef_id=($1),
                    title=($2),
                    ingredients=($3),
                    preparation=($4),
                    information=($5)
                 WHERE id = $6
                `
    
            const values = [
                data.chef,
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                data.id
            ]
    
            return db.query(query, values)
        }catch (err) {
            console.error (err)
        }
    },
    async delete(id) {
        try {

            return db.query('DELETE FROM recipes WHERE id = $1', [id]);
            
        } catch (err) {
            console.log(err);
        }
       
    },
    files(id) {
        try {
            const query =`
            SELECT files.* 
            FROM files 
            LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
            LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id) 
            WHERE recipes.id = $1`;

            return db.query(query, [id]);

        } catch (error) {
            console.error(error);
        }
        
    },  
    chefsSelectOptions() {
        try {
            return db.query(`
            SELECT name, id FROM chefs
            `)
        }catch (err) {
            console.error (err)
        }
    },
    paginate(params) {
        const { filter, limit, offset } = params;

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`;

        if (filter) {
            filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'`;

            totalQuery = `(
                SELECT count(*) FROM recipes
                    ${filterQuery}
                ) AS total
            `;
        }

        query = `
                SELECT recipes.*, ${totalQuery}, chefs.name AS chef_name
                FROM recipes
                LEFT JOIN chefs ON ( recipes.chef_id = chefs.id )
                ${filterQuery}
                ORDER BY recipes.updated_at DESC
                LIMIT $1 OFFSET $2
            `;

        return db.query(query, [limit, offset]);
    },
    search(filter) {
        return db.query(`
            SELECT recipes.*, chefs.name AS chef_name 
            FROM recipes
            LEFT JOIN chefs ON ( recipes.chef_id = chefs.id )
            WHERE recipes.title ILIKE '%${filter}%'
            OR chefs.name ILIKE '%${filter}%'
            ORDER BY updated_at DESC
        `)
    },
    async userRecipes(userId) {
        try {
          const results = await db.query(`
            SELECT recipes.*, chefs.name As chef_name
            FROM recipes
            LEFT JOIN chefs on (recipes.chef_id = chefs.id)
            LEFT JOIN users on (recipes.user_id = users.id)
            WHERE users.id = $1`, [userId]
        )  
            return results.rows

        } catch (error) {
            console.error(error)
        }
       
    }
    
}