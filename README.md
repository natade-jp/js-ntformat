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
    "YYYY/MM/DD hh:mm:ss", new Date("2023/1/20 12:34:56")));
2023/01/20 12:34:56         
```
