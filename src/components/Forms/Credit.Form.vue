<template lang="pug">
    .getCoins.header-form(:class="{hasError}")

        div
            .text-center
                h3 {{currentPage.title}}
                p
                    span(v-if="currentPage.subTitle") {{currentPage.subTitle}}

            // page 1
            div(v-if="isPage(1)")
                .carousel-container
                    carousel(
                        :perPage="4", :autoplay="false", :paginationEnabled="false",
                        :loop="true" :navigation-enabled="true")
                        slide.slide(v-for="(item, index) in creditAmountsComputed", :key="index")
                            div.text-center(@click="nextPage(index)")
                                small Coins:
                                br
                                span.credit-amount {{item.amount}}
                                hr
                                | ${{item.price}}
                                br
                                div.save-amount
                                    small(v-if="item.discount") Save ${{item.saved}} ({{item.discount}}%)

            // page 2
            div.text-center(v-if="isPage(2)")
                p
                    b-btn(@click="nextPage(true)", variant="success") Turn on AUTOLOAD and save 2% more!
                p
                    b-btn(@click="nextPage(false)", variant="outline-success") No Thanks! I don't want AUTOLOAD.
                p
                    b-btn(@click="prevPage()", variant="danger") Go Back

            // page 3 or 4
            div.text-center(v-if="isPage(3) || isPage(4)")
               .carousel-container
                   carousel(:perPage="4", :autoplay="false", :paginationEnabled="false", :loop="true", :navigation-enabled="true")
                       slide.slide(v-for="(item, index) in reloadAmounts", :key="index")
                           div.text-center(@click="nextPage(item)")
                               h3 {{item}}
               p
                   b-btn(@click="prevPage()", variant="danger") Go Back

            // page 5
            div.text-center(v-if="isPage(5)")
                div
                    .carousel-container
                        carousel(
                        :perPage="4", :autoplay="false", :paginationEnabled="false",
                        :loop="true", :navigation-enabled="true")
                            slide.slide(v-for="(item, index) in paymentMethods", :key="index")
                                div.text-center(@click="nextPage(item)")
                                    h3 {{item}}
                p
                    b-btn(@click="prevPage()", variant="danger") Go Back

            // page 6
            div.text-center(v-if="isPage(6)")
                div(v-if="selectedItem.paymentMethod === 'Credit'")
                    h3 Credit
                div(v-if="selectedItem.paymentMethod === 'Paypal'")
                    h3 Paypal
                p
                    b-btn(@click="nextPage(true)", variant="success") Pay (Good Result)
                    b-btn(@click="nextPage(false)", variant="success") Pay (Bad Result)
                p
                    b-btn(@click="prevPage()", variant="danger") Go Back



            // page 7
            div.text-center(v-if="isPage(7)")

            // page 8
            div.text-center(v-if="isPage(8)")






        div(v-if="selectedItem")
            hr
            h2 {{selectedItem.amount}} Coins for ${{selectedItem.price}}
            div.btn-primary.p-2(v-if="selectedItem.autoLoad === false || selectedItem.autoLoadAmount")
                div(v-if="selectedItem.autoLoad === false")
                    span You Did Not Choose AutoLoad
                    br
                    b-btn.btn.btn-success(size="sm") Turn It On
                div(v-if="selectedItem.autoLoad === true")
                    span(v-if="selectedItem.autoLoadAmount") You Chose to AutoLoad {{selectedItem.autoLoadAmount}} Coins
                    br
                    span(v-if="selectedItem.autoLoadPoint") When You Get Down To {{selectedItem.autoLoadPoint}} Coins
                    br
                    b-btn.btn.btn-danger(size="sm") Turn It Off
            div(v-if="selectedItem.paymentMethod") Paying With {{selectedItem.paymentMethod}}
</template>
<style lang="scss">
    .carousel-container {
        padding: 0 20px 20px 20px;
        .slide {
            padding-bottom: 10px;
            cursor: pointer;
        }
        .slide:nth-child(even) {
            background-color: #005f85;
        }
        .slide:hover {
            background-color: #50c588;
        }
    }
    .credit-amount {
        font-size: 2em;
    }
    .credit-btn {
        background-color: gold;
        color: #000;
    }
    .save-amount {
        color: #50c588;
        height: 25px;
    }
