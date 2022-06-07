<template>
  <div class="rating">
    <div class="title">{{ title }}:</div>
    <div class="star">
      <div class="stars">
        <img
          v-for="i in rating"
          :key="`${i}${light}`"
          src="@/assets/star-light.png"
          alt=""
        />
        <img
          v-for="i in 5 - rating"
          :key="`${i}${unlight}`"
          src="@/assets/star.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      unlight: "unlight",
      light: "light",
    };
  },
};
</script>

<style lang="less" scoped>
.rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .star {
    position: relative;
  }
  .stars {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
}
img {
  margin-right: 0.7rem;
}
.title {
  font-size: 18px;
}
</style>
