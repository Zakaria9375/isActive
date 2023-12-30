import { Client, Databases } from "node-appwrite";

export default async ({ req, res, log, error }) => {
	const client = new Client()
		.setEndpoint(process.env.APPWRITE_ENDPOINT)
		.setProject(process.env.APPWRITE_PROJECT_ID);
	log("Function is triggered");

	const database = new Databases(client);
	log(req.bodyRaw);
	const payload = JSON.parse(req.bodyRaw);
	log(payload.isActive);
	log(payload.userId);
	const userId = payload.userId;
	const isActive = payload.isActive;
	const lastLoginTime = new Date().toISOString();

	try {
		const response = await database.updateDocument(
			"appData",
			"users",
			userId,
			{
				isActive: isActive,
				lastVisitAt: lastLoginTime,
			}
		);
		log("User status updated:" + JSON.stringify(response));
		return res.send(response);
	} catch (e) {
		error("Failed to update user status: " + e.message);
		return res.send("Failed to update document");
	}
};
