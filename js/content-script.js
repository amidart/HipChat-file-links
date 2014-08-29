var Module = (function(my){

  my.init = function() {
    observerInit();
  };


  /**
   * =========================== Observer
   */
  function observerInit () {
    var target = document.querySelector('#chats');

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          processChildList(mutation.addedNodes, false);
        }
      });
    });

    var config = { subtree: true, childList: true, characterData: true };
    observer.observe(target, config);
  }

  /**
   *
   */
  function processChildList (nodes, remove) {
    if (!nodes.length) return;
    for (var i = 0, len = nodes.length; i < len; i++) {
      var className = '';
      try {
        className = nodes[i].childNodes[0].className;
      } catch (e) {}
      if (className && className.match(/systemMessage-yellow/)) {
        processNode(nodes[i], remove);
      }
    }
  }


  function processNode (node, remove) {
    var a = node.querySelector('.messageBlock div a');
    if (!a) return;
    var text = a.textContent;
    if (text.match(/^\\\\.*/)) {
      a.setAttribute('href', 'file://' + text);
      a.setAttribute('target', '_blank');
    }
  }


  return my;

})(Module || {});


Module.init();
