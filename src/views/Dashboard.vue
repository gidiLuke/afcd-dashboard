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
                <CChartDoughnut :data="defaultData" style="max-width: 100%; margin-top: 20px;"/>
              </CCol>
              <CCol :sm="6">
                <div style="margin-top: 40px">
                <div class="text-medium-emphasis text-center"><h4>Scratched Chips</h4></div>
                <div class="text-high-emphasis text-center align-items-center align-content-center"
                     style="margin-top: 40px">
                  <h2>20/60</h2>
                  <hr>
                  <h2>33 %</h2></div>
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
                <div class="small text-medium-emphasis">This graph shows when the faulty chips were detected.
                  The time is derived from the file name.</div>
              </CCol>
            </CRow>
            <CRow>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  components: {
    CChartDoughnut,
  },
  computed: {
    defaultData() {
      return {
        labels: ['Ok', 'Scratched'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651'],
            data: [40, 20],
          },
        ],
      }
    },
  },
}

import { CChartDoughnut } from '@coreui/vue-chartjs'

</script>
