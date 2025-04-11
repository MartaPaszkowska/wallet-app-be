export const validateRequest = (schema) => (req, res, next) => {
	console.log("BODY:", req.body);
	const { error } = schema.validate(req.body);
	if (error) {
		console.log("VALIDATION ERROR:", error.details[0]);
		return res.status(400).json({ message: error.details[0].message });
	}
	next();
};