</style>
<script>
import FormMixin from '@/components/Forms/Forms.Mixin'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'credit-form',
  mixins: [FormMixin],
  data () {
    return {
      autoLoadPercentage: 2,
      creditBase: 1.4,
      creditAmounts: [
        { amount: 50 },
        { amount: 100 },
        { amount: 250 },
        { amount: 500, discount: 10 },
        { amount: 1000, discount: 20 },
        { amount: 2500, discount: 30 },
        { amount: 5000, discount: 30 },
        { amount: 10000, discount: 30 }
      ],
      hasAutoload: null,
      form: {
        email: 'larry.l.sharpe@gmail.com',
        username: 'lovinlyfehard'
      },
      page: 1,
      pages: [
          ,
          {title: "Get Coins", "subTitle": "Select A Package",
              next: (scope, index) => {
                scope.selected = index
              }
          },
          {title: "Would You Like To Add Autoload?",
              next: (scope, enableAutoLoad) => {
                scope.selectedItem.autoLoad = enableAutoLoad
                if (enableAutoLoad === false) {
                    scope.page+=2;
                }
              },
              prev: (scope) => {
                  scope.selectedItem.autoLoad = null
                  scope.selected = null
              }
          },
          {title: "How much would you like to reload?",
              next: (scope, amount) => {
                  scope.selectedItem.autoLoadAmount = amount
              },
              prev: (scope) => {
                  scope.selectedItem.autoLoadAmount = null
              }
          },
          {title: "When would you like to reload?",
              next: (scope, amount) => {
                  scope.selectedItem.autoLoadPoint = amount
              },
              prev: (scope) => {
                  scope.selectedItem.autoLoadPoint = null
              }
          },
          {title: "Select A Payment Method",
              next: (scope, item) => {
                  scope.selectedItem.paymentMethod = item
              },
              prev: (scope) => {
                  if(scope.selectedItem.autoLoad !== true) {
                      scope.page-=2
                      scope.selectedItem.autoLoad = null
                  }
              }
          },
          {title: "Time To Pay Up!",
              next: (scope, success) => {
                if (!success) {
                    scope.page+=1
                }
              },
              prev: (scope) => {
                  scope.selectedItem.paymentMethod = null
              }
          },
          {title: "Awesome! Your Coins Have Been Added"},
          {title: "Oops! There was an error.", subTitle: "Please try again."}
      ],
      paymentMethods: [
        'Credit',
        'Paypal',
        'Crypto',
        'Gift Card'
      ],
        reloadAmounts: [
            150, 300, 500, 750
        ],
      selected: null
    }
  },
  computed: {
    currentPage: function () {
        return this.pages[this.page];
    },
    selectedItem: function () {
      return this.creditAmountsComputed[this.selected]
    },
    creditAmountsComputed: function () {
      return this.creditAmounts.map((item, index) => {
        const fullPrice = (item.amount * this.creditBase) / 10
        if (this.hasAutoload) item.discount += 2
        let price =
          item.discount ? (item.amount * (this.creditBase * ((100 - item.discount) / 100)))
            : item.amount * this.creditBase

        price = (price / 10).toFixed(2)
        item.price = price
        item.saved = fullPrice - price
        item.index = index
        return item
      })
    },
    ...mapState({
      deviceID: state => state.app.deviceID
    })
  },
  methods: {
    isPage (page) {
        return this.page === page
    },
    prevPage (params) {
        this.currentPage.prev(this, params)
        this.page--
    },
    nextPage (params) {
      this.currentPage.next(this, params)
      this.page++
      if (this.currentPage.before) {
        this.currentPage.before()
      }
    },
    selectPaymentMethod (i) {
      this.selectedItem.paymentMethod = i
      this.page = 4
    },
    selectReloadAmount (i) {
      this.selectedItem.paymentMethod = i
      this.page = 3.6
    },
    toggleAutoLoad () {
      this.hasAutoload = -this.hasAutoload
    },
    onSubmit () {
      this.submitted = true
      const { form: { email, username }, deviceID } = this
      this.join({ email, username })
        .then(() => this.loginLink({ email, deviceID }))
        .catch(() => {
          this.hasError = true
        })
    },
    ...mapActions('user', { join: 'join', loginLink: 'loginLink' })
  }
}
</script>
