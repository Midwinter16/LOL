<template>
  <div class="count-time">
    <span v-if="over">{{ hours }}:</span>{{ min }}:{{ sec }}
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    start: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      min: 0,
      sec: 0,
      hours: 0,
      over: false,
    };
  },
  methods: {
    time() {
      setInterval(() => {
        let now = Date.parse(new Date());
        this.min = dayjs(now - this.start).format("mm");
        this.sec = dayjs(now - this.start).format("ss");
        // 为了对时区而-8
        this.hours = dayjs(now - this.start).format("hh") - 8;
      }, 1000);
    },
  },
  watch: {
    sec(val) {
      if (this.hours > 0) {
        this.over = true;
      }
    },
  },
  created() {
    this.time();
  },
};
</script>

<style></style>
