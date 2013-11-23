describe('jQuery Events Manager', function()
{
  var $Body, $Test;
  beforeEach(function()
  {
    $Body = jQuery('body');
  });
  afterEach(function()
  {
    if($Test)
    {
      $Test.off('click');
      $Test.off('mouseup');
      $Test.off('mousedown');
    }

    $Body.off('click');
    $Body.off('mouseup');
    $Body.off('mousedown');
    delete $._data(document.body).events;
  });
  it('should check that jquery.fn.eventsManager exist', function()
  {
    expect(jQuery.fn.eventsManager).toBeDefined();
  });
  it('should throw an error if there are no elements to check', function()
  {
    expect(function()
    {
      jQuery(null).eventsManager();
    }).toThrow();
  });
  it('should not throw an error if there are at least one element to check', function()
  {
    expect(function()
    {
      jQuery('body').eventsManager();
    }).not.toThrow();
  });
  describe('getTypeEvents', function()
  {
    it('should return an array of event types assigned to an element using getTypeEvents as action option', function()
    {
      var aEventTypes;
      $Body.on('click', function(){});
      $Body.on('mousedown', function(){});
      $Body.on('mouseup', function(){});

      aEventTypes = $Body.eventsManager({
        action: 'getTypeEvents'
      });

      expect({}.toString.call(aEventTypes)).toBe('[object Array]');
      expect(aEventTypes.indexOf('click') !== -1).toBeTruthy();
      expect(aEventTypes.indexOf('mousedown') !== -1).toBeTruthy();
      expect(aEventTypes.indexOf('mouseup') !== -1).toBeTruthy();
      expect(aEventTypes.indexOf('keyup') === -1).toBeTruthy();
    });
  });
  describe('getEvents', function()
  {
    it('should return an array with all the events attached to an element using getEvents as action', function()
    {
      var oEvents,
        fpCallback_1 = function(){},
        fpCallback_2 = function(){},
        fpCallback_3 = function(){},
        fpCallback_4 = function(){};
      $Body.on('click', fpCallback_1);
      $Body.on('click', fpCallback_2);
      $Body.on('mouseup', fpCallback_3);
      $Body.on('mousedown', fpCallback_4);

      oEvents = $Body.eventsManager({
        action: 'getEvents'
      });

      expect({}.toString.call(oEvents)).toBe('[object Object]');
      expect(Object.keys(oEvents).length).toBe(3);
      expect(oEvents.click[0].handler).toBe(fpCallback_1);
      expect(oEvents.click[1].handler).toBe(fpCallback_2);
      expect(oEvents.mouseup[0].handler).toBe(fpCallback_3);
      expect(oEvents.mousedown[0].handler).toBe(fpCallback_4);
    });
  });
  describe('getCallbacks', function()
  {
    it('should return an array with all the callbacks attached to an element using getCallbacks as action without type', function()
    {
      var aCallbacks,
        fpCallback_1 = function(){},
        fpCallback_2 = function(){},
        fpCallback_3 = function(){},
        fpCallback_4 = function(){};
      $Body.on('click', fpCallback_1);
      $Body.on('click', fpCallback_2);
      $Body.on('mouseup', fpCallback_3);
      $Body.on('mousedown', fpCallback_4);

      aCallbacks = $Body.eventsManager({
        action: 'getCallbacks'
      });

      expect({}.toString.call(aCallbacks)).toBe('[object Array]');
      expect(aCallbacks.length).toBe(4);
      expect(aCallbacks[0]).toBe(fpCallback_1);
      expect(aCallbacks[1]).toBe(fpCallback_2);
      expect(aCallbacks[2]).toBe(fpCallback_3);
      expect(aCallbacks[3]).toBe(fpCallback_4);
    });
    it('should return an object with all the callbacks using getCallbacks as action', function()
    {
      var aCallbacks,
        fpCallback_1 = function(){},
        fpCallback_2 = function(){},
        fpCallback_3 = function(){};
      $Body = jQuery('body');
      $Body.on('click', fpCallback_1);
      $Body.on('click', fpCallback_2);
      $Body.on('click', fpCallback_3);

      aCallbacks = $Body.eventsManager({
        action: 'getCallbacks',
        type: 'click'
      });

      expect({}.toString.call(aCallbacks)).toBe('[object Array]');
      expect(aCallbacks.length).toBe(3);
      expect(aCallbacks[0]).toBe(fpCallback_1);
      expect(aCallbacks[1]).toBe(fpCallback_2);
      expect(aCallbacks[2]).toBe(fpCallback_3);
    });
  });
  describe('getEvent', function()
  {
    it('should return an array with all the events attached to an element using getEvent as action', function()
    {
      var aEvents,
        $Body = jQuery('body'),
        fpCallback_1 = function(){},
        fpCallback_2 = function(){},
        fpCallback_3 = function(){};
      $Body.on('click', fpCallback_1);
      $Body.on('click', fpCallback_2);
      $Body.on('click', fpCallback_3);

      aEvents = $Body.eventsManager({
        action: 'getEvent',
        type: 'click'
      });

      expect({}.toString.call(aEvents)).toBe('[object Array]');
      expect(aEvents.length).toBe(3);
      expect(aEvents[0].handler).toBe(fpCallback_1);
      expect(aEvents[1].handler).toBe(fpCallback_2);
      expect(aEvents[2].handler).toBe(fpCallback_3);
    });
    it('should an empty array if the type does not exist using getEvent as action', function()
    {
      var aEvents,
        $Body = jQuery('body'),
        fpCallback_1 = function(){},
        fpCallback_2 = function(){},
        fpCallback_3 = function(){};
      $Body.on('click', fpCallback_1);
      $Body.on('click', fpCallback_2);
      $Body.on('click', fpCallback_3);

      aEvents = $Body.eventsManager({
        action: 'getEvent',
        type: 'mousedown'
      });

      expect({}.toString.call(aEvents)).toBe('[object Array]');
      expect(aEvents.length).toBe(0);
    });
  });
  describe('hasCallback', function()
  {
    it('should return true if a callback exist in an event and has been attached to an element', function()
    {
      var bBool = false,
        fpCallback = function(){},
        $Body = jQuery('body');
      $Body.on('click', fpCallback);

      bBool = $Body.eventsManager({
        action: 'hasCallback',
        type: 'click',
        callback: fpCallback
      });

      expect(bBool).toBeTruthy();
    });
    it('should return false if a callback does not exist in an event or has not been attached to an element', function()
    {
      var bBool = true,
        fpCallback = function(){};
      $Body.on('click', fpCallback);

      bBool = $Body.eventsManager({
        action: 'hasCallback',
        type: 'mousedown',
        callback: fpCallback
      });

      expect(bBool).toBeFalsy();
    });
    it('should return true if a callback has been attached to an element', function()
    {
      var bBool = false,
        fpCallback = function(){},
        $Body = jQuery('body');
      $Body.on('click', fpCallback);

      bBool = $Body.eventsManager({
        action: 'hasCallback',
        callback: fpCallback
      });

      expect(bBool).toBeTruthy();
    });
    it('should return false if a callback has not been attached to an element', function()
    {
      var bBool = true,
        fpCallback = function(){},
        fpCallback_1 = function(){};
      $Body.on('click', fpCallback_1);

      bBool = $Body.eventsManager({
        action: 'hasCallback',
        callback: fpCallback
      });

      expect(bBool).toBeFalsy();
    });
  });
  describe('hasEvent', function()
  {
    it('should return true if an event is attached to an element', function()
    {
      var bBool = false,
          $Body = jQuery('body');
      $Body.on('click', function(){});

      bBool = $Body.eventsManager({
        action: 'hasEvent',
        type: 'click'
      })

      expect(bBool).toBeTruthy();
    });
    it('should return false if an event is not attached to an element', function()
    {
      var bBool = true;
      $Body.on('click', function(){});

      bBool = $Body.eventsManager({
        action: 'hasEvent',
        type: 'mousedown'
      })

      expect(bBool).toBeFalsy();
    });
  });
  describe('copyEvents', function()
  {
    it('should copy the events from one element to another', function()
    {
      var aTypeEvents;

        $Body.on('click', function(){});

      $Body.append('<div id="test"></div>');
      $Test = $('#test');

      aTypeEvents = $Test.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(0);

      $Body.eventsManager({
        action: 'copyEvents',
        target: document.getElementById('test')
      });

      aTypeEvents = $Test.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(1);
    });
    it('should copy only the events you request from one element to another', function()
    {
      var aTypeEvents;

      $Body.on('click', function(){});
      $Body.on('mouseup', function(){});

      $Body.append('<div id="test"></div>');

      $Test = $('#test');

      aTypeEvents = $Test.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(0);

      $Body.eventsManager({
        action: 'copyEvents',
        type: 'mouseup',
        target: document.getElementById('test')
      });

      aTypeEvents = $Test.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(1);
    });
  });
  describe('removeEvents', function()
  {
    it('should remove all the events from an element', function()
    {
      var aTypeEvents;

      $Body.on('click', function(){});

      aTypeEvents = $Body.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(1);

      $Body.eventsManager({
        action: 'removeEvents'
      });

      aTypeEvents = $Body.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(0);
    });
    it('should remove an specific event from an element', function()
    {
      var aTypeEvents;

      $Body.on('click', function(){});
      $Body.on('mouseup', function(){});

      aTypeEvents = $Body.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(2);

      $Body.eventsManager({
        action: 'removeEvents',
        type: 'click'
      });

      aTypeEvents = $Body.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(1);
    });
  });
  describe('addEvents', function()
  {
    it('should add a new event to an element', function()
    {
      var aTypeEvents,
          fpCallback = function(){};

      aTypeEvents = $Body.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(0);

      $Body.eventsManager({
        action: 'addEvents',
        type: 'click',
        callback: fpCallback
      });

      aTypeEvents = $Body.eventsManager({
        action: 'getTypeEvents'
      });

      expect(aTypeEvents.length).toEqual(1);
    });
    it('should add two new events to an element', function()
    {
      var aCallbacks,
          fpCallback = function(){},
          fpCallback_2 = function(){};

      aCallbacks = $Body.eventsManager({
        action: 'getCallbacks',
        type: 'click'
      });

      expect(aCallbacks.length).toEqual(0);

      $Body.eventsManager({
        action: 'addEvents',
        type: 'click',
        callback: [
          fpCallback,
          fpCallback_2
        ]
      });

      aCallbacks = $Body.eventsManager({
        action: 'getCallbacks',
        type: 'click'
      });

      expect(aCallbacks.length).toEqual(2);
    });
  });
});