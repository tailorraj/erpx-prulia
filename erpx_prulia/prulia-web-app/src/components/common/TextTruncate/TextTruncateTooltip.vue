<template functional>
  <v-tooltip :[props.align]="true" max-width="400" open-delay="200">
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <slot name="text" />
      </span>
    </template>
    <slot />
  </v-tooltip>
</template>
