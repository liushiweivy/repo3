import session from "../tool/storage/sessionStorage"
export const pagination = {
        mounted () {
                if(this.notAuto) return;//当不需要自动触发时，加一个notAuto变量控制
                // console.log('searchHandle')
                this.searchHandle ()
        },
        data(){
                return {
                        keyword:'',//关键字
                        dataSource:new Array(0),//表格数据源
                        pagination: {
                                current: 1, //当前页数
                                total: 0,
                                pageSize: session.get('PAGE_SIZE')||20, //每页中显示20条数据
                                showSizeChanger: true, //是否可以改变 pageSize
                                pageSizeOptions: ["10", "20", "50", "100"],
                                showTotal: total => `共${total} 条`, //分页中显示总的数据
                                onShowSizeChange: (current,size)=>{
                                        session.set('PAGE_SIZE',size)
                                        this.$set(this.pagination,'pageSize',size)
                                        this.searchHandle()
                                }, // 改变每页数量时更新显示
                                onChange: page => {
                                        this.$set(this.pagination,'current',page)
                                        this.searchHandle()
                                }, //点击页码事件
                        },
                        emptyTotal:null
                }
        },
        methods:{
                //列表重置
                resetPage(){
                        this.$set(this.pagination,'current',1)
                },
                //请求参数拼接
                updateIndexes(...data){
                        let sendData
                        // console.log(data)
                        if(data.length&&JSON.stringify(data[0])!=='{}') this.resetPage()
                        sendData = {
                                keyword:this.keyword,
                                page:this.pagination.current,
                                size:this.pagination.pageSize,
                        }
                        Object.assign(sendData,...data)
                        this.emptyTotal = null
                        // console.log(sendData);
                        return sendData
                },
                //返回数据添加序号
                formatData(res){
                        this.$set(this.pagination,'total',res.total)
                        this.emptyTotal = res.total
                        return res.data.map((i,index)=>{
                                i.key = index 
                                i.serialNo = (this.pagination.current-1)*this.pagination.pageSize+index +1
                                return i
                        })
                },
                //返回数据添加序号 key绑定为id
                formatData2(res){
                        this.$set(this.pagination,'total',res.total)
                        this.emptyTotal = res.total
                        return res.data.map((i,index)=>{
                                i.key = JSON.stringify(i) 
                                i.serialNo = (this.pagination.current-1)*this.pagination.pageSize+index +1
                                return i
                        })
                },
        },
        watch:{
                'keyword'(){
                        if(this.keyword==='') this.searchHandle()
                        else this.resetPage()
                }
        }
}

