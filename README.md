# NTFormat
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

- JavaScript用の文字列のフォーマット
- [github](https://github.com/natade-jp/js-ntformat)
- [npm](https://www.npmjs.com/package/ntformat)
- [jsdoc](https://natade-jp.github.io/js-ntformat/)

# Install

```sh
npm install --save-dev ntformat
```

# Use

```javascript
import NTFormat from "ntformat";
```

# Exsample

```javascript
> console.log(NTFormat.textf("%03d %1.3f %04X %e", 1, 1 / 3, 0xbeaf, 100000000));
001 0.333 BEAF 1.000000e+008

> console.log(NTFormat.textf("[%3$d %2$d %1$d]", 1, 2, 3));
[3 2 1]

> console.log(NTFormat.datef("YYYY/MM/DD hh:mm:ss", new Date("2023/1/20 12:34:56")));
2023/01/20 12:34:56

> console.log(
> 	NTFormat.datef("YYYY-MM-DDThh:mm:sszzzzzz", new Date("2023-01-23T12:34:56+09:00"), {
> 		is_utc: true,
> 		timezone_minutes: 9 * 60
> 	})
> );
2023-01-23T03:34:56+09:00
```

