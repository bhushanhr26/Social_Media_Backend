import User from "../models/User.model.js";

// API to create new User
export const createUser = async (req, res) => {
  const new_user = new User(req.body);
  try {
    if (await User.findOne({ email: new_user?.email }, { email: 1 })) {
      res.status(400);
      res.send("user exist");
    } else {
      new_user.save();
      res.status(200);
      res.send(new_user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// API to delete user based on ID
export const deleteUserById = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findByIdAndDelete(_id);
    res.status(200);
    res.send(user).send("user deleted");
  } catch (error) {
    res.status(500).send("user not exist");
  }
};

//API to get the user based on the ID
export const getUserId = async (req, res) => {
  const { _id } = req.params;
  try {
    let user = await User.find({ _id: _id }, { password: 0 }); // exclude password field while fetch
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "No user found" });
  }
};

// Update User Info based on the provided data
export const updateUserById = async (req, res) => {
  const { _id } = req.params;
  try {
    let user = await User.updateOne({ _id: _id }, { $set: req.body });
    // user.name = req.body.name
    // user.email = req.body.email
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ message: "Update failed!" + e });
  }
};
