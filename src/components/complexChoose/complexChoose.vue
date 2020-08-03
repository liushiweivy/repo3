<!-- 地址本组件===>此组件在不用jsapi时调起通讯录 -->
<!--
调用方式：<complex-choose v-if="true" :succ="confirmChoose" :fail="cancelChoose" :type="0" tit="选择部门"></complex-choose>
type: 选择0部门和人员  1部门  2人员  默认为0 （这里和后端有点区别，后端type 2部门 8人员）
data: 初始化已选数据  默认为空数组
tit: 地址本标题  默认'选择人员'
multiple: 是否多选，默认true多选
resign: 是否显示离职人员 默认false
nodept: [id1,id2,...]不可选部门id集合，页面控制隐藏掉
succ: 点确定 回调函数
fail: 点取消 回调函数
-->
<style lang="stylus" scoped>
        // 地址本样式
        .choose-mask {
                z-index: 9999;
                background-color: rgba(0, 0, 0, 0.4);
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: auto;
        }

        .complexchoose {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -300px;
                margin-left: -338px;
                background-color: #fff;
                border-radius: 5px;
                border: 1px solid #ebeef5;
                font-size: 14px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                // // 设置双击不能选中
                user-select: none;
                overflow: hidden;
                line-height:normal;
        }

        .cpch-head {
                position: relative;
                // text-align: center;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                color: #333;
                border-bottom: 1px solid #e6e9f2;
        }

        .head-tit {
                font-weight: bold;
                padding-left: 10px;
        }

        .close {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 20px;
        }

        .cpch-close {
                position: absolute;
                right: 10px;
                top: 6px;
                cursor: pointer;
                padding: 0 3px;
                font-size: 20px;
                line-height: 30px;
                color: #888
        }

        .cpch-close:hover {
                color: red
        }

        .cpch-content {
                position: relative;
                width: 675px;
                height: 420px;
                border-bottom: 1px solid #e6e9f2
        }


        .cpch-selected {
                position: absolute;
                width: 320px;
                right: 10px;
                top: 10px;
                bottom: 10px;
        }

        .cpch-company {
                position: absolute;
                width: 320px;
                left: 10px;
                top: 10px;
                bottom: 10px;
        }

        .cpch-loading {
                position: absolute;
                width: 100%;
                height: 100%;
                padding-top: 200px;
                padding-left: 150px;
                z-index: 5;
                background-color: rgba(250, 250, 250, .5);
        }

        .cpch-loading > div {
                float: left;
                margin-left: 5px;
                height: 28px;
                width: 4px;
                background-color: #35ACFE;
                border-radius: 30%;
                animation: chooseloading 1s ease infinite;
        }

        .cpch-loading > .cl1 {
                animation-delay: -1s;
        }

        .cpch-loading > .cl2 {
                animation-delay: -0.8s;
        }

        .cpch-loading > .cl3 {
                animation-delay: -0.6s;
        }

        @keyframes chooseloading {
                0%,
                50%,
                100% {
                        transform: scaleY(0.5)
                }
                25% {
                        transform: scaleY(1)
                }
        }

        .cpch-company-list,
        .cpch-selected-list {
                border: 1px solid #e6e9f2;
                height: 100%;
                overflow: auto;
                border-radius: 4px;
        }

        .cpch-company-list::-webkit-scrollbar,
        .cpch-selected-list::-webkit-scrollbar {
                width: 6px;
                height: 6px;
        }

        .cpch-company-list::-webkit-scrollbar-thumb,
        .cpch-selected-list::-webkit-scrollbar-thumb {
                background: #eee;
                border-radius: 6px;
        }

        .pt45 {
                padding-top: 45px;
        }

        .pt10 {
                padding-top: 10px;
        }

        .cpch-switch {
                position: absolute;
                left: 1px;
                right: 1px;
                top: 1px;
                z-index: 2;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background-color: #f7f9fb;
        }

        .cpch-switch span {
                position: absolute;
                right: 0;
                top: 0;
                width: 50%;
                border-bottom: 2px solid #eee;
                cursor: pointer;
        }

        .cpch-switch span:first-child {
                position: absolute;
                left: 0;
                top: 0;
                width: 50%;
        }

        .cpch-switch span.active {
                color: #409eff;
                border-bottom: 2px solid #409eff;
                // cursor: default;
        }

        .cpch-search {
                position: relative;
                padding: 0 10px;
                display: flex;
                align-items: center;
        }

        .cpch-search input {
                width: 100%;
                height: 32px;
                padding: 6px 28px 6px 33px;
                font-size: 12px;
                color: #555;
                background-color: #fff;
                border: 1px solid #e4e4e4;
                border-radius: 4px;
                overflow: auto;
                outline: none;
        }

        .cpch-search i.first {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 20px;
        }

        .cpch-search i.sec {
                position: absolute;
                top: 7px;
                right: 16px;
                display: inline-block;
                width: 18px;
                height: 18px;
                line-height: 18px;
                text-align: center;
                font-size: 12px;
                border-radius: 50%;
                background-color: #ccc;
                color: #fff;
                cursor: pointer;
        }

        .cpch-search i.sec:hover {
                background-color: #aaa;
        }

        .cpch-parentdept {
                text-align: left;
                margin-top: 8px;
                padding-left: 10px;
                padding-right: 2px;
                line-height: 25px
        }

        .cpch-parentdept > span {
                color: #409eff;
                cursor: pointer;
        }

        .cpch-parentdept > span:before {
                content: ">";
                color: #979798;
                margin-left: 5px;
                margin-right: 10px
        }

        .cpch-parentdept > span:first-child:before {
                content: "";
                margin-left: 0;
                margin-right: 0
        }

        .cpch-parentdept > span:last-child {
                color: #999;
                cursor: default;
        }

        .cpch-company-list input[type=radio] {
                width: 15px;
                height: 15px;
                margin: -1px 8px 1px 0;
        }

        .cpch-checkbox {
                float: left;
                width: 14px;
                height: 14px;
                margin-top: 13px;
                margin-right: 8px;
                border: 1px solid #ccc;
                line-height: 13px;
                border-radius: 20%;
        }

        .cpch-radio {
                border-radius: 50%;
        }

        .cpch-selectall {
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                padding-right: 2px;
                border-bottom: 1px solid #e4e4e4;
                cursor: pointer;
        }

        .cpch-selectall:hover {
                background-color: #dfedfa
        }

        .cpch-selectall .cpch-checkbox {
                margin-top: 13px;
        }

        .cpch-dept-list li {
                position: relative;
                height: 40px;
                line-height: 40px;
                padding-right: 2px;
                border-bottom: 1px solid #e4e4e4;
                cursor: pointer;
        }

        div.nochild {
                margin-top: 100px;
                color: #999;
                text-align: center;
        }

        .cpch-dept-list li > span {
                cursor: pointer;
        }

        .cpch-dept-name:hover {
                background-color: #dfedfa
        }

        .cpch-dept-name {
                text-align: left;
                width: 260px;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
        }

        .cpch-dept-name .count {
                color: #999;
        }

        .cpch-dept-child {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                line-height: 40px;
        }

        .cpch-dept-child span {
                padding-left: 10px;
                padding-right: 10px;
                border-left: 1px solid #ddd;
                color: #409eff;
                cursor: pointer;
        }

        .cpch-dept-child span.disabled {
                color: #B9E2FF;
                cursor: default;
        }

        .cpch-member-list li {
                text-align: left;
                height: 45px;
                line-height: 45px;
                border-bottom: 1px solid #e4e4e4;
                padding-left: 10px;
                padding-right: 2px;
                cursor: pointer;
        }

        .cpch-member-list li:hover {
                background-color: #DFEDFA
        }

        .cpch-member-list .cpch-checkbox {
                margin-top: 18px;
        }

        .cpch-avatar {
                vertical-align: middle;
                margin-right: 8px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
        }

        .avatar-mask {
                position: relative;
                left: 0;
        }

        .avatar-mask:after {
                content: '✓';
                // content:"\2713";
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                color: #fff;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, .5);
                position: absolute;
                top: -5px;
        }

        .cpch-selected-list li {
                float: left;
                margin-left: 10px;
                margin-top: 8px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #ddd;
                padding: 0 5px;
                border-radius: 3px;
        }

        .cpch-selected-list li > span {
                float: right;
                font-size: 20px;
                line-height: 20px;
                padding-left: 5px;
                margin-top: 5px;
                cursor: pointer;
        }

        .cpch-selected-list .draglist .tip {
                padding: .1rem;
                color: #aaa;
                font-size: .12rem;
                border-bottom: 1px solid #dedede;
        }

        .cpch-selected-list .draglist li {
                cursor: move;
        }

        .flip-list-move {
                transition: transform 0.5s;
        }

        .cpch-button {
                padding-right: 20px;
                padding-top: 12px;
                height: 50px;
                display: flex;
                justify-content: flex-end;
        }

        .cpch-button button {
                margin: 0;
                width: 56px;
                height: 32px;
                border-radius: 3px;
                padding: 7px 15px;
                font-size: 12px;
                cursor: pointer;
                background-color: #fff;
                border: 1px solid #dcdfe6;
                color: #606266;
                text-align: center;
                outline: none;
        }

        button.cpch-confirm {
                margin-left: 16px;
                border: 1px solid #409eff;
                background-color: #409eff;
                color: #fff;
        }

        button.cpch-confirm:hover {
                background-color: #66b1ff;
                border-color: #66b1ff;
        }

        button.cpch-cancel:hover {
                color: #409eff;
                border-color: #c6e2ff;
                background-color: #ecf5ff;
        }

        button.cpch-disabled, button.cpch-disabled:hover {
                border: 1px solid #ababab;
                background-color: #ababab;
                color: #fff;
                cursor: default;
        }
