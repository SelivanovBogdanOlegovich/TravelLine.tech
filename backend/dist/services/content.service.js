"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeContent = exports.readContent = void 0;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const contentFilePath = path_1.default.join(process.cwd(), "src", "data", "content.json");
const readContent = async () => {
    const content = await (0, promises_1.readFile)(contentFilePath, "utf-8");
    return JSON.parse(content);
};
exports.readContent = readContent;
const writeContent = async (data) => {
    const content = JSON.stringify(data, null, 2);
    await (0, promises_1.writeFile)(contentFilePath, `${content}\n`, "utf-8");
};
exports.writeContent = writeContent;
