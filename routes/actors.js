const express = require("express");
const { Film, Actor } = require("../models");

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
    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    const actor = await Actor.create(req.body);
    return res.status(200).json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;

  try {
    const actor = await Actor.findOne({
      where: { id: id },
    });

    actor.name = name;
    actor.age = age;
    actor.save();

    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const actor = await Actor.findOne({
      where: { id: id },
    });
    await actor.update(data);
    return res.json(actor);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const actor = await Actor.findOne({
      where: { id: id },
    });
    await actor.removeFilms();
    await actor.destroy();
    return res.json({ msg: "Actor deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

module.exports = router;
