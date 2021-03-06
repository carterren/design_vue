
export const mixin = {
    methods: {
        //提示信息
        notify(title, type) {
            this.$notify({
                title: title,
                type: type
            })
        },
        //根据相对地址获取绝对地址
        getUrl(url) {
            return `${this.$store.state.HOST}/${url}`
        },
      //获取货物类别中文
      changeCargoType(value) {
        if (value == 'AquaticProducts') {
          return '水产品'
        }
        if (value == 'DairyProducts') {
          return '奶制品'
        }
        if (value == 'FastFood') {
          return '快餐原料'
        }
        if (value == 'FrozenFood') {
          return '速冻食品'
        }
        if (value == 'Fruit-Vegetables') {
          return '果蔬水果'
        }
        if (value == 'SpecialEquipment') {
          return '特殊设备'
        }
        if (value == 'drug') {
          return '药品制剂'
        }
        if (value == 'meat') {
          return '肉类'
        }
        return value;
      },
        //获取性别中文
        changeWorkerType(value) {
            if (value == 1) {
                return '系统管理员'
            }
            if (value == 2) {
                return '车辆管理员'
            }
            if (value == 3) {
                return '货物管理员'
            }
            if (value == 4) {
                return '仓库管理员'
            }
            if (value == 5) {
                return '计划管理员'
            }
            return value;
        },
        //获取性别中文
        changeSex(value) {
            if (value == 0) {
                return '女'
            }
            if (value == 1) {
                return '男'
            }
            return value;
        },
        //获取车辆状态
        changeState(value) {
            if (value == 0) {
                return '待使用'
            }
            if (value == 1) {
                return '维修中'
            }
            if (value == 2) {
                return '使用中'
            }
            return value;
        },
        //获取生日
        attachBirth(val) {
            return String(val).substr(0, 10)
        },
        //弹出删除窗口
        handleDelete(id){
            this.idx = id;
            this.delVisible = true;
        },
        //已经选择的赋值给 multipleSelection
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        //批量删除
        delAll(){
            this.delVisible = true;
            for (let item of this.multipleSelection){
                this.handleDelete(item.id);
                this.deleteRow();
            }
           this.multipleSelection=[];
        },
        resetForm (formName) {
            this. $refs [formName].resetFields ()
            this. dialogVisible = false
        },
        closeDialog (formName) {
            this.$refs[formName].resetFields()
            this.dialogVisible = false
        }
    }

}

