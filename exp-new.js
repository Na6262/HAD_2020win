/*
const btn_html_timer = [
  `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`];
*/
// image height
const h1 = 200;
const h2 = 400;
//图片库
white_shock = ['pics/p-W1.jpg', 'pics/p-W2.jpg', 'pics/p-W3.jpg', 'pics/p-W4.jpg', 'pics/p-W5.jpg'];
china_shock = ['pics/p-C1.jpg', 'pics/p-C2.jpg', 'pics/p-C3.jpg', 'pics/p-C4.jpg', 'pics/p-C5.jpg'];
white_money = ['pics/m-W1.jpg', 'pics/m-W2.jpg', 'pics/m-W3.jpg', 'pics/m-W4.jpg', 'pics/m-W5.jpg'];
china_money = ['pics/m-C1.jpg', 'pics/m-C2.jpg', 'pics/m-C3.jpg', 'pics/m-C4.jpg', 'pics/m-C5.jpg'];


var open_fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true,
  message: `
    <p style="font: 16pt 微软雅黑; text-align: center; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏<br/>
    （5）请务必认真作答，主试将对答卷进行核查<br/>
    （6）实验报酬：基础被试费1元+认真奖励0~10元+<br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
  button_label: '点击这里全屏开始',
  delay_after: 100
};

var welcome = {
  type: "html-keyboard-response",
  stimulus:
    "<p style='text-align:center;font: bold 42px 微软雅黑; color: #B22222'>\
    欢迎参与我们的实验</p>\
    <p style='text-align:center; font: 30px 微软雅黑; color: black'><br/>\
    实验进度将会以进度条形式显示在屏幕最上方，可供参考<br/><br/>\
    <按任意键继续><br/><b>实验过程中请勿退出全屏</b>",
  post_trial_gap: 100
};

//asign group--0:shock;1:money
condition=Math.floor(Math.random() * 2);

//instruction of key question
switch(condition){
  case 1:
    whitePic=white_money;asianPic=china_money;
    var instr_keyQ = {
      type: 'instructions',
      pages: [
      `<p style='text-align:center;font: bold 42px 微软雅黑; color: #B22222'>\
      指导语<br/>\
      <p style="font: 20pt 微软雅黑; text-align: left; line-height: 1.6em">\
    请想象你正在参与一个由两人共同完成的实验。实验的主题是“惩罚对记忆效果的影响”。<br/>\
    参与实验的两个人分别是学习者和监督者。<br/><br/>\
    学习者需要在30秒内记忆10组词语和图片的配对。<br/>\
    如学习者未能完成记忆任务，则会被扣除一定被试费作为惩罚。<br/>\
    扣除的钱数取决于学习者的任务表现。<br/>\
    监督者的任务是在学习者未能完成记忆任务时按下手中的按钮，扣除其被试费。</p>`,
      ],
      show_clickable_nav: true,
      allow_backward: false,
      button_label_next: '继续',
    };
    jsPsych.data.addProperties({condition: 'money'});
    break;
  default:
  whitePic=white_shock;asianPic=china_shock;
  var instr_keyQ = {
      type: 'instructions',
      pages: [
        `<p style='text-align:center;font: bold 42px 微软雅黑; color: #B22222'>\
      指导语<br/>\
      <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">\
    请想象你正在参与一个由两人共同完成的实验。实验的主题是“惩罚对记忆效果的影响”。<br/>\
    参与实验的两个人分别是学习者和监督者。<br/><br/>\
    学习者需要在30秒内记忆10组词语和图片的配对。<br/>\
    如学习者未能完成记忆任务，则会受到电击刺激作为惩罚。<br/>\
    惩罚强度取决于学习者的任务表现。电击强度分为1～10级。<br/>\
    电击强度0级表示电击不会引起疼痛感觉，电击强度10级表示电击会引起非常痛的感觉。<br/>\
    监督者的任务是在学习者未能完成记忆任务时按下手中的电击按钮，给予其电击惩罚。</p>`,
      ],
      show_clickable_nav: true,
      allow_backward: false,
      button_label_next: '继续'
    };
    jsPsych.data.addProperties({condition: 'shock'});
}

