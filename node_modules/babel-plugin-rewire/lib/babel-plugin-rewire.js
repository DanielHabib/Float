'use strict';

var _RewireState = require('./RewireState.js');

var _RewireState2 = _interopRequireDefault(_RewireState);

var _RewireHelpers = require('./RewireHelpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*Copyright (c) 2015, Robert Binna <r.binna@synedra.com>

 Permission to use, copy, modify, and/or distribute this software for any
 purpose with or without fee is hereby granted, provided that the above
 copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.*/

module.exports = function (_ref) {
	var t = _ref.types;

	var BodyVisitor = {
		JSXElement: function JSXElement(path, rewireInformation) {
			var node = path.node;
			var parent = path.parent;
			var scope = path.scope;
			var openingElement = node.openingElement;
			var closingElement = node.closingElement;
			var children = node.children;

			var tagName = openingElement.name.name;
			var variableBinding = scope.getBinding(tagName);

			if (!(0, _RewireHelpers.wasProcessed)(path) && !t.react.isCompatTag(tagName) && variableBinding !== undefined && variableBinding.scope.block.type === 'Program') {
				rewireInformation.ensureAccessor(tagName);

				var insertingBefore = path;

				//TODO recursively respect switch statements
				var scopeReached = insertingBefore.parentPath.node === scope.block;
				while (insertingBefore.parentPath && insertingBefore.parentPath.parentPath && (insertingBefore.parentPath.type === 'SwitchStatement' || !scopeReached && insertingBefore.parentPath.type !== 'BlockStatement')) {
					insertingBefore = insertingBefore.parentPath;
					scopeReached = insertingBefore.parentPath.node === scope.block;
				}

				var componentIdentifier = scope.generateUidIdentifier(tagName + '_Component');
				var temporaryComponentDeclaration = t.variableDeclaration('let', [t.variableDeclarator(componentIdentifier, t.callExpression(rewireInformation.getUniversalGetterID(), [t.stringLiteral(tagName)]))]);

				if (openingElement.selfClosing) {
					path.replaceWith((0, _RewireHelpers.noRewire)(t.JSXElement(t.JSXOpeningElement(t.JSXIdentifier(componentIdentifier.name), openingElement.attributes, true), null, [], true)));
				} else {
					path.replaceWith((0, _RewireHelpers.noRewire)(t.JSXElement(t.JSXOpeningElement(t.JSXIdentifier(componentIdentifier.name), openingElement.attributes, false), t.JSXClosingElement(t.JSXIdentifier(componentIdentifier.name)), children, false)));
				}

				if (insertingBefore.parentPath && insertingBefore.parentPath.type === 'ArrowFunctionExpression') {
					var arrowFunctionExpression = insertingBefore.parentPath.node;
					insertingBefore.parentPath.replaceWith(t.arrowFunctionExpression(arrowFunctionExpression.params, t.blockStatement([temporaryComponentDeclaration, t.returnStatement(insertingBefore.node)]), arrowFunctionExpression.async));
				} else {
					insertingBefore.insertBefore(temporaryComponentDeclaration);
				}
			}
		},

		Identifier: function Identifier(path, rewireInformation) {
			var node = path.node;
			var parent = path.parent;
			var scope = path.scope;

			var variableName = node.name;
			var variableBinding = !t.isFlow || !t.isFlow(node) && !t.isFlow(parent) ? scope.getBinding(variableName) : undefined;

			//Matches for body
			if (variableBinding !== undefined && !(0, _RewireHelpers.wasProcessed)(path) && variableBinding.scope.block.type === 'Program') {
				if (variableBinding.referencePaths !== null && (0, _RewireHelpers.contains)(variableBinding.referencePaths, path) && !(parent.type !== 'VariableDeclarator' && parent.id == node) && !(parent.type === 'MemberExpression' && parent.property === node) && !(parent.type === 'ObjectProperty' && parent.key === node) && !(parent.type === 'ObjectProperty' && path.parentPath && path.parentPath.parent && path.parentPath.parent.type === 'ObjectPattern') && !(parent.type === 'ExportSpecifier') && !(parent.type === 'ImportSpecifier') && !(parent.type === 'ObjectTypeProperty') && !(parent.type === 'ClassMethod')) {
					if (parent.type === 'UpdateExpression') {
						rewireInformation.addUpdateableVariable(variableName);
						path.parentPath.replaceWith(t.callExpression(rewireInformation.getUpdateOperationID(), [t.stringLiteral(parent.operator), t.stringLiteral(variableName), t.booleanLiteral(parent.prefix)]));
					} else {
						var isWildCardImport = variableBinding.path.type === 'ImportNamespaceSpecifier';
						rewireInformation.ensureAccessor(variableName, isWildCardImport);
						path.replaceWith(t.callExpression(rewireInformation.getUniversalGetterID(), [t.stringLiteral(variableName)]));
					}
				} else if (parent.type === 'AssignmentExpression' && parent.left == node) {
					rewireInformation.addUpdateableVariable(variableName);
					if (parent.operator === '=') {
						path.parentPath.replaceWith((0, _RewireHelpers.noRewire)(t.callExpression(rewireInformation.getAssignmentOperationID(), [t.stringLiteral(variableName), parent.right])));
					} else {
						var baseOperator = parent.operator.substring(0, parent.operator.length - 1);
						path.parentPath.replaceWith(t.assignmentExpression('=', parent.left, t.binaryExpression(baseOperator, t.callExpression(rewireInformation.getUniversalGetterID(), [t.stringLiteral(variableName)]), parent.right)));
					}
				}
			}
		},

		'ExportNamedDeclaration|ExportAllDeclaration': function ExportNamedDeclarationExportAllDeclaration(_ref2, rewireInformation) {
			var _ref2$node$specifiers = _ref2.node.specifiers;
			var specifiers = _ref2$node$specifiers === undefined ? [] : _ref2$node$specifiers;

			var hasDefaultExport = specifiers.some(function (specifier) {
				return specifier.local && specifier.local.name === 'default' || specifier.exported && specifier.exported.name === 'default';
			});
			rewireInformation.hasES6DefaultExport = rewireInformation.hasES6DefaultExport || hasDefaultExport;
			rewireInformation.isES6Module = true;
		},

		AssignmentExpression: function AssignmentExpression(_ref3, rewireInformation) {
			var assignmentExpression = _ref3.node;
			var blockType = _ref3.scope.block.type;

			rewireInformation.hasCommonJSExport = blockType === 'Program' && !!assignmentExpression.left.object && assignmentExpression.left.object.name === 'module' && !!assignmentExpression.left.property && assignmentExpression.left.property.name === 'exports';
		},

		ExportDefaultDeclaration: function ExportDefaultDeclaration(path, rewireInformation) {
			if (!(0, _RewireHelpers.wasProcessed)(path)) {
				(function () {
					var exportIdentifier = null;
					rewireInformation.hasES6DefaultExport = true;
					rewireInformation.hasES6Export = true;
					rewireInformation.isES6Module = true;

					var declarationVisitors = {
						ClassDeclaration: function ClassDeclaration(path, rewireInformation) {
							var existingClassDeclaration = path.node;
							var parent = path.parent;
							var scope = path.scope;

							if (existingClassDeclaration.id === null && parent.type === 'ExportDefaultDeclaration') {
								exportIdentifier = scope.generateUidIdentifier("DefaultExportValue");
								path.replaceWith(t.classDeclaration(exportIdentifier, existingClassDeclaration.superClass, existingClassDeclaration.body, existingClassDeclaration.decorators || []));
							} else {
								exportIdentifier = existingClassDeclaration.id;
							}
						},
						FunctionDeclaration: function FunctionDeclaration(path, rewireInformation) {
							var existingFunctionDeclaration = path.node;
							var scope = path.scope;

							if (existingFunctionDeclaration.id === null && path.parent.type === 'ExportDefaultDeclaration') {
								exportIdentifier = scope.generateUidIdentifier("DefaultExportValue");
								path.replaceWith(t.functionDeclaration(exportIdentifier, existingFunctionDeclaration.params, existingFunctionDeclaration.body, existingFunctionDeclaration.generator, existingFunctionDeclaration.async));
							} else {
								exportIdentifier = existingFunctionDeclaration.id;
							}
						},
						Identifier: function Identifier(_ref4, rewireInformation) {
							var parentType = _ref4.parent.type;
							var identifier = _ref4.node;

							if (parentType === 'ExportDefaultDeclaration') {
								exportIdentifier = identifier;
							}
						}
					};

					path.traverse(declarationVisitors, rewireInformation);
					if (exportIdentifier === null) {
						exportIdentifier = (0, _RewireHelpers.noRewire)(path.scope.generateUidIdentifier("DefaultExportValue"));
						path.replaceWithMultiple([t.variableDeclaration('let', [t.variableDeclarator(exportIdentifier, path.node.declaration)]), (0, _RewireHelpers.noRewire)(t.exportDefaultDeclaration(exportIdentifier))]);
					}
					rewireInformation.enrichExport(exportIdentifier);
				})();
			}
		},

		ImportDeclaration: function ImportDeclaration(path, rewireInformation) {
			rewireInformation.isES6Module = true;
		}
	};

	var ProgramVisitor = {
		Program: function Program(path, file) {
			if (!(0, _RewireHelpers.wasProcessed)(path)) {
				var scope = path.scope;
				var program = path.node;

				var rewireState = new _RewireState2.default(scope);

				path.traverse(BodyVisitor, rewireState);

				if (rewireState.containsDependenciesToRewire()) {
					rewireState.prependUniversalAccessors(scope);
					rewireState.appendExports();

					path.replaceWith((0, _RewireHelpers.noRewire)(t.Program(program.body.concat(rewireState.nodesToAppendToProgramBody), program.directives)));
				}
			}
		}
	};

	return {
		visitor: ProgramVisitor
	};
};