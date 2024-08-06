// ==UserScript==
// @name         搞定水印2.0
// @namespace    https://www.benmao.vip
// @version      2.0.1
// @description  支持去除搞定设计、创客贴、比格设计、爱设计、易企秀、标小智、标智客图片水印
// @author       笨猫
// @icon         https://achengovo.com/greasyfork/logo.png
// @match        https://*.gaoding.com/*
// @match        https://*.818ps.com/*
// @match        https://*.eqxiu.com/*
// @match        https://*.chuangkit.com/*
// @match        https://bigesj.com/*
// @match        https://www.isheji.com/*
// @match        https://www.logosc.cn/*
// @match        https://www.focodesign.com/*
// @match        https://www.logomaker.com.cn/*
// @require      https://lib.baomitu.com/jquery/1.12.4/jquery.min.js
// @require      https://greasyfork.org/scripts/448541-dom-to-image-js/code/dom-to-imagejs.js?version=1074759
// @require      https://update.greasyfork.org/scripts/457525/1134363/html2canvas%20141.js
// @license      AGPL-3.0
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    const alifont = 'https://at.alicdn.com/t/c/font_2324127_7j0vsmflvph.css';
    const cssurl  = 'https://www.benmao.vip/public/monkey/css/monkey_remark.css';
    GM_addStyle(`@import url('${alifont}');`);
    GM_addStyle(`@import url('${cssurl}');`);
    const thisReward   = getCookie('catRewardIdent');
    if(thisReward == ""){
        createReward();
    }
    createRemarkBtn();
})();
function gzhverify(){
    var gzhscreen = document.createElement("div");
        gzhscreen.setAttribute('class', 'verify-screen');
    document.body.appendChild(gzhscreen);

    var gzhmodal = document.createElement("div");
        gzhmodal.setAttribute('class', 'verify-modal');
    gzhscreen.appendChild(gzhmodal);

    var titleObj = document.createElement("h2");
        titleObj.textContent = "使用前验证";
        titleObj.setAttribute('class', 'modal-title');
    gzhmodal.appendChild(titleObj);

    var verifyBoxObj = document.createElement("div");
        verifyBoxObj.setAttribute('class', 'verify-box');
    gzhmodal.appendChild(verifyBoxObj);

    var wxcodeObj = document.createElement("div");
        wxcodeObj.setAttribute('class', 'wxcode');
    verifyBoxObj.appendChild(wxcodeObj);

    var imageObj = document.createElement("img");
        imageObj.setAttribute('class', 'codeimg');
        imageObj.src = "https://www.benmao.vip/public/uploads/images/gzh_code.png";
    wxcodeObj.appendChild(imageObj);

    var inputBoxObj = document.createElement("div");
        inputBoxObj.setAttribute('class', 'input-group');
    verifyBoxObj.appendChild(inputBoxObj);

    var inputObj = document.createElement("input");
        inputObj.setAttribute('placeholder', '输入验证码');
    inputBoxObj.appendChild(inputObj);

    var errorTipsObj = document.createElement("span");
        errorTipsObj.setAttribute('class', 'error-tips');
        errorTipsObj.textContent = "❌验证码错误！";
    inputBoxObj.appendChild(errorTipsObj);

    var verifyButObj = document.createElement("button");
        verifyButObj.setAttribute('class', 'verify-btn');
        verifyButObj.textContent = "验证";
        verifyButObj.addEventListener("click", () => {
            const authkey = $('.input-group input').val().replace(/\s/g, "");
            if(authkey == ""){
                errorTipsObj.textContent = "❌请输入验证码！";
                errorTipsObj.style.display = 'block';
                setTimeout(function(){
                    errorTipsObj.style.display = 'none';
                },3000)
                return false;
            }
            const geturl = 'https://www.benmao.vip/api/v1/verify/code_state?authkey='+authkey;
            $.get(geturl,{},function(result){
                if(result.code == 1){
                    var today = new Date().toLocaleDateString();
                    setCookie('catKillMark',today,12)
                    createRemarkBtn();
                    createReward();
                    hideVerifyModal('verify-screen');
                }else{
                    errorTipsObj.style.display = 'block';
                    errorTipsObj.textContent = "❌"+result.msg+"！";
                    setTimeout(function(){
                        errorTipsObj.style.display = 'none';
                    },3000)
                }
            })
        });
    inputBoxObj.appendChild(verifyButObj);

    var verifyTipObj = document.createElement("div");
        verifyTipObj.setAttribute('class', 'verify-tip');
        verifyTipObj.innerHTML = "① 扫码关注公众号回复口令<b> 「验证码」 </b><br/>② 将获取到的验证码输入进行验证";
    inputBoxObj.appendChild(verifyTipObj);

    var closeBtnObj = document.createElement("span");
        closeBtnObj.setAttribute('class', 'close-modal');
        closeBtnObj.textContent = "X";
        closeBtnObj.addEventListener("click", () => {
            createRemarkBtn()
            hideVerifyModal('verify-screen');
        });
    gzhmodal.appendChild(closeBtnObj);
}
//创建打赏
function createReward(){
    var rewardscreen = document.createElement("div");
        rewardscreen.setAttribute('class', 'reward-screen');
    document.body.appendChild(rewardscreen);

    var rewardmodal = document.createElement("div");
        rewardmodal.setAttribute('class', 'reward-modal');
    rewardscreen.appendChild(rewardmodal);

    var titleObj = document.createElement("h2");
        titleObj.textContent = "给我打个赏吧";
        titleObj.setAttribute('class', 'modal-title');
    rewardmodal.appendChild(titleObj);

    var rewardCodeObj = document.createElement("div");
        rewardCodeObj.setAttribute('class', 'reward-code');
    rewardmodal.appendChild(rewardCodeObj);

    var codeImageObj = document.createElement("img");
        codeImageObj.setAttribute('class', 'code-img');
        codeImageObj.src = "https://www.benmao.vip/public/static/index/common/images/enjoy_pay.png";
    rewardCodeObj.appendChild(codeImageObj);

    var rewardBtnsObj = document.createElement("div");
        rewardBtnsObj.setAttribute('class', 'reward-btns');
    rewardmodal.appendChild(rewardBtnsObj);

    var redBtnObj = document.createElement("span");
        redBtnObj.setAttribute('class', 'btn');
        redBtnObj.textContent = "已打赏";
        redBtnObj.addEventListener("click", () => {
            setCookie('catRewardIdent','reward',2)
            hideVerifyModal('reward-screen')
        });
    rewardBtnsObj.appendChild(redBtnObj);
}
//创建去水印按钮
function createRemarkBtn(){
    var killMarkObj = document.createElement("div");
        killMarkObj.setAttribute('class', 'kill-mark-slide');
    document.body.appendChild(killMarkObj);

    var killBtnObj = document.createElement("span");
        killBtnObj.setAttribute('class', 'kill-mark-btn');
        killBtnObj.innerHTML = "<i class='catfont benmao-shuiyin'></i> 去水印";
        killBtnObj.addEventListener("click", () => {
            const thisKillmark = getCookie('catKillMark');
            if(thisKillmark != ""){
                killMarks();
            }else{
                gzhverify();
            }

        });
    killMarkObj.appendChild(killBtnObj);

    var tutorialBtnObj = document.createElement("a");
        tutorialBtnObj.setAttribute('class', 'tutorial-btn');
        tutorialBtnObj.setAttribute('target', '_blank');
        tutorialBtnObj.setAttribute('href', 'https://www.benmao.vip');
        tutorialBtnObj.innerHTML = "<i class='catfont benmao-jiaocheng'></i> 看教程";
    killMarkObj.appendChild(tutorialBtnObj);
}
//去水印功能
function killMarks(){
    const doctitle = document.title;
    if(/(易企秀)/.test(doctitle)){
        $("div.eqc-watermark").css("position", "static");
        $(".eqc-wm-close").remove();
        let oldStr = window.document.body.innerHTML;
        var newStr = document.getElementsByClassName("safe-space")[0].innerHTML;
        newStr = newStr.replaceAll('data-hint="双击或从素材库拖拽进行替换"', "");
        newStr = newStr.replaceAll("hint--top", "");
    }else if (/(创客贴)/.test(doctitle)) {
        const newStr = document.getElementsByClassName("canvas-slot-inner")[0].innerHTML;
            window.document.body.innerHTML = newStr;
        $("div[style*='ckt-watermark']").remove();
        $("body").css("overflow", "visible");
    }else if (/(比格设计)/.test(doctitle)) {
        $("div.water").css("position", "static");
        $("div.tool-bar-container").remove();
        $(".water-tip").remove();
    }else if (/(爱设计)/.test(doctitle)) {
        $("#editorDrag > div.undefined.scrolly > div.scrolly-viewport.editor-center > div > div:nth-child(1)").remove();
        $(".editor-watermask").remove();
        $(".editor-header").remove();
        $(".editor-aside").remove();
        $(".editor-panel").remove();
        $("#rongqi").remove();
        $("#outbuttons").remove();
        $(".control-panel").remove()
    } else if (/(标小智)/.test(doctitle)) {
        $(".watermarklayer").remove();
        $('#watermark').remove()
    } else if (/(标智客)/.test(doctitle)) {
        console.log(1111)
        $(".watermark").remove();
    }
}
//设置Cookie
function setCookie(name, value, hours) {
    var d = new Date()
    d.setTime(d.getTime() + (hours*60*60*1000))
    var expires = "expires=" + d.toUTCString()
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
//获取Cookie
function getCookie(ckname) {
    var name = ckname + "="
    var ca = document.cookie.split(';')
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == '') c = c.substring(1)
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length)
    }
    return ""
}
//关闭验证
function hideVerifyModal(elem){
    $('.'+elem).hide();
}