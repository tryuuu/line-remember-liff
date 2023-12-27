<template>
  <div>
    <div v-if="userData && userData.length">
      <div v-for="(item, index) in userData" :key="index" class="message-item">
        <img v-if="isImageUrl(item)" :src="item" alt="Image" class="message-image" />
        <pre v-else class="message-code"><code>{{ item }}</code></pre>
        <button @click="deleteItem(index)" class="delete-button">↑削除</button>
      </div>
    </div>
    <div v-else>
      データをロード中...
    </div>
  </div>
</template>

<style>
.delete-button {
  margin-left: 10px;
  margin-top: -50px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.message-item {
  max-width: 90%;
  margin: 10px auto;
}

.message-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.message-code {
  white-space: pre-wrap;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  overflow-x: auto;
}

@media (max-width: 600px) {
  .message-item {
    max-width: 100%;
  }
}
</style>


<script>
import { defineComponent, ref, onMounted } from 'vue';
import liff from '@line/liff';
import axios from 'axios';

export default defineComponent({
  setup() {
    const userData = ref(null);
    const userId = ref(null);

    async function deleteItem(index) {
    // ユーザーに削除の確認を求める
    if (confirm("本当に削除しますか？")) {
      try {
        await axios.post('https://jc4kgl3dprdds5lizftwoc3xua0iucgv.lambda-url.ap-northeast-1.on.aws/', {
          index: index + 1, 
          user_id: userId.value
        });
        userData.value.splice(index, 1); // ローカルのリストから項目を削除
      } catch (error) {
        console.error("Error sending delete request", error);
      }
    } else {
      //何もしない
    }
}

    function isImageUrl(url) {
      return /\.(jpg|jpeg|png|gif)$/i.test(url);
    }

    async function initializeLiff() {
      try {
        await liff.init({ liffId: "2002041664-Jz0GGDWZ" });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          userId.value = profile.userId;
          return profile.userId;
        } else {
          liff.login();
        }
      } catch (error) {
        console.error("LIFF Initialization failed", error);
      }
    }

    async function fetchUserData(userId) {
      try {
        const response = await axios.post('Lambda_URL', {
          user_id: userId
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching data from Lambda", error);
      }
    }
    async function loadData() {
      const userId = await initializeLiff();
      if (userId) {
        userData.value = await fetchUserData(userId);
      }
    }

    onMounted(loadData);

    return { userData,isImageUrl,deleteItem };
  },
});
</script>
