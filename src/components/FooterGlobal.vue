<template lang="pug">
    footer.footer-global.bg-dark.text-light
        ad-space
        .container
            b-navbar(type='dark')
                b-navbar-brand(to='/') {{appTitle}}
                locale-changer
        .container
            b-navbar.broadcasters-links(type='dark')
                b-navbar-brand(to='/') Broadcasters
                b-link(to="/hello") Make Money as a Broadcaster
                b-link(to="/hello") Broadcast From Your Mobile Device
                b-link(to="/hello") Broadcaster Training
                b-link(to="/hello") Broadcaster FAQ
            .row.block-links
                .col-6.col-md-2(v-for="(group, title) in footerLinks", :key="title")
                    | {{title}}
                    .link-group
                        span(v-for="(link, index) in group", :key="index")
                            b-link(:href="link.url", target="_blank" v-if="link.url") {{link.title}}
                            b-link(:to="link.path", v-if="link.path") {{link.title}}

        .social-container
            .container
                .row
                    .col-12
                        social-links
        .footer-legal.text-center
            p Main Office: Virginia, USA
            p Everyone appearing on this site is verified to be 18 years of age or older
            p This site contains sexually explicit material. Enter ONLY if you are at least 18 years old and agree to our cookie rules.
            p
                a.text-light(href="", target="_blank") 18 U.S.C. 2257 Record Keeping Requirements Compliance Statement
            p &copy; 2019 - {{new Date().getFullYear()}} Camaverse.com. All Rights Reseerved
        cookie-law(@accept="cookieAccepted()")
            div(slot="message")
                div
                | This website uses cookies, local storage and session storage to enhance your experience and collect
                | statistical data.
                br
                | For more information please click on the following our cookie policy.
                br
                | By continuing to browse on this website, you accept the use of cookies for the above purposes.
</template>
<script>
import AdSpace from '@/components/AdSpace'
import AppInit from '../mixins/appInit.mixin'
import CookieLaw from 'vue-cookie-law'
import FaIcon from 'vue-awesome/components/Icon'
import Icon from './Common/Icon'
import IconLink from './Common/IconLink'
import SocialLinks from './SocialLinks'
import LocaleChanger from './LocaleSwitch'
export default {
  components: {
    LocaleChanger,
    SocialLinks,
    IconLink,
    Icon,
    FaIcon,
    AdSpace,
    CookieLaw
  },
  computed: {
    appTitle: function () {
      if (process.env.VUE_APP_NSFW === 'false') {
        return process.env.VUE_APP_TITLE_SFW
      } else {
        return process.env.VUE_APP_TITLE
      }
    }
  },
  data () {
    return {
      footerLinks: {
        Cams: [],
        Regions: [
          { title: 'North American Cams', url: `${process.env.VUE_APP_SITE_SUPPORT}billing` },
          { title: 'South American Cams', path: '/contact-us' },
          { title: 'European Cams', url: `${process.env.VUE_APP_SITE_SUPPORT}feedback` },
          { title: 'Asian Cams', url: `${process.env.VUE_APP_SITE_SUPPORT}feedback` },
          { title: 'Indian Cams', url: `${process.env.VUE_APP_SITE_SUPPORT}feedback` },
          { title: 'African Cams', url: `${process.env.VUE_APP_SITE_SUPPORT}feedback` },
          { title: 'Middle Eastern Cams', url: `${process.env.VUE_APP_SITE_SUPPORT}feedback` }
        ],
        Support: [
          { title: 'Billing', url: `${process.env.VUE_APP_SITE_SUPPORT}billing` },
          { title: 'Contact Us', path: '/contact-us' },
          { title: 'Feedback', url: `${process.env.VUE_APP_SITE_SUPPORT}feedback` }
        ],
        Partners: [
          { title: 'Make Money', url: `${process.env.VUE_APP_SITE_BROADCASTERS}` },
          { title: 'Streamers', url: `${process.env.VUE_APP_SITE_BROADCASTERS}` },
          { title: 'Studios', url: `${process.env.VUE_APP_SITE_PARTNERS}studios` },
          { title: 'Affiliates', url: `${process.env.VUE_APP_SITE_PARTNERS}affiliates` },
          { title: 'Buy Traffic', url: `${process.env.VUE_APP_SITE_PARTNERS}traffic` },
          { title: 'Contributors', url: `${process.env.VUE_APP_SITE_PARTNERS}contributors` }
        ],
        Business: [
          { title: 'Events', url: `${process.env.VUE_APP_SITE_BUSINESS}events` },
          { title: 'Media', url: `${process.env.VUE_APP_SITE_BUSINESS}media` },
          { title: 'Jobs', url: `${process.env.VUE_APP_SITE_BUSINESS}jobs` }
        ],
        Legal: [
          { title: 'Law Enforcement', url: `${process.env.VUE_APP_SITE_LEGAL}law-enforcement` },
          { title: 'Terms & Conditions', url: `${process.env.VUE_APP_SITE_LEGAL}terms` },
          { title: 'Privacy Policy', url: `${process.env.VUE_APP_SITE_LEGAL}privacy` },
          { title: 'Cookies', url: `${process.env.VUE_APP_SITE_LEGAL}cookies` },
          { title: 'Anti-Spam', url: `${process.env.VUE_APP_SITE_LEGAL}anti-spam` },
          { title: 'Refunds', url: `${process.env.VUE_APP_SITE_LEGAL}refunds` }
        ]
      }
    }
  },
  methods: {
    cookieAccepted: function () {
      this.storageDataInit()
    }
  },
  mixins: [AppInit]
}
</script>
<style lang="scss">
    .block-links a {
        display: block;
    }
    .footer-global nav.broadcasters-links {
        border-top: 1px #b7b7b7 solid;
        border-bottom: 1px #b7b7b7 solid;
        display: flex;
        justify-content: space-between;
        margin: 10px 0 20px 0;
        padding: 20px 0;
    }
    .footer-global {
        a {
            color: #3d9264;
        }
        .navbar {
            padding: 0 10px 0 0;
        }
    }
    .footer-legal {
        background-color: #001016;
        font-size: .8em;
        padding: 20px 0;
        p {
            margin: 0;
        }
    }
    .link-group {
        font-size: .9rem;
    }
    .social-container {
        background: #464646;
        margin-top: 20px;
        padding: 10px 0;
    }
</style>
