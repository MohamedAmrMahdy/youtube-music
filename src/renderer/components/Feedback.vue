<template>
  <div style="width: 100%">
      <v-card>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">First Name</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                name="firstname"
                label="First Name"
                single-line
                dark
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Last Name</v-subheader>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                name="lastname"
                label="Last Name"
                single-line
                dark
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Email:</v-subheader>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                name="email"
                label="Email"
                single-line
                dark
                ></v-text-field>
              </v-flex>
            </v-layout> 
            <v-layout row>
              <v-flex xs4>
                <v-subheader class="grey--text text--lighten-1">Message</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                name="message "
                label="Message"
                multi-line
                dark
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
  </div>
</template>
