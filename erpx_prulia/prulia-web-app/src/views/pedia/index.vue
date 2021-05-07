<template>
    <v-container>
        <v-row class="dusk"
        ><v-img contain src="@/assets/banners/PRULIA_BannerNews.jpg"
        /></v-row>
        <v-row>
            <v-col
                    cols="12"
                    sm="12"
                    md="12"
            >
                <v-text-field
                        label="Outlined"
                        outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row style="text-align: center;display: block;">
            <v-btn
                    depressed
                    color="primary"
                    @click="window.location.href = '/pedia/add'"
            >
                New Pedia
            </v-btn>
        </v-row>
        <v-row justify="center" class="vanilla pb-12">
            Oops, no posts available :(
        </v-row>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Pedia',
        computed: {
            ...mapGetters('pedia', {})
        },
    }
</script>

<style scoped></style>
