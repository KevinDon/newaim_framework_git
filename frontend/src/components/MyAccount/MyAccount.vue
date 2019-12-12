<template>
  <div class="MyAccount">
    <el-container>
      <el-header>
        <div>
          <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
            <!--<el-breadcrumb-item :to="{ path: '/' }">DashBoard</el-breadcrumb-item>-->
            <!--<el-breadcrumb-item>My Account</el-breadcrumb-item>-->
          <!--</el-breadcrumb>-->
          <div style="display: flex;justify-content: space-between">
            <h3 style="margin: 10px;line-height: 20px;">My Account</h3>
            <span style="line-height: 20px;margin: 5px">
              <el-button type="primary" size="mini" @click="saveconfig" plain round>Save Config</el-button>
            </span>
          </div>
          <hr style="width: 100%;border: 1px solid rgb(239,239,239);margin-top: 0px">
        </div>
      </el-header>
      <el-main style="min-height: 760px">
        <div>
          <div style="background-color: #32BCDE;height: 30px">
            <h3 style="color: white;padding-left: 10px;line-height: 30px;margin: 0px">General</h3>
          </div>

          <div style="display: flex;flex-wrap: wrap;padding: 10px">
            <div class="col-1 itemlabel">My Account Details</div>
            <div class="col-4 itemlabel">Emali Address :</div>
            <div class="col-4 item">{{ this.$store.state.email }}</div>
            <div class="col-4 itemlabel">BIilling Address :</div>
            <div class="col-4 item">{{ this.$store.state.address }}</div>
            <div class="col-4 itemlabel">User Name :</div>
            <div class="col-4 item">{{ this.$store.state.name }}</div>
            <div class="col-4 itemlabel">Suburb :</div>
            <div class="col-4 item">{{ this.$store.state.suburb }}</div>
            <!--<div class="col-4 itemlabel">Last Name :</div>-->
            <!--<div class="col-4 item">{{ this.$store.state.lastname }}</div>-->
            <div class="col-4 itemlabel">Postcode :</div>
            <div class="col-4 item">{{ this.$store.state.postcode }}</div>
            <div class="col-4 itemlabel">Phone :</div>
            <div class="col-4 item">{{ this.$store.state.phone }}</div>
            <div class="col-4 itemlabel">State :</div>
            <div class="col-4 item">{{ this.$store.state.state }}</div>
            <div class="col-4 itemlabel">Website :</div>
            <div class="col-4 item">{{ this.$store.state.website }}</div>
            <div class="col-4 itemlabel">Country :</div>
            <div class="col-4 item">{{ this.$store.state.country }}</div>
          </div>
        </div>
        <div>
          <div style="background-color: #32BCDE;height: 30px">
            <h3 style="color: white;padding-left: 10px;line-height: 30px;margin: 0px">Account Binding</h3>
          </div>

          <div style="display: flex;flex-wrap: wrap;padding: 10px">
            <div class="col-4 itemlabel">Dropshiozone Account</div>
            <div class="col-4 item">{{ this.$store.state.email }}</div>
            <div class="col-4 item">
              <p style="color: #32BCDE" @click="accountRemove">Remove</p>
            </div>
          </div>
          <!--折叠面板-->
          <div class="nobottom">
            <el-collapse style="width: 52%;border: 0px;margin-left: 10px">
              <el-collapse-item title="Advanced Setting" name="1" style="font-size: 14px;font-weight: bold">
                <div>
                  <el-checkbox v-model="update_stock" style="color: black">Stock Auto Update</el-checkbox><br/>
                  <p style="font-weight: normal;color: rgb(139,139,139)">Update stock automatically once supplier's stock was changed</p>
                  <el-checkbox v-model="update_product"  style="color: black">Product  Auto update</el-checkbox>
                  <p style="font-weight: normal;color: rgb(139,139,139)">Update product title, description, images Automatically once supplier's stock was changed</p>
                  <el-checkbox v-model="update_price" style="color: black">Price  Auto update</el-checkbox><br/>
                  <p style="font-weight: normal;color: rgb(139,139,139)">Update price automatically once supplier's selling price was changed</p>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </el-main>
      <el-footer>
        <p style="text-align: center">©2012-2019 XXXXXX All rights reserved.</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
    name: 'MyAccount',
    mounted: function () {
    // if (this.$store.state.email) {
        let url = this.HOME + '/users/getuserinfo?email=';
        let me = this;

        this.$store.dispatch('showloadingMask');
        this.$http.get(url).then(function (response) {
            if (response.data.status === true) {
                me.$store.dispatch('hideloadingMask');
                me.$store.dispatch('getuserInfo', response.data.result);

                me.update_stock = response.data.result.update_stock;
                me.update_product = response.data.result.update_product;
                me.update_price = response.data.result.update_price;
            } else {

            }
        }).catch(function (error) {
            me.$store.dispatch('hideloadingMask');
            me.$message.error('Failed to obtain user information. Please try again later.');
            console.log(error);
        });
    // }
    },
    methods: {
        saveconfig: function () {
            let params = {
                update_stock: this.update_stock,
                update_product: this.update_product,
                update_price: this.update_price
            };
            let url = this.HOME + '/users/update';
            let me = this;
            this.$http.post(url, { params: params }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
                me.$store.dispatch('hideloadingMask');
                me.$message.error('Save failed, please try again later');
            });
        },
        accountRemove: function () {
            this.$confirm('Are you sure you to unbind the Dropshipzone Account', 'Notice', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                type: 'warning'
            }).then(() => {

            }).catch(() => {
                // 取消操作
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // })
            });
        }
    },
    data () {
        return {
            msg: '',
            email: '',
            update_product: true,
            update_stock: true,
            update_price: true
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .MyAccount{ width: calc(100% - 40px);height: calc(100% - 40px);padding: 20px;}
  .item{ padding: 10px 0px; }
  .itemlabel{ padding: 10px 0px;font-weight: bold;font-size: 14px }
</style>
