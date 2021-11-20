<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>Upload the images of the chips</CCardHeader>
          <CCardBody>
            <form id="file-upload-form" class="uploader">
              <input
                ref="fileInput"
                type="file"
                name="fileUpload"
                accept="image/*"
                multiple
              />
              <label id="file-drag" for="file-upload">
                <img id="file-image" src="#" alt="Preview" class="hidden" />
                <div id="start">
                  <i class="fa fa-download" aria-hidden="true"></i>
                  <div>Select a file or drag here</div>
                  <div id="notimage" class="hidden">Please select an image</div>
                  <span id="file-upload-btn" class="btn btn-primary">
                    Select a file
                  </span>
                </div>
                <div id="response" :class="{ hidden: !processing }">
                  <span id="file-upload-btn" class="btn btn-primary">
                    Processing...
                  </span>
                </div>
              </label>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Login',
  components: {},
  setup() {
    const fileInput = ref(null)
    const imageList = []
    const processing = ref(false)

    const { proxy } = getCurrentInstance()

    const store = useStore()

    onMounted(() => {
      processing.value = false
    })

    const uploadImages = () => {
      processing.value = true
      for (const file of fileInput.value.files) {
        // convert file to base64 string
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          imageList.push(reader.result)
        }
      }

      proxy.$axios
        .post(
          'https://hackatumimageupload.azurewebsites.net/api/uploadImage?code=jskoDScmdLRL8xy7W7FQdO52qm3bDMHyRJj6lXvH7sYKYi1rza7xlw==',
          { images: imageList },
        )
        .then((res) => {
          store.commit('update', res.data)
          processing.value = false
          proxy.$router.push('/dashboard')
        })
    }

    return {
      uploadImages,
      fileInput,
      processing,
    }
  },
  computed: {},
}
</script>

<style></style>
