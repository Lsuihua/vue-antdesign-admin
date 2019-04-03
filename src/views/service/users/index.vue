<template>
    <div>
        <a-table :rowSelection="rowSelection" :dataSource="tableData" :columns="columns">
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
            <span slot="action" slot-scope="text, record">
          <a href="javascript:;">修改</a>
          <a-divider type="vertical"/>
          <a href="javascript:;">删除</a>
          <a-divider type="vertical"/>
          <a href="javascript:;">设置</a>
        </span>

        </a-table>
    </div>

</template>

<script>
    export default {
        name: "index",
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
                    }
                ],
                searchText: '',
                searchInput: null,
                selectedRowKeys: [],
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
                pagination: false
            }
        },
        methods: {
            handleSearch (selectedKeys, confirm) {
                confirm()
                this.searchText = selectedKeys[0]
            },
            onSelectChange (selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys
            },
            handleReset (clearFilters) {
                clearFilters()
                this.searchText = ''
            },
        },
        computed: {
            rowSelection () {
                const {selectedRowKeys} = this;
                return {
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                    hideDefaultSelections: true,
                    selections: [{
                        key: 'all-data',
                        text: 'Select All Data',
                        onSelect: () => {
                            this.selectedRowKeys = [...Array(46).keys()]; // 0...45
                        },
                    }, {
                        key: 'odd',
                        text: 'Select Odd Row',
                        onSelect: (changableRowKeys) => {
                            let newSelectedRowKeys = [];
                            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                if (index % 2 !== 0) {
                                    return false;
                                }
                                return true;
                            });
                            this.selectedRowKeys = newSelectedRowKeys;
                        },
                    }, {
                        key: 'even',
                        text: 'Select Even Row',
                        onSelect: (changableRowKeys) => {
                            let newSelectedRowKeys = [];
                            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                if (index % 2 !== 0) {
                                    return true;
                                }
                                return false;
                            });
                            this.selectedRowKeys = newSelectedRowKeys;
                        },
                    }],
                    onSelection: this.onSelection,
                }
            }
        },
        watch: {
            pageSize (val) {
                console.log('pageSize', val);
            },
            current (val) {
                console.log('current', val);
            }
        },
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