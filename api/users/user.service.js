const pool = require("../../config/database");

module.exports = {
    checkUserIdExists : (id, callback) => {
        pool.query(
            'SELECT id FROM registration WHERE id = ?',
            [id],
            (error, results) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, results.length > 0);
            }
        );
    },
    create: (data,callBack) => {
        pool.query(
            `insert into registration(id,user_name,user_mobile,user_salary,user_city,user_country,user_department,user_role)
            values(?,?,?,?,?,?,?,?)`,
            [
                data.id,
                data.user_name,
                data.user_mobile,
                data.user_salary,
                data.user_city,
                data.user_country,
                data.user_department,
                data.user_role
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }

                return callBack(null, { id: results.insertId, ...data });

            }
        );
    },
    getUsers:callBack=>{
        pool.query(
            `select id,user_name,user_mobile,user_salary,user_city,user_country,user_department,user_role from registration`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }

                return callBack(null,results);

            }
        );
    },
    getUserById:(id,callBack)=>{
        pool.query(
            `select id,user_name,user_mobile,user_salary,user_city,user_country,user_department,user_role from registration where id = ?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }

                return callBack(null,results[0]);

            }
        );
    },
    
    updateUser:(data,id,callBack)=>{
        pool.query(
            `update registration set user_name=?,user_mobile=?,user_salary=?,user_city=?,user_country=?,user_department=?,user_role=? where id=?`,

            [
                data.user_name,
                data.user_mobile,
                data.user_salary,
                data.user_city,
                data.user_country,
                data.user_department,
                data.user_role,
                data.id
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }

                return callBack(null,results);

            }
        );
    },
    deleteUser:(id,callBack)=>{
        pool.query(
            `delete from registration where id=?`,

            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }

                return callBack(null,results);

            }
        );
    },

    removeDuplicates : (callback) => {
        pool.query(
            `DELETE FROM registration
             WHERE id NOT IN (
                 SELECT * FROM (
                     SELECT MIN(id) as id
                     FROM registration
                     GROUP BY user_name, user_mobile
                     HAVING COUNT(*) > 1
                 ) as temp
             )`,
            (error, results) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, results);
            }
        );

    }

};