<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="关于我们标题" prop="title">
        <Input v-model="formValidate.title" placeholder="关于我们标题"></Input>
      </FormItem>
      <FormItem label="关于我们作者" prop="author">
        <Input v-model="formValidate.author" placeholder="关于我们作者"></Input>
      </FormItem>
      <FormItem label="关于我们简介" prop="description">
        <Input v-model="formValidate.description" placeholder="关于我们简介"></Input>
      </FormItem>
      <FormItem label="关于我们分类" v-if="categoryList.length > 0">
        <Select v-model="formValidate.category_id">
          <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="关于我们封面" prop="cover">
        <div class="cover">
          <div class="upload">
            <Upload
              multiple
              type="drag"
              action="http://up-z2.qiniu.com"
              :show-upload-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :data="{token}">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或者拖拽上传</p>
              </div>
            </Upload>
          </div>
          <div class="About-cover" v-if="formValidate.cover">
            <img :src="formValidate.cover" alt="cover">
          </div>
        </div>
      </FormItem>
      <FormItem label="关于我们内容" prop="content">
        <mavon-editor
          v-model="formValidate.content"
          :ishljs="true"
          ref=md>
        </mavon-editor>

      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import {mapActions} from 'vuex';
  import getUploadToken from '../../libs/upload-token'

  export default {
    data() {
      return {
        token: '',
        id: this.$route.params.id,
        detail: null,
        categoryList: [],
        formValidate: {
          title: '',
          author: '',
          category_id: '',
          cover: '',
          description: '',
          content: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '作者不能为空', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '封面不能为空', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '简介不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getCategoryList();
      this._getUploadToken();
    },
    methods: {
      ...mapActions({
        createAbout: 'about/createAbout',
        getCategoryList: 'category/getCategoryList'
      }),
      // 上传图片成功
      uploadSuccess(response) {
        const url = `http://cdn.boblog.com/${response.key}`;
        this.formValidate.cover = url;
        this.$Message.success('上传成功!');
      },
      // 上传图片失败
      uploadError(response) {
        this.$Message.error('上传失败!');
        console.log(response)
      },
      // 获取上传token
      async _getUploadToken() {
        try {
          const res = await getUploadToken();
          this.token = res.token;

        } catch (e) {
          console.log(e)
        }
      },
      // 获取分类列表
      async _getCategoryList() {
        const res = await this.getCategoryList();
        this.categoryList = res.data.data;
      },
      // 创建
      async _createAbout() {
        this.formValidate.id = this.id;

        try {
          await this.createAbout(this.formValidate);
          this.$Message.success('新增成功!');
          // this.$router.push('/about');

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._createAbout();

          } else {
            this.$Message.error('请完成表单!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style scoped>
  .About-cover {
    width: 120px;
  }

  .About-cover img {
    width: 100%;
  }

  .cover {
    display: flex;
  }

  .cover .upload {
    width: 280px;
    margin-right: 32px;
  }
</style>