//key question check
var keyQ_check={
  type: 'html-button-response',
  data: { varname: 'keyQ_check' },
  stimulus:
    "<p style='font-size: 20px; text-align:center; font-weight: bold'>\
    在下面的问题中，如果你选择放弃按按钮，小A是否会被扣除被试费？<br/>",
  choices: ['会', '不会']
};

//key question: 50 trials
var factors={
  you:[2,4,6,8,10],
  other:[2,4,6,8,10],
  race:['white','asian'],
};
//    returned set of combinations in a random order
var full_design = jsPsych.randomization.factorial(factors, 1);
var keyQ = {
    timeline_variables:full_design,
    timeline:[{
      type: 'image-button-response-hack',
      data:{you:jsPsych.timelineVariable('you'),other:jsPsych.timelineVariable('other'),race:jsPsych.timelineVariable('race')},
      stimulus: function(){
        pic_index=Math.floor(Math.random() * 5);
        switch(jsPsych.timelineVariable('race',true)){
          case 'white':
            return whitePic[pic_index];
          case 'asian':
            return asianPic[pic_index];
        }
    },
      stimulus_height: function(){
          switch(condition){
            case 1:
              return h1;
            default:
              return h2;
          }
    },
      prompt:function(){
            switch(condition){
              case 1:
               return '<p style="font: 20pt 微软雅黑; text-align: left; line-height: 1.6em">\
              现在由你和这位参加者一起完成这个实验。他是学习者，你是监督者。<br/>\
            	在一次任务中，他未能完成记忆任务，需要由你按下按钮，去扣除对方<span style="color=blue;font-weight=bold">'+jsPsych.timelineVariable('other',true)+'<span style="font-weight=normal;color=black">元被试费。<br/>\
            	在本次任务中，你可以选择按下按钮，也可以选择放弃按下按钮，改为由计算机施加惩罚。<br/>\
            	但如果你放弃，你自己会被扣除<span style="color=blue;font-weight=bold">'+jsPsych.timelineVariable('you',true)+'<span style="font-weight=normal;color=black">元被试费。<br/><br/>\
            	<p style="font: bold 16pt 微软雅黑; text-align: center; line-height: 1.6em">\
            	请你做出选择：</p>';
          	default:
            	return '<p style="font: 20pt 微软雅黑; text-align: left; line-height: 1.6em">\
            现在由你和这位参加者一起完成这个实验。他是学习者，你是监督者。<br/>\
            在一次任务中，他未能完成记忆任务，需要由你按下按钮给其施加强度<span style="color=blue;font-weight=bold">'+jsPsych.timelineVariable('other',true)+ '<span style="font-weight=normal;color=black">级的电击刺激。<br/>\
            在本次任务中，你可以选择按下电击按钮，也可以选择放弃按下电击按钮，改为由计算机给其施加惩罚。但如果你放弃按下电击按钮，你自己会受到强度<span style="color=blue;font-weight=bold">'+jsPsych.timelineVariable('you',true)+'<span style="font-weight=normal;color=black">级的电击刺激。<br/><br/>\
            <p style="font: 16pt 微软雅黑; text-align: center; line-height: 1.6em">\
        	  请你做出选择：</p>';
          	}
      },
      choices: ["按下按钮", "放弃按按钮"],
      require_movement: true,
    }]
};

