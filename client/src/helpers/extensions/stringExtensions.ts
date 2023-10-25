export {}
declare global {
    interface String {
        minLength(min: number): boolean;
        maxLength(max: number): boolean;
        isCorrectEmail(): boolean;
        contains(sign: string): boolean;
        hasUpperLetter(howMuch: number): boolean;
        hasNumbers(howMuch: number): boolean;
        toBoolean(): boolean;
    }
}

String.prototype.minLength = function(min: number): boolean {
    return this.length < min ? false : true;
};

String.prototype.maxLength = function(max: number): boolean {
    return this.length > max ? false : true;
};

String.prototype.isCorrectEmail = function(): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this as string);
};

String.prototype.contains = function(sign: string): boolean {
    let signs = Array.from(sign);
    let flag = false;
    signs.forEach(ch => flag = this.includes(ch) ? true : flag);
    return flag;
};

String.prototype.hasUpperLetter = function(howMuch: number): boolean {
    return Array.from(this).filter(ch => ch.match(/[A-Z]/)).length >= howMuch;
};

String.prototype.hasNumbers = function(howMuch: number): boolean {
    return Array.from(this).filter(ch => ch.match(/[0-9]/)).length >= howMuch;
};

String.prototype.toBoolean = function(): boolean {
    return this === "true";
};