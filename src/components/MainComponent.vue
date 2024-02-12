<template>
<h2>一覧</h2>
  <div class="container">
    <!-- タブの追加部分 -->
    <div class="tabs-section">
      <div>
        <!--v-modelでnewTabNameを追跡-->
        <input v-model="newTabName" placeholder="新しいタブ名">
        <font-awesome-icon :icon="['fas', 'plus']" @click="addTab" />
      </div>
        <div v-for="(item, index) in tabs" :key="index">
          <div class="button-container">
                 <router-link :to="{ name: 'SubComponent', params: { id: index }, query: { tag: item.name }}" class="tab-name">
                    > {{ item.name }}
                 </router-link>
                <font-awesome-icon :icon="['fas', 'pen']" @click="EditTab(item.name)" class="icon-spacing" />
                <font-awesome-icon :icon="['fas', 'trash']" @click="DeleteTab(item.name)" class="icon-spacing" />
          </div>
        </div>
    </div>
      <div v-if="userData && userData.length">
        <div v-for="(element, index) in userData" :key="index" class="drag-area">
          {{ element }}
          <font-awesome-icon :icon="['fas', 'circle-plus']" @click="IfSelected(index)"  />

          <!-- selectedTabで選択肢を追跡 -->
          <select v-if="selectedElementIndex === index" v-model="selectedTab">
            <option v-for="tab in tabs" :value="tab.name" :key="tab.name">{{ tab.name }}</option>
          </select>
          <button v-if="selectedElementIndex === index" @click="PutDataToTab(element)">確定</button>
        </div>
      </div>
      <div v-else>
        データをロード中...
      </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import '@/assets/styles.css';

//インポートしたコンポーネントを使用
export default {

  //setup()関数は必ず1回は呼び出される
  setup() {
    //refで変数を宣言, v-modelで追跡も可能
    const userData = ref([]);
    const newTabName = ref('');
    const selectedTab = ref(null);
    const tabs = ref([]);
    const selectedElementIndex = ref(null);

    async function fetchUserData(userId) {
      try {
        const response = await axios.post('https://nif4ujmi72rexthm55wuu2tyom0pnbbc.lambda-url.ap-northeast-1.on.aws/', { user_id: userId });
        userData.value = response.data;
      } catch (error) {
        console.error("Error fetching data from Lambda", error);
      }
    }

    async function loadData() {
      const userId = "Uc548b525e303bbc78aeae20775a7a39d";
      if (userId) {
        await fetchUserData(userId);
      }
    }
    // ページがロードされたときにデータを取得
    onMounted(loadData);

    async function addTab() {
      // 空白のタブ名は追加しない
      if (newTabName.value.trim() === '') {
        return;
      }
      const userId = "Uc548b525e303bbc78aeae20775a7a39d";
     //非同期処理はawaitで処理が終わるまで待つ
      await axios.post('https://yacnkgm5nf3ve36j7nhua6ii7i0qqpct.lambda-url.ap-northeast-1.on.aws/', { user_id: userId, tag: newTabName.value });
      location.reload();
      newTabName.value = '';//もとに戻す
    }

    function EditTab() {
      //タブの編集
      //このタイミングで二つのテーブルのタブ名を同時に編集
    }
    
    async function DeleteTab(tag) {
      const userId = "Uc548b525e303bbc78aeae20775a7a39d";
      if (window.confirm('本当に削除しますか？')) {
        await axios.post('https://a4cwjsxg5w4serckw4idsinrzm0ggmgv.lambda-url.ap-northeast-1.on.aws/', { user_id: userId, tag: tag });
      }
      location.reload();
    }

    function MovetoTab(element){
    const selected = ref('以降先のタブを選択してください');
    return { selected, tabs,element };
    }

    async function TakeTags(){
      const userId = "Uc548b525e303bbc78aeae20775a7a39d";
      const response = await axios.post('https://rjxsim7m5pyixozvrcfgouck2i0lklkx.lambda-url.ap-northeast-1.on.aws/', { user_id: userId });
      console.log("aaa");
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        tabs.value.push({name: response.data[i],items: []});
      }
      console.log(tabs);
    }
    onMounted(TakeTags);

    async function PutDataToTab(element){
      const name = selectedTab.value;
      const userId = "Uc548b525e303bbc78aeae20775a7a39d";
      await axios.post('https://yacnkgm5nf3ve36j7nhua6ii7i0qqpct.lambda-url.ap-northeast-1.on.aws/', { user_id: userId, tag: name, item: element});
      location.reload();
      selectedTab.value = null;
    }

    function IfSelected(index) {
      selectedElementIndex.value = index;
    }

    //templateに渡す
    return { userData, newTabName, tabs,addTab,MovetoTab, PutDataToTab, selectedTab, EditTab, DeleteTab, IfSelected, selectedElementIndex};
  }
};
</script>