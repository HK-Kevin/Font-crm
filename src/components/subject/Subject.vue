<template>
  <div class="subject_main">
    <sub-input 
    :selectedType="selectedType"
    :types="types"
    :sortType="sortType"
    :selectedSort="selectedSort"
    @onChange="searchChange"
    ></sub-input>
    <div class="add_delete">
      <Button type="info" icon="plus-round" ><router-link to="one/add">增加</router-link></Button>
      <Button type="error" icon="minus-round" @click="removeAll(deleteIdArr)">删除</Button>
    </div>
    <div>
      <sub-table 
      :tableData="tableData" 
      :totalPages='totalPages'
      @on-remove='remove'
      @on-remove-one='removeAll'
      @on-update='update'
      @on-pageChange='pageChange'
      @on-pageSizeChange='pageSizeChange'
      ></sub-table>
    </div>
  </div>
</template>

<script>
import subInput from "./sub-input";
import subTable from "./sub-table";
import { type, sortType } from "./data";
import { httpTable, httpDelete } from "../../services/subject.service";
export default {
  name: "Subject",
  data() {
    return {
      selectedType: "", //选中的类型
      types: type, //所有的 类型
      sortType: sortType, //排序类型
      selectedSort: "clicks", //默认的排序方式
      deleteIdArr: [],
      totalPages: 100, // 页数
      pageNum: 1, // 当前页
      pageSize:10, // 每页条数
      tableData: []
    };
  },
  created() {
    this.initTabel();
  },
  methods: {
    initTabel() {
      httpTable(this.formatPostData()).then(res => {
        this.totalPages = res.data.count;
        this.tableData = res.data.data;
      });
    },
    formatPostData() {
      return {
        page: this.pageNum,
        limit: this.pageSize,
        sort: this.selectedSort,
        type: this.selectedType
      };
    },
    searchChange(e) {
      this.selectedType = e.type;
      this.selectedSort = e.sort;
    },
    remove(e) {
      this.deleteIdArr = e;
    },
    removeAll(ids) {
      this.$Modal.confirm({
        title: "Title",
        content: "确定删除？",
        onOk: () => {
          httpDelete({ id: ids }).then(res => {
            this.initTabel();
            this.$Message.success("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    update(id) {
      this.$router.push(`/one/${id}`);
    },
    pageChange(pageNum) {
      this.pageNum = pageNum;
       this.initTabel();
    },
    pageSizeChange(pageSize){
      this.pageSize = pageSize;
      this.initTabel()
      
    }
  },
  watch:{
    'selectedSort':function(newVal){    
       this.initTabel();
    },
    'selectedType':function(newVal){
      this.initTabel();
    }
  },
  components: { subInput, subTable }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subject_main {
  width: 100%;
  height: 100%;
  margin-top: 30px;
  padding-left: 10%;
}
.add_delete {
  margin-bottom: 10px;
}
</style>
