# ntformat
JavaScript用の文字列のフォーマット

# Sample

```javascript
> import NTFormat from "ntformat";
> console.log(NTFormat.textf("%03d %1.3f %04X %e", 1, 1 / 3, 0xbeaf, 100000000));
001 0.333 BEAF 1.000000e+008
```

```javascript
> import NTFormat from "ntformat";
> console.log(NTFormat.datef(
    "YYYY/MM/DD hh:mm:hh", new Date("2020-12-31T12:34:56+09:00"), 9));
2020/12/31 12:34:12           
```
