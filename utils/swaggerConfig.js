
import swaggerJSDoc from 'swagger-jsdoc';
//import swaggerUi from 'swagger-ui-express';



const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Documentation for My Project',
    },
  },
  apis: ['./routes/api/*.js'], // Ścieżka do plików z definicjami endpointów - dodawać przy nowej ścieżce
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

