import HttpStatus from 'http-status-codes';
import { Message } from '@/constants/Message';
import IMText from '@/data/img-text.json';
import AppConfig from '@/constants/AppConfig';
import { WasteClass } from '@/constants/General';
import { current } from '.';
export const handleOutput = {
    errorE00032(error: any) {
        const message = [];
        if (
            error.status === HttpStatus.BAD_REQUEST &&
            error.data &&
            error.data.ErrorCode === 400032
        ) {
            message.push(Message.E00032);
        }
        return message;
    },

    errorHandle(error: any, field = '') {
        const message = [];
        if (error.status === HttpStatus.BAD_REQUEST && error.data) {
            if (error.data.ErrorCode === 400032) {
                message.push(Message.E00032);
            } else if (error.data.ErrorCode === 400001 && error.data.MsgCode === 'BadRequest') {
                message.push(Message.E00031);
            } else if (error.data.ErrorCode === 400402 && error.data.MsgCode === 'E10002') {
                message.push(Message.E10002);
            } else if (error.data.ErrorCode === 400401 && error.data.MsgCode === 'E10001') {
                message.push(Message.E10001);
            } else if (error.data.ErrorCode === 400040 && error.data.MsgCode === 'E00040') {
                message.push(Message.E00040);
            } else if (error.data.ErrorCode === 400036 && error.data.MsgCode === 'E00036') {
                message.push(Message.E00036);
            } else if (error.data.ErrorCode === 400043 && error.data.MsgCode === 'E00043') {
                message.push(Message.E00043.formatText(field));
            } else if (error.data.ErrorCode === 400403 && error.data.MsgCode === 'E10040') {
                message.push(Message.E10040);
            } else if (error.data.ErrorCode === 400405 && error.data.MsgCode === 'E10042') {
                message.push(Message.E10042);
            } else if (error.data.ErrorCode === 400201 && error.data.MsgCode === 'E20001') {
                message.push(Message.E20001);
            } else if (error.data.ErrorCode === 400202 && error.data.MsgCode === 'E20002') {
                message.push(Message.E20002);
            } else if (error.data.ErrorCode === 400203 && error.data.MsgCode === 'E20003') {
                message.push(Message.E20003);
            } else if (error.data.ErrorCode === 400050 && error.data.MsgCode === 'E20004') {
                message.push(Message.E20004);
            } else if (error.data.ErrorCode === 409003 && error.data.MsgCode === 'E20005') {
                message.push(Message.E20005);
            } else if (error.data.ErrorCode === 409004 && error.data.MsgCode === 'E20006') {
                message.push(Message.E20006);
            } else if (error.data.ErrorCode === 409005 && error.data.MsgCode === 'E20007') {
                message.push(Message.E20007);
            }

        } else if (error.status === HttpStatus.CONFLICT && error.data) {
            if (error.data.ErrorCode === 409001) {
                message.push(Message.E00033.formatText(IMText.general.btnUpdate));
            } else if (error.data.ErrorCode === 409002) {
                message.push(Message.E00033.formatText(IMText.general.btnDelete));
            }
        } else if (error.status === HttpStatus.INTERNAL_SERVER_ERROR && error.data) {
            if (error.data.ErrorCode === 500001 && error.data.MsgCode === 'E00001') {
                message.push(Message.E00001);
            }
        }
        return message;
    },
};

