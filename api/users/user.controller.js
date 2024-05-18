const { create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    checkUserIdExists,removeDuplicates
 } = require("./user.service");


module.exports = {
    createUser:(req,res)=>{
        const body = req.body;
        const id = body.id;
        checkUserIdExists(id,(err,exists)=>{
            if(err){
                console.log(err);
            }

            if(exists){
                return res.status(400).json({
                    success:0,
                    message:"User ID already exists"
                });
            }

            create(body,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).jsona({
                        success:0,
                        message:"Database connection error"
                    });
                }
    
                return res.status(200).json({
                    success:1,
                    data:results
                });
    
            });


        });
        
    },
    getUserById:(req,res)=>{
        const id = req.params.id;
        getUserById(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }

            return res.json({
                success:1,
                data:results
            });
        })
    },
    getUsers:(req,res)=>{
        
        getUsers((err,results)=>{
            if(err){
                console.log(err);
                return;
            }

            

            return res.json({
                success:1,
                data:results
            });
        })
    },
    updateUser:(req,res)=>{
        const id = req.params.id;
        const body = req.body
        checkUserIdExists(id, (err, exists) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!exists) {
                return res.json({
                    success: 0,
                    message: "User ID not found"
                });
            }
            updateUser(body, id, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                if (results.affectedRows === 0) {
                    return res.json({
                        success: 0,
                        message: "Failed to update user"
                    });
                }
                return res.json({
                    success: 1,
                    message: "Updated successfully"
                });
            });
        })
    },
    deleteUser:(req,res)=>{
        const id = req.params.id;
        deleteUser(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }

            return res.json({
                success:1,
                message:"user deleted successfully"
            });
        });
    },
    removeDuplicates: (req, res) => {
        removeDuplicates((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                message: "Duplicate rows removed successfully"
            });
        });
    }
};
    

    

