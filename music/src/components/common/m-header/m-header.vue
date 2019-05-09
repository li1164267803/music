<template>
    <div class="header">
        <div class="logo">
            <span class="iconfont">&#xe601;</span>
        </div>

        <h1>Chicken Music</h1>
        <div class="rentou">
            <span class="iconfont">&#xe608;</span>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less">
@import  '~style/index.less';
.header{
    color: @font-color-header;
    text-align: center;
    height: 44px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    h1{
        display: inline-block;
        font-size: 18px;
        font-weight: 200;
    }
}
.logo{
        display: inline-block;
        // .w(30);
        // .h(32);
        .padding(0,10,0,0);
        margin-top: unit(2/@rem-size,rem);
        span{
            font-size: 30px;
        }
    }
.rentou{
    // .w(21);
    // .h(20);
    display: inline-block;
    position: absolute;
    right: unit(11/@rem-size,rem);
    span{
        font-size: 22px;
        font-weight: 600;
        
    }
}
</style>


