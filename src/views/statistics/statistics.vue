<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{userCount}}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{vehicleCount}}</div>
              <div>车辆总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{cargoCount}}</div>
              <div>货物数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{planCount}}</div>
              <div>计划数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3 class="mgb20">用户性别比例</h3>
        <div style="background-color:white">
          <ve-pie :data="userSex" :theme="options"></ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 class="mgb20">货物类型分布</h3>
        <div style="background-color:white">
          <ve-histogram :data="cargoStyle"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getAllVehicle, getAllCargo} from '../../api/index';
import { mixin } from '../../mixins/index';
export default {
  mixins: [mixin],
  data(){
    return {
      userCount: 0,       //用户总数
      vehicleCount: 0,           //车辆总数
      cargoCount: 0,         //货物数量
      planCount: 0,        //计划数量
      user: [],            //所有用户
      userSex:{           //按性别分类的用户数
        columns: ['性别','总数'],
        rows: [
          {'性别': '男','总数': 0},
          {'性别': '女','总数': 0}
        ]
      },
      options: {
        color: ['#87cefa','#ffc0cb']
      },
      options1: {
        color: ['yellow']
      },
      cargoStyle:{           //货物分类
        columns: ['种类','总数'],
        rows: [
          {'种类': '水产品','总数': 0},
          {'种类': '奶制品','总数': 0},
          {'种类': '快餐原料','总数': 0},
          {'种类': '速冻食品','总数': 0},
          {'种类': '果蔬水果','总数': 0},
          {'种类': '特殊设备','总数': 0},
          {'种类': '药品制剂','总数': 0},
          {'种类': '肉类','总数': 0}
        ]
      },
    }
  },
  created() {

  },
  mounted() {
    this.getUser();
    this.getVehicle();
    this.getCargoList();
  },
  methods: {
    getUser() {                     //用户总数
      this.api({
        url: "/user/list",
        method: "get",
      }).then(res => {
        this.userCount = res.totalCount;
        this.user = res.list;
        this.userSex.rows[0]['总数'] = this.setSex(0,this.user);
        this.userSex.rows[1]['总数'] = this.setSex(1,this.user);
      })
    },
    setSex(sex,val) {              //根据性别获取用户数
      let count = 0;
      for(let item of val){
        if(sex == item.sex){
          count++;
        }
      }
      return count;
    },
    getVehicle() {                      //车辆总数
      getAllVehicle().then(res => {
        this.vehicleCount = res.length;
      })
    },
    getCargoList() {                    //歌单数量
      getAllCargo().then(res => {
        this.cargoCount = res.length;
        function changeCargoType(type) {
            if (type == 'AquaticProducts') {
              return '水产品'
            }
            if (type == 'DairyProducts') {
              return '奶制品'
            }
            if (type == 'FastFood') {
              return '快餐原料'
            }
            if (type == 'FrozenFood') {
              return '速冻食品'
            }
            if (type == 'Fruit-Vegetables') {
              return '果蔬水果'
            }
            if (type == 'SpecialEquipment') {
              return '特殊设备'
            }
            if (type == 'drug') {
              return '药品制剂'
            }
            if (type == 'meat') {
              return '肉类'
            }
            return type;
        }
        for(let item of res){
          this.getByStyle(changeCargoType(item.type));
        }
      })
    },
    getByStyle(type) {//根据歌单风格获取数量
      for(let item of this.cargoStyle.rows){
        console.log(type)
        if(type.includes(item['种类'])){
          item['总数']++;
        }
      }
    },
  }
}

</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 50px;
}

.grid-cont-center {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: darkgray;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}
</style>