</style>

<template>
        <div class="choose-mask">
                <div class="complexchoose">
                        <!-- 标题 -->
                        <div class="cpch-head"><span class="head-tit">{{tit}}</span><a-icon type="close" class="close" @click="closeChoose"/></div>
                        <!-- 中间主体内容 -->
                        <div class="cpch-content">
                                <!-- 缓冲Loading -->
                                <div class="cpch-loading" v-show="showLoading">
                                        <div class="cl1"></div>
                                        <div class="cl2"></div>
                                        <div class="cl3"></div>
                                </div>
                                <!-- 部门人员列表框 -->
                                <div class="cpch-company">
                                        <!-- 在职离职切换页签 -->
                                        <div class="cpch-switch" v-if="resign">
                                                <span :class="!showResign?'active':''"
                                                      @click="showResign=false">在职人员</span>
                                                <span :class="showResign?'active':''"
                                                      @click="showResign=true">离职人员</span>
                                        </div>
                                        <!-- 在职列表 -->
                                        <div class="cpch-company-list" v-show="!showResign"
                                             :class="resign?'pt45':'pt10'" @scroll="moreSign" ref="signlist">
                                                <!-- 搜索 -->
                                                <div class="cpch-search" v-if="type!==1">
                                                        <a-icon type="search" class="first"/>
                                                        <input type="text" name="" v-model="searchKey" placeholder="搜索"
                                                               @input="getSearch(0)">
                                                        <i class=" sec el-icon-close" v-show="searchKey.length>0"
                                                           @click="getSearch(1)"></i>
                                                </div>
                                                <!-- 层级部门导航 -->
                                                <div class="cpch-parentdept" v-if="!showSearch">
                                                        <span v-for="(pd,i) in parentDept" :key="i"
                                                              @click="getChildAll(pd,i)">{{pd.name}}</span>
                                                </div>
                                                <!-- 全选按钮 -->
                                                <div class="cpch-selectall" v-if="multiple" @click="chooseAll">
                                                        <div class="cpch-checkbox">{{allChecked?'✓':''}}</div>
                                                        <span>全选</span>
                                                </div>
                                                <!-- 部门列表 -->
                                                <ul class="cpch-dept-list" v-if="!showSearch">
                                                        <li v-for="(cd,i) in deptList" :key="i">
                                                                <div v-if="nodept.indexOf(cd.id) === -1">
                                                                        <div class="cpch-dept-name"
                                                                             @click="chooseDept(cd,i)">
                                                                                <div v-if="type!==2"
                                                                                     class="cpch-checkbox"
                                                                                     :class="multiple?'':'cpch-radio'">
                                                                                        {{selectedIds.indexOf(cd.id)>-1?'✓':''}}
                                                                                </div>
                                                                                {{cd.name}}<span class="count">（{{cd.count}}人）</span>
                                                                        </div>
                                                                        <div class="cpch-dept-child">
                                                                                <span v-if="selectedIds.indexOf(cd.id)>-1"
                                                                                      class="disabled">下级</span>
                                                                                <span v-else
                                                                                      @click="getChildAll(cd)">下级</span>
                                                                        </div>
                                                                </div>

                                                        </li>
                                                </ul>
                                                <!-- 人员列表 -->
                                                <ul class="cpch-member-list" v-if="!showSearch && type!==1">
                                                        <li v-for="(p,i) in userList.datas" :key="i"
                                                            @click="chooseOne(p)">
                                                                <span class="avatar-mask"
                                                                      v-show="selectedIds.indexOf(p.id)>-1"></span>
                                                                <img class="cpch-avatar"
                                                                     :src="p.avatar?p.avatar:avatar">{{p.name}}
                                                        </li>
                                                </ul>
                                                <!-- 搜索人员列表 -->
                                                <ul class="cpch-member-list" v-if="showSearch">
                                                        <li v-for="(p,i) in searchList.datas" :key="i"
                                                            @click="chooseOne(p)">
                                                                <span class="avatar-mask"
                                                                      v-show="selectedIds.indexOf(p.id)>-1"></span>
                                                                <img class="cpch-avatar"
                                                                     :src="p.avatar?p.avatar:avatar">{{p.name}}
                                                        </li>
                                                </ul>
                                                <!-- 无部门无人员缺省 -->
                                                <div class="nochild"
                                                     v-if="!showLoading && !showSearch && deptList.length===0 && userList.datas.length===0">
                                                        无部门和人员
                                                </div>
                                                <!-- 无搜索结果缺省 -->
                                                <div class="nochild"
                                                     v-if="!showLoading && showSearch && searchList.datas.length===0">
                                                        未搜索到相关人员
                                                </div>
                                        </div>
                                        <!-- 离职人员列表 -->
                                        <div class="cpch-company-list pt45" v-show="showResign" @scroll="moreResign"
                                             ref="resignlist">
                                                <!-- 搜索 -->
                                                <!-- <div class="cpch-search" v-show="reSearchKey.length>0 || resignList.datas.length>0">
                                                    <i class="first">&#xe6ac;</i>
                                                    <input type="text" name="" v-model="reSearchKey" placeholder="搜索" @input="getReSearch()">
                                                    <i class="sec" v-show="reSearchKey.length>0" @click="getReSearch(1)">&#xe69a;</i>
                                                </div> -->
                                                <div class="cpch-selectall"
                                                     v-if="multiple && resignList.datas.length > 0"
                                                     @click="chooseAllResign">
                                                        <div class="cpch-checkbox">{{allReChecked?'✓':''}}</div>
                                                        <span>全选</span>
                                                </div>
                                                <ul class="cpch-member-list">
                                                        <li v-for="(p,i) in resignList.datas" :key="i"
                                                            @click="chooseOne(p)"><span class="avatar-mask"
                                                                                        v-show="selectedIds.indexOf(p.id)>-1"></span><img
                                                                class="cpch-avatar" :src="p.avatar?p.avatar:avatar">{{p.name}}
                                                        </li>
                                                </ul>
                                                <!-- 无人员缺省 -->
                                                <div class="nochild"
                                                     v-if="!showLoading && reSearchKey.length===0 && resignList.datas.length===0">
                                                        暂无离职人员
                                                </div>
                                                <!-- 无搜索结果缺省 -->
                                                <div class="nochild"
                                                     v-if="!showLoading && reSearchKey.length>0 && resignList.datas.length===0">
                                                        未搜索到相关人员
                                                </div>
                                        </div>
                                </div>
                                <!-- 已选项列表框 -->
                                <div class="cpch-selected">
                                        <div class="cpch-selected-list">
                                                <ul>
                                                        <li v-for="(s,i) in selectedData" :key="s.id">{{s.name}}<span
                                                                @click="deleteOne(s,i)" title="删除">×</span></li>
                                                </ul>
                                                <!-- 无选中项缺省 -->
                                                <div class="nochild" v-if="selectedData.length===0">暂无选中项</div>
                                        </div>
                                </div>
                        </div>
                        <!-- 底部按钮 -->
                        <div class="cpch-button">
                                <button class="cpch-cancel" @click="closeChoose">取消</button>
                                <button class="cpch-confirm" :class="selectedData.length === 0?'cpch-disabled':''"
                                        @click="confirmSubmit" :disabled="selectedData.length === 0">确定
                                </button>
                        </div>
                </div>
        </div>
