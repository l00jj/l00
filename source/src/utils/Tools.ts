

/**
 * 保留小数
 * @param input 是输入数字
 * @param retain 保留具体多少位小数
 */
export const froundFix = (input: number, retain: number) => {
    retain = 10 ** retain
    return Math.round(input * retain) / retain
}; 