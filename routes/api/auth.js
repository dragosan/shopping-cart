const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

//@route GET /api/auth @desc get all auth @access public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("System Error");
  }
});

//@route POST /api/auth @desc login user and get token @access public
router.post(
  "/",
  [
    check("email", "Enter Email").isEmail(),
    check("password", "Enter Password")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { email, password } = req.body;

    // check if user not registered
    try {
      let user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log(isMatch);
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      console.log(user)
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

module.exports = router;
