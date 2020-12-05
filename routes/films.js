const express = require("express");
const { Film, Actor } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const films = await Film.findAll({
      include: [
        {
          model: Actor,
          as: "actors",
          through: { attributes: [] },
        },
      ],
    });
    return res.json(films);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const film = await Film.findOne({
      where: { id: id },
      include: [
        {
          model: Actor,
          as: "actors",
          through: { attributes: [] },
        },
      ],
    });
    return res.json(film);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { actors, ...data } = req.body;
    const film = await Film.create(data);

    if (actors !== null && actors !== undefined && actors.length > 0) {
      film.setActors(actors);
    }

    return res.status(200).json(film);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const film = await Film.findOne({
      where: { id: id },
    });

    const { actors, ...data } = req.body;

    film.name = data.name;
    film.release_year = data.release_year;
    film.rating = data.rating;
    await film.save();

    if (actors !== null && actors !== undefined && actors.length > 0) {
      film.setActors(actors);
    }

    return res.json(film);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const film = await Film.findOne({
      where: { id: id },
    });

    const { actors, ...data } = req.body;
    await film.update(data);

    if (actors !== null && actors !== undefined && actors.length > 0) {
      film.setActors(actors);
    }

    return res.json(film);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const film = await Film.findOne({
      where: { id: id },
    });
    await film.destroy();
    await film.removeActors();
    return res.json({ msg: "Film deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
});

module.exports = router;