</template>

<script>
        import avatar from './avatar.png';
        import $http from '@/request/service'
        var lastDept = {};
        export default {
                // name: 'complexchoose',
                data () {
                        return {
                                avatar: avatar, // 默认头像
                                showLoading: false, // 显示loading
                                allDepts: [], // 所有部门
                                parentDept: [{ // 父级部门导航
                                        id: '',
                                        name: '全部'
                                }],
                                deptId: '', // 当前部门id
                                deptList: [], // 部门列表
                                userList: { // 在职人员
                                        datas: [],
                                        pageNo: 0,
                                        pageSize: 20,
                                        totalCount: 0,
                                        totalPages: 1
                                },
                                showSearch: false, // 显示在职搜索列表
                                searchKey: '', // 在职搜索值
                                searchList: { // 搜索的人员列表
                                        datas: [],
                                        pageNo: 1,
                                        pageSize: 20,
                                        totalCount: 0,
                                        totalPages: 1
                                },
                                showResign: false, // 显示离职人员
                                reSearchKey: '', // 离职搜索值
                                resignList: {// 离职人员
                                        datas: [],
                                        pageNo: 1,
                                        pageSize: 20,
                                        totalCount: 0,
                                        totalPages: 1
                                },
                                allChecked: false, // 控制全选
                                allReChecked: false, // 全选离职
                                selectedIds: [], // 已选项的id集合
                                selectedData: [], // 已选项
                        }
                },
                props: {
                        data: { // 传入已选数据
                                type: Array,
                                default: function () {
                                        return [];
                                }
                        },
                        tit: { // 标题
                                type: String,
                                default: '选择人员'
                        },
                        type: { // 0部门和人员   1部门  2人员
                                type: Number,
                                default: 0
                        },
                        multiple: { // 多选
                                type: Boolean,
                                default: true
                        },
                        nodept: { // 不能选择部门id集合
                                type: Array,
                                default: function () {
                                        return [];
                                }
                        },
                        resign: { // 离职人员
                                type: Boolean,
                                default: false
                        },
                        succ: Function,
                        fail: Function
                },
                beforeMount () {
                        this.getChildDepts (); // 获取部门
                        if (this.type !== 1) { // 需要选人员，则获取人员
                                this.userList.pageNo = 0;
                                this.getChildPeople ();
                        }
                        // 获取已辞职人员
                        if (this.resign) {
                                this.getRePeople ();
                        }
                        // 传入已选的项
                        if (this.data.length > 0 && this.data[0].id) {
                                this.selectedData = JSON.parse (JSON.stringify (this.data));
                                for (let i = 0, len = this.data.length; i < len; i++) {
                                        this.selectedIds.push (this.data[i].id);
                                }
                        }
                },
                methods: {
                        // 在职 全选 / 反选
                        chooseAll () {
                                this.allChecked = !this.allChecked;
                                // 部门
                                if (this.allChecked) { // 全选中
                                        // 搜索人员
                                        if (this.showSearch) {
                                                for (let i = 0, len = this.searchList.datas.length; i < len; i++) {
                                                        let index = this.selectedIds.indexOf (this.searchList.datas[i].id);
                                                        if (index === -1) {
                                                                this.selectedData.push (this.searchList.datas[i]);
                                                                this.selectedIds.push (this.searchList.datas[i].id);
                                                        }
                                                }
                                                return;
                                        }
                                        // 部门
                                        if (this.type !== 2) { // 不是只选人员
                                                for (let i = 0, len = this.deptList.length; i < len; i++) {
                                                        let index = this.selectedIds.indexOf (this.deptList[i].id);
                                                        if (index === -1) {
                                                                this.selectedData.push (this.deptList[i]);
                                                                this.selectedIds.push (this.deptList[i].id);
                                                        }
                                                }
                                        }
                                        // 人员
                                        if (this.type !== 1) { // 不是只选部门
                                                for (let i = 0, len = this.userList.datas.length; i < len; i++) {
                                                        let index = this.selectedIds.indexOf (this.userList.datas[i].id);
                                                        if (index === -1) {
                                                                this.selectedData.push (this.userList.datas[i]);
                                                                this.selectedIds.push (this.userList.datas[i].id);
                                                        }
                                                }
                                        }
                                } else { // 全取消选中
                                        // 搜索人员
                                        if (this.showSearch) {
                                                for (let i = 0, len = this.searchList.datas.length; i < len; i++) {
                                                        let index = this.selectedIds.indexOf (this.searchList.datas[i].id);
                                                        if (index > -1) {
                                                                this.selectedIds.splice (index, 1);
                                                                this.selectedData.splice (index, 1);
                                                        }
                                                }
                                                return;
                                        }
                                        // 部门
                                        if (this.type !== 2) { // 不是只选人员
                                                for (let i = 0, len = this.deptList.length; i < len; i++) {
                                                        let index = this.selectedIds.indexOf (this.deptList[i].id);
                                                        if (index > -1) {
                                                                this.selectedIds.splice (index, 1);
                                                                this.selectedData.splice (index, 1);
                                                        }
                                                }
                                        }
                                        // 人员
                                        if (this.type !== 1) { // 不是只选部门
                                                for (let i = 0, len = this.userList.datas.length; i < len; i++) {
                                                        let index = this.selectedIds.indexOf (this.userList.datas[i].id);
                                                        if (index > -1) {
                                                                this.selectedIds.splice (index, 1);
                                                                this.selectedData.splice (index, 1);
                                                        }
                                                }
                                        }
                                }
                        },
                        // 离职 全选 / 反选
                        chooseAllResign () {
                                this.allReChecked = !this.allReChecked;
                                // 部门
                                if (this.allReChecked) { // 全选中
                                        for (let i = 0, len = this.resignList.datas.length; i < len; i++) {
                                                let index = this.selectedIds.indexOf (this.resignList.datas[i].id);
                                                if (index === -1) {
                                                        this.selectedData.push (this.resignList.datas[i]);
                                                        this.selectedIds.push (this.resignList.datas[i].id);
                                                }
                                        }
                                } else { // 全取消选中
                                        for (let i = 0, len = this.resignList.datas.length; i < len; i++) {
                                                let index = this.selectedIds.indexOf (this.resignList.datas[i].id);
                                                if (index > -1) {
                                                        this.selectedIds.splice (index, 1);
                                                        this.selectedData.splice (index, 1);
                                                }
                                        }
                                }
                        },
                        // 单选 / 反选
                        chooseOne (data) {
                                let index = this.selectedIds.indexOf (data.id);
                                if (this.multiple) { // 多选
                                        this.allChecked = false;
                                        if (index > -1) { // 删除
                                                this.selectedIds.splice (index, 1);
                                                this.selectedData.splice (index, 1);
                                        } else { // 选中
                                                this.selectedData.push (data);
                                                this.selectedIds.push (data.id);
                                        }
                                } else { // 单选
                                        if (index > -1) { // 删除
                                                this.selectedData = [];
                                                this.selectedIds = [];
                                        } else { // 选中
                                                this.selectedData = [data];
                                                this.selectedIds = [data.id];
                                        }
                                }
                        },
                        // 选择部门
                        chooseDept (data) {
                                // console.log ('bu meng:', data);
                                lastDept = data;
                                if (this.type === 2) { // 只选人员时，直接获取下级
                                        this.getChildAll (data);
                                        return;
                                }
                                this.chooseOne (data); // 选部门
                        },
                        // 删除已选
                        deleteOne (data, index) {
                                this.selectedData.splice (index, 1);
                                this.selectedIds.splice (index, 1);
                                this.allChecked = false;
                                this.allReChecked = false;
                        },
                        // 获取子部门和人员
                        getChildAll (data, index) {
                                // console.log ('bu meng:', data);
                                lastDept = data;
                                if (typeof index === 'undefined') { // 点列表中的部门
                                        this.parentDept.push (data);
                                } else { // 点导航中的部门
                                        if (this.parentDept.length === index + 1) {
                                                return; // 若为最后一个部门，则不做任何操作
                                        }
                                        // 点顶部部门层级，去掉后面部门
                                        this.parentDept.splice (index + 1);
                                }

                                this.getChildDepts (data.id); // 获取子部门
                                if (this.type !== 1) { // 只选部门不用加载人员
                                        this.userList.pageNo = 0;
                                        this.getChildPeople (data.id); // 获取子人员
                                }
                        },
                        // 获取子部门
                        getChildDepts (id) {
                                let deptId = id || ''
                                        // ajaxUrl = window.ajaxPath + '/corp/getSubDeptList?deptId=' + deptId;
                                $http({url:'/dingtalk/corp/getSubDepts?deptId=' + deptId}).then(res=>{
                                        this.showLoading = false;
                                        this.allChecked = false;
                                        this.deptList = res.data;
                                        if (deptId === '') {
                                                this.parentDept = [{name: "通讯录", id: ""}];
                                        }
                                })
                                this.showLoading = true;
                                // this.$Ajax (ajaxUrl).then (res => {
                                //         this.showLoading = false;
                                //         this.allChecked = false;
                                //         this.deptList = res.data;
                                //         if (deptId === '') {
                                //                 this.parentDept = [{name: "通讯录", id: ""}];
                                //         }
                                // });
                        },
                        // 获取人员
                        getChildPeople (id) {
                                if (!id) {
                                        this.userList.datas = [];
                                        return;
                                }
                                let deptId = id || '1'
                                this.showLoading = true;
                                $http({
                                        url:'/dingtalk/corp/getDeptUsers?deptId=' + deptId + "&page=" + this.userList.pageNo + "&size=" + this.userList.pageSize
                                }).then(res=>{
                                        this.showLoading = false;
                                        this.allChecked = false;
                                        /* if (this.deptId === id && res.data.pageNo>1) {
                                            res.data.datas = this.userList.datas.concat(res.data.datas);
                                        } */
                                        if (this.deptId === id && this.userList.pageNo > 0) {
                                                res.data = this.userList.datas.concat (res.data)}

                                        // console.log(res.data)

                                        this.deptId = deptId;
                                        this.userList.datas = res.data;
                                        this.userList.totalCount = res.total;
                                        this.userList.totalPages = Math.floor (res.total / this.userList.pageSize);
                                        this.isLoadList = false;
                                })
                                // this.$Ajax (ajaxUrl).then (res => {
                                //         this.showLoading = false;
                                //         this.allChecked = false;
                                //         /* if (this.deptId === id && res.data.pageNo>1) {
                                //             res.data.datas = this.userList.datas.concat(res.data.datas);
                                //         } */
                                //         if (this.deptId === id && this.userList.pageNo > 0) {
                                //                 res.data = this.userList.datas.concat (res.data);
                                //         }
                                //         ;
                                //         // console.log(res.data)
                                //
                                //         this.deptId = deptId;
                                //         this.userList.datas = res.data;
                                //         this.userList.totalCount = res.total;
                                //         this.userList.totalPages = Math.floor (res.total / this.userList.pageSize);
                                //         this.isLoadList = false;
                                // });
                        },
                        /* 关键字搜索 */
                        getSearch (empty) {
                                lastDept = {};
                                if (empty == 1) {
                                        this.searchKey = ''
                                }
                                if (this.searchKey) {
                                        $http({
                                                url:'/dingtalk/corp/searchUsers?keyword=' + this.searchKey
                                        }).then(res=>{
                                                this.showSearch = true
                                                this.searchList.datas = res.data
                                        })
                                } else {
                                        this.getChildDepts () // 获取部门
                                        if (this.type !== 1) { // 需要选人员，则获取人员
                                                this.userList.pageNo = 0;
                                                this.getChildPeople ()
                                        }
                                        this.showSearch = false
                                }
                        },
                        // 获取离职人员
                        getRePeople () {
                                /*let ajaxUrl = '/alid/org/resigning?pageNo='+this.resignList.pageNo+'&pageSize='+this.resignList.pageSize+'&totalCount='+this.resignList.totalCount;
                                 this.$newAjax({
                                    url: ajaxUrl,
                                    succ: (res) => {
                                        if (this.$ajaxCallBack(res)) {
                                            this.allResign = false;
                                            if(res.data.pageNo>1){
                                                res.data.datas = this.resignList.datas.concat(res.data.datas);
                                            }
                                            this.resignList = res.data;
                                        }
                                    }
                                });     */
                        },

                        // 滚动加载在职人员
                        moreSign () {
                                if (this.userList.pageNo < this.userList.totalPages) {
                                        let scrollH = this.$refs.signlist.scrollHeight,
                                                scrollT = this.$refs.signlist.scrollTop,
                                                offsetH = this.$refs.signlist.offsetHeight;
                                        if (scrollT + offsetH >= scrollH - 5 && !this.isLoadList) {
                                                this.isLoadList = true;
                                                this.userList.pageNo++;
                                                this.getChildPeople (this.deptId);
                                        }
                                }
                        },
                        // 滚动加载离职人员
                        moreResign () {
                                if (this.resignList.pageNo < this.resignList.totalPages) {
                                        let scrollH = this.$refs.resignlist.scrollHeight,
                                                scrollT = this.$refs.resignlist.scrollTop,
                                                offsetH = this.$refs.resignlist.offsetHeight;
                                        if (scrollT + offsetH === scrollH) {
                                                this.resignList.pageNo++;
                                                this.getRePeople ();
                                        }
                                }
                        },
                        // 确定
                        confirmSubmit () {
                                if (this.succ && typeof this.succ === 'function') {
                                        // console.log(lastDept,'lastDept');
                                        this.succ (this.selectedData, lastDept);
                                }
                        },
                        // 取消
                        closeChoose () {
                                if (this.fail && typeof this.fail === 'function') {
                                        this.fail (this.selectedData);
                                }
                        }
                }
        }
</script>


