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
var app={initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:function(){app.receivedEvent("deviceready")},receivedEvent:function(e){var n=document.getElementById(e),t=n.querySelector(".listening"),o=n.querySelector(".received");t.setAttribute("style","display:none;"),o.setAttribute("style","display:block;")}},MyPlugin={commonJs:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","commonJs",e)},getIDCardInfos:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","getIDCardInfos",e)},datasign:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","datasign",e)},closeWebview:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","closeWebview",e)},showCust:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","showCust",e)},scanning:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","scanning",e)},changeTitle:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","changeTitle",e)},getGenerationInfos:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","getGenerationInfos",e)},calendar:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","calendar",e)},takePhotos:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","takePhotos",e)},sessionValid:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","sessionValid",e)},relocationCust:function(e,n,t){return Cordova.exec(n,t,"MyPlugin","relocationCust",e)}};