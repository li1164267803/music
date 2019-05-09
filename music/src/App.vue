<template>
  <div id="app">
    <m-header></m-header>
    <Tab></Tab>
    <!-- 缓存保存 -->
    <keep-alive>
        <router-view/>
    </keep-alive>

    <!-- 播放页面 -->
    <play></play>
  </div>
</template>

<script>
import mHeader from 'common/m-header/m-header';
import Tab from 'common/tab/tab';
import Play from 'common/play/play';


export default {
  name: 'App',
  components:{
    mHeader,Tab,Play
  }
}
</script>

<style lang="less" scoped>
@import  '~style/index.less';


</style>

