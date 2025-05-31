import i18n from "./i18n";

export const RULES = {
    isPath: (value: string) => {
        const pathRegex = /^([a-zA-Z]:\\|\/)([\w\s\-\.]+[\\\/]?)*$/;
        if (!value || value.trim() === "") {
            return true;
        }

        if (!pathRegex.test(value)) {
            return i18n.global.t('rules.path');
        }

        return true;
    }
}

export function anyFilter() {
    return {
        name: i18n.global.t('any-filter'),
        extensions: ['*'],
    };
}