<template>
  <div class="tab">
    <div class="tab-bar clearfix">
      <a style="min-width: 50px !important;border-right: 1px solid #ccc">
        <el-checkbox v-model="add"></el-checkbox>
      </a>
      <a href="javascript:;"
         @click="tab(index)"
         v-for="(TabHead,index) in TabHeads"
         :class="{active : index===curId}"
         :key="index"
      >{{TabHead}}</a>
    </div>
    <div style="clear:both"></div>
    <div class="tab-con">
      <div
        v-show="index===curId"
        v-for="(content, index) in contents" :key="index">
        <SlotDiv v-show="index===0">
          <div style="width: 100%;height: 100%;display: flex">
            <div style="width: 20%;padding: 10px">
              <el-image :src="small_image" style="width: 262px;height: 192px;margin-top: 50px">
                <div slot="placeholder" class="image-slot" style="">
                  <i class="el-icon-loading" style="font-size: 16px"></i>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div  style="width: 80%;padding: 10px">
              <div style="display: flex;height: 20px;">
                <div style="flex: 1">Original title</div>
                <div  style="flex: 1;text-align: right">
                  <a href="www.baidu.com" >View original product ></a>
                </div>
              </div>
              <div style="height: 40px">{{title}}</div>

              <div style="height: 20px">
                Change Title:
              </div>
              <div style="height: 20px">
                <el-input v-model="title" size="mini"></el-input>
              </div>

              <div style="clear: both;height: 20px"></div>

              <div style="height: 20px">
                Collections:
              </div>
              <div style="height: 20px">
                <el-input v-model="input" placeholder="Search for collections" size="mini"></el-input>
              </div>

              <div style="clear: both;height: 20px"></div>

              <div style="display: flex">
                <div style="width: 40%;padding-right: 10px">
                  <div style="height: 20px">
                    Type:
                  </div>
                  <div style="height: 20px">
                    <el-input v-model="input" placeholder="Select Type" size="mini"></el-input>
                  </div>
                </div>
                <div style="width: 60%;padding-left:10px">
                  <div style="height: 20px">
                    Tags:
                  </div>
                  <div style="height: 20px">
                    <el-input v-model="input" placeholder="Search for tags" size="mini"></el-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlotDiv>
        <SlotDiv v-show="index===1">
          <div>
            <vue-editor v-model="info" style="height: 250px"></vue-editor>
          </div>
        </SlotDiv>
        <SlotDiv v-show="index===2" style="padding: 10px">
          <div>
            <el-table :data="productList" style="width: 100%;height: 280px" size="mini" empty-text="No relevant data available">
              <el-table-column prop="" label="Images" width="180"  align="center">
                <div style="background-color: #96C11F;height: 100px">
                  <el-image :src="small_image" style="height: 100%;width: auto">
                    <div slot="placeholder" class="image-slot" style="">
                      <i class="el-icon-loading" style="font-size: 16px"></i>
                    </div>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-table-column>
              <el-table-column prop="sku" label="SKU" width="180" align="center"></el-table-column>
              <el-table-column prop="cost" label="Cost" align="center"></el-table-column>
              <el-table-column prop="address" label="Shipping" align="center"></el-table-column>
              <el-table-column prop="" label="Price" align="center">
                <div style="height: 100px" class="row-cell">
                  <div style="flex: 1"></div>
                  <el-input  v-model="editPrice" placeholder="" size="mini" style="flex: 1" @change="priceChange"></el-input>
                  <div style="flex: 1"></div>
                </div>
              </el-table-column>
              <el-table-column prop="address" label="Compared At  Price" align="center">
                <div style="height: 100px" class="row-cell">
                  <div style="flex: 1"></div>
                  <el-input  v-model="comparePrice" placeholder="" size="mini" style="flex: 1" @change="priceChange"></el-input>
                  <div style="flex: 1"></div>
                </div>
              </el-table-column>
              <el-table-column prop="qty" label="Inventory" align="center"></el-table-column>
            </el-table>
          </div>
        </SlotDiv>
        <SlotDiv v-show="index===3">
          <div style="padding: 10px;height: 280px;overflow-y: scroll">

          </div>
        </SlotDiv>
      </div>
    </div>
  </div>
</template>

<script>
import SlotDiv from '../Public/SlotDiv';
import { VueEditor } from 'vue2-editor';

export default {
    name: 'ImportList',
    components: { SlotDiv, VueEditor },
    created () {
        this.productList.push(this.product);
    },
    computed: {
        editPrice: {
            get () {
                return this.price;
            },
            set (value) {
                // this.priceChange.call(this, value)
            }
        }
    },
    props: [
        'TabHeads', 'product', 'title', 'description', 'small_image', 'price', 'add'
    ],
    data () {
        return {
            curId: 0,
            checked: false,
            input: '',
            info: this.description,
            productList: [],
            // editPrice: 0,
            comparePrice: 0,
            contents: [
                { content: 'HTML' },
                { content: 'CSS' },
                { content: 'JavaScript' },
                { content: 'Vue' }
            ]
        };
    },
    methods: {
        tab (index) {
            this.curId = index;
        },
        priceChange: function (value) {
            this.editPrice = value;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab {
    width: 95%;
    border: 1px solid #ccc;
    margin: 10px auto;
    border-radius: 5px;
    background-color: #FFFFFF;
  }
  .tab-bar {
    width:100%;
    height: 40px;
    /*background-color: #ccc;*/
    border-bottom: 1px solid #ccc;
  }
  .tab-bar a {
    float: left;
    min-width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    text-decoration: none;
    color: #000;
    border-right: 1px solid #ccc
  }
  .tab-bar .active {
    background-color: #0099ff;
  }
  .tab-con div {
    text-align: left;
    height: 300px;
  }

  .noticebox{ border: 1px solid #cccccc;height: 50px;padding: 10px;border-radius: 5px }
  .noticebox div{ height: 50px !important; }

  .row-cell{ height: 100px;display: flex;flex-direction: column }
</style>
