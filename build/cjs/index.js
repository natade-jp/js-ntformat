'use strict';

/**
 * NTFormat.js
 *
 * AUTHOR:
 *  natade (http://twitter.com/natadea)
 *
 * LICENSE:
 *  The MIT license https://opensource.org/licenses/MIT
 */

/**
 * 書式に合わせて文字列を組み立てる関数を提供するクラス
 */
var NTFormat = function NTFormat () {};

NTFormat.textf = function textf () {
	var parm_number = 1;
	var parm = arguments;
	/**
		 * @param {number} x
		 * @returns {number}
		 * @private
		 */
	var toUnsign = function (x) {
		if (x >= 0) {
			return x;
		} else {
			var ix = -x;
			//16ビットごとに分けてビット反転
			var high = (~ix >> 16) & 0xffff;
			high *= 0x00010000;
			var low = ~ix & 0xffff;
			return high + low + 1;
		}
	};
	/**
		 * @param {string} istr
		 * @returns {string}
		 * @private
		 */
	var func = function (istr) {
		// 1文字目の%を除去
		var str = istr.substring(1, istr.length);
		var buff;
		// [6] 変換指定子(最後の1文字を取得)
		buff = str.match(/.$/);
		var type = buff[0];
		if (type === "%") {
			return "%";
		}
		// ここからパラメータの解析開始
		// [1] 引数順
		buff = str.match(/^[0-9]+\$/);
		if (buff !== null) {
			buff = buff[0];
			// 残りの文字列を取得
			str = str.substring(buff.length, str.length);
			// 数字だけ切り出す
			buff = buff.substring(0, buff.length - 1);
			// 整数へ
			parm_number = parseInt(buff, 10);
		}
		// 引数を取得
		var parameter = parm[parm_number];
		if (typeof parameter !== "string" && typeof parameter !== "number") {
			parameter = parameter.toString();
		}
		parm_number = parm_number + 1;
		// [2] フラグ
		buff = str.match(/^[-+ #0]+/);
		var isFlagSharp = false;
		var isFlagTextAlignLeft = false;
		var isFlagFillZero = false;
		var sSignCharacter = "";
		if (buff !== null) {
			buff = buff[0];
			// 残りの文字列を取得
			str = str.substring(buff.length, str.length);
			if (buff.indexOf("#") !== -1) {
				isFlagSharp = true;
			}
			if (buff.indexOf("-") !== -1) {
				isFlagTextAlignLeft = true;
			}
			if (buff.indexOf(" ") !== -1) {
				sSignCharacter = " ";
			}
			if (buff.indexOf("+") !== -1) {
				sSignCharacter = "+";
			}
			if (buff.indexOf("0") !== -1) {
				isFlagFillZero = true;
			}
		}
		// [3] 最小フィールド幅
		var width = 0;
		buff = str.match(/^([0-9]+|\*)/);
		if (buff !== null) {
			buff = buff[0];
			// 残りの文字列を取得
			str = str.substring(buff.length, str.length);
			if (buff.indexOf("*") !== -1) {
				// 引数で最小フィールド幅を指定
				width = parameter;
				parameter = parm[parm_number];
				parm_number = parm_number + 1;
			} else {
				// 数字で指定
				width = parseInt(buff, 10);
			}
		}
		// [4] 精度の指定
		var isPrecision = false;
		var precision = 0;
		buff = str.match(/^(\.((-?[0-9]+)|\*)|\.)/); //.-3, .* , .
		if (buff !== null) {
			buff = buff[0];
			// 残りの文字列を取得
			str = str.substring(buff.length, str.length);
			isPrecision = true;
			if (buff.indexOf("*") !== -1) {
				// 引数で精度を指定
				precision = parameter;
				parameter = parm[parm_number];
				parm_number = parm_number + 1;
			} else if (buff.length === 1) {
				// 小数点だけの指定
				precision = 0;
			} else {
				// 数字で指定
				buff = buff.substring(1, buff.length);
				precision = parseInt(buff, 10);
			}
		}
		// 長さ修飾子(非サポート)
		buff = str.match(/^hh|h|ll|l|L|z|j|t/);
		if (buff !== null) {
			str = str.substring(buff.length, str.length);
		}
		// 文字列を作成する
		var output = "";
		var isInteger = false;
		switch (type.toLowerCase()) {
			// 数字関連
			case "d":
			case "i":
			case "u":
			case "b":
			case "o":
			case "x":
				isInteger = true;
			// falls through
			case "e":
			case "f":
			case "g": {
				var sharpdata = "";
				var textlength = 0; // 現在の文字を構成するために必要な長さ
				var spacesize; // 追加する横幅
				// 整数
				if (isInteger) {
					// 数字に変換
					if (isNaN(parameter)) {
						parameter = parseInt(parameter, 10);
					}
					// 正負判定
					if (type === "d" || type === "i") {
						if (parameter < 0) {
							sSignCharacter = "-";
							parameter = -parameter;
						}
						parameter = Math.floor(parameter);
					} else {
						if (parameter >= 0) {
							parameter = Math.floor(parameter);
						} else {
							parameter = Math.ceil(parameter);
						}
					}
				}
				// 実数
				else {
					// 数字に変換
					if (isNaN(parameter)) {
						parameter = parseFloat(parameter);
					}
					// 正負判定
					if (parameter < 0) {
						sSignCharacter = "-";
						parameter = -parameter;
					}
					if (!isPrecision) {
						precision = 6;
					}
				}
				// 文字列を作成していく
				switch (type.toLowerCase()) {
					case "d":
					case "i":
						output += parameter.toString(10);
						break;
					case "u":
						output += toUnsign(parameter).toString(10);
						break;
					case "b":
						output += toUnsign(parameter).toString(2);
						if (isFlagSharp) {
							sharpdata = "0b";
						}
						break;
					case "o":
						output += toUnsign(parameter).toString(8);
						if (isFlagSharp) {
							sharpdata = "0";
						}
						break;
					case "x":
					case "X":
						output += toUnsign(parameter).toString(16);
						if (isFlagSharp) {
							sharpdata = "0x";
						}
						break;
					case "e":
						output += parameter.toExponential(precision);
						break;
					case "f":
						output += parameter.toFixed(precision);
						break;
					case "g":
						if (precision === 0) {
							// 0は1とする
							precision = 1;
						}
						output += parameter.toPrecision(precision);
						// 小数点以下の語尾の0の削除
						if (!isFlagSharp && output.indexOf(".") !== -1) {
							output = output.replace(/\.?0+$/, ""); // 1.00 , 1.10
							output = output.replace(/\.?0+e/, "e"); // 1.0e , 1.10e
						}
						break;
				}
				// 整数での後処理
				if (isInteger) {
					if (isPrecision) {
						// 精度の付け足し
						spacesize = precision - output.length;
						for (var i = 0; i < spacesize; i++) {
							output = "0" + output;
						}
					}
				}
				// 実数での後処理
				else {
					if (isFlagSharp) {
						// sharp指定の時は小数点を必ず残す
						if (output.indexOf(".") === -1) {
							if (output.indexOf("e") !== -1) {
								output = output.replace("e", ".e");
							} else {
								output += ".";
							}
						}
					}
				}
				// 指数表記は、3桁表示(double型のため)
				if (output.indexOf("e") !== -1) {
					/**
						 * @param {string} str
						 * @returns {string}
						 * @private
						 */
					var buff$1 = function (str) {
						var l = str.length;
						if (str.length === 3) {
							// e+1 -> e+001
							return str.substring(0, l - 1) + "00" + str.substring(l - 1, l);
						} else {
							// e+10 -> e+010
							return str.substring(0, l - 2) + "0" + str.substring(l - 2, l);
						}
					};
					output = output.replace(/e[+-][0-9]{1,2}$/, buff$1);
				}
				textlength = output.length + sharpdata.length + sSignCharacter.length;
				spacesize = width - textlength;
				// 左よせ
				if (isFlagTextAlignLeft) {
					for (var i$1 = 0; i$1 < spacesize; i$1++) {
						output = output + " ";
					}
				}
				// 0を埋める場合
				if (isFlagFillZero) {
					for (var i$2 = 0; i$2 < spacesize; i$2++) {
						output = "0" + output;
					}
				}
				// マイナスや、「0x」などを接続
				output = sharpdata + output;
				output = sSignCharacter + output;
				// 0 で埋めない場合
				if (!isFlagFillZero && !isFlagTextAlignLeft) {
					for (var i$3 = 0; i$3 < spacesize; i$3++) {
						output = " " + output;
					}
				}
				// 大文字化
				if (type.toUpperCase() === type) {
					output = output.toUpperCase();
				}
				break;
			}
			// 文字列の場合
			case "c":
				if (!isNaN(parameter)) {
					parameter = String.fromCharCode(parameter);
				}
			// falls through
			case "s": {
				if (!isNaN(parameter)) {
					parameter = parameter.toString(10);
				}
				output = parameter;
				if (isPrecision) {
					// 最大表示文字数
					if (output.length > precision) {
						output = output.substring(0, precision);
					}
				}
				var s_textlength = output.length; // 現在の文字を構成するために必要な長さ
				var s_spacesize = width - s_textlength; // 追加する横幅
				// 左よせ / 右よせ
				if (isFlagTextAlignLeft) {
					for (var i$4 = 0; i$4 < s_spacesize; i$4++) {
						output = output + " ";
					}
				} else {
					// 拡張
					var s = isFlagFillZero ? "0" : " ";
					for (var i$5 = 0; i$5 < s_spacesize; i$5++) {
						output = s + output;
					}
				}
				break;
			}
			// パーセント
			case "%":
				output = "%";
				break;
			// 未サポート
			case "p":
			case "n":
				output = "(unsupported)";
				break;
		}
		return output;
	};
	return parm[0].replace(/%[^diubBoxXeEfFgGaAcspn%]*[diubBoxXeEfFgGaAcspn%]/g, func);
};

/**
	 * 時刻表記のオプション
	 * @typedef {Object} NTDatefOptiong
	 * @property {number} [timezone_minutes] タイムゾーン（デフォルトはシステム時刻を使用する）
	 * @property {boolean} [is_utc = false] 表示時にUTC時刻で表示する
	 */

/**
	 * 時刻用の書式に合わせて文字列を組み立てる
	 * - `YYYY-MM-DD hh:mm:ss` のように指定できる。
	 * - `YYYY`, `YY`, `MM`, `M`, `DD`, `D` ... 年月日
	 * - `hh`, `h`, `mm`, `m`, `ss`, `s` ... 時間分秒
	 * - `000` ... ミリ秒
	 * - `aaaa`, `aaa` ...  曜日（日本語）
	 * - `dddd`, `ddd` ...  曜日（英語）
	 * - `zzz`, `zzzzz`, `zzzzzz` ... タイムゾーン(±hh, ±hhmm, ±hh:mm)
	 * @param {string} text
	 * @param {Date} date 時刻情報
	 * @param {NTDatefOptiong} [option] オプション
	 * @returns {string}
	 */
NTFormat.datef = function datef (text, date, option) {
	var timezone_minutes = -date.getTimezoneOffset();
	if (option && option.timezone_minutes !== undefined) {
		timezone_minutes = option.timezone_minutes | 0;
	}
	var target_date = new Date(date);
	if (!(option && option.is_utc)) {
		target_date.setUTCMinutes(target_date.getUTCMinutes() - target_date.getTimezoneOffset());
	} else {
		timezone_minutes = 0;
	}

	var Y = target_date.getUTCFullYear();
	var M = target_date.getUTCMonth() + 1;
	var D = target_date.getUTCDate();
	var h = target_date.getUTCHours();
	var m = target_date.getUTCMinutes();
	var s = target_date.getUTCSeconds();
	var ms = target_date.getUTCMilliseconds();
	var day = target_date.getUTCDay(); // 曜日
	var aaa_array = [26085, 26376, 28779, 27700, 26408, 37329, 22303];
	var aaaa_str = String.fromCharCode(26332) + String.fromCharCode(26085);
	var ddd_array = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var dddd_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var zh = Math.trunc(timezone_minutes / 60);
	var zm = Math.abs(timezone_minutes - zh * 60);

	var output = text;
	output = output.replace(/YYYY/g, Y.toString());
	output = output.replace(/YY/g, (Y % 100).toString());
	output = output.replace(/MM/g, NTFormat.textf("%02d", M));
	output = output.replace(/M/g, M.toString());
	output = output.replace(/DD/g, NTFormat.textf("%02d", D));
	output = output.replace(/D/g, D.toString());
	output = output.replace(/hh/g, NTFormat.textf("%02d", h));
	output = output.replace(/h/g, h.toString());
	output = output.replace(/mm/g, NTFormat.textf("%02d", m));
	output = output.replace(/m/g, m.toString());
	output = output.replace(/ss/g, NTFormat.textf("%02d", s));
	output = output.replace(/s/g, s.toString());
	output = output.replace(/000/g, NTFormat.textf("%03d", ms));
	output = output.replace(/aaaa/g, String.fromCharCode(aaa_array[day]) + aaaa_str);
	output = output.replace(/aaa/g, String.fromCharCode(aaa_array[day]));
	output = output.replace(/dddd/g, dddd_array[day]);
	output = output.replace(/ddd/g, ddd_array[day]);
	output = output.replace(/day/g, day.toString());
	output = output.replace(/zzzzzz/g, NTFormat.textf("%+03d:%02d", zh, zm));
	output = output.replace(/zzzzz/g, NTFormat.textf("%+03d%02d", zh, zm));
	output = output.replace(/zzz/g, NTFormat.textf("%+03d", zh));

	return output;
};

module.exports = NTFormat;
