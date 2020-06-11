<template>
    <div>
        <a-list
                itemLayout="vertical"
                size="large"
                :pagination="pagination"
                :dataSource="listData">
            <div slot="footer"><b>ant design vue</b> footer part</div>
            <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
                <template v-if="!loading" slot="actions" v-for="{type, text} in actions">
                    <span :key="type">
                      <a-icon :type="type" style="margin-right: 8px" />
                      {{text}}
                    </span>
                </template>
                <img v-if="!loading" slot="extra" width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                <a-skeleton :loading="loading" active avatar>
                    <a-list-item-meta :description="item.description">
                        <a slot="title" :href="item.href">{{item.title}}</a>
                        <a-avatar slot="avatar" :src="item.avatar" />
                    </a-list-item-meta>
                </a-skeleton>
                <span v-if="!loading">{{item.content}}</span>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    /**
     * @route({
     *  path:'event',
     *  name:'event'
     * })
     */
    export default {
        name: "event",
        mounted:function(){
            for (let i = 0; i < 23; i++) {
                this.listData.push({
                    href: 'https://vue.ant.design/',
                    title: `ant design vue part ${i}`,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                })
            }
        },
        data(){
            return{
                listData:[],
                loading:false,
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
                },
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
            }
        }
    }
</script>

<style scoped>

</style>