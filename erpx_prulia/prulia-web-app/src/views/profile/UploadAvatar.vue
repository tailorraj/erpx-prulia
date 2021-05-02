<template>
  <v-dialog v-model="model" max-width="450px">
    <v-card>
      <v-card-title class="primary--text">
        Upload Profile Picture
        <v-spacer />
        <v-btn icon @click="model = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider />

      <v-card-text class="pt-3">
        <v-row no-gutters justify="center" align="center">
          <croppa
            class="profile-avatar"
            v-model="croppa_pic"
            :width="256"
            :height="256"
            :file-size-limit="2097152"
            :canvas-color="'grey'"
            :placeholder-color="'white'"
            :placeholder-font-size="24"
            :accept="'image/*'"
            :show-remove-button="false"
            @file-choose="file => (img_chosen = file)"
            @file-size-exceed="img_chosen = null"
            @file-type-mismatch="img_chosen = null"
            @image-remove="img_chosen = null"
          />
        </v-row>
        <v-row
          v-if="img_chosen"
          class="pt-3"
          no-gutters
          justify="center"
          align="center"
        >
          <v-btn icon v-if="croppa_pic" @click="croppa_pic.remove">
            <v-icon color="secondary">mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="primary">
        <v-spacer></v-spacer>
        <v-btn
          class="white--text"
          @click="onSubmit"
          :loading="loading"
          :disabled="!img_chosen"
          rounded
          text
          >Upload</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

const data = () => ({
  loading: false,
  croppa_pic: null,
  img_chosen: null
})

export default {
  name: 'UploadAvatar',
  data: () => data(),
  props: {
    value: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters('auth', ['member']),
    model: {
      get() {
        return this.value
      },
      set(val) {
        if (!val) {
          this.resetComponentData(data)
        }
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onSubmit() {
      let file = this.croppa_pic.getChosenFile()

      if (!file) {
        this.showSnackbar('No image chosen', 'error')
        return
      }

      let split = file.name.split('.')
      let ext = split.pop()
      let filename = split.join('') + '_' + file.lastModified + '.' + ext
      let filedata = this.croppa_pic.generateDataUrl()
      filedata = filedata
        .split('base64,')
        .pop()
        .trim() //base64

      this.$store
        .dispatch('auth/uploadPic', {
          filename,
          filedata,
          file_size: file.size
        })
        .then(() => {
          this.model = false
          this.showSnackbar('Profile picture updated successfully', 'success')
        })
        .catch(() => {
          this.showSnackbar('Invalid image provided', 'error')
        })
    }
  }
}
</script>

<style lang="scss">
.profile-avatar {
  canvas {
    border-radius: 50% !important;
  }
}
</style>
