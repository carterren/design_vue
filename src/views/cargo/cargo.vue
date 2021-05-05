<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" placeholder="请输入货物名" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加货物</el-button>
      </div>
    </div>
    <el-table size="mini" ref="multipleTable" border style="width:100%" height="680px" :data="data"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column  label="货物种类" width="100" align="center">
        <template slot-scope="scope">
          {{changeCargoType(scope.row.type)}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="货物名称"  width="100" align="center"/>
      <el-table-column prop="weight" label="重量"  width="100" align="center"/>
      <el-table-column prop="temp" label="温度"  width="100" align="center"/>
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
        <el-form-item prop="type" label="货物类别" size="mini">
          <el-select v-model="registerForm.type" @focus="getCargoType()"  placeholder="请选择类别">
            <el-option v-for="cargotype1 in this.cargoType"
                       :key="cargotype1.cargoNum"
                       :value="cargotype1.cargoNum"
                       :label="cargotype1.cargoType"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="货物名称" size="mini">
          <el-input v-model="registerForm.name" placeholder="货物类别"></el-input>
        </el-form-item>
        <el-form-item prop="weight" label="货物重量" size="mini">
          <el-input v-model="registerForm.weight" placeholder="货物类别"></el-input>
        </el-form-item>
        <el-form-item prop="temp" label="货物保存温度" size="mini">
          <el-input v-model="registerForm.temp" placeholder="货物类别"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="addCargo">添加</el-button>
        <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改货物信息" :visible.sync="editVisible" width="400px" center>
      <el-form :model="form" ref="registerForm" label-width="80px">
        <el-form-item prop="type" label="货物类别" size="mini">
          <el-select v-model="registerForm.type" @focus="getCargoType()"  placeholder="请选择类别">
            <el-option v-for="cargotype1 in this.cargoType"
                       :key="cargotype1.cargoNum"
                       :value="cargotype1.cargoNum"
                       :label="cargotype1.cargoType"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="货物名称" size="mini">
          <el-input v-model="form.name" placeholder="货物名称"></el-input>
        </el-form-item>
        <el-form-item prop="weight" label="货物重量" size="mini">
          <el-input v-model="form.weight" placeholder="货物重量"></el-input>
        </el-form-item>
        <el-form-item prop="temp" label="存储温度" size="mini">
          <el-input v-model="form.temp" placeholder="存储温度"></el-input>
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
import {delCargo, getAllCargo, getAllCargoType,  setCargo, updateCargo} from '../../api/index';
import {mixin} from '../../mixins/index';

export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false, //添加弹窗是否显示
      editVisible: false,         //编辑弹窗是否显示
      delVisible: false,          //删除弹窗是否显示
      cargoType: '',
      registerForm: {      //添加框
        type: '',
        name: '',
        weight: '',
        temp: ''
      },
      form: {      //编辑框
        id: '',
        type: '',
        name: '',
        weight: '',
        temp: ''
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
    getCargoType() {
      this.cargoType = [];
      getAllCargoType().then(res => {
        this.cargoType = res;
        this.currentPage = 1;
      })
    },
    //查询所有
    getData() {
      this.tempData = [];
      this.tableData = [];
      getAllCargo().then(res => {
        this.tempData = res;
        this.tableData = res;
        this.currentPage = 1;
      })
    },
    //添加
    addCargo() {
      let params = new URLSearchParams();
      params.append('type', this.registerForm.type);
      params.append('name', this.registerForm.name);
      params.append('weight', this.registerForm.weight);
      params.append('temp', this.registerForm.temp);
      // eslint-disable-next-line no-undef
      setCargo(params)
          .then(res => {
            this.$refs['registerForm'].resetFields(); // 清空表单
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
        name: row.name,
        weight: row.weight,
        temp: row.temp,
      }
    },
    //保存编辑页面修改的数据
    editSave() {
      let params = new URLSearchParams();
      params.append('id', this.form.id);
      params.append('type', this.form.type);
      params.append('name', this.form.name);
      params.append('weight', this.form.weight);
      params.append('temp', this.form.temp);
      updateCargo(params)
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
      delCargo(this.idx)
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
