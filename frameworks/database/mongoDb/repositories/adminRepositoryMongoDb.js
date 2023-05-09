import AdminModel from "../models/admin.js";

export default function adminRepositoryMongoDB() {
  const findByEmail = (email) => AdminModel.findOne({ email });

  const add = (user) => {
    const newUser = new AdminModel({
      email: user.getEmail(),
      password: user.getPassword(),
      date: user.getDate()
    });

    return newUser.save();
  };

  return {
    findByEmail,
    add
  };
}
