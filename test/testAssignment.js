
var assert = require("assert");
var expect = require("chai").expect;
var request = require("request");
var sinon = require("sinon");
var assignment = require("../AsyncExercise.js");
var res = {};
var funcCounter = 14;

describe("flow", function(){

  describe("hooks" , function(){
    before("creating before executing test case", function(done){
      this.timeout(75000);
      assignment.mainFunc(funcCounter,function(err, result){
        res = result;
        done();
      });
    });

    it("tests name", function(done){
      this.timeout(75000);
      var connName = "test_conn_from_Node_async"+funcCounter;
      var expoName = "export_from_node_async"+funcCounter;
      var impoName = "import_from_node_async"+funcCounter;
      var flowName = "flow_node_async"+funcCounter;
      expect(res.connectionName).to.equal(connName);
      expect(res.exportName).to.equal(expoName);
      expect(res.importName).to.equal(impoName);
      expect(res.flowName).to.equal(flowName);
      done();
    });
  });

  describe("mock the request call", function(){

   before("before hook", function(done){
      sinon
        .stub(request,"post")
        .yields(null,null, JSON.stringify({"name": "export_from_node_async6"}))
      done();
    });

    after("after hook, restoring the request.get", function(done){
      request.post.restore();
      done();
    })
    it("tests connection name",function(done){
      this.timeout(75000);
      var res = assignment.createConnection1( function(err,result){
        expect(result.connectionName).to.equal("test_conn_from_Node_async61");
        done();
      });
    });

  });

  describe("create all params", function(){

    it("tests name",function(done){
      this.timeout(75000);
      var connName = "test_conn_from_Node_async"+funcCounter;
      var expoName = "export_from_node_async"+funcCounter;
      var impoName = "import_from_node_async"+funcCounter;
      var flowName = "flow_node_async"+funcCounter;
      var res = assignment.mainFunc(funcCounter, function(err,result){
        expect(result.connectionName).to.equal(connName);
        expect(result.exportName).to.equal(expoName);
        expect(result.importName).to.equal(impoName);
        expect(result.flowName).to.equal(flowName);
        done();
      });
    });

  });
});
