

/**
 * 保留小数
 * @param input 是输入数字
 * @param retain 保留具体多少位小数
 */
export const froundFix = (input: number, retain: number) => {
    retain = 10 ** retain
    return Math.round(input * retain) / retain
};


/**
 * 生成随机ID (结果无任何数学意义)
 * 数字长度是 时间戳(到秒) + 8位随机数 转成的多进制
 * 此版本进制表也会随机
 */
export const createID = () => {
    // 洗牌
    const shuffle = (list: any[]) => {
        const len = list.length;
        for (let i = 0; i < len - 1; i++) {
            const index = len - 1 - i;
            const random = Math.floor(Math.random() * (len - i));
            const backup = list[index];
            list[index] = list[random];
            list[random] = backup;
        }
    };

    // 进制转换
    const toRadixString = (input: number, radix: string[]) => {
        const len = radix.length;
        const result: string[] = [];
        let sum = input;
        while (sum) {
            result.push(radix[sum % len]);
            sum = Math.trunc(sum / len);
        }
        result.reverse();
        return result.join("");
    };

    // x位进制
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // 制作
    shuffle(chars);
    const aString = toRadixString(Math.trunc((Math.trunc(1 + Math.random() * 8) + Math.random()) * 10000000), chars);
    shuffle(chars);
    const bString = toRadixString(Math.trunc(new Date().valueOf() / 1000), chars);
    return aString + bString;
};
