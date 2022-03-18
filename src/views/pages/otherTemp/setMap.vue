<template>
  <div class="setMap">
    <go-canvas :modelData="modelData" @changedSelection="changedSelection"></go-canvas>
  </div>
</template>

<script>
import { GoCanvas } from '@/views/pages/otherTemp/goCanvas'
export default {
  name: 'SetMap',
  components: {
    GoCanvas
  },
  data() {
    return {
      modelData: null
    }
  },
  created() {
    this.modelData = {
      "nodeDataArray": [
        {"key":1, "text":"Alpha", "color":"lightblue"},
        {"key":2, "text":"Beta", "color":"orange"},
        {"key":3, "text":"Gamma", "color":"lightgreen"},
        {"key":4, "text":"Delta", "color":"pink"}
      ],
      "linkDataArray": [
        {"from":1, "to":2},
        {"from":1, "to":3},
        {"from":3, "to":4}
      ]
    }
  },
  methods: {
    updateDiagramFromData: function() {
      this.$refs.diag.updateDiagramFromData(); // 数据变化时调用组件中的更新方法
    },
    changedSelection: function(e) {
      let node = e.diagram.selection.first();
      if (node instanceof go.Node) {
        this.currentNode = node;
        this.currentNodeText = node.data.text;
        this.selectNode(node.data);
      } else {
        this.currentNode = null;
        this.currentNodeText = '';
      }
    },
  }
};
</script>

<style scoped lang="setMap">
.setMap{}
</style>
