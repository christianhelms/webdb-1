const router = require("express").Router();

const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
    db("accounts")
      .then(accounts => {
        res.status(200).json(accounts);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "Could not retrieve the list of accounts" });
      });
  });

  router.get("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first()
      .then(account => {
        res.status(200).json(account);
      })
      .catch(error => {
        res.status(500).json({ message: "error getting the account from db" });
      });
  });

  router.post("/", (req, res) => {
    const account = req.body;
    db("accounts")
      .insert(account, "id")
      .then(account => {
        res.status(200).json(account);
      })
      .catch(error => {
        res.status(500).json({ message: "error saving the account to the db" });
      });
  });

  router.put("/:id", (req, res) => {
    const changes = req.body;
  
    db("accounts")
      .where("id", "=", req.params.id)
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "error updating the account" });
      });
  });

  router.delete('/:id', (req, res) => {
    db('accounts')
      .where('id', '=', req.params.id)
      .del()
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: 'not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'error removing the account' });
      });
  });

module.exports = router;
