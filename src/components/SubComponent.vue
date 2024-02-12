<template>
<!--データベースから取得した要素を表示-->
  <div>
    <h2>{{selectedtag}}</h2>
    <router-link to="/">戻る</router-link>
  </div>

      <div v-if="userData && userData.length">
        <draggable v-model="userData" group="people" item-key="id" handle=".handle">
          <template #item="{element}">
            <div class="drag-area">
              <span class="handle">{{ element }}</span>
            </div>
          </template>
        </draggable>
      </div>
      <div v-else>
        データをロード中...
      </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import axios from 'axios';
import '@/assets/styles.css';

export default {
  components: {
    draggable,
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
  tag: {
      type: String
    }
  },

  setup(props) {
    const userData = ref([]);
    const selectedtag = ref(props.tag);
    async function fetchUserData() {
      const userId = "Uc548b525e303bbc78aeae20775a7a39d";
      const response = await axios.post("https://puyufqti6egmr4zt6xupks3h3a0auefo.lambda-url.ap-northeast-1.on.aws/", {user_id: userId, tag: selectedtag.value});
      userData.value = response.data;
      console.log(userData.value);
    }
    onMounted(fetchUserData);
    return {
      userData, selectedtag
    };
  },
};

</script>
