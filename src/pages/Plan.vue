<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" placeholder="请输入计划名" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加计划</el-button>
      </div>
    </div>
    <el-table size="mini" ref="multipleTable" border style="width:100%" height="680px" :data="data"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="sprovince" label="始发省市" width="100" align="center"/>
      <el-table-column prop="saddr" label="始发地址" width="100" align="center"/>
      <el-table-column prop="eprovince" label="目的省市"  width="100" align="center"/>
      <el-table-column prop="eaddr" label="目的地址"  width="100" align="center"/>
      <el-table-column prop="sendDate" label="派送日期"  width="100" align="center"/>
      <el-table-column prop="vehicle" label="车辆"  width="100" align="center"/>
      <el-table-column prop="cargoName" label="货物名称"  width="100" align="center"/>
      <el-table-column prop="cargoWeight" label="货物重量"  width="100" align="center"/>
      <el-table-column prop="price" label="货物运费"  width="100" align="center"/>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!--添加-->
    <el-dialog title="添加计划" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px">
        <el-form-item prop="sProvince" label="始发省市" size="mini">
          <el-cascader size="mini" :options="areaOptions" v-model="selectedOptions.value" @change="handleChange" placeholder="请选择省/市/区"/>
        </el-form-item>
        <el-form-item prop="sAddr" label="始发地" size="mini">
          <el-input v-model="registerForm.sAddr" placeholder="始发地"></el-input>
        </el-form-item>
        <el-form-item prop="sProvince" label="目的省市" size="mini">
          <el-cascader size="mini" :options="areaOptions" v-model="selectedOptions1.value" @change="handleChange1" placeholder="请选择省/市/区"/>
        </el-form-item>
        <el-form-item prop="eAddr" label="目的地" size="mini">
          <el-input v-model="registerForm.eAddr" placeholder="目的地"></el-input>
        </el-form-item>
        <el-form-item prop="sendDate" label="发货日期"  size="mini">
          <el-input v-model="registerForm.sendDate" type="date" placeholder="发货日期"></el-input>
        </el-form-item>
        <el-form-item prop="vehicle" label="派送车辆" size="mini">
          <el-input v-model="registerForm.vehicle" placeholder="派送车辆"></el-input>
        </el-form-item>
        <el-form-item prop="cargoName" label="货物名称" size="mini">
          <el-input v-model="registerForm.cargoName" placeholder="货物名称"></el-input>
        </el-form-item>
        <el-form-item prop="cargoWeight" label="货物重量" size="mini">
          <el-input v-model="registerForm.cargoWeight" placeholder="货物重量"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="运费" size="mini">
          <el-input v-model="registerForm.price" placeholder="运费"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="addPlan">添加</el-button>
        <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改货物信息" :visible.sync="editVisible" width="400px" center>
      <el-form :model="form" ref="registerForm" label-width="80px">
        <el-form-item prop="sProvince" label="始发省市" size="mini">
          <el-cascader size="mini" :options="areaOptions" v-model="selectedOptions.value" @change="handleChange" placeholder="请选择省/市/区"/>
        </el-form-item>
        <el-form-item prop="sAddr" label="始发地" size="mini">
          <el-input v-model="form.sAddr" placeholder="始发地"></el-input>
        </el-form-item>
        <el-form-item prop="eProvince" label="目的省市" size="mini">
          <el-cascader size="mini" :options="areaOptions" v-model="selectedOptions1.value" @change="handleChange1" placeholder="请选择省/市/区"/>
        </el-form-item>
        <el-form-item prop="eAddr" label="目的地" size="mini">
          <el-input v-model="form.eAddr" placeholder="目的地"></el-input>
        </el-form-item>
        <el-form-item prop="sendDate" label="发货日期" size="mini">
          <el-input v-model="form.sendDate" type="date" placeholder="发货日期"></el-input>
        </el-form-item>
        <el-form-item prop="vehicle" label="派送车辆" size="mini">
          <el-input v-model="form.vehicle" placeholder="派送车辆"></el-input>
        </el-form-item>
        <el-form-item prop="cargoName" label="货物名称" size="mini">
          <el-input v-model="form.cargoName" placeholder="货物名称"></el-input>
        </el-form-item>
        <el-form-item prop="cargoWeight" label="货物重量" size="mini">
          <el-input v-model="form.cargoWeight" placeholder="货物重量"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="运费" size="mini">
          <el-input v-model="form.price" placeholder="运费"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
                <el-button size="mini" @click="editVisible = false">取消</el-button>
                <el-button size="mini" @click="editSave">确定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="删除货物" :visible.sync="delVisible" width="300px" center>
      <div align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
        <el-button size="mini" @click="deleteRow">确定</el-button>
        <el-button size="mini" @click="delVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {delPlan, getAllPlan, setPlan, updatePlan} from '../api/index';
