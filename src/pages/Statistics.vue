<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{WorkerCount}}</div>
              <div>员工总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{PartsCount}}</div>
              <div>零件种类</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{supCount}}</div>
              <div>供应商数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{orderCount}}</div>
              <div>订单数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3 class="mgb20">用户类别比例</h3>
        <div style="background-color:white">
          <ve-pie :data="WorkerType"></ve-pie>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getAllWorker} from '../api/index'
export default {
  data(){
    return {
      WorkerCount: 0,       //用户总数
      supCount: 0,           //供应商总数
      PartsCount: 0,         //歌手数量
      orderCount: 0,        //歌单数量
      Worker: [],            //所有用户
      WorkerType:{           //按性别分类的用户数
        columns: ['员工类别','总数'],
        rows: [
          {'员工类别': '系统管理员','总数': 0},
          {'员工类别': '采购员','总数': 0},
          {'员工类别': '基础数据管理员','总数': 0},
          {'员工类别': '库存管理员','总数': 0},
        ]
      },
      options1: {
        color: ['yellow']
      },

    }
  },
  created() {

  },
  mounted() {
    this.getWorker();
  },
  methods: {
    getWorker() {                     //用户总数
      getAllWorker().then(res => {
        this.Worker = res;
        this.WorkerCount = res.length;
        this.WorkerType.rows[0]['总数'] = this.setType(0,this.Worker);
        this.WorkerType.rows[1]['总数'] = this.setType(1,this.Worker);
        this.WorkerType.rows[2]['总数'] = this.setType(2,this.Worker);
        this.WorkerType.rows[3]['总数'] = this.setType(3,this.Worker);
      })
    },
    setType(type,val) {              //根据性别获取用户数
      let count = 0;
      for(let item of val){
        if(type == item.Workertype){
          count++;
        }
      }
      return count;
    }

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
