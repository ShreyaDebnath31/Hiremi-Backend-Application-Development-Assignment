const {createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,removeDuplicates} = require("./user.controller");
const { create } = require("./user.service");
const router = require("express").Router();

router.post("/",createUser);
router.get("/",getUsers);
router.get("/:id",getUserById);
router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);
router.delete("/remove-duplicates",removeDuplicates);


module.exports = router;