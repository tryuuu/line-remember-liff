<template>
<!--データベースから取得した要素を表示-->
  <div>
    <h2>テストページ2</h2>
    <router-link to="/">前のページに戻る</router-link>
    <h2>{{items}}</h2>
    <div v-if="items && items.length">
      <h3>渡された要素:</h3>
      <ul>
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </div>
    <div v-else>
      要素がありません。
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    items: {
      type: Array
    }
  }
};
</script>
