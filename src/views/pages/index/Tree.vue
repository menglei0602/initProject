<template>
  <div>
<h1>11111111111111111111</h1>
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
        <a-tree-node key="0-0-1" title="leaf 0-1" />
      </a-tree-node>
      <a-tree-node key="0-1" title="parent 1">
        <a-tree-node key="0-1-0" title="leaf 1-0" is-leaf>
        </a-tree-node>
        <a-tree-node key="0-1-1" title="leaf 1-1"/>
      </a-tree-node>
    </a-directory-tree>
<h1>22222222222222222222222222</h1>
    <a-tree :tree-data="treeData" show-icon default-expand-all :default-selected-keys="['0-0-0']">
      <a-icon slot="switcherIcon" type="" />
      <a-icon slot="smile" type="folder" />
      <a-icon slot="meh" type="folder" />
      <template slot="custom" slot-scope="{ selected }">
        <!-- <span style="color:red;">aaaa</span> -->
        <a-icon :type="selected ? 'folder-open' : 'folder'" />
      </template>
    </a-tree>
<h1>33333333333333333333333333</h1>
    <a-tree
      ref="tree2"
      class="draggable-tree"
      :default-expanded-keys="expandedKeys"
      :tree-data="gData"
      :expandAction="false"
      show-icon
      @dragenter="onDragEnter"
      @drop="onDrop"
      draggable
      @rightClick="rightClickHandle"
      @select="onSelect"
    >
      <a-icon slot="switcherIcon" type="down" />
      <template slot="custom" slot-scope="{ selected }">
        <span style="color:red;">aaaa</span>
        <a-icon :type="selected ? '' : 'folder'" />
      </template>

    </a-tree>
<h1>4444444444444444444444444444444</h1>
    <div>
      <div style="margin-bottom: 16px">
        showLine:
        <a-switch v-model="showLine" />
        <br />
        <br />showIcon:
        <a-switch v-model="showIcon" />
      </div>
      <a-directory-tree
        :show-line="showLine"
        :show-icon="showIcon"
        :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
        @select="onSelect"
        @expand="onExpand"
        draggable
      >
        <!-- <a-icon slot="icon" type="carry-out" /> -->
        <a-tree-node key="0-0" title="parent 1">
          <!-- <a-icon slot="icon" type="folder" /> -->
          <!-- <span slot="title" style="color: #1890ff">parent 1--重写样式</span> -->
          <a-tree-node key="0-0-0" title="parent 1-0">
            <!-- <a-icon slot="icon" type="carry-out" /> -->
            <a-tree-node key="0-0-0-0" title="leaf0">
              <a-icon slot="icon" type="" />
            </a-tree-node>
            <a-tree-node key="0-0-0-1" title="leaf11111">
              <!-- <a-icon slot="icon" type="" /> -->
            <template slot="icon">
              <span style="color:red;">aaaa</span>
              <a-icon slot="icon" type="" />
            </template>
            </a-tree-node>
            <a-tree-node key="0-0-0-2" title="leaf2">
              <a-icon slot="icon" type="" />
            </a-tree-node>
          </a-tree-node>
          <a-tree-node key="0-0-1" title="parent 1-1">
            <!-- <a-icon slot="icon" type="carry-out" /> -->
            <a-tree-node key="0-0-1-0" title="leaf">
              <!-- <a-icon slot="icon" type="carry-out" /> -->
            </a-tree-node>
          </a-tree-node>
          <a-tree-node key="0-0-2" title="parent 1-2">
            <a-icon slot="icon" type="carry-out" />
            <a-tree-node key="0-0-2-0" title="leaf">
              <a-icon slot="icon" type="carry-out" />
            </a-tree-node>
            <a-tree-node key="0-0-2-1" title="leafccc">
              <a-icon slot="icon" type="folder" />
              <a-icon slot="switcherIcon" type="form" />
            </a-tree-node>
          </a-tree-node>
        </a-tree-node>
      </a-directory-tree>
    </div>
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
      expandedKeys: ["0-0", "0-0-0", "0-0-0-0"],
      showLine: false,
      showIcon: true
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
        console.log(
          "(info.node.children || []).length:",
          (info.node.children || []).length
        );
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
