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
                        <h4 id="upload-your-own" class="card-title mb-0">
                          Upload your own images
                        </h4>
                        <div class="small text-medium-emphasis">
                          Accepted: .PNG
                        </div>
                        <button
                          v-if="!showSelect"
                          class="btn btn-primary btn-block mid"
                          @click="uploadImages"
                        >
                          Upload
                        </button>
                      </CCol>
                    </CRow>
                    <CRow style="margin-top: 15px">
                      <CCol :sm="12">
                        <form id="file-upload-form" class="uploader">
                          <input
                            id="file-upload"
                            ref="fileInput"
                            type="file"
                            name="fileUpload"
                            accept="image/*"
                            multiple
                            @change="updateShowSelect"
                          />

                          <label
                            v-if="showSelect"
                            id="file-drag"
                            for="file-upload"
                          >
                            <img
                              id="file-image"
                              src="#"
                              alt="Preview"
                              class="hidden"
                            />
                            <div id="start">
                              <i class="fa fa-download" aria-hidden="true"></i>
                              <div>Select a file or drag here</div>
                              <div id="notimage" class="hidden">
                                Please select images
                              </div>
                              <span id="file-upload-btn" class="btn btn-primary"
                                >Select a file</span
                              >
                            </div>
                          </label>
                        </form>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol :md="6">
                <CCard class="mb-4" style="min-height: 335px">
                  <CCardBody>
                    <CRow>
                      <CCol :sm="12">
                        <h4 id="use-test-set" class="card-title mb-0">
                          Use the provided test set
                        </h4>
                        <div class="small text-medium-emphasis">
                          Click here to use the test set provided for hackatum
                          2021.
                        </div>
                      </CCol>
                    </CRow>
                    <CRow style="margin-top: 100px">
                      <CCol :sm="12">
                        <form id="test-set" class="uploader test-set-button">
                          <div class="text-center">
                            <a
                              id="use-test-set-btn"
                              href="/#/dashboard"
                              class="btn btn-primary"
                              >Use Test Set</a
                            >
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
    const processing = ref(false)
    const showSelect = ref(true)

    // prettier-ignore
    const { proxy } = getCurrentInstance()
    // prettier-ignore
    const store = useStore()

    onMounted(() => {
      processing.value = false
    })

    const updateShowSelect = () => {
      showSelect.value =
        fileInput.value == null ||
        fileInput.value.files == null ||
        fileInput.value.files.length === 0
    }

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    }

    const uploadImages = async () => {
      processing.value = true
      const imageList = []
      Promise.all(Array.from(fileInput.value.files).map((file) => getBase64(file)))
        .then((results) => {
          return proxy.$axios
        .post(
          'http://localhost:7071/api/HttpTrigger',
          { images: results },
        )
        })
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
      showSelect,
      updateShowSelect,
    }
  },
  computed: {},
}
</script>

<style>
.mid {
  display: block !important;
  margin: 0 auto !important;
}
</style>
