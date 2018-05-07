<template>
  <div class="subject">
    <div class="tool">
       <div class="search">
        <Select @on-change="launchChange" v-model="sType" style="width:30%">
        <Option v-for="item in types" :value="item" :key="item">{{ item }}</Option>
        </Select>

       <Input placeholder="输入题目名称" v-model="sTitle" style="width: 60%"> 
       <Button @click="launchChange" slot="append" icon="ios-search"></Button>
        </Input>
       </div>
        <RadioGroup @on-change="launchChange" class="sort" v-model="sSort">
              <Radio v-for="(item,index) in sortType" :key="index" :label="item.value"><span>{{item.label}}</span></Radio>
         </RadioGroup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sub-input',
  props:['selectedType','sortType','types','selectedSort'],
  data () {
    return {
      sType:this.selectedType,
      sSort:this.selectedSort,
      sTitle:''
    }
  },
  methods:{
      launchChange(){
        const searchData =Object.assign({},{type:this.sType,sort:this.sSort,title:this.sTitle }) 
        this.$emit('onChange',searchData)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.subject {
  width: 100%;
  height: 80px;
}
.tool {
     display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
   
}
.search {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.sort {
  margin-top: 10px;

}
</style>
