import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log, error }) => {
	const client = new Client()
		.setEndpoint(process.env.APPWRITE_ENDPOINT)
		.setProject(process.env.APPWRITE_PROJECT_ID)
	log("Function is triggered");

	const database = new Databases(client);

	const userId = req.bodyRaw.userId;
	const isActive = req.bodyRaw.isActive;
	const lastLoginTime = new Date().toISOString();
	log("Payload is", userId, isActive);
	log("lastLoginTime is", lastLoginTime);

	try {
		const response = await database.updateDocument("appData", "users", userId, {
			isActive: isActive,
			lastVisitAt: lastLoginTime,
		});
		log("User status updated:", response);
		return res.json(response);
	} catch (e) {
		error("Error updating user status:", e);
		return res.json({ error: e.message });
	}
};
