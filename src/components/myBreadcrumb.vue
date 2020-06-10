<template>
  <div class="page-tool flex-between-center box-sizing">
    <div class="breadcrumb flex-center">
      <a-button
        class="trigger"
        type="primary"
        @click="() => this.$store.dispatch('CHANGE_COLLAPSED', !collapsed)"
      >
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{
          item
        }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="other-fun flex-center">
      <a-input-search
        placeholder="input search text"
        enter-button="search"
        size="default"
        @search="onSearch"
      />
      
      <a-dropdown-button type="primary" @click="handleButtonClick">
        actions
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1">
          <a-icon type="edit" />button1
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="tool" />button2
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="link" />button3
        </a-menu-item>
      </a-menu>
    </a-dropdown-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'my-breadcrumb',
  data () {
    return {}
  },
  methods: {
    onSearch () {},
    handleButtonClick(e){
      console.log(e)
    },
    handleMenuClick(e){
      console.log(e)
    }
  },
  computed: {
    ...mapGetters(['collapsed', 'breadcrumb'])
  }
}
</script>

<style scoped lang="less">
@import '../../static/css/common.css';
.page-tool {
  padding: 0 12px;

  .flex-center {
    *:not(:last-child) {
      margin-right: 10px;
    }
  }
  .breadcrumb {
    .trigger {
      font-size: 16px;
      cursor: pointer;
    }
    .ant-btn {
      padding: 0 10px;
      height: 28px;
    }
  }
  .ant-btn {
      padding: 0 12px;
    }
}
</style>
