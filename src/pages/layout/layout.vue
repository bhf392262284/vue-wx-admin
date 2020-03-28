<template>
  <div id="layout">
    <div class="left-nav">
      <h1>123456789</h1>
    </div>
    <div class="top">
      <div class="top-content"></div>
      <div class="top-vav">
        <div style="height:1500px">65444444444444444416515645645546456</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "layout"
};
</script>

<style spend>
#layout {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
}
.left-nav {
  width: 200px;
  background-color: black;
}
.top {
  flex: 1;
  position: relative;
}
.top-content {
  position: fixed;
  background-color: blueviolet;
  height: 100px;
  width: 100%;
  z-index: 99999;
  top: 0;
  left: 200px;
}
.top-vav {
  overflow-y: auto;
  position: absolute;
  width: 100%;
  top: 100px;
  left: 0;
  bottom: 0;
  background-color: pink;
}
</style>