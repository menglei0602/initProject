<template>
  <div>
    <a-tree
      ref="tree2"
      class="draggable-tree"
      :default-expanded-keys="expandedKeys"
      :tree-data="gData"
      show-icon
      @dragenter="onDragEnter"
      @drop="onDrop"
      draggable
      @rightClick="rightClickHandle"
      @dblclick="handle"
    >
      <a-icon slot="switcherIcon" type="folder" />
      <template slot="custom" slot-scope="{ selected }">
        <span style="color:red;">aaaa</span>
        <a-icon :type="selected ? 'folder-open' : 'folder'" />
      </template>
    </a-tree>
  </div>
</template>
<script>
// --------------

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
  console.log("children:", children);
};
generateData(z);

export default {
  data () {
    return {
      gData,
      expandedKeys: ["0-0", "0-0-0", "0-0-0-0"]
    };
  },
  methods: {
    onDragEnter (info) {
      console.log(info);
      // expandedKeys 需要受控时设置
      // this.expandedKeys = info.expandedKeys
    },
    onDrop (info) {
      console.log(info);
      const dropKey = info.node.eventKey;
      const dragKey = info.dragNode.eventKey;
      const dropPos = info.node.pos.split("-");
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);
      console.log(dropKey, dragKey, dropPos, dropPosition);
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr);
          }
          if (item.children) {
            return loop(item.children, key, callback);
          }
        });
      };
      const data = [...this.gData];

      // Find dragObject
      // 查找目标节点，删除对应元素
      let dragObj;
      if (!info.dropToGap) {
        // 在单项上（不是两个项之间）
        console.log("info.dropToGap:", info.dropToGap);
        loop(data, dragKey, (item, index, arr) => {
          arr.splice(index, 1);
          dragObj = item;
        });
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
        this.gData = data;
      }
      console.log("--------data:", data);
    },
    rightClickHandle ({ event, node }) {
      console.log({ event, node });
    },
    handle () {
      console.log("dblclick");
    }
  }
};
</script>
