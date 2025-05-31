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
import { ref, watch, computed, Ref } from 'vue';
import { useI18n } from 'vue-i18n'

import i18n from './i18n'

import "vuetify/styles"

import { open, save } from '@tauri-apps/plugin-dialog';

import { anyFilter, RULES } from './common';
import { getCurrentWindow } from '@tauri-apps/api/window';

const { t } = useI18n();
const appWindow = getCurrentWindow();

function appClose() {
  appWindow.close();
}

function appMinimize() {
  appWindow.minimize();
}

function appMaximize() {
  appWindow.toggleMaximize();
}


const tabs = ref(["info", "feat", "setting"])
const tab = ref("info");

const LANG_NAME = [
  { name: 'English', code: "en" },
  { name: '简体中文', code: "zh-Hans" }
];

const language = ref(i18n.global.locale.value);


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

watch(language, (value) => {
  i18n.global.locale.value = value as typeof i18n.global.locale.value;
  localStorage.setItem('lang', value);
});

const simPath = ref("");

const envVar: Ref<string | null> = ref(null);
const envVarList = computed(() => [
  { name: t('setting-page.execable-type.PATH'), code: null },
  { name: t('setting-page.execable-type.custom'), code: "custom" }
]);

watch(envVar, (value) => {
  if (value === "custom") {
    open({
      title: t('setting-page.sim-path'),
      defaultPath: simPath.value,
      filters: [
        { name: 'Executable', extensions: ['exe'] },
        anyFilter(),
      ],
    })
    .then((path) => {
      envVar.value = path;
    })
    .catch(() => {
      envVar.value = null;
    });
  }
}
)

const x = ref(false);
</script>

<template>
  <div style="height: 100vh">
    <v-card class="d-flex flex-column fill-height" height="100vh">
      <v-toolbar color="primary" :title="t('title')" style="user-select: none;">
        <template v-slot:extension>
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab v-for="(item, index) in tabs" :index="index" :value="item">{{ t(item) }}</v-tab>
          </v-tabs>
        </template>
        <div data-tauri-drag-region class="flex-grow-1" style="height: 100%; width: 100%; position: absolute; z-index: 0;"></div>
        <div class="rounded-circle exit ma-7" @click="appClose()" style="z-index: 1;"></div>
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
                <v-select class="mx-2" color="primary" :label="t('setting-page.lang')" v-model="language" :items="LANG_NAME" item-title="name" item-value="code"></v-select>
              </v-col>
              
              <v-col>
                <v-text-field class="mx-2" color="primary" :label="t('setting-page.sim-path')" v-model="simPath" :rules="[RULES.isPath]"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <v-select class="mx-2" color="primary" :label="t('setting-page.execable-type.label')" v-model="envVar" :items="envVarList" item-title="name" item-value="code"</v-select>
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
      <v-card-title>111</v-card-title>
      <v-card-text>
        <div class="block whitespace-pre overflow-auto log-card-msg select wrap" style="white-space: pre-wrap">{{ 11111 }}</div>
      </v-card-text>
      <v-card-actions class="justify-end">
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

.exit {
  background-color: rgb(227, 65, 65);
  width: 15px;
  height: 15px;
  transition: 0.3s ease-out;
}

.exit:hover {
  background-color: rgb(185, 34, 34);
  transform: scale(1.1);
}
</style>