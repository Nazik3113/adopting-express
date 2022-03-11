import express from "express";

export const router = express.Router();

router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.json({status: Number(id)});
});

router.all("*", (req, res) => {
    res.status(404).json({status: 0, error: "uri not found"});
});