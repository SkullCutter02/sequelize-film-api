const express = require("express");
const { Film, Actor } = require("../models");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actors = await Actor.findAll({
      include: [
        {
          model: Film,
          as: "films",
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json(actors);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const actor = await Actor.findOne({
      where: { id: id },
      include: [
        {
          model: Film,
          as: "films",
          through: { attributes: [] },
        },
      ],
    });
    return res.json({ actor, authData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.post("/", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const actor = await Actor.create(req.body);
        return res.json({ actor, authData });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ err });
      }
    }
  });
});

router.put("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const id = req.params.id;
      const { name, age } = req.body;

      try {
        const actor = await Actor.findOne({
          where: { id: id },
        });

        actor.name = name;
        actor.age = age;
        actor.save();

        return res.json({ actor, authData });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ err });
      }
    }
  });
});

router.patch("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const id = req.params.id;
      const data = req.body;

      try {
        const actor = await Actor.findOne({
          where: { id: id },
        });
        await actor.update(data);
        return res.json({ actor, authData });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ err });
      }
    }
  });
});

router.delete("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const id = req.params.id;

      try {
        const actor = await Actor.findOne({
          where: { id: id },
        });
        await actor.removeFilms();
        await actor.destroy();
        return res.json({ msg: "Actor deleted", authData });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ err });
      }
    }
  });
});

module.exports = router;
