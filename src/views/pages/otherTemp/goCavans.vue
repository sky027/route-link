<template>
  <div id="goCanvas" class="goCanvas">canvas</div>
</template>

<script>
import go from 'gojs';
let $g = go.GraphObject.make;
export default {
  name: 'GoCanvas',
  props: ['modelData'],
  data() {
    return {
      diagram: null,
    }
  },
  mounted: function() {
    let self = this;
    let myDiagram =
      $g(go.Diagram, 'goCanvas',
        {
          'initialContentAlignment': go.Spot.Center,
          'isEnabled': true, // 是否可拖拽，默认为是
          // 'toolManager.mouseWheelBehavior': go.ToolManager.WheelNone,
          'allowLink': true,
          'allowMove': true,
          'allowRelink': true, // 由于项目只想展示数据，我禁用了大部分图像交互操作，具体可参看官网API
          'layout': $g(go.TreeLayout, {angle: 0, arrangement: go.TreeLayout.ArrangementHorizontal}),  // angle可控制图像展示方向
          'undoManager.isEnabled': true,
          // Model ChangedEvents get passed up to component users
          'ChangedSelection': function (e) {
            self.$emit('changedSelection', e);
          },
        });

    myDiagram.nodeTemplate = // 节点的初始化设置
      $g(go.Node, 'Auto',
        $g(go.Shape, // 节点形状设置
          {
            fill: 'white', strokeWidth: 1,
            portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
          },
          new go.Binding('fill', '', '#e302c8')), // nodeColorConverter是我自定义函数，根据节点状态设置节点的背景颜色
        $g(go.TextBlock, // 节点提示文字设置
          {margin: 16, editable: false},
          new go.Binding('text').makeTwoWay())
      );

    myDiagram.linkTemplate =
      $g(go.Link,
        {relinkableFrom: true, relinkableTo: true},
        $g(go.Shape, // 连线形状设置
          {strokeWidth: 2},
          new go.Binding('stroke', '', '#0df174')), // 连线的颜色设置
        $g(go.Shape, // arrowhead
          {toArrow: 'Triangle', stroke: null, scale: 1.5}, // 箭头设置
          new go.Binding('fill', '', '#f2e715'))
      );

    myDiagram.groupTemplate = // 分组的初始化
      $g(go.Group, 'Auto',
        { // define the group's internal layout
          layout: $g(go.TreeLayout,
            {angle: 90, arrangement: go.TreeLayout.ArrangementVertical, isRealtime: false}),
        },
        $g(go.Shape, 'Rectangle',
          {fill: null, stroke: 'gray', strokeWidth: 2}),
        $g(go.Panel, 'Vertical',
          {defaultAlignment: go.Spot.Left, margin: 4},
          $g(go.Panel, 'Horizontal',
            {defaultAlignment: go.Spot.Top},
            $g('SubGraphExpanderButton', {alignment: go.Spot.Top, margin: 5}),
            // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
            $g(go.TextBlock,
              {
                font: 'Bold 14px Sans-Serif',
                margin: 10,
              },
              new go.Binding('text', 'text'))
          ),
          // create a placeholder to represent the area where the contents of the group are
          $g(go.Placeholder,
            {padding: new go.Margin(0, 10)}),
        ) // end Vertical Panel
      ); // end Group

    // generate the initial model
    this.diagram = myDiagram;
    this.updateModel(this.modelData);
  },
  watch: {
    modelData: function(val) {
      this.updateModel(val);
    },
  },
  methods: {
    model: function() {
      return this.diagram.model;
    },
    updateModel: function(val) {
      // No GoJS transaction permitted when replacing Diagram.model.
      if (val instanceof go.Model) {
        this.diagram.model = val;
      } else {
        let m = new go.GraphLinksModel();
        if (val) {
          for (let p in val) {
            if (val[p]) {
              m[p] = val[p];
            }
          }
        }
        this.diagram.model = m;
      }
    },
    updateDiagramFromData: function() {
      this.diagram.startTransaction();
      // This is very general but very inefficient.
      // It would be better to modify the diagramData data by calling
      // Model.setDataProperty or Model.addNodeData, et al.
      this.diagram.updateAllRelationshipsFromData();
      this.diagram.updateAllTargetBindings();
      this.diagram.commitTransaction('updated');
    },
  }
};
</script>

<style scoped lang="scss">
.goCanvas{
  min-height: 500px;
  max-height: 840px;
}

</style>
