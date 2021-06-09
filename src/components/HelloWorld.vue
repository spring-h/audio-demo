<!--
 * @author: Spring
 * @create: 2021-06-07 15:23 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-06-09 17:38 PM
 * @desc: 
-->
<template>
  <div class="container">
    <div class="box">
      <div class="bb" @click="s">上</div>
      <div class="bb" @click="x">下</div>
      <div class="bb" @click="play">暂停</div>
    </div>
    <ul>
      <li @click="choose(index)" v-for="(item, index) in zy" :key="index">
        {{ item.src }}
      </li>
    </ul>
    <div class="pro" @click="control($event)">
      <div class="now" ref="now"></div>
    </div>
    <div class="time">
      <div class="nowtime">{{ nowtime | time }}/{{ alltime | time }}</div>
    </div>
    <div class="sy">
      <div class="circle" ref="mute" @click="ismute">{{ sy }}</div>
      <div class="voice" @click="voice($event)">
        <div class="voicesy" ref="voice"></div>
      </div>
    </div>
    <audio
      loop
      ref="audio"
      autoplay="autoplay"
      :onlyid="id"
      :src="src"
      id="audio"
      @timeupdate="timeupdate($event)"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      src: "",
      id: "",
      bz: "暂停",
      sy: "静音",
      nowtime: 0,
      alltime: 0,
      timer: "",
      //声音缓存
      mute: 0,
      zy: [
        {
          src: "/music/光良 - 童话.mp3",
          img: "",
          id: 1,
        },
        {
          src: "/music/林宥嘉 - 我难过 (2013 102年度金钟奖颁奖典礼现场).mp3",
          img: "",
          id: 2,
        },
        {
          src: "/music/欧阳耀莹、街道办GDC - 春娇与志明.mp3",
          img: "",
          id: 3,
        },
        {
          src: "/music/伍佰&China Blue - 浪人情歌.mp3",
          img: "",
          id: 4,
        },
        {
          src: "/music/杨千嬅 - 假如让我说下去.mp3",
          img: "",
          id: 5,
        },
        {
          src: "/music/张国荣 - 最冷一天.mp3",
          img: "",
          id: 6,
        },
      ],
    };
  },
  filters: {
    time(a) {
      a = Math.ceil(a);
      if (a >= 60 && a <= 3600) {
        let b = Math.floor(a / 60);
        let c = a % 60;
        if (b < 10) {
          b = "0" + b;
        }
        if (c < 10) {
          c = "0" + c;
        }
        a = b + ":" + c;
      }
      if (a < 60) {
        if (a < 10) a = "0" + a;
        a = "00:" + a;
      }
      return a;
    },
  },
  methods: {
    play() {
      let audio = this.$refs.audio;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    s() {
      this.$refs.audio.pause();
      let audio = this.$refs.audio;
      let id = this.id;
      let index = this.zy.findIndex((item) => item.id == id);

      if (index == 0) {
        audio.src = this.zy[this.zy.length - 1].src;
        this.id = this.zy[this.zy.length - 1].id;
      } else {
        audio.src = this.zy[index - 1].src;
        this.id = this.zy[index - 1].id;
      }
    },
    x() {
      this.$refs.audio.pause();
      let audio = this.$refs.audio;
      let id = this.id;
      let index = this.zy.findIndex((item) => item.id == id);
      if (index == this.zy.length - 1) {
        audio.src = this.zy[0].src;
        this.id = this.zy[0].id;
      } else {
        audio.src = this.zy[index + 1].src;
        this.id = this.zy[index + 1].id;
      }
    },
    //选择音乐
    choose(index) {
      clearInterval(this.timer);
      this.$refs.audio.pause();
      this.src = this.zy[index].src;
      this.id = this.zy[index].id;
    },
    //声音调节
    voice(e) {
      console.log(e.offsetX);
      this.$refs.voice.style.width = e.offsetX + "px";
      this.$refs.audio.volume = e.offsetX / 400;
    },
    //是否静音
    ismute() {
      if (this.sy == "静音") {
        this.sy = "已静音";
        this.mute = this.$refs.audio.volume;
        this.$refs.audio.volume = 0;
        this.$refs.voice.style.width = 0;
      } else {
        this.sy = "静音";
        this.$refs.audio.volume = this.mute;
        this.$refs.voice.style.width = this.mute * 400 + "px";
      }
    },
    //进度条
    control(e) {
      this.$refs.audio.currentTime = parseInt(
        (e.offsetX / 500) * Math.ceil(this.$refs.audio.duration)
      );
    },
    timeupdate(e) {
      if (isNaN(e.target.duration) || isNaN(e.target.currentTime)) {
        console.log(111);
        this.alltime = 0;
        this.nowtime = 0;
      } else {
        this.alltime = e.target.duration;
        this.nowtime = e.target.currentTime;
        
        try {
          let nowpx = Math.ceil((this.nowtime / this.alltime) * 500);
          this.$refs.now.style.width = nowpx + "px";
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
  mounted() {
    this.src = this.zy[0].src;
    this.id = this.zy[0].id;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
* {
  list-style: none;
}
.container {
  width: 1500px;
  height: 300px;
  background-color: #000;

  .box {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.bb {
  background-color: purple;
  width: 50px;
  height: 50px;
  color: #fff;
}
.pro {
  width: 500px;
  height: 5px;
  background-color: gray;
  cursor: pointer;
  .now {
    width: 0px;
    height: 5px;
    background-color: red;
  }
}
.sy {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  .circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    color: skyblue;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
  .voice {
    width: 400px;
    height: 5px;
    background-color: gray;
    cursor: pointer;
    &sy {
      widows: 0px;
      height: 5px;
      background-color: springgreen;
      transition: width 0.5s;
    }
  }
}
.time {
  position: absolute;
  top: 100px;
  left: 200px;
  display: flex;
  justify-content: flex-start;
  color: aqua;
}
li {
  cursor: pointer;
}
</style>
