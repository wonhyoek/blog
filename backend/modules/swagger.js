const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        components: {},
        info: {
            title: 'blog API',
            version: '1.0.0',
            description: 'blog API with express',
        },
        servers: [
			{
				url: "http://localhost:5000",
			},
		]
    },
    apis: ['./router/*.js', './swagger/*.yaml']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};