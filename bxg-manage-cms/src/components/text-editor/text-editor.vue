<template>
  <div>
    <input type="file" id="photoFileUpload" style="display: none">
    <textarea class="tinymce-textarea" id="tinymceEditer"></textarea>
    <Spin fix v-if="spinShow">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>加载组件中...</div>
    </Spin>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import apiConfig from '@/config/apiconfig'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'text-editor',
  data() {
    return {
      spinShow: true,
      htmlText: '',
      pureText: ''
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let vm = this
        let height = document.body.offsetHeight - 300
        tinymce.init({
          selector: '#tinymceEditer',
          theme: 'modern',
          branding: false,
          elementpath: false,
          height: height,
          language: 'zh_CN',
          menubar: true,
          toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `,
          plugins: `
          paste
          importcss
          image
          code
          table
          advlist
          link
          media
          lists
          textcolor
          colorpicker
          hr
          preview
        `,

          // CONFIG

          forced_root_block: 'p',
          force_p_newlines: true,
          importcss_append: true,

          // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
          content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,

          insert_button_items: 'image link | inserttable',

          // CONFIG: Paste
          paste_retain_style_properties: 'all',
          paste_word_valid_elements: '*[*]', // word需要它
          paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          paste_convert_word_fake_lists: false, // 插入word文档需要该属性
          paste_webkit_styles: 'all',
          paste_merge_formats: true,
          nonbreaking_force_tab: false,
          paste_auto_cleanup_on_paste: false,
          // CONFIG: Font
          fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
          // CONFIG: StyleSelect
          style_formats: [
            {
              title: '首行缩进',
              block: 'p',
              styles: { 'text-indent': '2em' }
            },
            {
              title: '行高',
              items: [
                { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
                {
                  title: '1.5',
                  styles: { 'line-height': '1.5' },
                  inline: 'span'
                },
                { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
                {
                  title: '2.5',
                  styles: { 'line-height': '2.5' },
                  inline: 'span'
                },
                { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
              ]
            }
          ],

          // FontSelect
          font_formats: `
          微软雅黑=微软雅黑;
          宋体=宋体;
          黑体=黑体;
          仿宋=仿宋;
          楷体=楷体;
          隶书=隶书;
          幼圆=幼圆;
          Andale Mono=andale mono,times;
          Arial=arial, helvetica,
          sans-serif;
          Arial Black=arial black, avant garde;
          Book Antiqua=book antiqua,palatino;
          Comic Sans MS=comic sans ms,sans-serif;
          Courier New=courier new,courier;
          Georgia=georgia,palatino;
          Helvetica=helvetica;
          Impact=impact,chicago;
          Symbol=symbol;
          Tahoma=tahoma,arial,helvetica,sans-serif;
          Terminal=terminal,monaco;
          Times New Roman=times new roman,times;
          Trebuchet MS=trebuchet ms,geneva;
          Verdana=verdana,geneva;
          Webdings=webdings;
          Wingdings=wingdings,zapf dingbats`,
          // Tab
          tabfocus_elements: ':prev,:next',
          object_resizing: true,
          // Image
          imagetools_toolbar:
            'rotateleft rotateright | flipv fliph | editimage imageoptions',
          images_upload_url: `${apiConfig.bmfUrl}/attachment/files`,
          automatic_uploads: false,
          file_picker_types: 'file',
          images_upload_handler: function(blobInfo, success, failure) {
            let imgType = ['jpg', 'png', 'gif', 'JPG', 'PNG', 'GIF']
            let typeName = blobInfo.blob().name.split('.')
            let fileName = typeName[typeName.length - 1]
            let img = new Image()
            img.src = blobInfo.blobUri()
            img.onload = function() {
              if(img.width>850){
                failure('图片宽度不能大于850')
              }
              return;
            }
            if (blobInfo.blob().size < 2048) {
              failure('文件体积过大')
            }
            if (imgType.indexOf(fileName) >= 0) {
              let formData = new FormData()
              formData.append('fileType', 1)
              formData.append('file', blobInfo.blob())
              let config = {
                headers: {
                  Authorization: 'Bearer ' + vm.token,
                  'Content-Type': 'multipart/form-data'
                }
              }
              axios
                .post(`${apiConfig.bmfUrl}/attachment/files`, formData, config)
                .then(res => {
                  let data = JSON.parse(res.data.result)
                  success(data.result.url)
                })
            } else {
              failure('图片格式错误')
            }
          },
          setup: function(editor) {
            editor.on('init', function(e) {
              vm.spinShow = false
              if (localStorage.editorContent) {
                tinymce
                  .get('tinymceEditer')
                  .setContent(localStorage.editorContent)
              }
            })
            function getContent() {
              //获取富文本内容
              if (!tinymce.get('tinymceEditer')) {
                return false
              }
              localStorage.editorContent = tinymce
                .get('tinymceEditer')
                .getContent()
              localStorage.editorTextContent = tinymce.activeEditor.getBody().textContent
              vm.htmlText = tinymce.get('tinymceEditer').getContent()
              vm.pureText = tinymce.activeEditor.getBody().textContent
            }
            editor.on('input change undo redo', vm._.debounce(getContent, 200))
          }
        })
      })
    }
  },
  computed: {
    ...mapState({
      token: state => state.keycloak.keycloak.token
    })
  },
  mounted() {
    setTimeout(() => {
      this.init()
    }, 300)
  },
  destroyed() {
    tinymce.get('tinymceEditer').initialized = false
    tinymce.get('tinymceEditer').destroy()
  }
}
</script>

<style lang="less">
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
