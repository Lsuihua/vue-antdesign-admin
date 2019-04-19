<template>
    <div>
        <!--表格-->
        <a-table :dataSource="tableData" :pagination="pagination" :columns="columns">
            <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                 class='custom-filter-dropdown'>
                <a-input
                        v-ant-ref="c => searchInput = c"
                        :placeholder="`Search ${column.dataIndex}`"
                        :value="selectedKeys[0]"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm)"
                        style="width: 188px; margin-bottom: 8px; display: block;"
                />
                <a-button
                        type='primary'
                        @click="() => handleSearch(selectedKeys, confirm)"
                        icon="search"
                        size="small"
                        style="width: 90px; margin-right: 8px"
                >Search
                </a-button>
                <a-button
                        @click="() => handleReset(clearFilters)"
                        size="small"
                        style="width: 90px"
                >Reset
                </a-button>
            </div>
            <a-icon slot="filterIcon" slot-scope="filtered" type='search'
                    :style="{ color: filtered ? '#108ee9' : undefined }"/>
            <template slot="customRender" slot-scope="text">
              <span v-if="searchText">
                <template
                        v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
                  <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i"
                        class="highlight">{{fragment}}</mark>
                  <template v-else>{{fragment}}</template>
                </template>
              </span>
                <template v-else>{{text}}</template>
            </template>
            <!--头像-->
            <template slot="avatar" slot-scope="avatar">
                <a-avatar :src="avatar"/>
            </template>
            <!--角色-->
            <template slot="role" slot-scope="role">
                <a-tag color="blue">{{role}}</a-tag>
            </template>
            <!--方法-->
            <template slot="action" slot-scope="text, record">
                <a-popconfirm
                        v-if="tableData.length"
                        title="Sure to delete?"
                        @confirm="() => onDelete(record.key)">
                    <a href="javascript:;">Delete</a>
                </a-popconfirm>
            </template>
        </a-table>
    </div>

</template>

<script>
    export default {
        name: "users",
        data () {
            return {
                tableData: [
                    {
                        key: '1',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: 'John Brown',
                        mobile: 12332112345,
                        role: '游客',
                        gender: '男',
                        time: '17:41',
                    }, {
                        key: '2',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: 'Joe Black',
                        mobile: 12345678901,
                        role: '游客',
                        gender: '男',
                        time: '17:41',
                    }, {
                        key: '3',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: 'Jim Green',
                        mobile: 12345612345,
                        role: '游客',
                        gender: '男',
                        time: '17:41',
                    }, {
                        key: '4',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: 'Jim Red',
                        mobile: 13812345678,
                        role: '游客',
                        gender: '男',
                        time: '17:41',
                    },
                    {
                        key: '5',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: 'Jim Red',
                        mobile: 13812345678,
                        role: '游客',
                        gender: '男',
                        time: '17:41',
                    },
                    {
                        key: '6',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: 'Jim Red',
                        mobile: 13812345678,
                        role: '游客',
                        gender: '男',
                        time: '17:41',
                    },
                    {
                        key: '7',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: 'Jim Red',
                        mobile: 13812345678,
                        role: '游客',
                        gender: '男',
                        time: '17:41',
                    }
                ],
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
                        key: 'name',
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: (visible) => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus()
                                }, 0)
                            }
                        },
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
                        key: 'gender'
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
                        console.log(page);
                        this.$set(this.pagination,'current',page)
                    },
                    onShowSizeChange:(current, size)=>{
                        console.log(current, size)
                        this.$set(this.pagination,'pageSize',size)
                    },
                    showTotal:total => `${total} 条`,
                }
            }
        },
        methods: {
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
            onChange(page, pageSize){
                console.log(page, pageSize)
            },
            //删除项
            onDelete(key){
                const dataSource = [...this.tableData]
                this.tableData = dataSource.filter(item => item.key !== key)
            }
        }
    }
</script>

<style scoped>
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