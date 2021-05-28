<template>
    <div class="user-list">
        <!--表格-->
        <a-table :dataSource="tableData" :pagination="pagination" :columns="columns">
            <!--头像-->
            <template slot="avatar" slot-scope="avatar">
                <a-avatar :src="avatar"/>
            </template>
            <!--角色-->
            <template slot="role" slot-scope="role">
                <a-tag color="blue">{{role ==0?'游客':role ==1?'会员':'管理员'}}</a-tag>
            </template>
            <!--性别-->
            <template slot="gender" slot-scope="gender">
                <span>{{gender==0?'女' : '男'}}</span>
            </template>
            <!--方法-->
            <template slot="action" slot-scope="text, record">
                <a-popconfirm
                        v-if="tableData.length"
                        title="Sure to delete?"
                        @confirm="() => onDelete(record.id)">
                    <a href="javascript:;">Delete</a>
                </a-popconfirm>
            </template>
        </a-table>
    </div>

</template>

<script>
    /**
     * @route({
     *  path:'user',
     *  name:'user'
     * })
     */
    export default {
        name: "user",
        data () {
            return {
                tableData: [],
                searchText: '',
                searchInput: null,
                columns: [
                    {
                        title: 'Avatar',
                        dataIndex: 'avatar',
                        key: 'avatar',
                        scopedSlots: {customRender: 'avatar'},
                    },
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name'
                    }, {
                        title: 'Mobile',
                        dataIndex: 'mobile',
                        key: 'mobile'
                    }, {
                        title: 'Role',
                        dataIndex: 'role',
                        key: 'role',
                        scopedSlots: {customRender: 'role'},
                    }, {
                        title: 'Gender',
                        dataIndex: 'gender',
                        key: 'gender',
                        scopedSlots: {customRender: 'gender'},
                    }, {
                        title: 'Time',
                        dataIndex: 'time',
                        key: 'time'
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        scopedSlots: {customRender: 'action'},
                    },
                ],
                pagination: {
                    showSizeChanger:true,
                    hideOnSinglePage:true,
                    pageSizeOptions:['10','20','30','40'],
                    pageSize:20,
                    current:1,
                    total:100,
                    onChange: (page) => {
                        this.queryData.page = page;
                        this.getData();
                    },
                    onShowSizeChange:(current, size)=>{
                        this.queryData.pageSize = size;
                        this.queryData.page = current;
                        this.getData();
                    },
                    showTotal:total => `${total} 条`,
                },
                queryData:{
                    page:1,
                    pageSize:20
                }
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            getData(){
                getUserList(this.queryData).then(res => {
                    if(res.code ===1){
                        this.tableData = res.data
                        this.$set(this.pagination,'current',res.page.page)
                        this.$set(this.pagination,'total',res.page.total)
                        this.$set(this.pagination,'pageSize',res.page.pageSize)
                    }
                })
            },
            handleSearch (selectedKeys, confirm) {
                confirm()
                this.searchText = selectedKeys[0]
            },
            handleReset (clearFilters) {
                clearFilters()
                this.searchText = ''
            },
            onShowSizeChange(current, pageSize){
                this.pageData.pageSize = pageSize
            },
            //删除项
            onDelete(key){
                const dataSource = [...this.tableData]
                this.tableData = dataSource.filter(item => item.id !== key)
            }
        }
    }
</script>

<style scoped>
    .user-list{
        background: #fff;
    }
    .custom-filter-dropdown {
        padding: 8px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
    }

    .highlight {
        background-color: rgb(255, 192, 105);
        padding: 0px;
    }
</style>