//labels used in social orientation tests
var labels=[
  {labels1:['85', '85', '85', '85', '85', '85', '85', '85', '85'],labels2:['85', '76', '68', '59', '50', '41', '33', '24', '15']},
  {labels1:['85', '87', '89', '91', '93', '94', '96', '98', '100'],labels2:['15', '19', '24', '28', '33', '37', '41', '46', '50']},
  {labels1: ['50', '54', '59', '63', '68', '72', '76', '81', '85'],labels2: ['100', '98', '96', '94', '93', '91', '89', '87', '85']},
  {labels1: ['50', '54', '59', '63', '68', '72', '76', '81', '85'],labels2: ['100', '89', '79', '68', '58', '47', '36', '26', '15']},
  {labels1: ['100', '94', '88', '81', '75', '69', '63', '56', '50'],labels2: ['50', '56', '63', '69', '75', '81', '88', '94', '100']},
  {labels1: ['100', '98', '96', '94', '93', '91', '89', '87', '85'],labels2: ['50', '54', '59', '63', '68', '72', '76', '81', '85']},
  {labels1: ['100', '96', '93', '89', '85', '81', '78', '74', '70'],labels2: ['50', '56', '63', '69', '75', '81', '88', '94', '100']},
  {labels1: ['90', '91', '93', '94', '95', '96', '98', '99', '100'],labels2: ['100', '99', '98', '96', '95', '94', '93', '91', '90']},
  {labels1: ['100', '94', '88', '81', '75', '69', '63', '56', '50'],labels2: ['70', '74', '78', '81', '85', '89', '93', '96', '100']},
  {labels1: ['100', '94', '88', '81', '75', '69', '63', '56', '50'],labels2: ['70', '74', '78', '81', '85', '89', '93', '96', '100']},
  {labels1: ['100', '99', '98', '96', '95', '94', '93', '91', '90'],labels2: ['70', '74', '78', '81', '85', '89', '93', '96', '100']},
  {labels1: ['70', '74', '78', '81', '85', '89', '93', '96', '100'],labels2: ['100', '96', '93', '89', '85', '81', '78', '74', '70']},
  {labels1: ['50', '56', '63', '69', '75', '81', '88', '94', '100'],labels2: ['100', '99', '98', '96', '95', '94', '93', '91', '90']},
  {labels1: ['50', '56', '63', '69', '75', '81', '88', '94', '100'],labels2: ['100', '94', '88', '81', '75', '69', '63', '56', '50']},
  {labels1: ['100', '96', '93', '89', '85', '81', '78', '74', '70'],labels2: ['90', '91', '93', '94', '95', '96', '98', '99', '100']},
  {labels1: ['90', '91', '93', '94', '95', '96', '98', '99', '100'],labels2: ['100', '94', '88', '81', '75', '69', '63', '56', '50']},
];

//slider-money
var instr_slider_money = {
  type: 'instructions',
  pages: [
    `<p style='font-size:25px;text-align:center;color: #B22222;font-weight:bold'>指导语：</p>
    <p style='font-size:20px;text-align:left;'>现在，我们将你和另一个受试者随机组成一组。<br/>\
        组成一组的两个人对于对方都是匿名的。你所有的选择也都是完全保密的。<br/>\<br/>\
        你需要在你和他之间进行一系列的<span style='font-size:20px;font-weight:bold;color:blue'>金钱分配<span style='font-weight:normal;text-align:left;color:black'>。<br/>\
        对于以下的问题，请选出你最喜欢的分配方式。<br/>\  
        记住，每个题目只能选一个分配方式。<br/>\
        所有的分配方式并无对错之分，只是你的个人偏好。<br/>\<br/>\
        你的选择将会决定你和另一个人在这个任务中的被试费。以下数字的单位是角。<br/>\
        <span style='font-size:20px;text-align:left;font-weight:bold'>实验结束时，会随机抽取其中一个题目，按照这题的数额来发此部分被试费。<br/>\<br/>`,
  ],
  show_clickable_nav: true,
  allow_backward: false,
  button_label_next: '继续'
};
var slider_money_check = {
  type: 'html-button-response',
  data: { varname: 'slider_money' },
  stimulus:
    "<p style='text-align:left;'>\
请判断：接下来你需要在你和另一人之间进行一系列金钱分配，分配的单位是元。<br/>\
<br/>",
  choices: ['对', '错'],
};
var trial_slider_money = {
  timeline_variables:labels,
  timeline:[{
  type: 'html-slider-response-hack',
    stimulus:
    "<p style='text-align:center;'>\
做出选择后，按继续按钮确认提交，进入下一项。<br/>\
<br/>",
  labels1_title: '你得到的钱数', 
  labels2_title: '另一人得到的钱数', 
  labels1: jsPsych.timelineVariable('labels1'),
  labels2:jsPsych.timelineVariable('labels2'),
  min: 1, max: 9, start: 1,
  slider_width: 500,
  require_movement:true,
  }],
  //button_label_next: '继续'，
};

