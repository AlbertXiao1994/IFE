<template>
  <div class="shopCart">
    <div class="left-wrapper">
      <div class="logo-wrapper">
        <div class="logo">
          <span class="icon-shopping_cart"></span>
        </div>
      </div>
      <div class="price">¥0</div>
      <div class="extra-price">另需配送费¥4</div>
    </div>
    <div class="right-wrapper">¥20起送</div>
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shopCart {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  z-index: 10;
}
.left-wrapper {
  flex: 1;
  background: #141c27;
  font-size: 0;
}
.right-wrapper {
  flex: 0 0 105px;
  width: 105px;
  background: #2b343b;
}
.logo-wrapper {
  display: inline-block;
  position: relative;
  top: -10px;
  margin-left: 12px;
  padding: 6px;
  background: #141c27;
  width: 58px;
  height: 58px;
  box-sizing: border-box;
  border-radius: 50%;
}
.logo-wrapper .logo {
  width: 100%;
  height: 100%;
  background: #2b343d;
  border-radius: 50%;
  text-align: center;
}
.icon-shopping_cart {
  color: #808589;
  font-size: 24px;
  line-height: 44px;
}
.left-wrapper .price,.extra-price {
  display: inline-block;
  color: #808589;
  font-size: 16px;
  line-height: 24px;
  margin-top: 12px;
  vertical-align: top;
}
.left-wrapper .price {
  font-weight: 700;
  margin-left: 12px;
  padding-right: 12px;
  border-right: 1px solid rgba(255,255,255,0.1);
}
.left-wrapper .extra-price {
  margin-left:  12px;
}
.right-wrapper {
  font-size: 12px;
  color: #808589;
  font-weight: 700;
  line-height: 48px;
  text-align: center;
}
</style>
