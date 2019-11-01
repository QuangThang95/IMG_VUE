export default class SortTable {

    resetState(arr: any) {
        arr.map((num: any) => { num.isAsc = true; num.isDesc = true })
    }

    changeState(num: any, ischeck: any) {

        num.isDesc = (ischeck === "up") ? false : true;
        num.isAsc = (ischeck === "down") ? false : true;
    }

    handleButton(data: any, ischeck: any, arr: any) {
        let index = arr.findIndex((num: any) => num.key === data.column);
        this.resetState(arr);
        (index !== -1) && this.changeState(arr[index], ischeck);
    }

}