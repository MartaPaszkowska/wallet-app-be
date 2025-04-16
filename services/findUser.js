import User from "../models/userSchema.js";

const fetchUser = (key) => {
	return User.findOne(key);
};

export default fetchUser;
