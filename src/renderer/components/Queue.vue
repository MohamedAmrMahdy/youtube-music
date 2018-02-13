<template>
<div style="width:100%">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex>
          <v-card dark color="blue">
            <v-card-text class="px-0">Now Playing : Alan Walker Faded</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex>
            <v-btn color='red' class="px-0">Remove Selected</v-btn>
        </v-flex>
        </v-layout>
        <v-layout row wrap>
        <v-flex>
            <v-btn color='green' class="px-0">Increase Index</v-btn>
        </v-flex>
        <v-flex>
            <v-btn color='green' class="px-0">Decrease Index</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    
  <v-data-table
    v-bind:headers="headers"
    v-bind:items="items"
    v-bind:search="search"
    v-model="selected"
    item-key="name"
    select-all
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <span slot="activator">
          {{ props.header.text }}
        </span>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          primary
          hide-details
          v-model="props.selected"
        ></v-checkbox>
      </td>
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.channel }}</td>
      <td class="text-xs-right">{{ props.item.vidid }}</td>
      <td class="text-xs-right">{{ props.item.channelid }}</td>
      <td class="text-xs-right">{{ props.item.duration }}</td>
      <td class="text-xs-right">{{ props.item.index }}</td>
    </template>
  </v-data-table>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        selected: [],
        headers: [
          {
            text: `Music Queue | Name`,
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Channel Name', sortable: false, value: 'channel' },
          { text: 'Video ID', sortable: false, value: 'vidid' },
          { text: 'Channel ID', sortable: false, value: 'channelid' },
          { text: 'Duration', sortable: false, value: 'duration' },
          { text: 'Index', value: 'index' }
        ],
        items: [
          {value: false, name: 'Alan Walker Faded',channel: 'AlanEvo',vidid: '1-xGerv5FOk',channelid: 'UCJrOtniJ0-NWz37R30urifQ',duration: '2:30',index: 1},
          
        ]
      }
    }
  }
</script>