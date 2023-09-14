// const model = require("../models/model")
// const mymodel = new model() 

// describe("test the save function", async()=>{
//    it("test the save function", async()=>{
//         const spy = sinon.spy(mymodel,"save")
//         mymodel.save();
//         await sinon.assert.calledOnce(spy)
//         await expect(spy.calledOnce).to.be.true;
//     })

//     it("test the fetch function in the model", async()=>{
//         const spy = sinon.spy(mymodel,"fetch")
//         const arg1 = "test";
//         mymodel.fetch(arg1);
//         await sinon.assert.calledOnce(spy)
//         await expect(spy.calledOnce).to.be.true;
//     })
//     it("test the delete function in the model", async()=>{
//         const spy = sinon.spy(mymodel,"delete")
//         mymodel.delete(arg1,arg2);
//         await sinon.assert.calledOnce(spy)
//         await expect(spy.calledOnce).to.be.true;
//     })
//     it("test the update function in the model", async()=>{
//         const spy = sinon.spy(mymodel,"update")
    
//         // await sinon.assert.calledOnce(spy)
//         await expect( mymodel.update()).to.be.false;
//     })  
//     it("test the findId function in the model", async()=>{ 
//         const spy = sinon.spy(mymodel,"findId")
//         const arg1 = "test";
//         mymodel.findId(arg1);
//         await sinon.assert.calledOnce(spy)
//         await expect(spy.calledOnce).to.be.true;
//         return console.log("sucess");
//     })  
//    it("test tostrings function in the model", async()=>{   
//     const spy = sinon.spy(mymodel,"tostrings")     
//     mymodel.tostrings();
//     await sinon.assert.calledOnce(spy)
//     await expect(spy.calledOnce).to.be.true;
// })})