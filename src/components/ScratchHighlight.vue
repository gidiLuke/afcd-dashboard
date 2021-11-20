<template>
  <div>
    <img ref="img" :src="props.data.url">
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";

export default {
  name: 'ScratchHighlight',
  props: {
    data: Object
  },
  setup(props) {
    const img = ref(null)
    const { proxy } = getCurrentInstance()

    let drawed = false

    proxy.$nextTick(() => {
      if (drawed) return
      else {
        console.log(img.value.naturalHeight)
        console.log(img.value.naturalWidth)
        let canvas = proxy.$refs['img'].getContext('2d')
        canvas.beginPath()
        canvas.rect(20, 20, 150, 100)
        canvas.stroke()
        drawed = true
      }
    })

    return {
      props,
      img,
    }
  },
}
</script>

<style>

</style>
