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
        		<!-- 第一个父节点 -->
        		<div class="tree-node big-node" :class="isTurnOnTree ? 'act-node':''" @click="openFirstNode">
          			<div class="left-name">
            			<span class="iconfont my-caret" :class="isOpenTree ? 'caret-act':''">&#xe61d;</span>
            			<span class="iconfont floder-act">&#xe61c;</span>
            			<span class="node-name txt-dot">项目名称（900人）</span>
          			</div>
        		</div>

        		<!-- 子节点容器 -->
        		<div class="child-box" v-for="(item,index) in treeData" :key="index" :style="`height:${item.height}px;`">
          			<!-- 子级父节点 -->
          			<div class="tree-node big-node" :class="item.isTurnOn ? 'act-node':''" @click="openSecondNode(item)">
            			<div class="left-name">
              				<span :style="item.count>0 ? 'visibility:visible;' : 'visibility:hidden;'" class="iconfont my-caret" :class="item.isOpen ? 'caret-act':''">&#xe61d;</span>
              				<span class="iconfont floder-act">&#xe61a;</span>
              				<span class="node-name txt-dot">{{item.name+' ('+item.count+')'}}</span>
            			</div>

           				<div class="right-btn-box">
              				<span class="iconfont tree-plus" @click.stop="addChildNode(item)">&#xe61e;</span>
            			</div>
          			</div>

          			<!-- 子级子节点 -->
          			<div class="child-box" v-for="(single,index) in item.childData" :key="index" :style="`height:${single.height}px;`">
            			<!-- 子级父节点 -->
            			<div class="tree-node big-node" :class="single.isTurnOn ? 'act-node':''" @click="openThirdNode(item.id,single.id,item,single)">
              				<div class="left-name">
                				<span :style="single.count>0 ? 'visibility:visible;' : 'visibility:hidden;'" class="iconfont my-caret" :class="single.isOpen ? 'caret-act':''">&#xe61d;</span>
                				<span class="iconfont floder-act">&#xe61f;</span>
                				<span class="node-name txt-dot">{{single.name+' ('+single.count+')'}}</span>
              				</div>

              				<div class="right-btn-box">
                				<span class="iconfont tree-plus" @click.stop="addCCNode(single)">&#xe61e;</span>
              				</div>
            			</div>

            			<!-- 子级子节点 -->
            			<div v-for="(list,index) in single.childData" :key="index" class="tree-node big-node" :class="list.isTurnOn ? 'act-node':''" @click="openFouthNode(item,single,list)">
              				<div class="left-name last-child">
                				<span class="iconfont floder-act">&#xe61b;</span>
                				<span class="node-name txt-dot">{{list.name+' ('+list.count+')'}}</span>
              				</div>
            			</div>
          			</div>
        		</div>
      		</div>
    	</div>

		<add-child-model v-model="isShowChildNode"></add-child-model>
		<add-grandchild-model v-model="isShowccChildNode"></add-grandchild-model>
  	</div>
</template>
<script>
import addChildModel from "./addChildModel"
import addGrandchildModel from "./addGrandchildModel"
export default {
  components:{addChildModel,addGrandchildModel},
  data() {
    return {
      boxHeight: 40,
      treeData: [
        {
          id: "1",
          name: "专业分包(2个单位)",
          count: 1,
          isOpen: false,
          isTurnOn: false,
          height: 40,
        },
        {
          id: "2",
          name: "劳务分包(2个单位)",
          count: 1,
          isOpen: false,
          isTurnOn: false,
          height: 40,
          childData: [],
        },
        {
          id: "3",
          name: "其他(2个单位)",
          count: 1,
          isOpen: false,
          isTurnOn: false,
          height: 40,
          childData: [],
        },
      ], //树节点数据
      isOpenTree: false,
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
    this.openFirstNode();
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
        // instrumentTypeId: item.id,
        // typeName: item.name,
        // producerName: single.name,
        // producerId: single.id,
		instrumentTypeId: "",
        typeName: "",
        producerName: "",
        producerId: "",
      };
      this.isShowccChildNode = true;
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

    // 清空所有层级选中态
    clearSelected() {
      if (this.isTurnOnTree) this.isTurnOnTree = false;
      this.treeData.forEach((item) => {
        item.isTurnOn = false;
        if (item.childData && item.childData.length) {
          item.childData.forEach((single) => {
            single.isTurnOn = false;
            if (single.childData && single.childData.length) {
              single.childData.forEach((list) => {
                list.isTurnOn = false;
              });
            }
          });
        }
      });
    },

    // 选中态和选中打开的高度计算
    countHandle() {},

    
    openFirstNode() {
      // console.log(this.treeData);
      this.clearSelected();
      if (!this.isTurnOnTree) this.isTurnOnTree = true;

      if (this.isOpenTree) {
        this.boxHeight = 40;
      } else {
        var openHeight = 40;
        this.treeData.forEach((item) => {
          openHeight += item.height;
        });
        this.boxHeight = openHeight;
      }
      this.isOpenTree = !this.isOpenTree;
    },
    openSecondNode(treeItem) {
      // console.log('child id===',id);
      // if (treeItem.count=== 0) return;
      this.clearSelected();

      if(!treeItem.isTurnOn) treeItem.isTurnOn = true;
      if (treeItem.isOpen) {
        let addHeight = treeItem.height - 40;
        this.boxHeight -= addHeight;
        // item.height -= addHeight;
        treeItem.height = 40;
      }else{
        treeItem.childData =[
              {
                id: "cd66cede-5f4c-49ce-881a-663268db4968",
                name: "华筑筑友劳务外包(150人)",
                address: "111",
                contact: "111",
                count: 1,
                isOpen: false,
                isTurnOn: false,
                height: 40,
                childData: [
                  {
                    id: "2323",
                    name: "木工班组(30人)",
                    address: "111",
                    contact: "111",
                    isOpen: false,
                    isTurnOn: false,
                  },
                ],
              },
            ];
        let addHeight = treeItem.childData.length * 40;
        this.boxHeight += addHeight;
        treeItem.height = addHeight + 40;
      }
      treeItem.isOpen = !treeItem.isOpen;

      // return
    },
    openThirdNode(itemId, singleId,item, singleEvent) {
      this.clearSelected();
      if(!singleEvent.isTurnOn) singleEvent.isTurnOn = true;
      if (singleEvent.isOpen) {
        let addHeight = singleEvent.childData.length * 40;
        this.boxHeight -= addHeight;
        item.height -= addHeight;
        singleEvent.height = 40;
      }else{
        let addHeight = singleEvent.childData.length * 40;
        this.boxHeight += addHeight;
        item.height += addHeight;
        singleEvent.height = addHeight + 40;
      }
      singleEvent.isOpen = !singleEvent.isOpen;
        console.log(singleEvent);

      this.$router.push({ path: "/roster/team/subcontract" });
    },
    openFouthNode(treeItem, single, listEvent) {
      this.clearSelected();
      listEvent.isTurnOn = true;
      // this.$router.push({ path: "/roster/worker" });
      this.$router.push({ path: "/roster/team/workerlist" });
      this.$forceUpdate();
      return;
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
        padding-left: 16px;
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
          width: 190px;
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
          margin-right: 8px;
          font-size: 14px;
          display: inline-block;
          transform-origin: 40% 40%;
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
