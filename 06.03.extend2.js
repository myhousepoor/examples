/*
 * Add a nonenumerable extend() method to Object.prototype.
 * This method extends the object on which it is called by copying properties
 * from the object passed as its argument.  All property attributes are
 * copied, not just the property value.  All own properties (even non-
 * enumerable ones) of the argument object are copied unless a property
 * with the same name already exists in the target object.
 */
Object.defineProperty(Object.prototype,
    "extend",                  // Define Object.prototype.extend
    {
        writable: true,
        enumerable: false,     // Make it nonenumerable
        configurable: true,
        value: function(o) {   // Its value is this function
            // Get all own props, even nonenumerable ones
            var names = Object.getOwnPropertyNames(o);
            // Loop through them
            for(var i = 0; i < names.length; i++) {
                // Skip props already in this object
                if (names[i] in this) continue;
                // Get property description from o
                var desc = Object.getOwnPropertyDescriptor(o,names[i]);
                // Use it to create property on this
                Object.defineProperty(this, names[i], desc);
            }

            return  this;
        }
    });
    Object.prototype.toString = function(){
        var names = Object.getOwnPropertyNames(this);
        // Loop through them
        var r ="{";
        for(var i = 0; i < names.length; i++) {
            // var desc = Object.getOwnPropertyDescriptor(this,names[i]);
            // this[names[i]]
            // // Use it to create property on this
            // Object.defineProperty(this, names[i], desc);
            r += names[i] +":" + this[names[i]] +","
        }
        r=r.slice(0,-1) 
        return r+= "}"
    }