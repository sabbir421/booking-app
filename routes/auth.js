import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("authentication get endpoint");
});
router.get("/signup", (req, res) => {
  res.send("authentication get method for registation");
});
router.get("/login", (req, res) => {
  res.send("auth login route");
});

export default router;
