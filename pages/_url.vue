<template>
  <v-row>
    <v-col class="text-center">
      <v-alert
        :type="error ? 'error' : 'success'"
        :color="error ? 'red' : 'green'"
      >{{message}}</v-alert>
      
      <p>Manually Open in new tab <br/><a v-if="!error" :href="url" target="_blank">Click here</a></p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      error: false,
      message: 'URL redirected'
    }
  },
  async mounted() {
    const shortURL = this.$route.params.url;
    const fullURL = await fetch('/api/geturl/'+shortURL).then(res => res.json())

    if (fullURL?.url) {
      this.url = fullURL?.url
      setTimeout(() => {
        window.open(fullURL?.url)
      }, 250);
    } else {
      this.error = true
      this.message = 'URL not found'
    }
  },
}
</script>
