<template>
  <div>
    <Row>
      <Col span="24">
        <Form
          ref="formElem"
          :model="formValidate"
          :rules="ruleValidate"
          label-position="left"
          :label-width="100"
        >
          <Row :gutter="10">
            <Col span="16">
              <Card dis-hover>
                <FormItem label="关联栏目：" prop="menuId">
                  <Select
                    placeholder="一级栏目"
                    :label-in-value="true"
                    v-model="formValidate.menuId"
                    @on-change="getOneMenuName"
                  >
                    <Option
                      v-for="(item,index) in subjectList"
                      :key="index"
                      :value="item.menuId"
                    >{{item.menuName}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="标题：" prop="title" class="input-box" style="position: relative;">
                  <Input placeholder="请输入标题" v-model="formValidate.title"/>
                  <span style="color:#ccc;position:absolute; top:29px; right:10px;">50字</span>
                </FormItem>
                <Row>
                  <Col span="3">
                    <p style="font-size:12px">
                      <span
                        style="color:red;margin-right: 4px;font-size:12px;font-family: SimSun;"
                      >*</span>内容：
                    </p>
                  </Col>
                  <Col span="21">
                    <text-editor ref="editor"></text-editor>
                  </Col>
                </Row>
                <FormItem label="关键字：" prop="keywords" style="margin-top:20px;padding-right:40px">
                  <Row>
                    <Col span="14" style="position: relative;">
                      <Input placeholder="请输入关键字" v-model="formValidate.keywords"/>
                      <span style="color:#ccc;position:absolute; top:29px; right:10px;">50字</span>
                    </Col>
                    <Col span="10">
                      <span>注：多关键字可用英文“,”隔开，例如程序员,路径</span>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem
                  label="网页描述："
                  prop="description"
                  style="position: relative; padding-right:40px"
                >
                  <Input
                    type="textarea"
                    :autosize="{minRows: 4,maxRows: 5}"
                    placeholder="请输入网页描述"
                    v-model="formValidate.description"
                  />
                  <span style="color:#ccc;position:absolute; bottom:-36px; right:10px;">200字</span>
                </FormItem>
              </Card>
            </Col>
            <Col span="8">
              <Card dis-hover>
                <Row>
                  <Col span="7">
                    <p style="font-size:12px">
                      <span
                        style="color:red;margin-right: 4px;font-size:12px;font-family: SimSun;"
                      >*</span>缩略图
                    </p>
                  </Col>
                  <Col span="17">
                    <img-upload ref="imgUpload"></img-upload>
                  </Col>
                </Row>
                <FormItem label="图片描述：" prop="imgDesc" style="position: relative;">
                  <Input placeholder="请输入图片描述" v-model="formValidate.imgDesc"/>
                  <span style="color:#ccc;position:absolute; top:29px; right:10px;">50字</span>
                </FormItem>
              </Card>
              <Card dis-hover style="margin-top:20px;">
                <FormItem
                  v-for="(item, index) in formValidate.indexKeywords"
                  v-if="item.status"
                  :key="index"
                  :label="'关键词 ' + item.index"
                  :prop="'indexKeywords.' + index + '.value'"
                  :rules="{required: true, message:  '关键词'+item.index +'不能为空 ', trigger: 'blur'}"
                >
                  <Row>
                    <Col span="18">
                      <Input type="text" v-model="item.value" placeholder="请输入关键词"/>
                    </Col>
                    <Col span="4" offset="1" v-if="formValidate.indexKeywords.length == 1">
                      <Button disabled @click="handleRemove(index)">删除</Button>
                    </Col>
                    <Col span="4" offset="1" v-else>
                      <Button @click="handleRemove(index)">删除</Button>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem>
                  <Row>
                    <Col span="12">
                      <Button type="dashed" long @click="handleAdd" icon="md-add">新增关键词</Button>
                    </Col>
                  </Row>
                </FormItem>
              </Card>
              <Card dis-hover style="margin-top:20px;">
                <FormItem label="文章来源：" prop="origin">
                  <RadioGroup v-model="formValidate.origin">
                    <Radio label="ORIGINAL">原创</Radio>
                    <Radio label="REPRINT">转载</Radio>
                  </RadioGroup>
                </FormItem>
              </Card>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
    <Row style="margin-top:20px;text-align:center;">
      <Col>
        <Card dis-hover>
          <Button type="primary" :disabled="disableBack" @click="handleSubmit('SUBMIT')">提交，返回列表</Button>
          <Button
            type="primary"
            :disabled="disableAdd"
            style="margin-left: 8px"
            @click="handerCarry('SUBMIT')"
          >提交，继续添加</Button>
          <Button
            type="primary"
            :disabled="disableSave"
            style="margin-left: 8px"
            @click="handerPreview('SAVE')"
          >保存，并预览</Button>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import textEditor from '@/components/text-editor/text-editor'
import imgUpload from '@/components/img-upload/img-upload'
import { mapState, mapGetters, mapActions } from 'vuex'
import api from '@/api/index'
import apiConfig from '@/config/apiconfig'
export default {
  components: {
    textEditor,
    imgUpload
  },
  data() {
    return {
      index: 1,
      id: '',
      disableBack: false,
      disableAdd: false,
      disableSave: false,
      formValidate: {
        menuId: '',
        menuName: '',
        title: '',
        content: '',
        contentPlain: '',
        keywords: '',
        description: '',
        img: '',
        imgDesc: '',
        indexKeywords: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ],
        origin: 'ORIGINAL'
      },
      ruleValidate: {
        menuId: [
          {
            required: true,
            type: 'number',
            message: '请选择一级栏目',
            trigger: 'change'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '最多输入50字',
            trigger: 'change'
          }
        ],
        keywords: [
          {
            required: true,
            message: '请输入关键词',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '最多输入50字',
            trigger: 'change'
          }
        ],
        description: [
          {
            required: true,
            type: 'string',
            message: '请输入网页描述',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '最多输入200字',
            trigger: 'change'
          }
        ],
        imgDesc: [
          {
            required: true,
            message: '请输入图片描述',
            trigger: 'blur'
          },
          {
            max: 50,
            message: '最多输入50字',
            trigger: 'change'
          }
        ],
        origin: [
          {
            required: true,
            message: '请选择文章来源',
            trigger: 'change'
          }
        ]
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      if (to.name === 'update-article') {
        let result = await api.getArticlesItem({
          id: vm.$route.query.id
        })
        if (result.status === 200) {
          vm.formValidate.menuId = result.result.menuId
          vm.formValidate.title = result.result.title
          localStorage.editorContent = result.result.content
          localStorage.editorTextContent = result.result.contentPlain
          vm.formValidate.keywords = result.result.keywords
          vm.formValidate.description = result.result.description
          vm.$refs.imgUpload.img = result.result.img
          vm.formValidate.imgDesc = result.result.imgDesc
          vm.formValidate.origin = result.result.origin
          vm.id = result.result.id
          vm.index = result.result.indexKeywords.length
          vm.formValidate.indexKeywords = result.result.indexKeywords.map(
            (item, index) => {
              return (vm.formValidate.indexKeywords[index] = {
                value: item,
                index: ++index,
                status: 1
              })
            }
          )
          vm.$refs.imgUpload.uploadList.push({
            url: result.result.img,
            status: 'finished'
          })
        }
      } else {
        localStorage.editorContent = ''
      }
    })
  },
  mounted() {
    // console.log(this.$refs.editor)
    this.fetchSubjects()
  },
  methods: {
    ...mapActions({
      fetchSubjects: 'student/fetchSubjects'
    }),
    getOneMenuName(val) {
      if (typeof val != 'undefined') {
        this.formValidate.menuName = val.label
      }
    },
    saveContent(state, active) {
      this.$refs.formElem.validate(async valid => {
        if (
          !localStorage.editorTextContent ||
          localStorage.editorTextContent === ''
        ) {
          this.$Message.destroy()
          this.$Message.error('内容不能为空')
          this.disableBack = false
          this.disableAdd = false
          this.disableSave = false
          return false
        } else {
          let reg = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
          if (localStorage.editorTextContent.match(reg)) {
            this.$Message.destroy()
            this.$Message.warning('内容暂不支持表情输入')
            this.disableBack = false
            this.disableAdd = false
            this.disableSave = false
            return false
          }
        }
        if (!this.$refs.imgUpload.img) {
          this.$Message.destroy()
          this.$Message.error('缩略图不能为空')
          this.disableBack = false
          this.disableAdd = false
          this.disableSave = false
          return false
        }
        if (!valid) {
          this.disableBack = false
          this.disableAdd = false
          this.disableSave = false
          return false
        }
        if (valid) {
          this.formValidate.content = localStorage.editorContent
          this.formValidate.contentPlain = localStorage.editorTextContent
          this.formValidate.img = this.$refs.imgUpload.img
          let obj = this._.cloneDeep(this.formValidate)

          let indexKeywords = obj.indexKeywords.map((item, index) => {
            if (item.status) {
              return (obj.indexKeywords[index] = item.value)
            }
          })

          obj.indexKeywords = indexKeywords.join(',')
          obj.operation = state

          if (this.id) {
            obj.id = this.id
          }

          let result = await api.postSaveArticles(obj)
          if (result.status === 201) {
            this.disableBack = false
            this.disableAdd = false
            this.disableSave = false

            if (active === 'back') {
              tinymce.get('tinymceEditer').setContent('')
              // 保存返回
              this.$Message.success('资讯创建成功')
              this.$refs.formElem.resetFields()
              localStorage.editorContent = ''
              localStorage.editorTextContent = ''
              this.$refs.imgUpload.uploadList.length = 0
              this.$refs.imgUpload.img = ''
              this.id = ''
              this.$router.push({
                name: 'info-list'
              })
            } else if (active === 'preview') {
              //保存预览
              let { a, b, c } = result.result
              this.id = a
              //https://online-dev.boxuegu.com/articles/9?a=9&b=1550454271088&c=C94284D9B6E2C95E8E305673757050E7
              window.open(
                `${apiConfig.newsUrl}/news/${a}?a=${a}&b=${b}&c=${c}`,
                '_blank'
              )
              return
            } else {
              this.$Message.success('提交成功') // 提交、继续添加
              this.$refs.formElem.resetFields()
              localStorage.editorContent = ''
              localStorage.editorTextContent = ''
              this.$refs.imgUpload.uploadList.length = 0
              this.$refs.imgUpload.img = ''
              this.id = ''
              tinymce.get('tinymceEditer').setContent('')
            }
          } else {
            this.$Message.error(result.message)
            this.disableBack = false
            this.disableAdd = false
            this.disableSave = false
          }
        }
      })
    },
    handleSubmit(state) {
      //提交返回列表
      this.disableBack = true
      this.saveContent(state, 'back')
    },
    handerCarry(state) {
      //提交继续添加
      this.disableAdd = true
      this.saveContent(state, 'add')
    },
    handerPreview(state) {
      this.disableSave = true
      this.saveContent(state, 'preview')
    },
    handleAdd() {
      this.index++
      this.formValidate.indexKeywords.push({
        value: '',
        index: this.index,
        status: 1
      })
    },
    handleRemove(index) {
      this.formValidate.indexKeywords.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters({
      //学科
      subjectList: 'student/subjectList'
    })
  }
}
</script>

<style>
</style>
