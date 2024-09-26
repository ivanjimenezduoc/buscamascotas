module.exports = {
    testEnvironment: 'jsdom', // Asegura que Jest use un entorno DOM para pruebas de front-end
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Para cargar las extensiones de Testing Library
    transform: {'^.+\\.(js|jsx)$': 'babel-jest',},
    testEnvironment: 'jest-environment-jsdom',
  };
  