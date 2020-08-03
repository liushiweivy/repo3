<template>
<!-- 使用样例
    <upload-list :isPreview="true" @accept="(file)=>{outFormData.files = file}" ref="upload-list">
      <span slot="name" style="color: #fe2f15;">
        <a-icon type="exclamation" />请上传合同（协议）文本
      </span>
      <span slot="suffix">
        <a-icon type="plus" />上传文件
      </span>
    </upload-list>
 -->
  <div class="upload-wrapper">
    <div class="line-block-title">
      <div class="inner">
        <div class="title-text">
          <slot name="name"></slot>
        </div>
        <div class="suffix" @click="getUploadSpaceCode">
          <slot name="suffix"></slot>
        </div>
      </div>
    </div>
    <div class="file-content">
      <a-table
        :columns="fileColumns"
        size="middle"
        :dataSource="filesList"
        :pagination="false"
        bordered
      >
        <template slot="fileSize" slot-scope="props">{{props|fileSize}}</template>
        <template slot="action" slot-scope="props">
          <a v-if="isPreview" @click="previewFileItem(props)" style="color:#79a7dd">预览</a>
          <a v-if="isDelte" @click="deleteFileItem(props.key)" style="color:#79a7dd">删除</a>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const fileColumns = [
  {
    title: "文件名称",
    width: 250,
    key: "fileName",
    dataIndex: "fileName"
  },
  {
    title: "文件大小",
    width: 250,
    key: "fileSize",
    dataIndex: "fileSize",
    scopedSlots: { customRender: "fileSize" }
  },
  {
    title: "操作",
    width: 155,
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
import { getSpaceInfo, spaceGet, spaceGrant } from "@/request/api";
export default {
  name: "uploadList",
  props: {
    // 钉盘附件数组
    files: {
      type: Array,
      default() {
        return new Array(0);
      }
    },
    // 是否展示预览
    isPreview: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 是否为流程上传
    isProcess: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 是否展示删除
    isDelte: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      filesList: this.files.map((i, index) => {
        i.key = index;
        return i;
      }),
      fileColumns
    };
  },
  watch: {
    files() {
      this.filesList = this.files.map((i, index) => {
        i.key = index;
        return i;
      });
    }
  },
  methods: {
    reset() {
      this.filesList = [];
    },
    previewFileItem(i) {
      console.log("row", i);
      if (this.isProcess) {
        /* spaceGet("RESEARCH").then((res)=>{
                                            if(res.success){
                                                this.ddPreview(i)
                                        }    
                                        }) */
      } else {
        spaceGrant("RESEARCH", i.fileId, "DOWNLOAD").then(res => {
          if (res.success) {
            this.ddPreview(i);
          }
        });
      }
    },

    ddPreview(row) {
      dd.biz.cspace.preview({
        corpId: window.corpId,
        spaceId: row.spaceId,
        fileId: row.fileId,
        fileName: row.fileName,
        fileSize: row.fileSize,
        fileType: row.fileType
      });
    },

    //删除本地文件信息
    deleteFileItem(i) {
      this.filesList.splice(i, 1);
      this.filesList = this.filesList.map((i, index) => {
        i.key = index;
        return i;
      });
      this.$emit("accept", this.filesList);
    },
    getUploadSpaceCode() {
      // console.log(this.fileList)
      if (this.isProcess) {
        getSpaceInfo().then(res => {
          if (res.success) {
            this.uploadFiles(res.data.toString());
          }
        });
      } else {
        spaceGet("RESEARCH").then(res => {
          if (res.success) {
            spaceGrant("RESEARCH", "", "ADD").then(data => {
              if (data.success) {
                this.uploadFiles(res.data.toString());
              }
            });
          }
        });
      }
    },
    uploadFiles(spaceId) {
      dd.biz.util.uploadAttachment({
        image: {
          multiple: true,
          compress: false,
          max: 9,
          spaceId
        },
        space: {
          corpId:
            this.$getParams("corpId") || "dinga54347b089e75e4f35c2f4657eb6378f",
          spaceId,
          isCopy: 1,
          max: 9
        },
        file: { spaceId, max: 1,compress: false },
        types: ["photo", "file", "space"],
        onSuccess: res => {
          this.filesList = [...this.filesList, ...res.data].map((i, index) => {
            i.key = index;
            return i;
          });
          console.log(this.filesList);
          this.$emit("accept", this.filesList);
        },
        onFail: err => {
          console.log(err);
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.upload-wrapper {
  .line-block-title {
    padding-bottom: 16px;
    border-bottom: 1px solid #E9E9E9;
    margin-bottom: 24px;

    .inner {
      display: flex;
      height: 24px;
      border-left: 4px solid #35ACFE;
      line-height: 24px;

      .title-text {
        flex: 1;
        vertical-align: bottom;
        padding-left: 8px;
        font-size: 16px;
        color: #333333;
        font-weight: 700;
      }

      .suffix {
        vertical-align: bottom;
        color: #35ACFE;
        cursor: pointer;
      }
    }
  }
}
</style>
