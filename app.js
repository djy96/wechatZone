// TODO: 用户名称需修改为自己的名称
var userName = '李骁';
// 朋友圈页面的数据
var data = [{
  user: {
    name: '阳和',
    avatar: './img/avatar2.png'
  },
  content: {
    type: 0, // 多图片消息
    text: '华仔真棒，新的一年继续努力！',
    pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
    share: {},
    timeString: '3分钟前'
  },
  reply: {
    hasLiked: false,
    likes: ['Guo封面', '源小神'],
    comments: [{
      author: 'Guo封面',
      text: '你也喜欢华仔哈！！！'
    }, {
      author: '喵仔zsy',
      text: '华仔实至名归哈'
    }]
  }
}, {
  user: {
    name: '伟科大人',
    avatar: './img/avatar3.png'
  },
  content: {
    type: 1, // 分享消息
    text: '全面读书日',
    pics: [],
    share: {
      pic: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
      text: '飘洋过海来看你'
    },
    timeString: '50分钟前'
  },
  reply: {
    hasLiked: false,
    likes: ['阳和'],
    comments: []
  }
}, {
  user: {
    name: '深圳周润发',
    avatar: './img/avatar4.png'
  },
  content: {
    type: 2, // 单图片消息
    text: '很好的色彩',
    pics: ['http://coding.imweb.io/img/default/k-2.jpg'],
    share: {},
    timeString: '一小时前'
  },
  reply: {
    hasLiked: false,
    likes: [],
    comments: []
  }
}, {
  user: {
    name: '喵仔zsy',
    avatar: './img/avatar5.png'
  },
  content: {
    type: 3, // 无图片消息
    text: '以后咖啡豆不敢浪费了',
    pics: [],
    share: {},
    timeString: '2个小时前'
  },
  reply: {
    hasLiked: false,
    likes: [],
    comments: []
  }
}];

// 相关 DOM
var $page = $('.page-moments');
var $momentsList = $('.moments-list');

/**
 * 点赞内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function likesHtmlTpl(likes) {
  if (!likes.length) {
    return '';
  }
  var htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
  // 点赞人的html列表
  var likesHtmlArr = [];
  // 遍历生成
  for (var i = 0, len = likes.length; i < len; i++) {
    likesHtmlArr.push('<a class="reply-who" href="#">' + likes[i] + '</a>');
  }
  // 每个点赞人以逗号加一个空格来相隔
  var likesHtmlText = likesHtmlArr.join(', ');
  htmlText.push(likesHtmlText);
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function commentsHtmlTpl(comments) {
  if (!comments.length) {
    return '';
  }
  var htmlText = ['<div class="reply-comment">'];
  for (var i = 0, len = comments.length; i < len; i++) {
    var comment = comments[i];
    htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 评论点赞总体内容 HTML 模板
 * @param {Object} replyData 消息的评论点赞数据
 * @return {String} 返回html字符串
 */