import {regionData, CodeToText} from "element-china-area-data"
import {mixin} from '../mixins/index';

export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false, //添加弹窗是否显示
      editVisible: false,         //编辑弹窗是否显示
      delVisible: false,          //删除弹窗是否显示
      //省市
      areaOptions : regionData,
      selectedOptions : [],
      selectedOptions1:[],
      roleIds: '',
      registerForm: {//添加框
        sProvince:'',
        sAddr: '',
        eProvince:'',
        eAddr: '',
        sendDate: '',
        vehicle: '',
        cargoName: '',
        cargoWeight: '',
        price: ''
      },
      form: {      //编辑框
        id: '',
        sProvince:'',
        sAddr: '',
        eProvince:'',
        eAddr: '',
        sendDate: '',
        vehicle: '',
        cargoName: '',
        cargoWeight: '',
        price: ''
      },
      tableData: [],
      tempData: [],
      select_word: '',
      pageSize: 8,    //分页每页大小
      currentPage: 1,  //当前页
      idx: -1,          //当前选择项
      multipleSelection: []   //哪些项已经打勾
    }
  },
  computed: {
    //计算当前搜索结果表里的数据
    data() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  watch: {
    //搜索框里面的内容发生变化的时候，搜索结果table列表的内容跟着它的内容发生变化
    select_word: function () {
      if (this.select_word == '') {
        this.tableData = this.tempData;
      } else {
        this.tableData = [];
        for (let item of this.tempData) {
          if (item.username.includes(this.select_word)) {
            this.tableData.push(item);
          }
        }
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    //省市
    handleChange(value){
      this.selectedOptions[0] = CodeToText[value[0]]
      this.selectedOptions[1] = CodeToText[value[1]]
      this.selectedOptions[2] = CodeToText[value[2]]
    },
    handleChange1(value){
      this.selectedOptions1[0] = CodeToText[value[0]]
      this.selectedOptions1[1] = CodeToText[value[1]]
      this.selectedOptions1[2] = CodeToText[value[2]]
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //查询所有
    getData() {
      this.tempData = [];
      this.tableData = [];
      getAllPlan().then(res => {
        this.tempData = res;
        this.tableData = res;
        this.currentPage = 1;
      })
    },
    //添加
    addPlan() {
      let params = new URLSearchParams();
      params.append('sProvince', this.selectedOptions);
      params.append('sAddr', this.registerForm.sAddr);
      params.append('eProvince', this.selectedOptions1);
      params.append('eAddr', this.registerForm.eAddr);
      params.append('sendDate', this.registerForm.sendDate);
      params.append('vehicle', this.registerForm.vehicle);
      params.append('cargoName', this.registerForm.cargoName);
      params.append('cargoWeight', this.registerForm.cargoWeight);
      params.append('price', this.registerForm.price);
      // eslint-disable-next-line no-undef
      setPlan(params)
          .then(res => {
            if (res.code == 1) {
              this.$refs['registerForm'].resetFields(); // 清空表单
              this.getData();
              this.notify("添加成功", "success");
            } else {
              this.notify("添加失败", "error");
            }
          })
          .catch(err => {
            console.log(err);
          });

      this.centerDialogVisible = false;
    },
    //弹出编辑页面
    handleEdit(row) {
      this.editVisible = true;
      this.form = {
        id: row.id,
        sProvince: row.sProvince,
        sAddr: row.saddr,
        eProvince: row.eProvince,
        eAddr: row.eaddr,
        sendDate: row.sendDate,
        vehicle: row.vehicle,
        cargoName: row.cargoName,
        cargoWeight: row.cargoWeight,
        price: row.price
      }
    },
    //保存编辑页面修改的数据
    editSave() {
      let params = new URLSearchParams();
      params.append('id', this.form.id);
      params.append('sProvince', this.selectedOptions);
      params.append('sAddr', this.form.sAddr);
      params.append('eProvince', this.selectedOptions1);
      params.append('eAddr', this.form.eAddr);
      params.append('sendDate', this.form.sendDate);
      params.append('vehicle', this.form.vehicle);
      params.append('cargoName', this.form.cargoName);
      params.append('cargoWeight', this.form.cargoWeight);
      params.append('price', this.form.price);
      updatePlan(params)
          .then(res => {
            if (res.code == 1) {
              this.getData();
              this.notify("修改成功", "success");
            } else {
              this.notify("修改失败", "error");
            }
          })
          .catch(err => {
            console.log(err);
          });
      this.editVisible = false;
    },

    //删除一名员工
    deleteRow() {
      delPlan(this.idx)
          .then(res => {
            if (res) {
              this.getData();
              this.notify("删除成功", "success");
            } else {
              this.notify("删除失败", "error");
            }
          })
          .catch(err => {
            console.log(err);
          });
      this.delVisible = false;
    },
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.singer-img {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>