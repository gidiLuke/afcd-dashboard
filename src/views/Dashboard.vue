<template>

  <div>
    <CRow class="">
      <CCol :md="6">
        <CCard class="mb-4" style="min-height: 380px">
          <CCardBody>
            <CRow>
              <CCol :sm="12">
                <h4 id="overall" class="card-title mb-0">Overall Statistics</h4>
                <div class="small text-medium-emphasis">for the batch of images uploaded.</div>
              </CCol>
            </CRow>
            <CRow>
              <CCol :sm="6">
                <CChartDoughnut :data="pieChartData" style="max-width: 100%; margin-top: 20px;"/>
              </CCol>
              <CCol :sm="6">
                <div style="margin-top: 40px">
                  <div class="text-medium-emphasis text-center">
                    <h4>Scratched Chips</h4>
                  </div>
                  <div
                    class="
                      text-high-emphasis text-center
                      align-items-center align-content-center"
                    style="margin-top: 40px"
                  >
                    <h2>{{ faulty.length }}/{{ responses ? responses.length : 0 }}</h2>
                    <br />
                    <h2>{{ responses ? (faulty.length / responses.length * 100).toFixed(2) : 0 }} %</h2>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol :md="6" >
        <CCard class="mb-4" style="min-height: 380px">
          <CCardBody>
            <CRow>
              <CCol :sm="12">
                <h4 id="distribution" class="card-title mb-0">Distribution of Faulty Chips</h4>
                <div class="small text-medium-emphasis">
                  This graph shows when the faulty chips were detected. The time is derived from the file name.
                </div>
              </CCol>
            </CRow>
            <CRow>
              <MainChartExample
                style="height: 300px; max-height: 300px; margin-top: 40px"
              />
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <!--<WidgetsStatsD />-->

    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardHeader>Image Gallery</CCardHeader>
          <CCardBody>
            <vue-picture-swipe :items="items"></vue-picture-swipe>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { CChartDoughnut } from '@coreui/vue-chartjs'
import { useStore } from 'vuex'
import { computed } from 'vue'
import VuePictureSwipe from 'vue3-picture-swipe'
import MainChartExample from './charts/MainChartExample'

export default {
  name: 'Dashboard',
  components: {
    CChartDoughnut,
    VuePictureSwipe,
    MainChartExample,
  },
  setup() {
    const store = useStore()
    return {
      responses: computed(() => store.state.responses),
      faulty: computed(() => store.getters.faulty),
      pieChartData: computed(() => {
        return {
          labels: ['Ok', 'Scratched'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651'],
              data: store.state.responses ?
              [store.state.responses.length - store.getters.faulty.length,
              store.getters.faulty.length]
              :
              [50, 50],
            },
          ],
        }
      }),
      items: computed(() => store.getters.galleryItems),
    }
    },
  }
</script>
<style scoped>
  ::v-deep img[itemprop="thumbnail"] {
    width: 144px !important;
    height: 144px !important;
  }
</style>
