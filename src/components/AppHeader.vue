<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderBrand class="mx-auto" to="/">
        <img
          src="@/assets/brand/logo.png"
          class=""
          style="max-height: 100px"
          alt="Advanced Faulty Chip Detection">
      </CHeaderBrand>
    </CContainer>
  </CHeader>
</template>

<script>
import { logo } from '@/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
  },
  setup() {
    return {
      logo,
    }
  },
}
</script>
