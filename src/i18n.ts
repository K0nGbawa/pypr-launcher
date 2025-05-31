import { createI18n } from "vue-i18n"


const i18n = createI18n({
  locale: "zh-Hans",
  fallbackLocale: "en",
  legacy: false,
  messages: {
    'en': {
      'rules': {
        'path': 'Invalid path',
      },
      'any-filter': 'All files',
    },
    'zh-Hans': {
      'rules': {
        'path': '路径无效',
      },
      'any-filter': '所有文件',
    }
  }
})

export default i18n;