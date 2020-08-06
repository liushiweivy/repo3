<template>
  <!-- 左侧树结构 -->
  <div class="type-page">
    <!-- 搜索 -->
    <div class="search-input">
      <a-input-search placeholder="搜索" @search="searchHandle" />
    </div>
    <!-- 树 -->
    <div class="tree-wrap">
      <div class="tree-box" ref="treeBox" :style="`height:${boxHeight}px;`">
        <!-- 获取子节点高度执行动画 -->
        <!-- 第一个父节点 -->
        <div class="tree-node big-node" :class="isTurnOnTree ? 'act-node':''" @click="openNode">
          <div class="left-name">
            <span
              :style="treeData.length>0 ? 'visibility:visible;' : 'visibility:hidden;'"
              class="iconfont my-caret"
              :class="isOpenTree ? 'caret-act':''"
            >&#xe621;</span>
            <!-- <a-icon class="floder-act" type="caret-up" /> -->
            <span class="iconfont floder-act" type="caret-up"></span>
            <span class="node-name txt-dot">项目名称（900人）</span>
          </div>

          <div class="right-btn-box" @click.stop="typeAddHandle">
            <span class="el-icon-plus tree-plus"></span>
          </div>
        </div>

        <!-- 子节点容器 -->
        <div
          class="child-box"
          v-for="(item,index) in treeData"
          :key="index"
          :style="`height:${item.height}px;`"
        >
          <!-- 子级父节点 -->
          <div
            class="tree-node big-node"
            :class="item.isTurnOn ? 'act-node':''"
            @click="openChildNode(item)"
          >
            <div class="left-name">
              <span
                :style="item.count>0 ? 'visibility:visible;' : 'visibility:hidden;'"
                class="iconfont my-caret"
                :class="item.isOpen ? 'caret-act':''"
              >&#xe621;</span>
              <span class="iconfont floder-act">&#xe622;</span>
              <!-- <el-tooltip popper-class="tip-item" class="item" effect="dark" :content="`${item.name} (${item.count})`" placement="top-end">
                  <span
                  class="node-name txt-dot"
                >{{item.name+' ('+item.count+')'}}</span> 
              </el-tooltip>-->
            </div>

            <div class="right-btn-box">
              <span class="el-icon-plus tree-plus" @click.stop="addChildNode(item)"></span>
              <span class="iconfont tree-plus" @click.stop="editNode(item)">&#xe626;</span>
              <span class="iconfont tree-plus" @click.stop="deleteNode(item)">&#xe625;</span>
            </div>
          </div>

          <!-- 子级子节点 -->
          <div
            v-for="(single,index) in item.childData"
            :key="index"
            class="tree-node big-node"
            :class="single.isTurnOn ? 'act-node':''"
            @click="showCCHandle(item,single)"
          >
            <div class="left-name last-child">
              <span class="iconfont floder-act">&#xe622;</span>
              <!-- <el-tooltip class="item" effect="dark" :content="single.name" placement="top-end">
                  <span class="node-name txt-dot">{{single.name}}</span>
              </el-tooltip>-->
            </div>

            <div class="right-btn-box">
              <span class="el-icon-plus tree-plus" @click.stop="addCCNode(item,single)"></span>
              <span class="iconfont tree-plus" @click.stop="editCCNode(item,single)">&#xe626;</span>
              <span class="iconfont tree-plus" @click.stop="delCCNode(item.id,single)">&#xe625;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import empty from "@/components/empty";
// import addNodeDrawer from "./addNodeDrawer";
// import addcNodeDrawer from "./addcNodeDrawer";
// import addccNodeDrawer from "./addccNodeDrawer";
// import insTypeTable from "./insTypeTable";

