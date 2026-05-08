/* NDIS Exposed — drop-in donate widget.
 *
 * Usage (paste anywhere on the host page):
 *   <div id="ndis-donate"></div>
 *   <script src="https://give.ndisexposed.com/donate-embed.js"></script>
 *
 * Renders into any element with id="ndis-donate" or data-ndis-donate.
 * Pulls amount tiers and Stripe Payment Links from donate-config.js.
 * Style-isolated via Shadow DOM, so it can't conflict with host CSS.
 */
(function(){
  'use strict';

  // Resolve the URL this script was loaded from so we can fetch siblings.
  var scriptEl = document.currentScript;
  if(!scriptEl){
    var ss = document.getElementsByTagName('script');
    scriptEl = ss[ss.length - 1];
  }
  var BASE = scriptEl && scriptEl.src ? new URL('.', scriptEl.src).href : '';

  function loadConfig(cb){
    if(window.DONATE_CONFIG){ cb(); return; }
    var s = document.createElement('script');
    s.src = BASE + 'donate-config.js?v=1';
    s.async = false;
    s.onload = cb;
    s.onerror = function(){
      console.error('[ndis-donate] failed to load ' + s.src);
    };
    document.head.appendChild(s);
  }

  function ready(fn){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function mountAll(){
    var targets = document.querySelectorAll('#ndis-donate, [data-ndis-donate]');
    if(targets.length === 0){
      console.warn('[ndis-donate] no target element. Add <div id="ndis-donate"></div>.');
      return;
    }
    Array.prototype.forEach.call(targets, mount);
  }

  function mount(host){
    if(host.dataset.ndisMounted) return;
    host.dataset.ndisMounted = '1';

    var cfg = window.DONATE_CONFIG;
    var LADDER = cfg.LADDER;
    var LINKS = cfg.STRIPE_LINKS;

    var state = { sel: 265, currency: 'AUD', frequency: 'oneTime' };

    var shadow = host.attachShadow ? host.attachShadow({mode:'open'}) : host;
    shadow.innerHTML = template(LADDER);
    bind(shadow, state, LINKS);
    render(shadow, state);
  }

  function template(LADDER){
    var rungs = LADDER.map(function(r){
      return '<button type="button" class="rung" data-amt="' + r.amt + '">$' + r.amt + '</button>';
    }).join('');
    return ''+
'<style>'+
':host{all:initial;display:block;}'+
'*{box-sizing:border-box;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Inter,sans-serif;}'+
'button{font:inherit;cursor:pointer;border:0;background:transparent;color:inherit;}'+
'.wrap{max-width:480px;margin:0 auto;background:#F5F5F5;border:1px solid #E4E6EC;border-radius:8px;padding:20px;color:#111E42;}'+
'.label{display:block;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5A5F6C;margin-bottom:6px;}'+
'.row + .row{margin-top:14px;}'+
'.toggle{display:flex;gap:8px;}'+
'.btn{display:inline-flex;align-items:center;justify-content:center;height:42px;padding:0 16px;border-radius:4px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;font-size:12px;white-space:nowrap;flex:1;transition:background .12s,color .12s,border-color .12s;border:2px solid transparent;}'+
'.btn:active{transform:translateY(1px);}'+
'.btn-primary{background:#DA1333;color:#fff;}'+
'.btn-primary:hover{background:#B10E29;}'+
'.btn-secondary{background:#fff;color:#213875;border-color:#213875;}'+
'.btn-secondary:hover{background:#213875;color:#fff;}'+
'.btn-lg{height:54px;font-size:13px;width:100%;flex:none;}'+
'.ladder{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}'+
'@media(max-width:380px){.ladder{grid-template-columns:repeat(2,1fr);}}'+
'.rung{border:2px solid #E4E6EC;border-radius:6px;padding:14px 8px;text-align:center;background:#fff;font-weight:900;font-size:18px;color:#111E42;font-family:"Archivo Black","Helvetica Neue",Arial,sans-serif;line-height:1;transition:border-color .12s,background .12s;}'+
'.rung:hover{border-color:#213875;}'+
'.rung.sel{border-color:#DA1333;background:#FFF5F7;}'+
'.amount-display{background:#fff;border:1px solid #E4E6EC;border-radius:6px;padding:16px 18px;display:flex;align-items:baseline;gap:8px;}'+
'.amount-display .num{font-family:"Archivo Black","Helvetica Neue",Arial,sans-serif;font-size:34px;line-height:1;color:#111E42;}'+
'.amount-display .ccy{color:#5A5F6C;font-size:13px;}'+
'.footnote{color:#5A5F6C;font-size:11px;margin:10px 0 0;text-align:center;}'+
'.note{color:#5A5F6C;font-size:11px;margin:6px 0 0;}'+
'</style>'+
'<div class="wrap">'+
  '<div class="row"><span class="label">Currency</span><div class="toggle" data-tog="currency">'+
    '<button type="button" class="btn" data-val="AUD">AUD</button>'+
    '<button type="button" class="btn" data-val="USD">USD</button>'+
  '</div></div>'+
  '<div class="row"><span class="label">Frequency</span><div class="toggle" data-tog="frequency">'+
    '<button type="button" class="btn" data-val="oneTime">One-time</button>'+
    '<button type="button" class="btn" data-val="monthly">Monthly</button>'+
  '</div><p class="note" data-only-custom hidden>Custom amounts are one-time only.</p></div>'+
  '<div class="row"><span class="label">Amount</span><div class="ladder" data-ladder>'+
    rungs +
    '<button type="button" class="rung" data-amt="custom">Custom</button>'+
  '</div></div>'+
  '<div class="row"><div class="amount-display"><span class="num" data-num></span><span class="ccy" data-ccy></span></div></div>'+
  '<button type="button" class="btn btn-primary btn-lg" data-donate style="margin-top:14px"></button>'+
  '<p class="footnote">Secure checkout powered by Stripe</p>'+
'</div>';
  }

  function checkoutUrl(state, LINKS){
    if(state.sel === 'custom') return LINKS.oneTime[state.currency].custom;
    var f = LINKS[state.frequency];
    return f && f[state.currency] && f[state.currency][state.sel];
  }

  function render(root, state){
    // Toggles
    root.querySelectorAll('[data-tog]').forEach(function(group){
      var key = group.getAttribute('data-tog');
      group.querySelectorAll('button[data-val]').forEach(function(b){
        var active = b.getAttribute('data-val') === state[key];
        b.classList.toggle('btn-primary', active);
        b.classList.toggle('btn-secondary', !active);
      });
    });
    // Ladder
    root.querySelectorAll('[data-amt]').forEach(function(b){
      var v = b.getAttribute('data-amt');
      var match = v === 'custom' ? state.sel === 'custom' : Number(v) === state.sel;
      b.classList.toggle('sel', match);
    });
    // Amount display
    var isCustom = state.sel === 'custom';
    root.querySelector('[data-num]').textContent = isCustom ? 'Custom' : ('$' + state.sel);
    root.querySelector('[data-ccy]').textContent = state.currency + (state.frequency === 'monthly' ? ' / month' : '');
    // Donate button label
    root.querySelector('[data-donate]').textContent = isCustom
      ? ('Donate ' + state.currency + ' →')
      : ('Donate $' + state.sel + ' ' + state.currency + (state.frequency === 'monthly' ? ' / month' : ''));
    // Custom-only note
    var note = root.querySelector('[data-only-custom]');
    if(note) note.hidden = !isCustom;
  }

  function bind(root, state, LINKS){
    root.querySelectorAll('[data-tog]').forEach(function(group){
      var key = group.getAttribute('data-tog');
      group.addEventListener('click', function(e){
        var b = e.target.closest && e.target.closest('button[data-val]');
        if(!b) return;
        var v = b.getAttribute('data-val');
        if(key === 'frequency' && v === 'monthly' && state.sel === 'custom') state.sel = 265;
        state[key] = v;
        render(root, state);
      });
    });

    root.querySelector('[data-ladder]').addEventListener('click', function(e){
      var b = e.target.closest && e.target.closest('[data-amt]');
      if(!b) return;
      var v = b.getAttribute('data-amt');
      if(v === 'custom'){
        state.sel = 'custom';
        if(state.frequency !== 'oneTime') state.frequency = 'oneTime';
      } else {
        state.sel = Number(v);
      }
      render(root, state);
    });

    root.querySelector('[data-donate]').addEventListener('click', function(e){
      e.preventDefault();
      var url = checkoutUrl(state, LINKS);
      if(!url){ alert('Stripe link not configured for this option.'); return; }
      try { window.top.location.href = url; }
      catch(err){ window.open(url, '_top'); }
    });
  }

  loadConfig(function(){ ready(mountAll); });
})();
