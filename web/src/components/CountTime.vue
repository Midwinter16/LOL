<template>
  <div>
    <div v-if="over">结束时间{{ end | format }}</div>
    <div v-else-if="matched">准备进行下一场...</div>
    <div v-else class="count-time">
      <span v-if="long">{{ hours }}:</span>{{ min }}:{{ sec }}
    </div>
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
    matched: {
      type: Boolean,
      default: false,
    },
    over: {
      type: Boolean,
      default: false,
    },
    end: {
      type: Number,
    },
  },
  data() {
    return {
      min: 0,
      sec: 0,
      hours: 0,
      long: false,
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
  filters: {
    format(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  watch: {
    sec(val) {
      if (this.hours > 0) {
        this.long = true;
      }
    },
  },
  created() {
    this.time();
  },
};
</script>

<style></style>
