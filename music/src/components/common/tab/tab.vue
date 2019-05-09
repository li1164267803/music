<template>
    <div class="tab">
        <router-link
            v-for="(itme,index) in navList"
            :key="index"
            active-class='selected'
            tag='div'
            :to='itme.path'
        >
            <span>{{itme.text}}</span>
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return{
            navList:[
                {path:'/recommend',text:'推荐'},
                {path:'/singer',text:'歌手'},
                {path:'/ranking',text:'排行'},
                {path:'/search',text:'搜索'},
            ]
        }
    }
}
</script>

<style lang="less">
@import '~style/index.less';
    .tab{
            .h(44);
            font-size: 14px;
            display: flex;
            justify-content: space-around;
            .l_h(44);
        div{
           color: @font-color-tab;
           span{
               padding-bottom: 5px;
           }
        }
        .selected{
            color: @font-color-header;
            span{
               border-bottom: 2px solid @font-color-header;
           }
        }
    }
</style>

