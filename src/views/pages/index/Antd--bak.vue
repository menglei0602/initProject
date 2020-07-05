<template>
  <div>
    <a-date-picker
      :mode="mode1"
      show-time
      @openChange="handleOpenChange1"
      @panelChange="handlePanelChange1"
      @change="handleChange"
    />
    <br />
    <!-- <a-range-picker
      :placeholder="['Start month', 'End month']"
      format="YYYY-MM"
      :value="value"
      :mode="mode2"
      @panelChange="handlePanelChange2"
      @change="handleChange"
    />-->

    <a-directory-tree
      ref="tree1"
      multiple
      default-expand-all
      @select="onSelect"
      @expand="onExpand"
      draggable
      @rightClick="rightClickHandle"
    >
      <a-tree-node key="0-0" title="parent 0">
        <a-tree-node key="0-0-0" title="leaf 0-0" />
        <a-tree-node key="0-0-1" title="leaf 0-1"  />
      </a-tree-node>
      <a-tree-node key="0-1" title="parent 1">
        <a-tree-node key="0-1-0" title="leaf 1-0" is-leaf />
        <a-tree-node key="0-1-1" title="leaf 1-1" is-leaf />
      </a-tree-node>
    </a-directory-tree>

<a-tree :tree-data="treeData" show-icon default-expand-all :default-selected-keys="['0-0-0']">
    <a-icon slot="switcherIcon" type="down" />
    <a-icon slot="smile" type="folder" />
    <a-icon slot="meh" type="folder" />
    <template slot="custom" slot-scope="{ selected }">
      <a-icon :type="selected ? 'frown' : 'frown-o'" />
    </template>
  </a-tree>

    <a-tree
      ref="tree2"
      class="draggable-tree"
      :default-expanded-keys="expandedKeys"
      :tree-data="gData"
      @dragenter="onDragEnter"
      @drop="onDrop"
      draggable
      @rightClick="rightClickHandle"
    />

  </div>
</template>
<script>
const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    slots: {
      icon: "smile"
    },
    children: [
      { title: "leaf", key: "0-0-0", slots: { icon: "meh" } },
      { title: "leaf", key: "0-0-1", scopedSlots: { icon: "custom" } }
    ]
  }
];
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
};
generateData(z);

export default {
  data () {
    return {
      treeData,
      mode1: "time",
      mode2: ["month", "month"],
      value: [],
      gData,
      expandedKeys: ["0-0", "0-0-0", "0-0-0-0"]
    };
  },
  methods: {
    onSelect1 (selectedKeys, info) {
      console.log("selected", selectedKeys, info);
    },
    onCheck1 (checkedKeys, info) {
      console.log("onCheck", checkedKeys, info);
    },
    mounted () {
      this.$refs.tree2.oncontextmenu = function (e) {
        e.preventDefault();
      };
    },
    handleOpenChange1 (open) {
      console.log(open);
      if (open) {
        this.mode1 = "time";
      }
    },
    handleChange (value) {
      console.log(value);
      this.value = value;
    },
    handlePanelChange1 (value, mode) {
      console.log(value, mode);
      this.mode1 = mode;
    },
    handlePanelChange2 (value, mode) {
      console.log(value, mode);
      this.value = value;
      this.mode2 = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1]
      ];
    },
    onSelect (keys, event) {
      console.log("Trigger Select", keys, event);
    },
    onExpand () {
      console.log("Trigger Expand");
    },
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
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });
      if (!info.dropToGap) {
        // 在单项上（不是两个项之间）
        console.log("info.dropToGap:", info.dropToGap);
        // Drop on the content
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
      } else if (
        // 什么情况下进入此分支？？---todo
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        console.log("(info.node.children || []).length:", (info.node.children || []).length);
        console.log("info.node.expanded:", info.node.expanded);
        console.log("dropPosition:", dropPosition);
        loop(data, dropKey, item => {
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
        console.log("ar:", ar);
      }
      this.gData = data;
      console.log("--------data:", data);
    },
    rightClickHandle ({ event, node }) {
      console.log({ event, node });
    }
  }
};
</script>
