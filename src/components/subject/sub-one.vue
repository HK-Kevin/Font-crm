<template>
  <div class="update">
     <Form :model="subject" :label-width="80" >
        <FormItem label="题目">
            <Input v-model="subject.title" placeholder="Enter something..."/>
        </FormItem>
        <FormItem label="类型">
            <Select style="width:500px" v-model="subject.type">
                <Option v-for="(item,index) in types" :value="item" :key="index">{{item}}</Option>
            </Select>
        </FormItem>
        <FormItem label="重要性">
            <Rate v-model="subject.important"></Rate>
        </FormItem>
        <FormItem label="公司">
            <Tag v-for="item in subject.company" :key="item" :name="item" closable @on-close="handleClose">{{ item}}</Tag>
    <input v-model="company" type="text" style="height:22px;width:60px"><Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加标签</Button>
             <!-- <Input v-model="subject.company" placeholder="Enter something..." /> -->
        </FormItem>
    
        <FormItem label="难度">
           <InputNumber :max="10" :min="1" v-model="subject.hard"></InputNumber>
        </FormItem>
         <FormItem label="参考">
           <Button  @click="addRef" icon="plus"></Button>
             <div>
               <Input
                 style="margin:3px 0"
                 v-for="(item,index) in subject.reference" 
                 :key="index" 
                 v-model="subject.reference[index]" 
                 placeholder="Enter something..." >
                   <Button slot="append" @click="deleteRef(index)" icon="ios-minus-empty"></Button>
               </Input>
             </div>
        </FormItem>
        <FormItem label="编辑答案">
           <quill-editor 
           style="height:300px;width:100%" 
           ref="myTextEditor"
           :options="editorOption"
            v-model="subject.answer">
              </quill-editor>
        </FormItem>
         </Form>   
          <div class="btn">
             <Button type="primary" @click="onSubmit">提交</Button>
             <Button type="ghost" style="margin-left: 8px" @click="onGoSubejct">返回</Button>
             <Button type="info" style="margin-left: 8px" @click="modal=true">预览答案</Button>
          </div>
          <Modal
        title="预览答案"
        v-model="modal"
        :styles="{top: '20px',width:'800px',height:'500px'}">
        <div class="answer_html" v-html="subject.answer"></div>
    </Modal>
  </div>
</template>

<script>
import hljs from 'highlight.js';
//import 'highlight.js/styles/googlecode.css' //样式文件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "highlight.js/styles/atom-one-light.css"; //样式文件
import { quillEditor } from "vue-quill-editor";
import { type } from "./data";
import { httpAdd, httpOne, httpUpdate } from "../../services/subject.service";
export default {
  name: "sub-one",
  props: [],
  data() {
    return {
      id: "",
      types: type,
      modal: false,
      company:'',
       count: [0, 1, 2],
      subject: {
        title: "",
        type: "",
        company:[],
        reference: [""],
        important: 3,
        hard: 5,
        answer: "<h2>I am Example</h2>"
      },
      editorOption:{
        modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
      }
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id === "add") {
      return;
    } else {
      httpOne(this.id).then(res => {
        this.subject = JSON.parse(JSON.stringify(res.data));
      });
    }
  },
  methods: {
    onSubmit() {
      if (this.id === "add") {
        httpAdd(this.subject).then(res => {
          if (res.data.result) {
            this.$Message.success("添加成功");
          } else {
            this.$Message.error("添加失败");
          }
        });
        return;
      } else {
        httpUpdate(this.subject).then(res => {
          if (res.data.result) {
            this.$Message.success("更新成功");
          } else {
            this.$Message.error("更新失败");
          }
        });
      }
    },
    onGoSubejct() {
      this.$router.go(-1);
    },
    addRef() {
      this.subject.reference.push("");
    },
    deleteRef(index) {
      console.log(123);
      this.subject.reference.splice(index, 1);
    },
    handleAdd() {
      if(this.company === ''){
        this.$Message.info("不能为空")
        return
      }
      this.subject.company.push(this.company);   
    },
    handleClose(event, name) {
      const index = this.subject.company.indexOf(name);
      this.subject.company.splice(index, 1);
    }
  },
  components: { quillEditor }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.update {
  margin-top: 10px;
}
.btn {
  margin: 140px 0 0 80px;
}
.answer_html {
  height: 600px;
  overflow: auto;
}
</style>
