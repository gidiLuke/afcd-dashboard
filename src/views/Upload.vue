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
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'

export default {
  name: 'Dashboard',
  components: {},
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
  setup() {
    const progressGroupExample1 = [
      {title: 'Monday', value1: 34, value2: 78},
      {title: 'Tuesday', value1: 56, value2: 94},
      {title: 'Wednesday', value1: 12, value2: 67},
      {title: 'Thursday', value1: 43, value2: 91},
      {title: 'Friday', value1: 22, value2: 73},
      {title: 'Saturday', value1: 53, value2: 82},
      {title: 'Sunday', value1: 9, value2: 69},
    ]
    const progressGroupExample2 = [
      {title: 'Male', icon: 'cil-user', value: 53},
      {title: 'Female', icon: 'cil-user-female', value: 43},
    ]
    const progressGroupExample3 = [
      {
        title: 'Organic Search',
        icon: 'cib-google',
        percent: 56,
        value: '191,235',
      },
      {title: 'Facebook', icon: 'cib-facebook', percent: 15, value: '51,223'},
      {title: 'Twitter', icon: 'cib-twitter', percent: 11, value: '37,564'},
      {title: 'LinkedIn', icon: 'cib-linkedin', percent: 8, value: '27,319'},
    ]
    const tableExample = [
      {
        avatar: {src: avatar1, status: 'success'},
        user: {
          name: 'Yiorgos Avraamu',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: {name: 'USA', flag: 'cif-us'},
        usage: {
          value: 50,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'success',
        },
        payment: {name: 'Mastercard', icon: 'cib-cc-mastercard'},
        activity: '10 sec ago',
      },
      {
        avatar: {src: avatar2, status: 'danger'},
        user: {
          name: 'Avram Tarasios',
          new: false,
          registered: 'Jan 1, 2021',
        },
        country: {name: 'Brazil', flag: 'cif-br'},
        usage: {
          value: 22,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'info',
        },
        payment: {name: 'Visa', icon: 'cib-cc-visa'},
        activity: '5 minutes ago',
      },
      {
        avatar: {src: avatar3, status: 'warning'},
        user: {name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021'},
        country: {name: 'India', flag: 'cif-in'},
        usage: {
          value: 74,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'warning',
        },
        payment: {name: 'Stripe', icon: 'cib-cc-stripe'},
        activity: '1 hour ago',
      },
      {
        avatar: {src: avatar4, status: 'secondary'},
        user: {name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021'},
        country: {name: 'France', flag: 'cif-fr'},
        usage: {
          value: 98,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'danger',
        },
        payment: {name: 'PayPal', icon: 'cib-cc-paypal'},
        activity: 'Last month',
      },
      {
        avatar: {src: avatar5, status: 'success'},
        user: {
          name: 'Agapetus Tadeáš',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: {name: 'Spain', flag: 'cif-es'},
        usage: {
          value: 22,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'primary',
        },
        payment: {name: 'Google Wallet', icon: 'cib-cc-apple-pay'},
        activity: 'Last week',
      },
      {
        avatar: {src: avatar6, status: 'danger'},
        user: {
          name: 'Friderik Dávid',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: {name: 'Poland', flag: 'cif-pl'},
        usage: {
          value: 43,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'success',
        },
        payment: {name: 'Amex', icon: 'cib-cc-amex'},
        activity: 'Last week',
      },
    ]

    return {
      tableExample,
      progressGroupExample1,
      progressGroupExample2,
      progressGroupExample3,
    }
  },
}


</script>

<style>

</style>
