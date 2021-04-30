<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" placeholder="请输入员工名" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加员工</el-button>
      </div>
    </div>
    <el-table size="mini" ref="multipleTable" border style="width:100%" height="680px" :data="data"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="workerType" label="员工类别" align="center">
        <template slot-scope="scope">
          {{ changeWorkerType(scope.row.roleId) }}
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
        <template slot-scope="scope">
          {{ changeSex(scope.row.sex) }}
        </template>
      </el-table-column>
      <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="province" label="省市" align="center"></el-table-column>
      <el-table-column prop="addr" label="地址">
        <template slot-scope="scope">
          {{ scope.row.addr }}
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
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <!--添加-->
    <el-dialog title="添加员工" @close="closeDialog('registerForm')" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px">
        <el-form-item prop="username" label="用户名" size="mini">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input v-model="registerForm.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <el-select v-model="registerForm.sex" placeholder="请选择角色">
            <el-option  value="1" label="男">男</el-option>
            <el-option  value="0" label="女">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" size="mini">
          <el-select v-model="registerForm.roleId"  @focus="getRoleIds()" placeholder="请选择员工角色">
            <el-option v-for="role in this.roleIds"
                    :key="role.roleNum"
                    :value="role.roleNum"
                    :label="role.roleName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone"  label="电话" size="mini">
          <el-input v-model="registerForm.phone"  maxlength="11" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="realName" label="姓名" size="mini">
          <el-input v-model="registerForm.realName" placeholder="姓名"></el-input>
        </el-form-item>

        <el-form-item prop="province" label="家庭省市" size="mini">
          <el-cascader size="mini" :options="areaOptions" v-model="registerForm.province"  @change="handleChange" placeholder="请选择省/市/区"></el-cascader>
        </el-form-item>
        <el-form-item prop="addr" label="家庭住址" size="mini">
          <el-input v-model="registerForm.addr" placeholder="家庭住址"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="addWorker">添加</el-button>
        <el-button size="mini" @click="centerDialogVisible = false;resetForm('registerForm')">取消</el-button>
      </span>
    </el-dialog>
    <!--修改-->
    <el-dialog title="修改员工信息" @close="closeDialog('form')" :visible.sync="editVisible" width="400px" center>
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item prop="username" label="用户名" size="mini">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">

          <el-select v-model="form.sex" placeholder="请选择角色">
            <el-option  value="1" label="男">男</el-option>
            <el-option  value="0" label="女">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" size="mini">
          <el-select v-model="form.roleId"  @focus="getRoleIds()" placeholder="请选择角色">
            <el-option v-for="role in this.roleIds"
                       :key="role.roleNum"
                       :value="role.roleNum"
                       :label="role.roleName"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="电话" size="mini">
          <el-input v-model="form.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="realName" label="姓名" size="mini">
          <el-input v-model="form.realName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="province" label="家庭省市" size="mini">
<!--          <el-input v-model="form.province" placeholder="家庭省市"></el-input>-->
          <el-cascader size="mini"  :options="areaOptions" v-model="form.province" @change="handleChange1" placeholder="请选择省/市/区"></el-cascader>
        </el-form-item>

        <el-form-item prop="addr" label="家庭住址" size="mini">
          <el-input v-model="form.addr" placeholder="家庭住址"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer">
                <el-button size="mini" @click="editVisible = false;resetForm('form')">取消</el-button>
                <el-button size="mini" @click="editSave">确定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="删除员工" :visible.sync="delVisible" width="300px" center>
      <div align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
        <el-button size="mini" @click="deleteRow">确定</el-button>
        <el-button size="mini" @click="delVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {regionData, CodeToText, TextToCode} from "element-china-area-data"
import {delWorker, getAllWorker, getAllWorkerType, setWorker, updateWorker} from '../api/index';
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
      // selectedOptions : [],
      // editOptions:[],
      options:[],
      registerForm: {      //添加框
        username: '',
        password: '',
        realName: '',
        sex: '',
        roleId: [],
        province: [],
        addr: '',
        phone: ''
      },
      form: {      //编辑框
        id: '',
        username: '',
        password: '',
        realName: '',
        sex: '',
        roleId: '',
        addr: '',
        province: [],
        phone: ''
      },
      tableData: [],
      tempData: [],
      roleIds: [],
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
      this.registerForm.province[0] = CodeToText[value[0]]
      this.registerForm.province[1] = CodeToText[value[1]]
      this.registerForm.province[2] = CodeToText[value[2]]
    },
    handleChange1(value){
      this.form.province[0] = CodeToText[value[0]]
      this.form.province[1] = CodeToText[value[1]]
      this.form.province[2] = CodeToText[value[2]]
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getRoleIds() {
      this.roleIds = [];
      getAllWorkerType().then(res => {
        this.roleIds = res;
        this.currentPage = 1;
      })
    },
    //查询所有员工
    getData() {
      this.tempData = [];
      this.tableData = [];
      getAllWorker().then(res => {
        this.tempData = res;
        this.tableData = res;
        this.currentPage = 1;
      })
    },
    //添加员工
    addWorker() {
      let params = new URLSearchParams();
      params.append('username', this.registerForm.username);
      params.append('password', this.registerForm.password);
      params.append('roleId', this.registerForm.roleId);
      params.append('phone', this.registerForm.phone);
      params.append('province', this.registerForm.province);
      params.append('addr', this.registerForm.addr);
      params.append('sex', this.registerForm.sex);
      params.append('realName', this.registerForm.realName);
      setWorker(params)
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
      this.options[0]=TextToCode[row.province.split(",")[0]].code
      this.options[1]=TextToCode[row.province.split(",")[0]][row.province.split(",")[1]].code
      this.options[2]=TextToCode[row.province.split(",")[0]][row.province.split(",")[1]][row.province.split(",")[2]].code
      this.editVisible = true;
      this.form = {
        id: row.id,
        username: row.username,
        password: row.password,
        roleId: row.roleId,
        sex: row.sex,
        realName: row.realname,
        phone: row.phone,
        province: this.options,
        addr: row.addr,
      }
    },
    //保存编辑页面修改的数据
    editSave() {
      let params = new URLSearchParams();
      params.append('id', this.form.id);
      params.append('username', this.form.username);
      params.append('password', this.form.password);
      params.append('roleId', this.form.roleId);
      params.append('phone', this.form.phone);
      params.append('province', this.form.province);
      params.append('addr', this.form.addr);
      params.append('sex', this.form.sex);
      params.append('realName', this.form.realName);
      updateWorker(params)
          .then(res => {
            // this.selectedOptions=[];
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
      delWorker(this.idx)
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