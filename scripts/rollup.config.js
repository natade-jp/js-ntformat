import buble from "@rollup/plugin-buble";
import uglify from "@lopatnov/rollup-plugin-uglify";

/**
 * 公開用ファイルの設定データを作成
 * @param {string} moduleName - ライブラリ名
 * @param {string} input_name - 入力となるES6のライブラリのトップファイル名
 * @param {string} output_name - 出力するファイル名
 * @param {boolean} isUmd - UMD用か
 * @param {boolean} isUglify - コードを最小化させるか否か
 */
const createData = function (moduleName, input_name, output_name, isUmd, isUglify) {
	const data = {};
	data.output = {};
	data.output.name = moduleName;
	data.output.file = output_name;
	data.output.format = isUmd ? "umd" : "esm";
	data.input = input_name;
	data.plugins = [];

	if (isUmd) {
		data.plugins.push(buble());
	}
	if (isUglify) {
		data.plugins.push(uglify());
	}

	return data;
};

const data = [];

data.push(createData("Test", "./src/index.js", "./build/esm/index.js", false, false));
data.push(createData("Test", "./src/index.js", "./build/esm/index.min.js", false, true));
data.push(createData("Test", "./src/index.js", "./build/umd/index.js", true, false));
data.push(createData("Test", "./src/index.js", "./build/umd/index.min.js", true, true));

export default data;