export default {
  components: {
    // empty,
    // addNodeDrawer,
    // addcNodeDrawer,
    // insTypeTable,
    // addccNodeDrawer
  },
  data() {
    return {
      boxHeight: 40,
      treeData: [
          
      ], //树节点数据
      isOpenTree: true,
      isTurnOnTree: true,

      nodeInfo: {
        //第一级 子节点
        name: "",
        id: "",
      },
      isShowNodeDrawer: false,

      nodeChildInfo: {
        //第二集子节点
        id: "",
        instrumentTypeId: "",
        name: "",
        typeName: "",
        address: "",
        contact: "",
        website: "",
      },
      isShowChildNode: false,

      isShowccChildNode: false, //第三子节点
      nodeccChildInfo: {},

      searchIdInfo: {
        //选择的搜索id信息
        instrumentProducerId: "",
        instrumentTypeId: "",
      },
      changeNum: 0,
    };
  },
  created() {
    // this.getTypeList();
  },

  methods: {
    searchHandle() {},
    //表格子节点添加成功
    addccChildSucHanle() {
      this.changeNum++;
      // console.log(this.changeNum);
    },

    // 添加表格子节点
    addCCNode(item, single) {
      this.nodeccChildInfo = {
        instrumentTypeId: item.id,
        typeName: item.name,
        producerName: single.name,
        producerId: single.id,
      };
      this.isShowccChildNode = true;
    },
    // 删除二级子节点
    delCCNode(itemId, single) {
      this.$confirm(`是否删除${single.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            url: window.ajaxPath + "/asset/instrument/deleteInstrumentProducer",
            type: "post",
            // headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              instrumentProducerId: single.id,
              instrumentTypeId: itemId,
            },
          };

          this.$Ajax(obj).then((res) => {
            if (res) {
              this.$Toast("删除成功", true);
              this.addChildSucHanle(itemId, true);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 二级子节点点击选中
    showCCHandle(treeItem, single) {
      this.searchIdInfo = {
        instrumentProducerId: single.id,
        instrumentTypeId: treeItem.id,
      };
      this.changeNum++;
      // console.log(this.changeNum);
      if (this.ccChild) this.ccChild.isTurnOn = false;
      if (this.isTurnOnTree) this.isTurnOnTree = false;
      if (this.cChild) this.cChild.isTurnOn = false;

      single.isTurnOn = true;
      this.ccChild = single;
    },

    // 一级子节点添加
    typeAddHandle() {
      this.nodeInfo = {
        name: "",
        id: "",
      };
      this.isShowNodeDrawer = true;
    },
    // 二级编辑子级
    editCCNode(item, single) {
      this.nodeChildInfo = {
        instrumentTypeId: item.id,
        typeName: item.name,
        id: single.id,
        name: single.name,
        address: single.address,
        contact: single.contact,
        website: single.website,
      };
      this.isShowChildNode = true;
    },
    // 二级添加子级
    addChildNode(item) {
      this.nodeChildInfo = {
        id: "",
        instrumentTypeId: item.id,
        name: "",
        typeName: item.name,
        address: "",
        contact: "",
        website: "",
      };

      this.isShowChildNode = true;
    },
    // 子级添加成功回调
    addChildSucHanle(instrumentTypeId, isdel = false) {
      console.log("isDel", isdel, instrumentTypeId);
      for (let i = 0; i < this.treeData.length; i++) {
        console.log(this.treeData[i].id);
        if (instrumentTypeId === this.treeData[i].id) {
          // console.log('instrumentTypeId===',this.treeData[i]);
          /* 子节点的数量加减 */

          if (isdel === true) {
            this.treeData[i].count--;
          } else {
            if (isdel === "add") this.treeData[i].count++;
          }

          if (this.treeData[i].isOpen) {
            let obj = {
              url:
                window.ajaxPath + "/asset/instrument/getInstrumentProducerList",
              type: "post",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              data: {
                instrumentTypeId: instrumentTypeId,
              },
            };

            this.$Ajax(obj).then((res) => {
              if (res) {
                if (isdel === true) {
                  this.boxHeight = this.boxHeight - 40;
                } else {
                  if (this.treeData[i].childData.length !== res.data.length) {
                    this.boxHeight = this.boxHeight + 40;
                  }
                }
                this.treeData[i].childData = res.data;

                this.treeData[i].height =
                  this.treeData[i].childData.length * 40 + 40;

                // 如果是编辑厂家，同id的厂家信息改变
                if (isdel === "edit") {
                  let itInfo = {};
                  for (var j = 0; j < res.data.length; j++) {
                    if (res.data[j].id === this.nodeChildInfo.id) {
                      itInfo = res.data[j];
                    }
                  }
                  this.treeData.forEach((list, k) => {
                    if (list.isOpen) {
                      list.childData.forEach((it, m) => {
                        // console.log(it.id,this.nodeChildInfo.id);
                        if (it.id === this.nodeChildInfo.id) {
                          this.treeData[k].childData[m].name = itInfo.name;
                          this.treeData[k].childData[m].contact =
                            itInfo.contact;
                          this.treeData[k].childData[m].address =
                            itInfo.address;
                          this.treeData[k].childData[m].website =
                            itInfo.website;
                          this.changeNum++;
                          // this.treeData[k].childData[m].=itInfo.name;
                        }
                      });
                    }
                  });
                }
              }
            });
          }
          break;
        }
      }
    },

    // 编辑子节点
    editNode(info) {
      // console.log(info);
      this.nodeInfo = info;
      this.isShowNodeDrawer = true;
    },
    // 删除子节点
    deleteNode(item) {
      this.$confirm(`是否删除${item.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let obj = {
            url: window.ajaxPath + "/asset/instrument/deleteInstrumentType",
            type: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: {
              instrumentTypeId: item.id,
            },
          };
          this.$Ajax(obj).then((res) => {
            if (res) {
              this.$Toast("删除成功", true);
              this.getTypeList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 获取仪器类型列表
    getTypeList() {
      let obj = {
        url: window.ajaxPath + "/asset/instrument/getInstrumentTypeList",
        type: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      this.$Ajax(obj).then((res) => {
        if (res) {
          res.data.forEach((item, index) => {
            item.isOpen = false;
            item.isTurnOn = false;
            item.childData = [];
            item.height = 40;
          });
          this.treeData = res.data;
          this.boxHeight = this.treeData.length * 40 + 40;
        }
      });
    },
    // 添加成功
    addSucHandle(addData, isEdit) {
      if (!isEdit) {
        addData.count = 0;
        addData.isOpen = false;
        addData.isTurnOn = false;
        addData.childData = [];
        addData.height = 40;
        this.treeData.unshift(addData);
        this.boxHeight = this.boxHeight + 40;
      } else {
        for (var i = 0; i < this.treeData.length; i++) {
          if (addData.id === this.treeData[i].id) {
            this.treeData[i].name = addData.name;
            break;
          }
        }
      }
    },

    // 展开二级子节点
    openChildNode(treeItem) {
      // console.log('child id===',id);
      // if (treeItem.count=== 0) return;

      if (!treeItem.isTurnOn) {
        this.searchIdInfo = {
          instrumentProducerId: "",
          instrumentTypeId: treeItem.id,
        };
        this.changeNum++;
      }
      // console.log(this.changeNum);

      if (this.cChild) this.cChild.isTurnOn = false;
      this.cChild = treeItem;
      if (this.ccChild) this.ccChild.isTurnOn = false;

      for (let i = 0; i < this.treeData.length; i++) {
        if (treeItem.id === this.treeData[i].id) {
          if (this.treeData[i].isOpen) {
            this.treeData[i].height = 40;
            this.boxHeight =
              this.boxHeight - this.treeData[i].childData.length * 40;
          } else {
            let obj = {
              url:
                window.ajaxPath + "/asset/instrument/getInstrumentProducerList",
              type: "post",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              data: {
                instrumentTypeId: treeItem.id,
              },
            };
            this.$Ajax(obj).then((res) => {
              if (res) {
                res.data.forEach((item, index) => {
                  item.isOpen = false;
                  item.isTurnOn = false;
                });

                this.treeData[i].childData = res.data;
                this.treeData[i].height =
                  this.treeData[i].childData.length * 40 + 40;
                this.boxHeight =
                  this.boxHeight + this.treeData[i].childData.length * 40;
              }
            });
          }

          this.treeData[i].isOpen = !this.treeData[i].isOpen;
          if (!this.treeData[i].isTurnOn) this.treeData[i].isTurnOn = true;
          if (this.isTurnOnTree) this.isTurnOnTree = false;
          break;
        }
      }
    },

    // 展开一级子节点
    openNode() {
      // console.log(this.treeData);
      if (this.isOpenTree) {
        this.boxHeight = 40;
        if (this.cChild) this.cChild.isTurnOn = false;
        if (this.ccChild) this.ccChild.isTurnOn = false;
      } else {
        var openHeight = 40;
        this.treeData.forEach((item) => {
          openHeight += item.height;
        });
        this.boxHeight = openHeight;
      }
      this.isOpenTree = !this.isOpenTree;
      if (!this.isTurnOnTree) {
        this.isTurnOnTree = true;
        this.searchIdInfo = {
          instrumentProducerId: "",
          instrumentTypeId: "",
        };
        this.changeNum++;
        //  console.log(this.changeNum);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.node-act {
  background-color: #3998f7;
  color: #fff;
}

.none-child {
  visibility: hidden;
}

.type-page {
  width: 300px;
  min-height: 100%;
  border-radius: 8px 0px 0px 8px;
  border-right: 1px solid rgba(200, 200, 200, 1);
  background: #fff;

  .search-input {
    padding: 25px 12px 16px 12px;
  }

  .tree-wrap {
    width: 100%;

    // height: 100%;
    // background: rgba(235, 238, 245, 1);
    // overflow-y: auto;
    .tree-box {
      width: 100%;
      height: 40px;
      overflow: hidden;
      transition: height 0.2s;

      .child-box {
        padding-left: 30px;
        height: 40px;
        transition: height 0.2s;
        overflow: hidden;
      }

      .tree-node {
        height: 40px;
        display: flex;
        color: #303133;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s;

        .left-name {
          padding-left: 8px;
          display: flex;
        }

        .node-name {
          width: 250px;
          padding-left: 8px;
        }

        .last-child {
          padding-left: 50px;
        }

        .right-btn-box {
          padding-right: 10px;
        }

        .my-caret {
          color: #909399;
          display: inline-block;
          transform-origin: 20% center;
          transition: transform 0.2s;
        }

        .caret-act {
          transform: rotate(90deg);
        }
      }

      .tree-plus {
        font-size: 14px;
        padding-left: 5px;
        color: rgba(235, 238, 245, 1);
      }

      .floder-act {
        color: #3998f7;
      }

      .tree-node:hover {
        background-color: #dcdfe6;

        .tree-plus, .node-name {
          color: #3998f7;
        }
      }

      .act-node {
        background-color: #3998f7 !important;

        span {
          color: #fff !important;
        }
      }
    }
  }

  .tree-wrap::-webkit-scrollbar {
    display: none;
  }

  .table-wrap {
    flex: 1;
    overflow: hidden;
  }
}
</style>
