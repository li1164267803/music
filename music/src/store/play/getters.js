export default{
    currentSong(state){
        console.log('派生属性')
        console.log(state.songList);
        if(state.songList.length==0){return {}}

        let albid = state.songList[state.nowIndex].albid;
        let songmid = state.songList[state.nowIndex].songmid;
        // let imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albid}.jpg?max_age=2592000`
        let imgUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albid}.jpg?max_age=2592000`

        let song = []//清空 排他
        song = state.songList[state.nowIndex];

        song.imgUrl = imgUrl;
        song.songUrl = `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=1968202285&vkey=D6111B7D0909A3E587FFF8D105E84DFE185DF685108E508B3823BFCA19DA7EC0FF4B312C5A64B57DF4F98332DBF0440B7B8E0A0899CF6064&uin=0&fromtag=38`;
        console.log('-----------')
        console.log(song)
        return song
    }
}

//http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400002MXZNu1GToOk.m4a?guid=7515220800&vkey=D484CCF97EF2D8BA726A25FE33B662DBA4348176D483BD4CEEE1F1B5C376A76214AC7021CDE6D79F15508609E54AEEFE0B42E6184E4F248F&uin=0&fromtag=38我的
//http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400002MXZNu1GToOk.m4a?guid=4124250851&vkey=375FB6D30BA0A5F6968D5988B9FB18C66F960E78BA876C991E260313FE13242478F0FB221E4976B705A4AFBAEA7E536F1CDD8D4EFB880D47&uin=0&fromtag=38实例