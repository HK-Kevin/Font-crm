<template>
  <div class="table">
     <Table 
     height="520" 
     border 
     :columns="columns" 
     @on-select='select' 
     @on-select-all ="select"
     :data="tableData"></Table>
     <Page style="margin-top:10px" :total="totalPages" @on-page-size-change="onPageSizeChange" @on-change="onChangePage" show-sizer></Page>
  </div>
</template>

<script>
import { tableColumns } from "./data";
export default {
  name: "sub-table",
  props: ["tableData","totalPages"],
  data() {
    return {
      columns: tableColumns.concat([
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(`/one/${params.row._id}`)
                    }
                  }
                },
                "更新"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]),
      total: this.totalPages
    };
  },
  methods: {
    show(e) {
      this.$emit("on-update", e._id);
    },
    remove(e) {
      this.$emit("on-remove-one", [e._id]);
    },
    select(e) {
      let idArr = e.map(row => row._id);
      this.$emit("on-remove", idArr);
    },
    // selectAll(e){

    // },
    onChangePage(e){
      this.$emit("on-pageChange", e);      
    },
    onPageSizeChange(e){
      this.$emit("on-pageSizeChange", e); 
    }
  }
};
</script>

<style scoped>

</style>
