let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { LogModel } = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hi!')
});

/*
=========
Log Create 
==========
 */
router.post('/create', validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const LogEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const nowLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err){
        res.status(500).json({ error: err });
    }
    LogModel.create(logEntry)
});

router.get("/about", (req, res) => {
    res.send("This is the about route!")
});
/*
=============
Get all logs
=============
 */
router.get("/", async (req, res) => {
    try {
        const entries = await LogModel.findALl();
        res.status(200).json(entries);
    } catch (err){
        res.status(500).json({ error: err });
    }
});
/*
==============
Get log by User
===============
*/
router.get('/mine', validateJWT, async (req, res) => {
    const { id } = req.user
    try {
        const userLogs = await LogModel.findALl({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


/*
==============
Upadte a Log
==============
 */
router.put("/update/:entryId", validateJWT, async (req, res) => {
    const {  description, definition, result } = req.body.journal;
    const LogId = req.params.entryId;
    const UserId = req.user.id;

    const query = {
        where: {
            id: LogId,
            owner_id: UserId
        }
    };
    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    };
    try {
        const update = await LogModel.update(updateLog, query);
        res.status(200).json(upadte);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
============
Delete a log
============
 */
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };
        await LogModel.destroy(query);
        res.status(200).json({ message: "Log Entry Removed"});
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

module.exports = router;