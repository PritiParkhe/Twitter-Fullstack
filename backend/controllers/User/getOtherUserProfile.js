import { User } from "../../models/userSchema.js";
import mongoose from "mongoose";

const getOtherUserProfile = async (req, res) => {
	// We will fetch user profiles either with username or userId
	// query is either username or userId
	const { query } = req.params;

	try {
		let users;

		// Check if the query is a valid ObjectId (userId)
		if (mongoose.Types.ObjectId.isValid(query)) {
			// If query is a valid ObjectId, search by userId
			
			users = await User.find({ _id: query }).select("-password -updatedAt");
		} else {
			// If not a valid ObjectId, treat it as a username and use a regex for partial matching

			const regex = new RegExp(`^${query}`, "i"); // 'i' for case-insensitive matching
			users = await User.find({ username: regex }).select("-password -updatedAt");
		}

		if (users.length === 0) return res.status(404).json({ error: "User not found" });

		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getOtherUserProfile: ", err.message);
	}
};

export { getOtherUserProfile };
