// flash.js
// Customizable jQuery library for web applications flash messages
// Author: Theodoros Georgopoulos
// Date: March 20, 2018
// Version: 1.0.0
// Copyright: MIT

// define the message container div
var $message_container = $('<div></div>')
$('body').append($message_container)

// define the default options
var $options = {
  type: 'danger',
  duration: 4000,
  vPosition: 'top',
  hPosition: 'right',
  fadeIn: 400,
  fadeOut: 400,
  clickable: true,
  autohide: true
}

function flash (message, options = null) {
  var type = typeof options
  if (options !== null && type === 'object') {
    $.extend($options, options)
  }
  //Message container div css
  msg_container_css = {
    position: 'fixed',
    'margin-left': '7px',
    'z-index': '50'
  }
  msg_container_css[$options.vPosition] = '3px'
  msg_container_css[$options.hPosition] = '12px'
  $message_container.css(msg_container_css)

  var rdm_id = makeid(10)

  var svg_success = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 512 512' version='1.1'><defs><linearGradient id='linear-gradient-${rdm_id}' gradientUnits='userSpaceOnUse' x1='258.596' y1='446.746' x2='258.461' y2='64.887'><stop offset='0' stop-color='#05bc29' stop-opacity='1'/><stop offset='1' stop-color='#5bf877' stop-opacity='1'/></linearGradient></defs><path id='Path' d='M173.898 439.404 L7.498 273.004 C-2.499 263.007 -2.499 246.798 7.498 236.8 L43.701 200.596 C53.698 190.598 69.908 190.598 79.905 200.596 L192 312.69 432.095 72.596 C442.092 62.599 458.302 62.599 468.299 72.596 L504.502 108.8 C514.499 118.797 514.499 135.006 504.502 145.004 L210.102 439.405 C200.104 449.402 183.895 449.402 173.898 439.404 Z' fill-opacity='1' fill='url(#linear-gradient-${rdm_id})' stroke='none'/></svg>`
  ;(svg_danger = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 511.999 511.999' style='enable-background:new 0 0 511.999 511.999;' xml:space='preserve'><defs xmlns='http://www.w3.org/2000/svg'><linearGradient id='linear-gradient-${rdm_id}' gradientUnits='userSpaceOnUse' x1='258.596' y1='446.746' x2='258.461' y2='64.887'><stop offset='0' stop-color='#fa2a2a' stop-opacity='1'/><stop offset='1' stop-color='#ff7474' stop-opacity='1'/></linearGradient></defs><path xmlns='http://www.w3.org/2000/svg' d='M384.955,256l120.28-120.28c9.019-9.019,9.019-23.642,0-32.66L408.94,6.765  c-9.019-9.019-23.642-9.019-32.66,0l-120.28,120.28L135.718,6.765c-9.019-9.019-23.642-9.019-32.66,0L6.764,103.058  c-9.019,9.019-9.019,23.642,0,32.66l120.28,120.28L6.764,376.28c-9.019,9.019-9.019,23.642,0,32.66l96.295,96.294  c9.019,9.019,23.642,9.019,32.66,0l120.28-120.28l120.28,120.28c9.019,9.019,23.642,9.019,32.66,0l96.295-96.294  c9.019-9.019,9.019-23.642,0-32.66L384.955,256z' fill='url(#linear-gradient-${rdm_id})'/></svg>`),
    (svg_default = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs xmlns='http://www.w3.org/2000/svg'><linearGradient id='linear-gradient-${rdm_id}' gradientUnits='userSpaceOnUse' x1='0%' y1='100%' x2='0%' y2='0%'><stop offset='0' stop-color='#2a78fa' stop-opacity='1'/><stop offset='1' stop-color='#6bd3ff' stop-opacity='1'/></linearGradient></defs><path fill='url(#linear-gradient-${rdm_id})' d='M16,1A15,15,0,1,0,31,16,15,15,0,0,0,16,1Zm2,22a2,2,0,0,1-4,0V16a2,2,0,0,1,4,0ZM16,12.19A2.19,2.19,0,1,1,18.19,10,2.19,2.19,0,0,1,16,12.19Z'/></svg>`)

  var icon =
    $options.type.toLowerCase() == 'success'
      ? svg_success
      : $options.type.toLowerCase() == 'danger'
      ? svg_danger
      : svg_default
  var bg_icon =
    $options.type.toLowerCase() == 'success'
      ? "success-flash"
      : $options.type.toLowerCase() == 'danger'
      ? "danger-flash"
      : ""
  // define the message div
  var $message = $(
    `<div class='flash_msg'><div class='main_flash'><div class='icon-flash'>${icon}</div>${message}</div><div class='bg_flash ${bg_icon}'></div></div>`
  )

  //Appeding message div to message container div
  $message_container
    .append($message)
    .children(':last')
    .hide()
    .fadeIn($options.fadeIn)
  //Check if message is clickable to enable message click hide action
  if ($options.clickable) {
    $message.on('click', function () {
      $(this).fadeOut($options.fadeOut)
    })
  }

  //Check if message is enabled to autohide
  if ($options.autohide) {
    setTimeout(function () {
      $message.fadeOut($options.fadeOut)
    }, $options.duration)
  }
}

function makeid (length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
