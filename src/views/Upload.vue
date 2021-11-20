<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>Upload the images of the chips</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol :md="6">
                <CCard class="mb-4">
                  <CCardBody>
                    <CRow>
                      <CCol :sm="12">
                        <h4 id="upload-your-own" class="card-title mb-0">Upload your own images</h4>
                        <div class="small text-medium-emphasis">Accepted: .PNG</div>
                      </CCol>
                    </CRow>
                    <CRow style="margin-top: 15px">
                      <CCol :sm="12" >
                        <form id="file-upload-form" class="uploader">
                          <input id="file-upload" type="file" name="fileUpload" accept="image/*"/>

                          <label for="file-upload" id="file-drag">
                            <img id="file-image" src="#" alt="Preview" class="hidden">
                            <div id="start">
                              <i class="fa fa-download" aria-hidden="true"></i>
                              <div>Select a file or drag here</div>
                              <div id="notimage" class="hidden">Please select an image</div>
                              <span id="file-upload-btn" class="btn btn-primary">Select a file</span>
                            </div>
                            <div id="response" class="hidden">
                              <div id="messages"></div>
                              <progress class="progress" id="file-progress" value="0">
                                <span>0</span>%
                              </progress>
                            </div>
                          </label>
                        </form>


                      </CCol>

                    </CRow>
                  </CCardBody>
                </CCard>

              </CCol>
              <CCol :md="6">
                <CCard class="mb-4" style="min-height: 335px;">
                  <CCardBody>
                    <CRow>
                      <CCol :sm="12">
                        <h4 id="use-test-set" class="card-title mb-0">Use the provided test set</h4>
                        <div class="small text-medium-emphasis">
                          Click here to use the test set provided for hackatum 2021.</div>
                      </CCol>
                    </CRow>
                    <CRow style="margin-top: 100px;">
                      <CCol :sm="12">
                        <form id="test-set" class="uploader test-set-button">
                          <div class="text-center">
                              <a href="/#/dashboard" id="use-test-set-btn" class="btn btn-primary">Use Test Set</a>
                          </div>
                        </form>

                      </CCol>

                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

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