function replyTpl(replyData) {
  var htmlText = [];
  htmlText.push('<div class="reply-zone">');
  htmlText.push(likesHtmlTpl(replyData.likes));
  htmlText.push(commentsHtmlTpl(replyData.comments));
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 多张图片消息模版 （可参考message.html）
 * @param {Object} pics 多图片消息的图片列表
 * @return {String} 返回html字符串
 */
function multiplePicTpl(pics) {
  var htmlText = [];
  htmlText.push('<ul class="item-pic">');
  for (var i = 0, len = pics.length; i < len; i++) {
    htmlText.push('<img class="pic-item" src="' + pics[i] + '">');
  }
  htmlText.push('</ul>');
  return htmlText.join('');
}
/**
 * 分享消息模板
 * @param {Object} share 分享内容
 * @return {String} 返回html字符串
 */
function shareMsgTpl(share) {
  var htmlText = `
    <a href="#">
      <div class="item-share">
        <img src="${share.pic}" alt="分享内容图片" class="share-img" width="42" height="42">
        <p class="share-tt">${share.text}</p>
      </div>
    </a>`;
  return htmlText;
}
/**
 * 单张图片消息模板
 * @param {Object} pics 单图片消息的图片
 * @return {String} 返回html字符串
 */
function singlePicTpl(pics) {
  var htmlText = `
    <div class="item-pic">
      <img src="${pics[0]}" alt="单张图片" class="item-only-img">
    </div>`;
  return htmlText;
}
/**
 * 循环：消息体
 * @param {Object} messageData 对象
 */
function messageTpl(messageData) {
  var user = messageData.user;
  var content = messageData.content;
  var htmlText = [];
  htmlText.push('<div class="moments-item" data-index="0">');
  // 消息用户头像
  htmlText.push('<a class="item-left" href="#">');
  htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
  htmlText.push('</a>');
  // 消息右边内容
  htmlText.push('<div class="item-right">');
  // 消息内容-用户名称
  htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
  // 消息内容-文本信息
  htmlText.push('<p class="item-msg">' + content.text + '</p>');
  // 消息内容-图片列表
  var contentHtml = '';
  // 目前只支持多图片消息，需要补充完成其余三种消息展示
  switch (content.type) {
    // 多图片消息
    case 0:
      contentHtml = multiplePicTpl(content.pics);
      break;
    case 1:
      // TODO: 实现分享消息
      contentHtml = shareMsgTpl(content.share);
      break;
    case 2:
      // TODO: 实现单张图片消息
      contentHtml = singlePicTpl(content.pics);
      break;
    case 3:
      // TODO: 实现无图片消息
      break;
    default:
      // 除了上述3种类型以外
      break;
  }
  htmlText.push(contentHtml);
  // 消息时间和回复按钮
  htmlText.push('<div class="item-ft">');
  htmlText.push('<span class="item-time">' + content.timeString + '</span>');
  htmlText.push('<div class="item-reply-btn">');
  htmlText.push('<span class="item-reply"></span>');
  htmlText.push('</div>');
  // 点赞与评论侧滑菜单
  htmlText.push(`
    <div class="reply-panel-wrap">
      <div class="item-reply-panel">
        <div class="reply-panel-item
                    reply-panel-islike
                    reply-panel-like
                    ${messageData.reply.hasLiked ? "reply-panel-notlike" : "reply-panel-like"}">
          <span>${messageData.reply.hasLiked ? '取消' : '赞'}</span>
        </div>
        <div class="reply-panel-item reply-panel-comment">
          <span>评论</span>
        </div>
      </div>
    </div>`);
  htmlText.push('</div>');
  // 消息回复模块（点赞和评论）
  htmlText.push(replyTpl(messageData.reply));
  htmlText.push('</div></div>');
  return htmlText.join('');
}


/**
 * 页面渲染函数：render
 */
function render() {
  // TODO: 目前只渲染了一个消息（多图片信息）,需要展示data数组中的所有消息数据。
  var messageHtml = '';
  for (var i = 0, len = data.length; i < len; i++) {
    messageHtml += messageTpl(data[i]);
  }
  $momentsList.html(messageHtml);
}


/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() {

  var reply_panel_switch = false; //点赞回复滑动菜单开关
  var curPanel = null; //记录当前选中的点赞回复滑动菜单
  var curPanelPosition = null; //记录当前选中的点赞回复滑动菜单的位置

  var comment_panel_switch = false; //评论输入区域滑动菜单开关

  var moments_item_last_child_height = $('.moments-list .moments-item:last-child').outerHeight(); //记录消息列表最后一个item的高度

  /**
   * 设置header中显示的用户名
   */
  $(".user-name").text(userName);


  /**
   * 设置点赞与回复功能滑动菜单
   */
  $('.item-reply-btn').on('click', function() {
    var $panelWrap = $(this).parent().find('.reply-panel-wrap');
    if (reply_panel_switch) {
      //当点击按钮触发'click'事件且滑动菜单开关为开启(true)时，需要做一个判定：
      //当'click'事件不是第一次触发 且 当前点击的按钮和上次点击的按钮不是同一个时：
      if (curPanel !== null && $(this).offset().top !== curPanelPosition.top) {
        //关闭上次选中的滑动菜单并打开当前点击的滑动菜单
        curPanel.parent().find('.reply-panel-wrap').css({
          width: 0
        });
        $panelWrap = $(this).parent().find('.reply-panel-wrap');
        $panelWrap.animate({
          width: '180px'
        });
      } else {
        //当前点击的按钮和上次点击的按钮是同一个时：
        $panelWrap.animate({
          width: '0px'
        });
        reply_panel_switch = !reply_panel_switch;
      }
    } else
    //当滑动菜单开关为关闭(false)时：
    {
      $panelWrap.animate({
        width: '180px'
      });
      reply_panel_switch = !reply_panel_switch;
    }
    //将当前选中的开关保存在curPanel中
    curPanel = $(this);
    //将当前选中的开关位置保存在curPanelPosition中
    curPanelPosition = $(this).offset();
  });

  //设置滑动菜单 点赞功能 与 评论功能 的具体实现

  $('.reply-panel-wrap').on('click', '.reply-panel-item', function() {
    var $item_right = $(this).parents().eq(3);

    //点赞功能
    if ($(this).hasClass('reply-panel-islike')) {
      //如果未赞
      if (!$(this).hasClass('reply-panel-notlike') && $(this).find('span').text() === '赞') {
        //点击 ‘赞’ 切换样式
        $(this).find('span').text('取消');
        this.classList.add('reply-panel-notlike');
        //若点赞列表不为空
        if ($item_right.find('.reply-like').length) {
          $item_right.find('.reply-like').append(`<a class='reply-who' href='#'>, ${userName}</a>`);
        }
        //若点赞列表为空
        else {
          $item_right.find('.reply-zone').prepend(`
            <div class='reply-like'>
              <i class='icon-like-blue'></i>
              <a class='reply-who' href='#'>${userName}</a>
            </div>`);
        }
      }
      //如果已赞
      else if ($(this).hasClass('reply-panel-notlike') && $(this).find('span').text() === '取消') {
        //点击‘取消’切换样式
        $(this).find('span').text('赞');
        this.classList.remove('reply-panel-notlike');
        //若取消赞后点赞列表不为空
        if ($item_right.find('.reply-like').children('a').length - 1) {
          $item_right.find('.reply-like a:last-child').remove();
        }
        //若取消赞后点赞列表为空
        else {
          $item_right.find('.reply-like').remove();
        }
      }
      moments_item_last_child_height = $('.moments-list .moments-item:last-child').outerHeight();
    }

    //评论功能
    else if ($(this).hasClass('reply-panel-comment')) {
      var offset = $(this).parents('.moments-item').offset().top; //消息列表顶部距离html顶部的距离
      var outerHeight = $(this).parents('.moments-item').outerHeight(); //消息列表item的总高度
      var scrollTop = $(document).scrollTop(); //消息列表向下滚动的距离
      var clientTopOffset = offset + outerHeight - scrollTop; //消息列表距离窗口上端的距离
      $('.comment-panel-wrap').animate({
        bottom: 0
      });
      //当输入区域上滑菜单遮盖了选中的消息列表式时，需将消息列表上滑至相应可见的位置
      if ($(window).height() * 0.45 + clientTopOffset > $(window).height() && comment_panel_switch === false) {
        //当html的总高度能满足其选中的消息列表上滑至相应高度时，直接上滑：
        if ($(window).height() * 0.45 + offset + outerHeight < $(document).height()) {
          $('html').animate({
            scrollTop: offset + outerHeight - $(window).height() * 0.55
          });
        }
        //当html的总高度不能满足其选中的消息列表上滑至相应高度时(多发生于底部的消息列表)，需增加最底部消息列表的高度
        else {
          $('.moments-list .moments-item:last-child').css({
            'height': offset + outerHeight - $(window).height() * 0.55
          });
          $('html').animate({
            scrollTop: offset + outerHeight - $(window).height() * 0.55
          });
        }
      }
      comment_panel_switch = !comment_panel_switch;
      $('.comment-input').focus();
    }
  });

  //评论区输入事件
  $('.comment-input').on('input propertychange', function() {
    if ($(this).val().trim() !== '') {
      $('.comment-send-btn').css({
        'background-color': '#188eee',
        'color': '#fff'
      });
    } else {
      $('.comment-send-btn').css({
        'background-color': '#f5f5f5',
        'color': '#A8A8A8'
      });
    }
  });

  //评论区发送评论事件
  $('.comment-send-btn').on('click', function() {
    if ($('.comment-input').val().trim() !== '') {
      var item_right = curPanel.parents().eq(1);
      //若评论区列表不为空
      if (item_right.find('.reply-comment').length) {
        item_right.find('.reply-comment').append(`
          <div class='comment-item'>
            <a class='reply-who' href='#'>${userName}</a>
            <span>: ${$('.comment-input').val().trim()}</span>
          </div>`);
      }
      //若评论区列表为空
      else {
        item_right.find('.reply-zone').append(`
          <div class='reply-comment'>
            <div class='comment-item'>
              <a class='reply-who' href='#'>${userName}</a>
              <span>: ${$('.comment-input').val().trim()}</span>
            </div>
          <div>`);
      }
      //复原工作
      $('.comment-input').val('');
      $('.comment-panel-wrap').animate({
        bottom: '-45%'
      });
      comment_panel_switch = !comment_panel_switch;
      moments_item_last_child_height = $('.moments-list .moments-item:last-child').outerHeight();
      $('.moments-list .moments-item:last-child').css({
        'height': moments_item_last_child_height
      }).css({
        'height': 'auto'
      });
      $('.comment-panel-wrap').animate({
        bottom: '-45%'
      });
      $('.comment-send-btn').css({
        'background-color': '#f5f5f5',
        'color': '#A8A8A8'
      });
    }
  });


  /**
   *点击图片放大事件
   */
  $('img.item-only-img, img.pic-item').on('click', function() {
    $('body').append(`
      <div class='enlarge-img-wrap'>
        <img src="${$(this).attr('src')}" alt='放大图片' class='enlarge-img'>
      </div>`);
  });


  /**
   * body点击事件：
   */
  $('body').on('click', function(e) {
    var target = e.target;
    //当点击非点赞回复侧滑菜单区域时，若有打开的滑动菜单则自动收回
    if (!$(target).parent().is('.item-reply-btn') && !$(target).is('.item-reply-btn') && reply_panel_switch === true && curPanel !== null) {
      curPanel.parent().find('.reply-panel-wrap').animate({
        width: 0
      });
      reply_panel_switch = !reply_panel_switch;
    }
    //当点击非评论上滑菜单区域时，若有打开的上滑菜单则自动收回
    if (!$(target).parents().is('.comment-panel-wrap') && comment_panel_switch === true && $('.comment-panel-wrap').css('bottom').indexOf('-')) {
      $('.moments-list .moments-item:last-child').css({
        'height': moments_item_last_child_height
      }).css({
        'height': 'auto'
      });
      $('.comment-panel-wrap').animate({
        bottom: '-45%'
      });
      comment_panel_switch = !comment_panel_switch;
    }
    //点击放大图片，关闭放大图片
    if (target.className === 'enlarge-img-wrap' || target.className === 'enlarge-img') {
      $('.enlarge-img-wrap').remove();
    }
  });
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
  // 渲染页面
  render();
  bindEvent();
}

init();