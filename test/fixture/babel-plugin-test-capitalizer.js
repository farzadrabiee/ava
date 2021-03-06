'use strict';

function isRequire(path) {
	return path.isCallExpression() && path.get('callee').isIdentifier() && (path.get('callee').node.name === 'require');
}

module.exports = babel => {
	const t = babel.types;

	return {
		visitor: {
			CallExpression: path => {
				// Skip require calls
				const firstArg = path.get('arguments')[0];

				if (!isRequire(path) && firstArg && firstArg.isStringLiteral() && !firstArg.node.value.includes('repeated test')) {
					firstArg.replaceWith(t.stringLiteral(firstArg.node.value.toUpperCase()));
				}
			}
		}
	};
};
