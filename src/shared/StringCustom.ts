
interface String {
    formatText(...replacements: string[]): string;
}

if (!String.prototype.formatText) {
    String.prototype.formatText = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}