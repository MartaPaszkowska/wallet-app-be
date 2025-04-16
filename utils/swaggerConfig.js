import swaggerJSDoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "My API",
			version: "1.0.0",
			description: "API Documentation for My Project",
		},
	},
	apis: ["./routes/api/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
