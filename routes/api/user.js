const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

//@route GET /api/users @desc get all users @access public
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send("System Error");
  }
});

//@route POST /api/users @desc register user @access public
router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "must contain at least 6 charachters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    // check if user already registered
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

     

      user = new User({ name, email, password });

      //hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token,user });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send("System Error");
    }
  }
);

//@route DELETE /api/users @desc delete user @access private
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ id });
    return res.json({ msg: "user deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("System Error");
  }
});

module.exports = router;
