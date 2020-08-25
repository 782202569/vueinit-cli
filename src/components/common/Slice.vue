<template>
  <div id="slice">
    <div class="slice-top">
      <div class="slice-left fl">
        <ul>
          <li @click="toggleSpan">时长</li>
          <li @click="toggleSpan">次数</li>
          <li @click="toggleSpan">占比</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
#slice {
  width: 300px;
  height: 126px;
  border: 1px solid #cdcdcd;
}
#slice .slice-top {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #d2d2d2;
}
#slice .slice-top .slice-left {
  width: 65px;
  height: 100%;
  border-right: 1px solid #d2d2d2;
}
#slice .slice-top .slice-left ul li {
  width: 100%;
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
}
</style>
