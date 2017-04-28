/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        /*
        MyPlugin.loginStatus(
                                ["34HelloWorld,1234"],
                                function(result) {
                                    alert("Success: \r\n"+result);
                                },
                                function(error) {
                                    alert("Error: \r\n"+error);      
                                }
                                );
        */
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};
/**
 * MyPlugin.js
 *
 */
var MyPlugin = {
    commonJs: function(parameter, success, fail) { //载入方法区分跳转各种功能
        return Cordova.exec(success, fail, "MyPlugin", "commonJs", parameter);
    },
    getIDCardInfos: function(parameter, success, fail) { //扫描身份证
        return Cordova.exec(success, fail, "MyPlugin", "getIDCardInfos", parameter);
    },
    datasign: function(parameter, success, fail) { //手写签名
        return Cordova.exec(success, fail, "MyPlugin", "datasign", parameter);
    },
    closeWebview: function(parameter, success, fail) { //关闭webview
        return Cordova.exec(success, fail, "MyPlugin", "closeWebview", parameter);
    },
    showCust: function(parameter, success, fail) { //新增客户成功，成为定位客户
        return Cordova.exec(success, fail, "MyPlugin", "showCust", parameter);
    },
    scanning: function(parameter, success, fail) { //扫描uim
        return Cordova.exec(success, fail, "MyPlugin", "scanning", parameter);
    },
    changeTitle: function(parameter, success, fail) { //改变webview 头部
        return Cordova.exec(success, fail, "MyPlugin", "changeTitle", parameter);
    },
    /**
     * 蓝牙读取身份证件信息
     * @parameter [array] 长度为2的一维数组,
     *                    arr[0] 为回调的方法名(字符串)，
     *                    arr[1] 为类型code(字符串)，1：蓝牙 2：nfc 3：otg 
     * @param  {function} success   成功时回调
     * @param  {function} fail      失败时回调
     */
    getGenerationInfos: function(parameter, success, fail) { 
        return Cordova.exec(success, fail, "MyPlugin", "getGenerationInfos", parameter);
    },
    calendar: function(parameter, success, fail) { //采用系统时间控件
        return Cordova.exec(success, fail, "MyPlugin", "calendar", parameter);
    },
    takePhotos: function(parameter, success, fail) { //拍照，即扫描身份证
        return Cordova.exec(success, fail, "MyPlugin", "takePhotos", parameter);
    },
    sessionValid: function(parameter, success, fail) { //session失效
        return Cordova.exec(success, fail, "MyPlugin", "sessionValid", parameter);
    },
    relocationCust: function(parameter, success, fail) { //重新定位客户
        return Cordova.exec(success, fail, "MyPlugin", "relocationCust", parameter);
    }
};