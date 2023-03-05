<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': isLoading }" :style="imageOrPreview && `--bg-url: url('${imageOrPreview}')`">
      <span class="image-uploader__text">{{ message }}</span>
      <input v-bind="$attrs" :value="imageOrPreview" :type="type" accept="image/*" class="image-uploader__input" @[change].prevent="imageChange"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  
  emits: ['select', 'remove', 'upload', 'error'],
  data() {
    return {
      image: undefined,
      isLoading: false,
      isPreview: '',
    };
  },
  computed: {
    imageOrPreview() {
      return this.isPreview || this.image;
    },
    message() {
      return this.isLoading ? 'Загрузка...' : this.imageOrPreview ? 'Удалить изображение' : 'Загрузить изображение';
    },
    change() {
      return (this.isLoading || this.imageOrPreview) ? 'click':'change';
    },
    type() {
      return (this.isLoading || this.imageOrPreview) ? undefined : 'file';
    },
  },
  watch: {
    preview: {
      deep: true,
      immediate: true,
      handler() {
        this.isPreview = this.preview;
      },
    },
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const file = files[0];
      this.$emit('select', file);
      if (this.uploader) {
        this.isLoading = true;
        this.image = URL.createObjectURL(file);
        this.uploader(file).then(
          (result) => {
            this.isLoading = false;
            this.$emit('upload', result);
          },
          (error) => {
            this.isLoading = false;
            this.image = undefined;
            this.$emit('error', error);
          },
        );
      } else {
        this.image = URL.createObjectURL(file);
      }
    },    
    removeImage() {
      this.image = undefined;
      this.$emit('remove');
      this.isPreview = '';
    },
    imageChange(e) {
      return this.isLoading ? true : this.imageOrPreview ?  this.removeImage() : this.onFileChange(e);
    },
  },
};
</script>

<style scoped>
.image-uploader 

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
