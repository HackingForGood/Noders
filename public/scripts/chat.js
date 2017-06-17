/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Initializes Chat.
function Chat(user, chatId) {

  //TODO: Check if user is authenticated
    // Shortcuts to DOM Elements.
    this.user = user;
    this.chatId = chatId;
    this.messageList = document.getElementById('messages');
    this.messageForm = document.getElementById('message-form');
    this.messageInput = document.getElementById('message');
    this.submitButton = document.getElementById('submit');
    this.userPic = document.getElementById('user-pic');
    this.userName = document.getElementById('user-name');

    // Saves message on form submit.
    this.messageForm.addEventListener('submit', this.saveMessage.bind(this));

    // Toggle for the button.
    var buttonTogglingHandler = this.toggleButton.bind(this);
    this.messageInput.addEventListener('keyup', buttonTogglingHandler);
    this.messageInput.addEventListener('change', buttonTogglingHandler);
    window.setInterval(this.loadMessages, 1000);
}

// Loads Chat messages history and listens for upcoming ones.
Chat.prototype.loadMessages = function() {

    Firebase.chat.getChatMessages(this.chatId, function (messages) {
      messages.forEach(function (val) {
          this.displayMessage(val.key,val.name, val.text, val.profilepic)
      });
    });
};

// Saves a new message on the Firebase DB.
Chat.prototype.saveMessage = function(e) {
    Firebase.chat.sendMessage(this.messageInput.value, this.chatId, function () {
        this.loadMessages();
        Chat.resetMaterialTextfield(this.messageInput);
        this.toggleButton();
    });
};


// Resets the given MaterialTextField.
Chat.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Template for messages.
Chat.MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

// A loading image URL.
Chat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Displays a Message in the UI.
Chat.prototype.displayMessage = function(key, name, text, picUrl) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = Chat.MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    this.messageList.appendChild(div);
  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  }
  // Show the card fading-in and scroll to view the new message.
  setTimeout(function() {div.classList.add('visible')}, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
Chat.prototype.toggleButton = function() {
  if (this.messageInput.value) {
    this.submitButton.removeAttribute('disabled');
  } else {
    this.submitButton.setAttribute('disabled', 'true');
  }
};

haven.firebaseScriptInjectLoaded = function() {
  window.setTimeout(function() {
    Firebase.chat.getActiveChatID(Firebase.getCurrentUser().uid, function(chatId) {
      window.chat = new Chat(Firebase.getCurrentUser(), chatId);
    });
  }, 1000);
};
