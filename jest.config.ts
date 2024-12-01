export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(jpg|jpeg|png|gif|svg|webp)$": "jest-transform-stub", 
  },

  moduleNameMapper: {
    "^.+\\.(jpg|jpeg|png|gif|svg|webp)$": "jest-transform-stub",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], 
};
