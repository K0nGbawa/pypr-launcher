export const RULES = {
    isPath: (value: string) => {
        const pathRegex = /^([a-zA-Z]:\\|\/)([\w\s\-\.]+[\\\/]?)*$/;
        if (!value || value.trim() === "") {
            return true;
        }

        if (!pathRegex.test(value)) {
            return "请输入路径";
        }

        return true;
    }
}