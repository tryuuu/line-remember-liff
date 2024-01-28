<template>
  <div class="container">
    <!-- タブの追加部分 -->
    <div class="tabs-section">
      <div>
        <input v-model="newTabName" placeholder="新しいタブ名">
        <button @click="addTab">タブを追加</button>
      </div>

      <div>
        <div v-for="(item, index) in tabs" :key="index">
          {{ item.name }}
          <h2>{{item.items}}</h2>
          <!--ここでデータベースに保存-->
          <router-link :to="{ name: 'SubComponent', params: { id: index, items: item.items }}">移動</router-link>
        </div>
      </div>
    </div>

    <!-- ユーザーデータのドラッグ可能なリスト -->
    <div class="userData-section">
      <div v-if="userData && userData.length">
        <draggable v-model="userData" group="people" item-key="id" handle=".handle">
          <template #item="{element}">
            <div class="drag-area">
              <span class="handle">{{ element }}</span>
              <!--v-modelのselectedTabで選択肢を追跡-->
              <select v-model="selectedTab">
                <option v-for="tab in tabs" :value="tab.name" :key="tab.name">{{ tab.name }}</option>
              </select>
              <button v-if="selectedTab" @click="PutDataToTab(element)">確定</button>
            </div>
          </template>
        </draggable>
      </div>
      <div v-else>
        データをロード中...
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import axios from 'axios';

export default {
  components: {
    draggable,
  },
  setup() {
    const userData = ref([]);
    const newTabName = ref('');
    const selectedTab = ref(null);
    //const currentElement = ref(null);
    const tabs = ref([]);
    tabs.value.push({name: "以降先のタブを選択してください",items: []});

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

    onMounted(loadData);

    function addTab() {
      if (newTabName.value.trim() === '') {
        return;
      }
      tabs.value.push({ name: newTabName.value, items: [] });
      newTabName.value = '';
    }

    function MovetoTab(element){
    const selected = ref('以降先のタブを選択してください');
    const tabs = ref([
      { name: '以降先のタブを選択してください',items: [] },
    ]);
    return { selected, tabs,element };
    }

    function PutDataToTab(element) {
      const name = selectedTab.value;
      const tab = tabs.value.find(t => t.name === name);
      tab.items.push(element);
      console.log(tabs);
      // リセット
      selectedTab.value = null;
    }

    return { userData, newTabName, tabs, addTab,MovetoTab, PutDataToTab, selectedTab };
  }
};
</script>


<style>
.handle {
  cursor: pointer; 
}
.message-item {
  max-width: 90%;
  margin: 10px auto;
}

.message-code {
  white-space: pre-wrap;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  overflow-x: auto;
}
.drag-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: pre-wrap;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  overflow-x: auto;
  width: 100%; 
}

.selecttab-button {
  margin-left: auto;
  padding: 5px 10px;
  background-color: #e7e7f7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px; 
  padding: 20px; 
}

.tabs-section {
  background-color: #f8f8f8; 
  padding: 15px; 
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.userData-section {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%; 
  max-width: 600px; 
}


@media (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
    gap: 15px; 
  }
}

</style>