//slider-shock
var instr_slider_shock = {
  type: 'instructions',
  pages: [
    `<p style='font-size:25px;text-align:center;color: #B22222;font-weight:bold'>指导语：</p>
    <p style='font-size:20px;text-align:left;'>现在，我们将你和另一个受试者随机组成一组。<br/>\
    组成一组的两个人对于对方都是匿名的。你所有的选择也都是完全保密的。<br/><br/>\
假设你需要和他<span style='font-size:20px;color:blue;font-weight:bold'>共同承担一定强度的电击刺激<span style='font-weight:normal;text-align:left;color:black'>。<br/>\
对于以下的问题，请选出你最喜欢的分配方式。<br/>\
记住，每个题目只能选一个分配方式。<br/>
所有的分配方式并无对错之分，只是你的个人偏好。<br/>\<br/>\
你的选择将会决定你和另一个人各自承担多强的电击刺激。<br/>\
题目中的数字表示电击的强度。其中，<br/>\
<span style='font-size:20px;text-align:left;font-weight:bold'>
0表示电击不会引起疼痛感觉， 100表示电击会引起非常痛的感觉。`,
  ],
  show_clickable_nav: true,
  allow_backward: false,
  button_label_next: '继续'
};
var slider_shock_check = {
  type: 'html-button-response',
  data: { varname: 'slider_shock' },
  stimulus:
    "<p style='text-align:left;'>\
    请判断：接下来你需要选出你感觉自己有多疼。<br/>",
  choices: ['对', '错'],
  require_movement: true,
};
var trial_slider_shock = {
  timeline_variables:labels,
  timeline:[{
  type: 'html-slider-response-hack',
    stimulus:
    "<p style='text-align:center;'>\
做出选择后，按继续按钮确认提交，进入下一项。<br/>\
<br/>",
  labels1_title: '你承受的电击强度', 
  labels2_title: '另一人承受的电击强度', 
  labels1: jsPsych.timelineVariable('labels1'),
  labels2:jsPsych.timelineVariable('labels2'),
  min: 1, max: 9, start: 1,
  slider_width: 500,
  require_movement:true,
  }],
};

