class Myclass{

    constructor(){
        console.log("initiate")
    }
    add(arg1, arg2){
        var result;
        result = arg1 +arg2;
        return result;
    }

    CallAnothFn(arg1, arg2){
        var result = this.add(arg1,arg2)
        return result;
    }
    // testPromise(){
    //     return new Promise(function (resolve,reject){
    //         setTimeout(()=>resolve(3),5000)
    //     }).then(function (result){
    //   return result*2;
    //     })
    // }
}
module.exports  = Myclass;