<template>
  <select v-model="selected">
    <option v-for="tab in tabs" :value="tab.name" :key="tab.name">
      {{ tab.name }}
    </option>
  </select>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const selected = ref('以降先のタブを選択してください');
    const tabs = ref([
      { name: '以降先のタブを選択してください',items: [] },
      { name: 'One', items: ['aa','bb'] },
      { name: 'Two', items: ['cc','dd'] },
      { name: 'Three', items: ['ee','ff']}
    ]);
    const tabOne = tabs.value.find(tab => tab.name === 'One');
    if (tabOne) {
      console.log(tabOne.items); // 'aa', 'bb' が出力される
    } else {
      console.log("Tab 'One' not found");
    }
    return { selected, tabs };
  }
}
</script>