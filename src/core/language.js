import { createI18n } from 'vue-i18n'

import enUS from "../lang/en-US.json";
import ptBR from "../lang/pt-BR.json";
const messages = {
    enUS: enUS,
    ptBR: ptBR
  }

  export const i18n = createI18n({
    locale: 'enUS',
    fallbackLocale: 'enUS',
    messages
  })