//// this file contains creatin of connection, export, import and flow using aysnc module in node.

var async = require("async");
var request = require("request");
var results = {};
var connectionId, exportId, importId, flowID, counter = 19;

var mainFunc =  function(count, callback1){
  async.series(
    {
      // create connection
      createConnection : function(callback){

        var options = {};
        options.method = "POST";
        options.uri = "https://api.integrator.io/v1/connections";
        options.headers = {
          "Authorization" : "Bearer 06cd591ac88e4fbcaf83a70e52c3e312",
          "Content-Type" :"application/json"
        };
        options.body = JSON.stringify({
          "type" : "rest",
          "name" : "test_conn_from_Node_async"+count,
          "rest" : {
            "mediaType" : "json",
            "baseURI" : "http://demo7102148.mockable.io/",
            "scope" : [],
            "pingRelativeURI" : "customer1",
            "basicAuth" : {
              "username" : "amit",
              "password" : "1234"
            }
          }
        });

        request(options, function(err, response,body){
          if(err){
            console.log("error in creating connection");
            return callback(err);
          }
          var parsedBody = JSON.parse(body);
          connectionId = parsedBody._id;
          results["connectionName"] = parsedBody.name;
          callback()
        });
    },
    //create export
    "createExport" : function (callback){
      var exportOptions = {
        "method" : "POST",
        "uri" : "https://api.integrator.io/v1/exports"
      };
      exportOptions.headers = {
        "Authorization" : "Bearer 06cd591ac88e4fbcaf83a70e52c3e312",
        "Content-Type" :"application/json"
      };

      exportOptions.body = JSON.stringify({
        "_connectionId" : connectionId,
        "name" : "export_from_node_async"+count,
        "asynchronous": true,
        "rest" : {
          "relativeURI" : "/customer1",
          "method" : "GET"
        }
      });

      request(exportOptions,function(error, response, body){
       if(error){
          console.log("error in creating export");
          return callback(error);
        }
        var parsedRes = JSON.parse(body);
        exportId = parsedRes._id;
        results.exportName = parsedRes.name;
        callback(null,exportId);
      });
    },
    //create import
    "createImport" :  function (callback){
      var importOptions = {

        "method" : "POST",
        "uri" : "https://api.integrator.io/v1/imports"
      };
      importOptions.headers = {
        "Authorization" : "Bearer 06cd591ac88e4fbcaf83a70e52c3e312",
        "Content-Type" :"application/json"
      };
      importOptions.body = JSON.stringify({
        "_connectionId" : "5673b5aa05a912fc12186f80",
        "name" : "import_from_node_async"+count,
        "distributed" : true
      });

      request(importOptions, function(error, response, body){
        if(error) {
          console.log(" error in creating import");
          return callback(error);
        }
        var parsedBody = JSON.parse(body);
        importId = parsedBody._id;
        results.importName = parsedBody.name;
        callback(null,importId);
      });
    },
    //create flow
    "createFlow" : function(callback){
      var flowOption = {
        "method" : "POST",
        "uri" : "https://api.integrator.io/v1/flows"

      };
      flowOption.headers = {
        "Authorization" : "Bearer 06cd591ac88e4fbcaf83a70e52c3e312",
        "Content-Type" :"application/json"
      };
      flowOption.body = JSON.stringify({
        "name" : "flow_node_async"+count,
        "_exportId"  : exportId,
        "_importId" : importId
      });

      request(flowOption, function(error, response, body){
        if(error) {
          console.log("error in creating flow ");
          return callback(error)
        }
        var parsedBody = JSON.parse(body);
        flowId = parsedBody._id;
        results.flowName = parsedBody.name;
        callback(null, flowId);
      });
    }
  }
, function(err, res){
      if(err) {
        console.log(err);
        return;
      }
      return callback1(null,results);
  }
  );

};

exports.mainFunc = mainFunc;
/*mainFunc(counter,function(err, result){
  console.log("running the callback");
});*/

function createConnection1(callback){

    var options = {};
    options.method = "POST";
    options.uri = "https://api.integrator.io/v1/connections";
    options.headers = {
      "Authorization" : "Bearer 06cd591ac88e4fbcaf83a70e52c3e312",
      "Content-Type" :"application/json"
    };
    options.body = JSON.stringify({
      "type" : "rest",
      "name" : "test_conn_from_Node_async61",
      "rest" : {
        "mediaType" : "json",
        "baseURI" : "http://demo7102148.mockable.io/",
        "scope" : [],
        "pingRelativeURI" : "customer1",
        "basicAuth" : {
          "username" : "amit",
          "password" : "1234"
        }
      }
    });

    request(options, function(err, response,body){

      if(err){
        console.log("error in createConnection1");
        return callback(err);
      }
      var parsedBody = JSON.parse(body);
      connectionId = parsedBody._id;
      results["connectionName"] = parsedBody.name;
      callback(null,results);
    });
}

exports.createConnection1 = createConnection1;
