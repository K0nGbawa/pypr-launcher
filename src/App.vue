<i18n lang="json">
{
  "en": {
    "title": "PyPr Launcher",
    "info": "Info",
    "feat": "Feature",
    "setting": "Setting",
    "play": "Play!",
    "setting-page": {
      "lang": "Language",
      "sim-path": "Simulator Path",
      "execable-type": {
        "label": "Use execable type",
        "PATH": "Use PATH",
        "custom": "Custom"
      }
    }
  },
  "zh-Hans": {
    "title":"PyPr 启动器",
    "info": "信息",
    "feat": "功能",
    "setting": "设置",
    "play": "开始播放！",
    "setting-page": {
      "lang": "语言",
      "sim-path": "模拟器路径",
      "execable-type": {
        "label": "使用解释器类型",
        "PATH": "环境变量",
        "custom": "自定义"
      }
    }
  }
}
</i18n>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'

import i18n from './i18n'

import "vuetify/styles"

import { exit } from '@tauri-apps/plugin-process';

import { RULES } from './common';

const { t } = useI18n();

const tabs = ref(["info", "feat", "setting"])
const tab = ref("info");

const LANG = {
  "简体中文": "zh-Hans",
  "English": "en"
}

const language = ref("简体中文");


document.addEventListener('mousedown', (event) => {
  if (event.button === 1) {
    event.preventDefault();
  }
});

document.addEventListener('contextmenu', (event) => {
  if (event.button === 2) {
    event.preventDefault();
  }
});

watch(language, (newLang) => {
  const lang = LANG[newLang as keyof typeof LANG];
  console.log(lang);
  if (lang) {
    i18n.global.locale.value = lang;
    localStorage.setItem('lang', lang);
  }
});

onMounted(() => {
  const lang = localStorage.getItem('lang');
  if (lang) {
    i18n.global.locale.value = lang;
    language.value = Object.keys(LANG).find(key => LANG[key as keyof typeof LANG] === lang) || "简体中文";
  } else {
    i18n.global.locale.value = "zh-Hans";
    language.value = "简体中文";
  }
});

const simPath = ref("");

const x = ref(false);
</script>

<template>
  <div style="height: 100vh">
    <v-card class="d-flex flex-column fill-height" height="100vh">
      <v-toolbar color="primary" :title="t('title')" class="dragable">
        <template v-slot:extension>
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab v-for="(item, index) in tabs" :index="index" :value="item">{{ t(item) }}</v-tab>
          </v-tabs>
        </template>
        <div class="rounded-circle exit ma-7" @click="exit()"></div>
      </v-toolbar>
      <v-tabs-window v-model="tab" class="d-flex flex-column fill-height ma-5" height="100vh">
        <v-tabs-window-item value="info">
          <v-form>
            <v-row>
              <v-col>
                <v-btn color="primary" @click="x=true">不知道写什么</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-tabs-window-item>
        <v-tabs-window-item value="feat">
          34
        </v-tabs-window-item>
        <v-tabs-window-item value="setting">
          <v-form>
            <v-row no-gutters>
              <v-col>
                <v-select class="mx-2" color="primary" :label="t('setting-page.lang')" v-model="language" :items="['English', '简体中文']"></v-select>
              </v-col>
              
              <v-col>
                <v-text-field class="mx-2" color="primary" :label="t('setting-page.sim-path')" v-model="simPath" :rules="[RULES.isPath]"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <v-select class="mx-2" color="primary" :label="t('setting-page.execable-type.label')" :items="[t('setting-page.execable-type.PATH'), t('setting-page.execable-type.custom')]"></v-select>
              </v-col>
            </v-row>
            <v-row class="mt-0 ml-0">
            </v-row>
          </v-form>
        </v-tabs-window-item>
      </v-tabs-window>
      <v-card-actions class="justify-end ma-3">
        <v-btn variant="flat" color="primary" class="elevation-3" @click="console.log(t(tab))">{{ t("play") }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <v-dialog v-model="x">
    <v-card>
      11
      <v-card-actions>
        <v-btn @click="x=false">11</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
html, body {
  margin: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.dragable {
  -webkit-app-region: drag;
}

.exit {
  background-color: rgb(227, 65, 65);
  width: 15px;
  height: 15px;
  transition: 0.3s ease-out;
}

.exit:hover {
  background-color: rgb(187, 26, 26);
  transform: scale(1.3);
}
</style>