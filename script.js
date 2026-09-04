(function(){
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* entrance reveal */
  window.addEventListener('load', function(){
    var card = document.getElementById('invitation');
    requestAnimationFrame(function(){ card.classList.add('is-visible'); });
  });

  /* ambient petals */
  if(!reduceMotion){
    var ambient = document.getElementById('ambient');
    var count = window.innerWidth < 600 ? 10 : 16;
    for(var i=0;i<count;i++){
      var p = document.createElement('div');
      p.className = 'petal' + (i % 3 === 0 ? ' alt' : '');
      var size = 8 + Math.random()*10;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (Math.random()*100) + 'vw';
      var duration = 10 + Math.random()*10;
      p.style.animationDuration = duration + 's';
      p.style.animationDelay = (-Math.random()*duration) + 's';
      ambient.appendChild(p);
    }
  }

  /* countdown */
  var target = new Date(2026, 8, 5, 12, 0, 0); // Sept 5, 2026, 12:00 PM
  var elDays = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins = document.getElementById('cd-mins');
  var elSecs = document.getElementById('cd-secs');
  var elLabel = document.getElementById('countdown-label');
  var elGrid = document.getElementById('countdown-grid');
  var pad = function(n){ return String(n).padStart(2,'0'); };

  function tick(){
    var now = new Date();
    var diff = target - now;
    if(diff <= 0){
      elLabel.textContent = "Today's the day! 🎉";
      elGrid.innerHTML = '<div class="countdown-done">The celebration has begun — see you there!</div>';
      clearInterval(timer);
      return;
    }
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins = Math.floor((diff % 3600000) / 60000);
    var secs = Math.floor((diff % 60000) / 1000);
    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);
  }
  tick();
  var timer = setInterval(tick, 1000);

  /* modal */
  var overlay = document.getElementById('modal-overlay');
  var trigger = document.getElementById('rsvp-trigger');
  var closeBtn = document.getElementById('modal-close');
  var closeBtn2 = document.getElementById('rsvp-close-btn');
  var form = document.getElementById('rsvp-actual-form');
  var formWrap = document.getElementById('rsvp-form');
  var successWrap = document.getElementById('rsvp-success');
  var successText = document.getElementById('rsvp-success-text');
  var lastFocused = null;

  function openModal(){
    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    document.getElementById('rsvp-name').focus();
    document.addEventListener('keydown', onKeydown);
  }
  function closeModal(){
    overlay.classList.remove('is-open');
    document.removeEventListener('keydown', onKeydown);
    formWrap.classList.remove('is-hidden');
    successWrap.classList.remove('is-visible');
    form.reset();
    if(lastFocused) lastFocused.focus();
  }
  function onKeydown(e){
    if(e.key === 'Escape') closeModal();
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  closeBtn2.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) closeModal();
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('rsvp-name').value.trim() || 'Professor';
    successText.textContent = "Thank you, " + name + "! We can't wait to celebrate with you.";
    formWrap.classList.add('is-hidden');
    successWrap.classList.add('is-visible');
  });
})();
