<template>
  <v-app>
    <v-main>
      <v-container class="grey lighten-5">
        <v-row style="height: 100vh;" align="center" justify="center">
          <v-col
            sm="7"
            align-self="center"
            justify-center
          >
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    
  }),
}
</script>
