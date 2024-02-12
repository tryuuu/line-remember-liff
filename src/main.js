import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// FontAwesomeのインポート
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faTrash, faPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// アイコンをライブラリに追加
library.add(faPen, faTrash, faPlus, faCirclePlus)

// アプリケーションを作成
const app = createApp(App)

// FontAwesomeIconコンポーネントをグローバルに登録
app.component('font-awesome-icon', FontAwesomeIcon)

// ルーターを使用
app.use(router)

// アプリケーションをマウント
app.mount('#app')
