<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" placeholder="请输入车辆名" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加车辆</el-button>
      </div>
    </div>
    <el-table size="mini" ref="multipleTable" border style="width:100%" height="680px" :data="data"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="type" label="车辆种类" width="100" align="center"/>
      <el-table-column prop="carryingCapacity" label="载重量"  width="100" align="center"/>
      <el-table-column prop="license" label="车牌号"  width="100" align="center"/>
      <el-table-column prop="engineNumber" label="发动机号"  width="100" align="center"/>
      <el-table-column prop="text"  type="textarea" label="备注"  width="100" align="center"/>
      <el-table-column prop="state" label="状态"  width="100" align="center">
        <template slot-scope="scope">
          {{ changeState(scope.row.state) }}
        </template>
      </el-table-column>
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
    <el-dialog title="添加货物类别" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px">
        <el-form-item prop="type" label="车辆类别" size="mini">
          <el-input v-model="registerForm.type" placeholder="车辆类别"></el-input>
        </el-form-item>
        <el-form-item prop="carryingCapacity" label="载重" size="mini">
          <el-input v-model="registerForm.carryingCapacity" placeholder="载重"></el-input>
        </el-form-item>
        <el-form-item prop="license" label="车牌号" size="mini">
          <el-input v-model="registerForm.license" placeholder="车牌号"></el-input>
        </el-form-item>
        <el-form-item prop="engineNumber" label="发动机号" size="mini">
          <el-input v-model="registerForm.engineNumber" placeholder="发动机号"></el-input>
        </el-form-item>
        <el-form-item prop="text" label="备注" size="mini">
          <el-input v-model="registerForm.text" type="textarea" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item prop="state" label="状态" size="mini">
          <el-input v-model="registerForm.state" placeholder="状态"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="addVehicle">添加</el-button>
        <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改车辆信息" :visible.sync="editVisible" width="400px" center>
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item prop="type" label="车辆类别" size="mini">
          <el-input v-model="form.type" placeholder="车辆类别"></el-input>
        </el-form-item>
        <el-form-item prop="carryingCapacity" label="载重" size="mini">
          <el-input v-model="form.carryingCapacity" placeholder="载重"></el-input>
        </el-form-item>
        <el-form-item prop="license" label="车牌号" size="mini">
          <el-input v-model="form.license" placeholder="车牌号"></el-input>
        </el-form-item>
        <el-form-item prop="engineNumber" label="发动机号" size="mini">
          <el-input v-model="form.engineNumber" placeholder="发动机号"></el-input>
        </el-form-item>
        <el-form-item prop="text" label="备注" size="mini">
          <el-input v-model="form.text" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item prop="state" label="状态" size="mini">
          <el-input v-model="form.state" placeholder="状态"></el-input>
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
import {delVehicle, getAllVehicle, setVehicle, updateVehicle} from '../api/index';
import {mixin} from '../mixins/index';

export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false, //添加弹窗是否显示
      editVisible: false,         //编辑弹窗是否显示
      delVisible: false,          //删除弹窗是否显示
      roleIds: '',
      registerForm: {      //添加框
        type: '',
        carryingCapacity: '',
        license: '',
        engineNumber: '',
        text: '',
        state:''
      },
      form: {      //编辑框
        id: '',
        type: '',
        carryingCapacity: '',
        license: '',
        engineNumber: '',
        text: '',
        state:''
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
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //查询所有
    getData() {
      this.tempData = [];
      this.tableData = [];
      getAllVehicle().then(res => {
        this.tempData = res;
        this.tableData = res;
        this.currentPage = 1;
      })
    },
    //添加
    addVehicle() {
      let params = new URLSearchParams();
      params.append('type', this.registerForm.type);
      params.append('carryingCapacity', this.registerForm.carryingCapacity);
      params.append('engineNumber', this.registerForm.engineNumber);
      params.append('license', this.registerForm.license);
      params.append('text', this.registerForm.text);
      params.append('state', this.registerForm.state);
      // eslint-disable-next-line no-undef
      setVehicle(params)
          .then(res => {
            this.$refs['registerForm'].resetFields();
            if (res.code == 1) {
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
        type: row.type,
        carryingCapacity: row.carryingCapacity,
        engineNumber: row.engineNumber,
        license: row.license,
        text: row.text,
        state: row.state,
      }
    },
    //保存编辑页面修改的数据
    editSave() {
      let params = new URLSearchParams();
      params.append('id', this.form.id);
      params.append('type', this.form.type);
      params.append('carryingCapacity', this.form.carryingCapacity);
      params.append('engineNumber', this.form.engineNumber);
      params.append('license', this.form.license);
      params.append('text', this.form.text);
      params.append('state', this.form.state);
      updateVehicle(params)
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
      delVehicle(this.idx)
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