import {get,post} from "@/api/http";


 export const getLoginStatus=(params)=>post(`login`,params);

//============员工相关================
//查询员工
export  const getAllWorker = ()=>get(`/user/list`);
//添加员工
export  const setWorker = (params)=>post(`/user/addUser`,params);
//修改员工
export const updateWorker = (params)=>post(`/user/updateUser`,params);
//删除员工
export const delWorker = (id)=>get(`/user/delete?id=${id}`);

//============角色相关================
export  const getAllWorkerType = ()=>get(`/workerType/listRole`);
//添加员工
export  const setWorkerType = (params)=>post(`/workerType/add`,params);
//修改员工
export const updateWorkerType = (params)=>post(`/workerType/update`,params);
//删除员工
export const delWorkerType = (id)=>get(`/workerType/delete?id=${id}`);

//============货物类别相关================
export  const getAllCargoType = ()=>get(`/cargoType/allCargoType`);
//添加
export  const setCargoType = (params)=>post(`/cargoType/add`,params);
//修改
export const updateCargoType = (params)=>post(`/cargoType/update`,params);
//删除
export const delCargoType = (id)=>get(`/cargoType/delete?id=${id}`);

//============货物相关================
export  const getAllCargo = ()=>get(`/cargo/allCargo`);
//添加
export  const setCargo = (params)=>post(`/cargo/add`,params);
//修改
export const updateCargo = (params)=>post(`/cargo/update`,params);
//删除
export const delCargo = (id)=>get(`/cargo/delete?id=${id}`);

//============车辆相关================
export  const getAllVehicle= ()=>get(`/vehicle/allVehicle`);
//添加
export  const setVehicle = (params)=>post(`/vehicle/add`,params);
//修改
export const updateVehicle = (params)=>post(`/vehicle/update`,params);
//删除
export const delVehicle = (id)=>get(`/vehicle/delete?id=${id}`);

//============车辆相关================
export  const getAllWarehouse= ()=>get(`/warehouse/allWarehouse`);
//添加
export  const setWarehouse = (params)=>post(`/warehouse/add`,params);
//修改
export const updateWarehouse = (params)=>post(`/warehouse/update`,params);
//删除
export const delWarehouse = (id)=>get(`/warehouse/delete?id=${id}`);

//============计划相关================
export  const getAllPlan= ()=>get(`/plan/allPlan`);
//添加
export  const setPlan = (params)=>post(`/plan/add`,params);
//修改
export const updatePlan = (params)=>post(`/plan/update`,params);
//删除
export const delPlan = (id)=>get(`/plan/delete?id=${id}`);
