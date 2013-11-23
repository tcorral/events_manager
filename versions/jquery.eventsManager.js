(function($)
{
  'use strict';
  var oGetEvents, _getJQueryEvents, _loop;
  _getJQueryEvents = function(oElement)
  {
    return jQuery._data(oElement).events;
  };
  _loop = function(aItems, fpCallback, fpFinal)
  {
    var nIndex, nLenItems, oItem;
    fpFinal = fpFinal || function(){};
    if(aItems)
    {
      nLenItems = aItems.length;
      fpFinal = fpFinal || function(){};
      for(nIndex = 0; nIndex < nLenItems; nIndex++)
      {
        oItem = aItems[nIndex];
        if(fpCallback(oItem) === false)
        {
          break;
        }
      }
    }
    return fpFinal();
  };
  oGetEvents = {
    getTypeEvents: function(oElement)
    {
      var auxEvents = [],
          event,
          eventsQuery = _getJQueryEvents(oElement);
      if(eventsQuery){
        for(event in eventsQuery){
          auxEvents.push(event);
        }
      }
      return auxEvents;
    },
    getEvent: function(oElement, options)
    {
      var eventsQuery = _getJQueryEvents(oElement);
      if(eventsQuery && options.type)
      {
        return eventsQuery[options.type] || [];
      }else{
        return [];
      }
    },
    hasCallback: function(oElement, options)
    {
      var callbacks = oGetEvents.getCallbacks(oElement, options);
      return callbacks.indexOf(options.callback) !== -1;
    },
    hasEvent: function(oElement, options)
    {
      var eventTypes = oGetEvents.getTypeEvents(oElement);
      return eventTypes.indexOf(options.type) !== -1;
    },
    removeEvents: function(oElement, options)
    {
      if(options.type && $._data(oElement).events && $._data(oElement).events[options.type])
      {
        delete $._data(oElement).events[options.type];
      }else{
        delete $._data(oElement).events;
      }
    },
    addEvents: function(oElement, options)
    {
      var aArr, copyCallback;
      if(options.type && $._data(oElement).events)
      {
        if(!$._data(oElement).events[options.type])
        {
          $._data(oElement).events[options.type] = [];
        }
      }else{
        $._data(oElement).events = {};
        $._data(oElement).events[options.type] = [];
      }
      aArr = $._data(oElement).events[options.type];
      if(!$.isArray(options.callback))
      {
        copyCallback = options.callback;
        options.callback = [copyCallback];
      }
      aArr.push.apply(aArr, options.callback);
    },
    copyEvents: function(oElement, options)
    {
      var events = $._data(oElement).events,
          targetEvents;
      if(options.type && events[options.type])
      {
        targetEvents = $._data(options.target).events;
        if(!targetEvents)
        {
          $._data(options.target).events = {};
        }
        $._data(options.target).events[options.type] = $.extend($._data(options.target).events[options.type], events[options.type]);
      }else{
        $._data(options.target).events = $.extend($._data(options.target).events, events);
      }
    },
    getEvents: function(oElement)
    {
      return _getJQueryEvents(oElement);
    },
    getCallbacks: function(oElement, options)
    {
      var callbacks = [],
          events,
          callback,
          oEvents,
          eventsQuery = _getJQueryEvents(oElement);
      if(eventsQuery && options.type)
      {
        _loop(eventsQuery[options.type], function(event)
        {
          callbacks.push(event.handler);
        });
      }else if(!options.type){
        events = oGetEvents.getTypeEvents(oElement);
        _loop(events, function(event)
        {
          var sKey;
          oEvents = eventsQuery[event];
          for(sKey in oEvents)
          {
            if(oEvents.hasOwnProperty(sKey))
            {
              callback = oEvents[sKey].handler;
              if(typeof callback === 'function')
              {
                callbacks.push(callback);
              }
            }
          }
        });
      }
      return callbacks;
    }
  };
  $.fn.eventsManager = function(options)
  {
    var fpCallback;
    if(this.length > 0)
    {
      if(options && options.action)
      {
        fpCallback = oGetEvents[options.action];
        if(fpCallback)
        {
          return fpCallback(this[0], options);
        }
      }
    }else{
      throw new Error('This plugin needs a single element');
    }
  };
}(jQuery));