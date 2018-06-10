<template>

  <div>
    <!-- 电脑登陆 -->
    <div v-if="isPC">     
        <PCLogin></PCLogin> 
        <!-- <PhoneLogin></PhoneLogin>          -->
    </div>


    <!-- 手机登录 -->
    <div v-else>
      <PhoneLogin></PhoneLogin>
      <!-- <PCLogin></PCLogin>  -->
    </div>
  </div>


</template>

<script>
  import PhoneLogin from '@/components/phone/PhoneLogin'
  import PCLogin from '@/components/PC/PCLogin'


  export default {
    name: 'App',
    components: {
      PhoneLogin,
      PCLogin
    },
    data() {
      return {
        isPC: true //判断是否为电脑登陆
      }
    },
    mounted: function () {
      //判断登陆的客户端为电脑还是手机 
      let ispc = false;
      var browser = {
        versions: function () {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
            iPad: u.indexOf('iPad') > -1, //是否iPad
            wechat:u.match(/MicroMessenger/i)=="micromessenger"
          };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      };

      if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        console.log('苹果');
        this.isPC = false;
      } else if (browser.versions.android) {
        console.log('安卓');
        this.isPC = false;
      }else if(browser.versions.wechat) {
        console.log('微信');
        this.isPC = false;        
      }
      else {
        console.log('电脑');
        this.isPC = true;
      }



    }
  }

</script>

<style>
  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code,
  form,
  fieldset,
  legend,
  input,
  button,
  textarea,
  p,
  blockquote,
  th,
  td {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    font-size: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  address,
  caption,
  cite,
  code,
  dfn,
  em,
  strong,
  th,
  var {
    font-style: normal;
    font-weight: normal;
  }

  a {
    color: #555;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    border: none;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  input,
  textarea,
  select,
  button {
    font: 1em Verdana, Helvetica, Arial, sans-serif;
  }


  html {
    overflow-y: scroll;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix {
    *zoom: 1;
  }

  .el-container,
  .el-header,
  .el-aside,
  .el-main,
  .el-footer {
    margin: 0px;
    padding: 0px;
  }


</style>