//IRI
var instr_IRI = {
  type: 'instructions',
  pages: [
    `<p style='font-size:25px;text-align:center;color: #B22222'>\
    指导语：<br/>\
    <p style='font-size:20px;text-align:left;font-weight:bold'>\
    以下题目会询问在不同情况下，您的想法与感觉。<br/>\
    对于每一个题目，请您用1-5表示以下的陈述是否符合您自己的情况。<br/><br/>\
    <p style='text-align:center;'>\
    1 = 完全不符合<br/>\
    2 = 较不符合<br/>\
    3 = 不确定<br/>\
    4 = 较符合<br/>\
    5 = 完全符合</p>`,
  ],
  show_clickable_nav: true,
  allow_backward: false,
  button_label_previous: '返回',
  button_label_next: '继续'
};
var IRI = {
  timeline_variables: [
    { varname:{IRI:1},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我常做白日梦和幻想可能发生在我身上的事情" },
    { varname:{IRI:2}, V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我对没有我幸运的人常会产生想去关心他/她的感觉" },
    { varname:{IRI:3},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我有时觉得从他人的角度来看问题是有难度的" },
    { varname:{IRI:4},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 当别人遇到问题和麻烦的时候，有时我并不为他们感到遗憾" },
    { varname:{IRI:5},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我会与小说中人物的内心感受产生共鸣" },
    { varname:{IRI:6},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我能够理解紧急状况，并且会感到不安" },
    { varname:{IRI:7},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 在看电影或戏剧时，我通常都很客观，并且不会完全的陷入其中" },
    { varname:{IRI:8},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 在做决定前，我通常会从每个有不同意见的人的角度来考虑问题" },
    { varname:{IRI:9},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 当我看到别人处于不利状况下时，我会有一种想保护他们的感觉" },
    { varname:{IRI:10},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 在处于一种情绪化状态下时，我有时会感到无助" },
    { varname:{IRI:11},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 为了理解我朋友，有时我会通过想象自己从他们的角度来看待事情" },
    { varname:{IRI:12},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 完全沉浸在一本好书或一部电影中的情况是很少发生在我身上的" },
    { varname:{IRI:13},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 当我看见别人受伤时，我一般会很平静" },
    { varname:{IRI:'IRIcheck'},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 此题请选择完全符合" },
    { varname:{IRI:14},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 他人的不幸通常不会对我造成多大的干扰" },
    { varname:{IRI:15},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 如果我肯定自己是对的，就不会浪费很多时间听别人的意见" },
    { varname:{IRI:16},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 看完一部戏剧或者电影，我会觉得自己就是其中的一个主人公" },
    { varname:{IRI:17},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 处在紧张情绪中会让我感到害怕" },
    { varname:{IRI:18},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 当看见他人受到不公平待遇时，有时候我并不为他们感到遗憾" },
    { varname:{IRI:19},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我通常能够有效处理紧急事件" },
    { varname:{IRI:20},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我常常为自己所看到的事情而感动" },
    { varname:{IRI:21},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我相信每个问题都有两方面，我总是试图从这两个方面来看问题" },
    { varname:{IRI:22},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 我会把自己描述成一个心软的人" },
    { varname:{IRI:23},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 在看一部好电影的时候，我很容易将自己融入到主要人物的角色中" },
    { varname:{IRI:24},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 在遇到紧急事件时我通常会失去控制" },
    { varname:{IRI:20},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 当别人打扰了我的时候，我通常会试着从他的角度来考虑问题" },
    { varname:{IRI:26},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 当我阅读有趣的小说或者故事时，我会想象如果故事中的事情发生在我身上会是怎样" },
    { varname:{IRI:27},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 当看见别人遇到紧急情况、并且非常需要帮助时，我的精神会崩溃" },
    { varname:{IRI:28},V1: "<p style='font-size: 20px; text-align:center; font-weight: bold'>\ 在评价别人前，我会试着想象如果自己在他们的位置上会有何感觉" },
  ],
  timeline: [{
    type: 'html-button-response',
    data: jsPsych.timelineVariable('varname'),
    stimulus: jsPsych.timelineVariable('V1'),
    choices: ["1", "2", "3", "4", "5"],
    prompt: "<p style='font-size: 15px; text-align:center; font-weight: normal'>\
             请表明该陈述与你自身情况的相符程度<br/>\
             （1 = 完全不符合，5 = 完全符合）</p>",
    require_movement: false
  }],
  repetitions: 1,
};
var close_fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: false,
  delay_after: 0
};

// 定义实验流程（时间线）
var timeline2 = [
  open_fullscreen,
  welcome,
  warmup,
  instr_keyQ,
  keyQ_check,
  keyQ,
  instr_slider_money,
  slider_money_check,
  trial_slider_money,
  instr_slider_shock,
  slider_shock_check,
  trial_slider_shock,
  instr_IRI,
  IRI,
  close_fullscreen,
];

// 运行实验（总控制）
jsPsych.init({
  timeline: timeline2,
  show_progress_bar: true,
  on_finish: function () {
    jsPsych.data.get().localSave("csv", "data.csv");  // download from browser
    document.write("<h1 style='text-align:center; height:500pt; line-height:500pt'>实验结束，感谢您的参与！</h1>");
  }
});
