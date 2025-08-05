import express from "express";
import FormSubmissions from "../models/FormSubmissions.js";
import { userAuth } from "../middlwares/auth.js";

const router = express.Router();

router.post("/form/create", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const form = new FormSubmissions({ name, email, phone, message });
    await form.save();

    res.status(201).json({ message: "Form submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/form/submissions",async (req, res) => {
  try {
    const submissions = await FormSubmissions.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

router.get("/me", userAuth, async (req, res) => {
  try {
    res.status(200).json(req.user); // req.user is set by userAuth middleware
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
