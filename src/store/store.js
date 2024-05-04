import {makeAutoObservable} from 'mobx'
import $api from '../http';

export default class Store{
    isAuth=false;
    listTasks=[]

    constructor(){
       makeAutoObservable(this);
    }

    setAuth(bool){
        this.isAuth=bool;
    }

    setTaskList(arr) {
      this.listTasks = arr;
   }
  
    async register(login,password){
        try {
            const response = await $api.post('/registration',{login,password});
            if(response===undefined){
                alert('Cannot create user! Please try again')
              }
              else{
                alert('User was successfully created');
                sessionStorage.setItem('token',response.data.token)
                sessionStorage.setItem('login',login)
                console.log(response.data)
                this.setAuth(true);
              }
            
          } catch (error) {
            console.error('Виникла помилка при виконанні GET-запиту:', error);
          }
    }

    async login(login,password){
      try{
        const response=await $api.post('/login', {login,password});
        if(response===undefined){
          alert("Try again!")
        }
        else{
          sessionStorage.setItem('token',response.data.token);
          sessionStorage.setItem('login',login);
          this.setAuth(true);
        }
      }
      catch(e){
        console.log(e);
      }
    }
   
   async addTask(text,date,subtasks){
    try{
      const user = sessionStorage.getItem('login');
      const response = await $api.post('/addTask', { user, text, date, subtasks });
      this.setTaskList(response.data.tasks);
    }
    catch(e){
      console.log(e);
    }
   }

   async deleteTask(_id){
    try{
     const response=await $api.post('/deleteTask',{_id});
     const newArr=this.listTasks.filter((item)=>item._id!==response.data.task._id);
     this.setTaskList(newArr);
    }
    catch(e){
      console.log(e);
    }
   }

   async editTask(_id,newText,newDate){
    try{
      const user = sessionStorage.getItem('login');
      await $api.post('/editTask',{_id:_id,newText,newDate});
      const arr=await $api.post('/taskList',{login:user});
      this.setTaskList(arr);
    }
    catch(e){
      console.log(e);
    }
   }

   async markAsImportant(_id){
    try{
     const task=await $api.post('/getTask',{_id:_id});
     if(task.data.task.important){
      await $api.post('/markAsImportant',{_id,important:false});
      console.log(task)
     }
     else{
      await $api.post('/markAsImportant',{_id,important:true});
      console.log(task)
     }
     const user = sessionStorage.getItem('login');
     const arr=await $api.post('/taskList',{login:user});
     this.setTaskList(arr);
    }
    catch(e){
      console.log(e);
    }
   }

}
