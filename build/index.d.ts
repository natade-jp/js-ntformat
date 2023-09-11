/**
 * `printf` に似た書式に合わせて文字列を組み立てる - %[`引数順$`][`フラグ`][`幅`][`精度`][`変換指定子`]で指定する - フラグ - `#` ... 進数に応じて `0b`, `0`, `0x` を頭につける - `-` ... 左揃え - ` ` ... 半角スペース空け - `+` ... サイン情報 - `0` ... ゼロ詰め - 変換指定子 - `d`, `i`, `u` ... 整数表記(`di` 整数, `u` 符号無し数) - `b`, `o`, `x` ... 進数表記(`b` 2進数, `o` 8進数, `x` 16進数) - `f`, `e`, `g` ... 実数表記(`f` 指定なし, `e` 指数表示, `g` 最適) - `c` ... ASCII CODE - `s` ... 文字列 - `p`, `n` ... 未サポート - `hh|h|ll|l|L|z|j|t` の長さ修飾子は非サポート - ロケール、日付時刻等は非サポート
 * @param text
 * @param parm パラメータは可変引数
 * @returns
 */
declare function textf(text: string, ...parm: string | number): string;

/**
 * 時刻表記のオプション
 */
declare interface NTDatefOptiong {
    /**
     * タイムゾーン（デフォルトはシステム時刻を使用する）
     */
    timezone_minutes?: number;
    /**
     * 表示時にUTC時刻で表示する
     */
    is_utc?: boolean;
}

/**
 * 時刻用の書式に合わせて文字列を組み立てる - `YYYY-MM-DD hh:mm:ss` のように指定できる。 - `YYYY`, `YY`, `MM`, `M`, `DD`, `D` ... 年月日 - `hh`, `h`, `mm`, `m`, `ss`, `s` ... 時間分秒 - `000` ... ミリ秒 - `aaaa`, `aaa` ...  曜日（日本語） - `dddd`, `ddd` ...  曜日（英語） - `zzz`, `zzzzz`, `zzzzzz` ... タイムゾーン(±hh, ±hhmm, ±hh:mm)
 * @param text
 * @param date 時刻情報
 * @param option オプション
 * @returns
 */
declare function datef(text: string, date: Date, option?: NTDatefOptiong): string;

