<template>
  <div>
    <div v-if="userData && userData.length">
      <div v-for="(item, index) in userData" :key="index" class="message-item">
        <img v-if="isImageUrl(item)" :src="item" alt="Image" class="message-image" />
        <pre v-else class="message-code"><code>{{ item }}</code></pre>
      </div>
    </div>
    <div v-else>
      データをロード中...
    </div>
  </div>
</template>

<style>
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

    function isImageUrl(url) {
      return /\.(jpg|jpeg|png|gif)$/i.test(url);
    }

    async function initializeLiff() {
      try {
        await liff.init({ liffId: "2002041664-Jz0GGDWZ" });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
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
        const response = await axios.post('https://nif4ujmi72rexthm55wuu2tyom0pnbbc.lambda-url.ap-northeast-1.on.aws/', {
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

    return { userData,isImageUrl };
  },
});
</script>
