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
 * @param timezone_offset 表示時のオフセット（デフォルトはシステム時刻を使用する）
 * @returns
 */
declare function datef(text: string, date: Date, timezone_offset?: number): string;

/**
 * 指定した時刻を日本の時刻情報として表現する
 * @param date 時刻情報
 * @returns
 */
declare function jpdate(date: Date): String;

