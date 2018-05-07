<template>
  <div id="app">
     <header> 
       <div class="app_header">
          <h1>QD内容管理系统</h1>
       </div>
     </header>
  <div class="content">
      <Menu :theme="'light'" active-name="1">
        
            <MenuItem name="1">
                <Icon type="document-text"></Icon>
                  <router-link to="/subject">题目管理</router-link>
            </MenuItem>
            <MenuItem name="2">
                <Icon type="chatbubbles"></Icon>
                就业管理
            </MenuItem>
       </Menu>
      <div class="router">
 <router-view/>
    
      </div>
  </div>
   
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.app_header {
  width: 100%;
  height: 50px;
  background-color: #1995dc;
}
.app_header h1 {
  color: white;
  line-height: 50px;
  padding-left: 10%;
  padding-right:10% 
}
.content {
  flex: 1;
  display: flex;
  padding-left: 10%;
  padding-right:10% ;
  flex-direction: row;
  border: 1 solid gray
}
.content div.router {
  flex: 1;
}
</style>