export const common = {
    formatObjectSelection(data: any, options: any, convertValue?: boolean) {
        if (convertValue) {
            return data.map((item: any) => {
                return {
                    value: item[options[0]] ? +item[options[0]] : '',
                    text: item[options[1]] ? item[options[1]] : ''
                };
            });
        }
        return data.map((item: any) => {
            return { value: item[options[0]] ? item[options[0]] : '', text: item[options[1]] ? item[options[1]] : '' };
        });
    },

    convertBooleanToNumber(value: any) {
        return value ? 1 : 0;
    },

    convertNumberToBoolean(value: any) {
        return value ? true : false;
    },

    convertBooleanToNumberDischargeWasteClass(payload: any) {
        if (!payload) {
            return payload;
        }
        const item = { ...payload };
        item.dischargeWasteClass1 = common.convertBooleanToNumber(item.dischargeWasteClass1);
        item.dischargeWasteClass2 = common.convertBooleanToNumber(item.dischargeWasteClass2);
        item.dischargeWasteClass3 = common.convertBooleanToNumber(item.dischargeWasteClass3);
        item.dischargeWasteClass4 = common.convertBooleanToNumber(item.dischargeWasteClass4);
        item.dischargeWasteClass5 = common.convertBooleanToNumber(item.dischargeWasteClass5);
        return item;
    },

    convertNumberToBooleanDischargeWasteClass(payload: any) {
        if (!payload) {
            return payload;
        }
        const item = { ...payload };
        item.dischargeWasteClass1 = common.convertNumberToBoolean(item.dischargeWasteClass1);
        item.dischargeWasteClass2 = common.convertNumberToBoolean(item.dischargeWasteClass2);
        item.dischargeWasteClass3 = common.convertNumberToBoolean(item.dischargeWasteClass3);
        item.dischargeWasteClass4 = common.convertNumberToBoolean(item.dischargeWasteClass4);
        item.dischargeWasteClass5 = common.convertNumberToBoolean(item.dischargeWasteClass5);
        return item;
    },

    actionDirective(count: number) {
        const column = {
            key: 'actionDirective',
            label: IMText.general.actionDirective,
            tdClass: 'classButton'
        };

        if (count === 0) {
            return;
        } else if (count === 1) {
            column.tdClass = 'classOneButton';
        } else if (count === 3) {
            column.tdClass = 'classThreeButton';
        }
        return column;
    },

    orderDisplayByCode(arr: any, data: any, isUp: any) {
        const index = arr.findIndex((item: any) => item === data);
        if (isUp) {
            return arr[index - 1];
        }
        return arr[index + 1];
    },

    resetPage(orderField = 'DisplayOrder') {
        AppConfig.Pages.page = 1;
        AppConfig.Pages.pageSize = 10;
        AppConfig.Pages.descending = true;
        AppConfig.Pages.orderField = orderField;
    },

    resetThreeSelectBox() {
        AppConfig.ThreeSelectBox.big = "";
        AppConfig.ThreeSelectBox.medium = "";
        AppConfig.ThreeSelectBox.small = "";
    },

    dataTable() {
        return {
            count: 0,
            pageCount: 0,
            previousItem: null,
            nextItem: null,
            items: [],
        };
    },

    setWasteColor(wasteClass: any, isFull = true) {
        switch (wasteClass) {
            case WasteClass.industrialWaste.key:
                return WasteClass.industrialWaste.class;
            case WasteClass.industrialSpecialWaste.key:
                return WasteClass.industrialSpecialWaste.class;
            case WasteClass.constructionWaste.key:
                return WasteClass.constructionWaste.class;
            case WasteClass.valuableWaste.key:
                if (isFull) {
                    return WasteClass.valuableWaste.class;
                }
            case WasteClass.municipalWaste.key:
                if (isFull) {
                    return WasteClass.municipalWaste.class;
                }
            default:
                return WasteClass.all.class;
        }
    },

    mappingWasteClassToListButton(wasteClasses: any, currentWasteClass: any) {
        const listButton = [];
        for (const prop in wasteClasses) {
            if (wasteClasses[prop].id !== 0) {
                listButton.push({
                    key: wasteClasses[prop].key,
                    value: wasteClasses[prop].value,
                    background: wasteClasses[prop].background,
                    cssClassButton: wasteClasses[prop].cssClassButton,
                    state:
                        currentWasteClass === wasteClasses[prop].key ? true : false
                });
            }
        }
        return listButton;
    },

    destructorObj(arr: any) {
        return arr.map((item: any) => {
            return {
                value: item.userCode,
                text: item.userName
            };
        });
    },
    getButtonDischargeWasteClass(dataWasteClass: any[], dischargeWaste: any) {
        const listButtons = [];
        let i = 0;
        for (const prop in dataWasteClass) {
            if (dataWasteClass.hasOwnProperty(prop)) {
                if (dischargeWaste['dischargeWasteClass' + i]) {
                    listButtons.push(dataWasteClass[prop]);
                }
                i++;
            }
        }
        return listButtons;
    },

    getDischargeWasteClassFirst(dataWasteClass: any[], dischargeWaste: any) {
        let i = 0;
        for (const prop in dataWasteClass) {
            if (dataWasteClass.hasOwnProperty(prop)) {
                if (dischargeWaste['dischargeWasteClass' + i]) {
                    current.setWasteClass(i);
                    break;
                }
                i++;
            }
        }
    },

    getWasteClassFirst(dischargeWasteClass: any) {
        for (let i = 1; i <= 5; i++) {
            if (dischargeWasteClass['dischargeWasteClass' + i]) {
                return i;
            }
        }
    },

    getWasteClass(wasteClass: any) {
        return wasteClass > 0
            ? wasteClass
            : current.wasteClass() > 0
                ? current.wasteClass()
                : 1;
    },

    getWasteClassByList() {
        return current.getWasteClassList().length > 0 ? current.getWasteClassList()[0] : 0;
    },

    onCheckExtention(file: any) {
        const res = file.split('.');
        if (
            res &&
            AppConfig.File.ExtensionWhite.includes(res[res.length - 1].toLowerCase())
        ) {
            return true;
        }
        return false;
    },

    checkOneFile(files: any) {
        if (!files) {
            return false;
        } else if (!this.onCheckExtention(files[0].name)) {
            return false;
        } else if (files[0].size / (1014 * 1024) > AppConfig.MaxLength.FileSize) {
            return false;
        }
        return true;
    },

    getFileName(name: any, subNumber = 0) {
        const arr = name.split('\\');
        if (subNumber !== 0) {
            return arr[arr.length - 1].slice(-30);
        }
        return arr[arr.length - 1];
    },

    onKeyPressOnlyNumber(evt: any) {
        if (
            !this.keyPressOnlyNumber(evt) &&
            evt.keyCode !== AppConfig.KeyCode.Period
        ) {
            evt.preventDefault();
            return;
        }
    },

    onKeyPressOnlyNumberInt(evt: any) {
        if (
            !this.keyPressOnlyNumber(evt)
        ) {
            evt.preventDefault();
            return;
        }
    },

    keyPressOnlyNumber(evt: any) {
        if (
            evt.keyCode !== AppConfig.KeyCode.Backspace &&
            evt.keyCode !== AppConfig.KeyCode.Shift &&
            evt.keyCode !== AppConfig.KeyCode.Tab &&
            (evt.keyCode < AppConfig.KeyCode.MinNumber ||
                evt.keyCode > AppConfig.KeyCode.MaxNumber)
        ) {
            return false;
        }
        return true;
    },

    showPopupDirtyForm() {
        return window.confirm(
            IMText.popup.confirmDirtyForm
        );
    },
};
