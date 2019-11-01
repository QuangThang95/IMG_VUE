import AppConfig from '@/constants/AppConfig';
import { isNullOrUndefined, isNullOrEmpty } from './utilities';
const CountCharacter = {
    // Katakana	30a0 - 30ff
    // Kanji (common & uncommon)	4e00 - 9faf
    // Kanji (rare)	3400 - 4dbf
    // CJK Symbols and Punctuation 3000-303F
    // half size 0020-007f


    isKanji(character: string) {
        return (character >= '\u4e00' && character <= '\u9faf') ||
            (character >= '\u3400' && character <= '\u4dbf');
    },

    isKanna(character: string) {
        return (character >= '\u30a0' && character <= '\u30ff');
    },

    isFullWidthAlphanumeric(character: string) {
        return (character >= '\uff10 ' && character <= '\uff19') ||
            (character >= '\uff21 ' && character <= '\uff3a') ||
            (character >= '\uff41 ' && character <= '\uff5a');
    },

    basicParser(str: string, condition: any) {
        return str.split('').reduce((acc: any, curr: any) => {
            if (condition(curr) > 0) {
                acc.push(curr);
            }
            return acc;
        }, []);
    },

    parseKanji(str: string) {
        return this.basicParser(str, this.isKanji);
    },

    parseKanna(str: string) {
        return this.basicParser(str, this.isKanna);
    },

    isTelNumber(character: string) {
        return AppConfig.Regex.FaxTelNumber.test(character);
    },

    isFaxNumber(character: string) {
        return AppConfig.Regex.FaxTelNumber.test(character);
    },

    isNumber(character: string) {
        return AppConfig.Regex.IsNumber.test(character);
    },

    isPrecisionNumber(character: string) {
        return AppConfig.Regex.IsPrecisionNumber.test(character);
    },

    isDate(character: string) {
        return AppConfig.Regex.IsDate.test(character);
    },

    isPostalCode(character: string) {
        return AppConfig.Regex.PostalCode.test(character);
    },

    isJWH(character: string) {
        // same 1byte
        return (this.isHalfSize(character) && this.isCheckSpecialText(character));
    },

    isJWZ(character: string) {
        // same 2byte
        return (this.isFullSize(character) &&
            this.isCheckSpecialText(character) &&
            this.checkJapanText(character)
        );
    },

    isJWZH(character: string) {
        // same 1byte + 2byte
        return (this.isCheckSpecialText(character));
    },

    isFullSize(character: string) {
        // same 2byte
        return this.checkTextFullSize(character);
    },

    isHalfSize(character: string) {
        // same 1byte
        return this.checkTextHalfSize(character);
    },


    isEmail(email: string) {
        const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    },

    outFocus() {
        const el = document.querySelector(':focus');
        if (el) {
            (el as HTMLElement).blur();
        }
    },

    upCase(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    isEmpty(obj: Object) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) { return false; }
        }
        return true;
    },

    // Check Japan
    japanese(inputChar: string) {
        for (const item of inputChar) {
            const code = item.charCodeAt(0);
            if (code < 0x3000 || code > 0x303f) {
                return false;
            }
        }
        return true;
    },

    hiragana(inputChar: string) {
        for (const item of inputChar) {
            const code = item.charCodeAt(0);
            if (code < 0x30a0 || code > 0x30ff) {
                return false;
            }
        }
        return true;
    },

    isKatakana(inputChar: string) {
        for (const item of inputChar) {
            const code = item.charCodeAt(0);
            if (code < 0x30a0 || code > 0x30ff) {
                return false;
            }
        }
        // Katakana full size
        return true;
    },

    isKatakanaHasSpace(inputChar: string) {
        for (const item of inputChar) {
            const code = item.charCodeAt(0);
            if ((code < 0x30a0 || code > 0x30ff) && code !== 32) {
                return false;
            }
        }
        // Katakana full size
        return true;
    },

    fullWidth(inputChar: string) {
        for (const item of inputChar) {
            const code = item.charCodeAt(0);
            if (code < 0xff00 || code > 0xffef) {
                return false;
            }
        }
        return true;
    },

    kanji(inputChar: string) {
        for (const item of inputChar) {
            const code = item.charCodeAt(0);
            if ((code < 0x4e00 || code > 0x9faf) || (code < 0x3400 || code > 0x4dbf)) {
                return false;
            }
        }
        return true;
    },

    // Check Full Size / Half Size
    checkTextFullSize(inputText: string) {
        if (inputText) {
            if (!this.checkJapanText(inputText)) {
                return false;
            }
            for (const item of inputText) {
                if (!this.checkCharFullSize(item)) {
                    return false;
                }
            }
            return true;
        }
    },

    checkTextHalfSize(inputText: string) {
        if (inputText) {
            for (const item of inputText) {
                if (!this.checkCharHalfSize(item)) {
                    return false;
                }
            }
            return true;
        }
    },

    checkCharFullSize(inputChar: string) {
        if (inputChar.length > 0) {
            const code = inputChar.charCodeAt(0);
            if ((code >= 0x2000 && code <= 0xFF60) || (code >= 0xFFA0)) {
                // FullSize
                return true;
            }
            return false;
        }
    },

    checkCharHalfSize(inputChar: string) {
        if (inputChar.length > 0) {
            const code = inputChar.charCodeAt(0);
            if ((code >= 0x0020 && code <= 0x1FFF) || (code >= 0xFF61 && code <= 0xFF9F)) {
                // HalfSize
                return true;
            }
            return false;
        }
    },

    checkJapan(inputChar: string) {
        for (const item of inputChar) {
            const code = item.charCodeAt(0);
            if (!(code < 0x3000 || code > 0x303f ||
                code < 0x3040 || code > 0x309f ||
                code < 0x30a0 || code > 0x30ff ||
                code < 0xff00 || code > 0xffef ||
                code < 0x4e00 || code > 0x9faf ||
                code < 0x3400 || code > 0x4dbf)) {
                return false;
            }
        }
        return true;
    },

    // Check ký tự không cho phép JWNET
    isCheckSpecialText(inputText: string) {
        if (inputText.includes("'") ||
            inputText.includes('%') ||
            inputText.includes('"') ||
            inputText.includes('_') ||
            inputText.includes(',') ||
            inputText.includes('<') ||
            inputText.includes('>') ||
            inputText.includes('\\n') ||
            inputText.includes('\\r')
        ) {
            return false;
        }
        // Check Half Size Katakana
        if (this.isHalfSize(inputText) && this.isKatakana(inputText)) {
            return false;
        }
        return true;
    },

    // Check chữ Japan
    checkJapanText(inputText: string) {
        if (!inputText) {
            return;
        }
        var i: number;
        for (i = 0; i <= inputText.length - 1; i++) {
            if (this.getTypeChar(inputText.charAt(i)) === 0) {
                return false;
            }
        }
        return true;
    },

    // Check Type Japan
    getTypeChar(inputChar: string) {
        const code = inputChar.charCodeAt(0);
        if (code >= 0x3000 && code <= 0x303f) {
            // Japanese-style punctuation
            return 1;
        } else if (code >= 0x3040 && code <= 0x309f) {
            // Hiragana;
            return 2;
        } else if (code >= 0x30a0 && code <= 0x30ff) {
            // Katakana full size
            return 3;
        } else if (code >= 0xff00 && code <= 0xffef) {
            // Full-width roman characters and half-width katakana
            return 4;
        } else if (code >= 0x4e00 && code <= 0x9faf || code >= 0x3400 && code <= 0x4dbf) {
            // Kanji
            return 5;
        } else {
            // other - khong thuoc ky tu tieng nhat
            return 0;
        }
    },



    // Test
    // Full Size or Half Size
    isCharFullSizeTest(inputChar: string) {
        if (inputChar.length > 1) {
            return;
        }
        let code = inputChar.charCodeAt(0);
        if ((code >= 0x0020 && code <= 0x1FFF) || (code >= 0xFF61 && code <= 0xFF9F)) {
            return false;
        } else if ((code >= 0x2000 && code <= 0xFF60) || (code >= 0xFFA0)) {
            return true;
        }
    },
};

export default CountCharacter;
