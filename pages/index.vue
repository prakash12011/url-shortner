<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-alert
      v-if="shortUrl"
      dense shaped
      type="success"
      color="green"
    >{{shortUrl}}</v-alert>

    <v-text-field
      v-model="url"
      :counter="10"
      :rules="urlRules"
      label="URL"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="checkboxRules"
      label="Shorten URL?"
      required
    ></v-checkbox>

    <v-btn
      color="error"
      class="mr-4"
      elevation="2"
      @click="reset"
    >
      Reset Form
    </v-btn>
    <v-btn
      :disabled="!valid || !url || !checkbox"
      color="primary"
      class="mr-4"
      elevation="2"
      @click="shortenURL"
    >
      Shorten URL
    </v-btn>

    <v-btn
      :disabled="!shortUrl"
      color="info"
      elevation="2"
      @click="copyToClipboard"
    >
      Copy to clipboard
    </v-btn>

    <v-snackbar
      v-model="copySnackbar"
    >
      {{ copySnackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="copySnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        copySnackbar: false,
        copySnackbarText: '',
        url: '',
        shortUrl: '',
        urlRules: [
          v => !!v || 'URL is required',
          v => this.isURL(v) || "URL is not valid",
        ],
        checkbox: false,
        checkboxRules: [
          v => !!v || 'Please check to continue'
        ]
      }
    },
    methods: {
      validate () {
        const res = this.$refs.form.validate()
        return res
      },
      reset () {
        this.$refs.form.reset()
        this.valid = false
      },
      copyToClipboard() {
        window.navigator.clipboard.writeText(this.shortUrl).then(() => {
          this.copySnackbarText = 'Async: Copying to clipboard was successful!';
        }, (err) => {
          this.copySnackbarText = 'Async: Could not copy text:';
          console.error('Async: Could not copy text: ', err);
        });
        this.copySnackbar = true;

        setTimeout(() => {
          this.copySnackbar = false;          
        }, 5000);
      },
      async shortenURL () {
        this.validate();
        if (this.valid === false) return
        const ID = this.makeShortId(5)

        const response = await fetch('/api/setUrl', {
          method: 'POST',
          body: JSON.stringify({
            url: this.url,
            key: ID
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        })
        .then(res => res.json())
        
        this.shortUrl = window.location.origin +'/'+ response
        this.reset();
      },
      isURL(str) {
        let url;

        try {
          url = new URL(str);
        } catch (_) {
          return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
      },
      makeShortId(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
      }
    },
  }
</script>