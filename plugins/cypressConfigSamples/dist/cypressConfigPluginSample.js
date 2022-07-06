"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cypressConfigPluginSample = void 0;
const unist_util_visit_1 = __importDefault(require("unist-util-visit"));
const createDirective_1 = require("./createDirective");
const hydratePluginSample_1 = require("./hydratePluginSample");
const tagName = 'cypress-plugin-sample';
function cypressConfigPluginSample() {
    (0, createDirective_1.createDirective)(this, tagName);
    return (root) => {
        (0, unist_util_visit_1.default)(root, 'containerDirective', (node) => {
            var _a;
            if (isParent(node) && ((_a = node.data) === null || _a === void 0 ? void 0 : _a.hName) === tagName) {
                let result = [];
                if (node.children.length === 1 && isCode(node.children[0])) {
                    result = transformNode(node.children[0]);
                }
                else if (isCode(node.children[0]) && isCode(node.children[1])) {
                    result = transformNode(node.children[1], node.children[0]);
                }
                else {
                    result = node.children;
                }
                node.children = result;
            }
        });
    };
}
exports.cypressConfigPluginSample = cypressConfigPluginSample;
function isParent(node) {
    return Array.isArray(node.children);
}
function isCode(node) {
    return node.type === 'code';
}
function transformNode(codeNode, importNode) {
    const tsCode = (0, hydratePluginSample_1.hydratePluginSample)(codeNode.value, importNode === null || importNode === void 0 ? void 0 : importNode.value);
    return [
        {
            type: 'jsx',
            value: `<CypressConfigFileTabs>\n`,
        },
        {
            type: 'code',
            lang: 'typescript',
            meta: 'copyTsToJs',
            value: tsCode,
        },
        {
            type: 'jsx',
            value: `\n</CypressConfigFileTabs>`,
        },
    ];
}
