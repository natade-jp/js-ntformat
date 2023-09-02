/**
 * `printf` に似た書式に合わせて文字列を組み立てる - ロケール、日付時刻等はサポートしていません。 - 変換指定子の`p`と`n`はサポートしていません。
 * @param text
 * @param parm パラメータは可変引数
 * @returns
 */
declare function textf(text: string, ...parm: any): string;

/**
 * 時刻用の書式に合わせて文字列を組み立てる - `YYYY-MM-DD hh:mm:ss` のように指定できる。
 * @param text
 * @param date 時刻情報
 * @param delta_hour 時間のずらし(デフォルトは日本時間を利用する)
 * @returns
 */
declare function datef(text: string, date: Date, delta_hour?: number): string;

/**
 * +09:00 を付けた日付に変換する
 * @param date 時刻情報
 * @returns
 */
declare function jpdate(date: Date): String;

