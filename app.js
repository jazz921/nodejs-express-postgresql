const express = require('express');
const { getAccounts, createAccount, getAccount, deleteAccount } = require("./database.js");


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json(["Test 1", "Test 2", "Test 3"]);
});

app.get("/accounts", async (req, res, next) => {
    try {
        const accounts = await getAccounts();
        return res.status(200).send(accounts);
    } catch (error) {
        res.json("");
    }
});

app.post("/accounts", async (req, res, next) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const request = await createAccount(username, email, password)
        return res.status(201).send({
            username, email, password
        })
    } catch (error) {
        res.json(`Error creating a resource: ${error}`)
    }
})

app.get("/accounts/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const account = await getAccount(id);
        return res.status(200).send(account);
    } catch (error) {
        res.json("");
    }
});

app.delete("/accounts/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const account = await deleteAccount(id);
        return res.status(200).send(account);
    } catch (error) {
        res.json("");
    }
});

app.listen(8080, () => {
    console.log("App is running at PORT:8080");
});


module.exports = app