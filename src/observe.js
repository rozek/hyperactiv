import {
  isObj,
  defineBubblingProperties,
  getInstanceMethodKeys,
  setHiddenKey
} from './tools.js'
import { data } from './data.js'
import { enqueue, __batched } from './batcher.js'

const { computedStack, trackerSymbol } = data

const observedSymbol = Symbol('__observed')

/**
 * @typedef {Object} Options - Observe options.
 * @property {string[]} [props] - Observe only the properties listed.
 * @property {string[]} [ignore] - Ignore the properties listed.
 * @property {boolean | number} [batch] -
 *  Batch computed properties calls, wrapping them in a queueMicrotask and
 *  executing them in a new context and preventing excessive calls.
 *  If batch is an integer, the calls will be debounced by the value in milliseconds using setTimemout.
 * @prop {boolean} [deep] - Recursively observe nested objects and when setting new properties.
 * @prop {boolean} [bind] - Automatically bind methods to the observed object.
 */

export const modifiedProperty = Symbol('modifiedProperty')

/**
 * Observes an object or an array and returns a proxified version which reacts on mutations.
 *
 * @template O
 * @param {O} obj - The object to observe.
 * @param {Options} options - Options
 * @returns {O} - A proxy wrapping the object.
 */
export function observe(obj, options = {}) {
  // 'deep' is slower but reasonable; 'shallow' a performance enhancement but with side-effects
  const {
    props,
    ignore,
    batch,
    deep = true,
    bubble,
    bind
  } = options

  // Ignore if the object is already observed
  if(obj[observedSymbol]) {
    return obj
  }

  // If the prop is explicitely not excluded
  const isWatched = (prop) =>
    prop !== observedSymbol &&
    (
      (props == null) ||
      (props instanceof Array) && props.includes(prop)
    ) && (
      (ignore == null) ||
      (ignore instanceof Array) && ! ignore.includes(prop)
    )

  // If the deep flag is set, observe nested objects/arrays
  if(deep) {
    Object.entries(obj).forEach(function([key, val]) {
      if(isObj(val) && isWatched(key)) {
        obj[key] = observe(val, options)
        // If bubble is set, we add keys to the object used to bubble up the mutation
        if(bubble) {
          defineBubblingProperties(obj[key], key, obj)
        }
      }
    })
  }
  
    function setObjectPropertyTo (obj, prop, value) {
      if(prop === '__handler') {
        // Don't track bubble handlers
        setHiddenKey(obj, '__handler', value)
      } else if(!isWatched(prop)) {
        // If the prop is ignored
        obj[prop] = value
      } else if(Array.isArray(obj) && prop === 'length' || ValuesDiffer(obj[prop],value)) {
        // If the new/old value are not equal
        const deeper = (prop !== modifiedProperty) && deep && isObj(value)

        // Remove bubbling infrastructure and pass old value to handlers
        const oldValue = obj[prop]
//      if(isObj(oldValue))
//        delete obj[prop]

        // If the deep flag is set we observe the newly set value
        obj[prop] = deeper ? observe(value, options) : value

        // Co-opt assigned object into bubbling if appropriate
        if(deeper && bubble) {
          defineBubblingProperties(obj[prop], prop, obj)
        }

        const ancestry = [ prop ]
        let parent = obj
        while(parent) {
          // If a handler explicitly returns 'false' then stop propagation
          if(parent.__handler && parent.__handler(ancestry, value, oldValue, proxy) === false) {
            break
          }
          // Continue propagation, traversing the mutated property's object hierarchy & call any __handlers along the way
          if(parent.__key && parent.__parent) {
            ancestry.unshift(parent.__key)
            parent = parent.__parent
          } else {
            parent = null
          }
        }

        const dependents = propertiesMap.get(prop)
        if(dependents) {
          // Retrieve the computed functions depending on the prop
          for(const dependent of dependents) {
            const tracker = dependent[trackerSymbol]
            const trackedObj = tracker && tracker.get(obj)
            const tracked = trackedObj && trackedObj.has(prop)
            // If the function has been disposed or if the prop has not been used
            // during the latest function call, delete the function reference
            if(dependent.__disposed || tracker && !tracked) {
              dependents.delete(dependent)
            } else if(dependent !== computedStack[0]) {
              // Run the computed function
              if(typeof batch !== 'undefined' && batch !== false) {
                enqueue(dependent, batch)
                dependent[__batched] = true
              } else {
                dependent()
              }
            }
          }
        }

        if (prop !== modifiedProperty) {
        	obj[modifiedProperty] = prop
        	
	        const dependents = propertiesMap.get(modifiedProperty)
	        if(dependents) {
	          // Retrieve the computed functions depending on "modifiedProperty"
	          for(const dependent of dependents) {
	            const tracker = dependent[trackerSymbol]
	            const trackedObj = tracker && tracker.get(obj)
	            const tracked = trackedObj && trackedObj.has(modifiedProperty)
	            // If the function has been disposed or if "modifiedProperty" has not been used
	            // during the latest function call, delete the function reference
	            if(dependent.__disposed || tracker && !tracked) {
	              dependents.delete(dependent)
	            } else if(dependent !== computedStack[0]) {
	              // Run the computed function
	              if(typeof batch !== 'undefined' && batch !== false) {
	                enqueue(dependent, batch)
	                dependent[__batched] = true
	              } else {
	                dependent()
	              }
	            }
	          }
	        }
        }
      }
    }

  // For each observed object, each property is mapped with a set of computed functions depending on this property.
  // Whenever a property is set, we re-run each one of the functions stored inside the matching Set.
  const propertiesMap = new Map()

  // Proxify the object in order to intercept get/set on props
  const proxy = new Proxy(obj, {
    get(_, prop) {
      if(prop === observedSymbol)
        return true

      // If the prop is watched
      if(isWatched(prop)) {
        // If a computed function is being run
        if(computedStack.length) {
          const computedFn = computedStack[0]
          // Tracks object and properties accessed during the function call
          const tracker = computedFn[trackerSymbol]
          if(tracker) {
            let trackerSet = tracker.get(obj)
            if(!trackerSet) {
              trackerSet = new Set()
              tracker.set(obj, trackerSet)
            }
            trackerSet.add(prop)
          }
          // Link the computed function and the property being accessed
          let propertiesSet = propertiesMap.get(prop)
          if(!propertiesSet) {
            propertiesSet = new Set()
            propertiesMap.set(prop, propertiesSet)
          }
          propertiesSet.add(computedFn)
        }
      }

      return obj[prop]
    },
    set(_, prop, value) {
      setObjectPropertyTo(obj, prop, value)
      return true
    },
    defineProperty(_, prop, descriptor) {
      if (prop === '__handler') {
      	throw new Error("Don't track bubble handlers")
      } else if(!isWatched(prop)) {
        // If the prop is ignored
        return Reflect.defineProperty(obj,prop,descriptor)
      } else if (! Array.isArray(obj) || (prop === 'length')) {
      	if (('value' in descriptor) && deep && isObj(descriptor.value)) {
      	  descriptor = {...descriptor} // do not modify the argument itself
      	  descriptor.value = observe(descriptor.value, options)
      	}
      	const Outcome = Reflect.defineProperty(obj,prop,descriptor)
      	  if (prop !== modifiedProperty) {
	        	obj[modifiedProperty] = prop
	        }
      	return Outcome
      }
      return false
    },
    deleteProperty(_, prop) {
    	if (prop === modifiedProperty) throw new Error(
    	  'internal property Symbol("modifiedProperty") must not be deleted'
    	)

    	if (prop in obj) {
    		setObjectPropertyTo(obj, prop, undefined) // trigger observers one last time
    	}
    	return Reflect.deleteProperty(_,prop)
    }
  })

  if(bind) {
    // Need this for binding es6 classes methods which are stored in the object prototype
    getInstanceMethodKeys(obj).forEach(key => obj[key] = obj[key].bind(proxy))
  }

  return proxy
}

/**** ValuesDiffer - copied from "javascript-interface-library", then modified ****/

  function ValuesDiffer (thisValue, otherValue, Mode) {
  	const visitedObjects = new Map()
  	
  	function ValuesDoDiffer (thisValue, otherValue, Mode) {
	    if (thisValue === otherValue) { return false }
	
	    let thisType = typeof thisValue
	    if (thisType !== typeof otherValue) { return true }
	
    /**** ArraysDiffer ****/

      function ArraysDiffer (thisArray, otherArray, Mode) {
        if (! Array.isArray(otherArray)) { return true }

        if (thisArray.length !== otherArray.length) { return true }

        if (visitedObjects.has(thisArray) || visitedObjects.has(otherArray)) {
        	if (visitedObjects.has(thisArray)  && visitedObjects.get(thisArray).has(otherArray)) { return false }
        	if (visitedObjects.has(otherArray) && visitedObjects.get(otherArray).has(thisArray)) { return false }
        	
        	if (! visitedObjects.has(thisArray)) { visitedObjects.set(thisArray, new Set()) }
        	visitedObjects.get(thisArray).add(otherArray)
        }
        
        for (let i = 0, l = thisArray.length; i < l; i++) {
          if (ValuesDoDiffer(thisArray[i],otherArray[i],Mode)) { return true }
        }

        return false
      }

    /**** ObjectsDiffer ****/

      function ObjectsDiffer (thisObject, otherObject, Mode='by-value') {
        if (Object.getPrototypeOf(thisObject) !== Object.getPrototypeOf(otherObject)) {
          return true
        }

        for (let key in thisObject) {
          if (! (key in otherObject)) { return true }
        }

        for (let key in otherObject) {
          if (! (key in thisObject)) { return true }
        }

        if (visitedObjects.has(thisObject) || visitedObjects.has(otherObject)) {
        	if (visitedObjects.has(thisObject)  && visitedObjects.get(thisObject).has(otherObject)) { return false }
        	if (visitedObjects.has(otherObject) && visitedObjects.get(otherObject).has(thisObject)) { return false }
        	
        	if (! visitedObjects.has(thisObject)) { visitedObjects.set(thisObject, new Set()) }
        	visitedObjects.get(thisObject).add(otherObject)
        }

        for (let key in thisObject) {
          if (ValuesDoDiffer(thisObject[key],otherObject[key],Mode)) {
            return true
          }
        }

        return false
      }
	
	    switch (thisType) {
	      case 'undefined':
	      case 'boolean':
	      case 'string':
	      case 'function': return true   // most primitives are compared using "==="
	      case 'number':   return (
	                         (isNaN(thisValue) !== isNaN(otherValue)) ||
	                         (Math.abs(thisValue-otherValue) > Number.EPSILON)
	                       )
	      case 'object':
	        if (thisValue  == null) { return true }  // since "other_value" != null!
	        if (otherValue == null) { return true }   // since "this_value" != null!
	
	        if ((Mode === 'by-value') && (
	          (thisValue instanceof Boolean) ||
	          (thisValue instanceof Number) ||
	          (thisValue instanceof String)
	        )) {
	          return (thisValue.valueOf() !== otherValue.valueOf())
	        }
	
	        if (Array.isArray(thisValue)) {
	          return ArraysDiffer(thisValue,otherValue,Mode)
	        }
	
	        return (
	          Mode === 'by-reference'
	          ? true                           // because (thisValue !== otherValue)
	          : ObjectsDiffer(thisValue,otherValue,Mode)
	        )
	      default: return true                          // unsupported property type
	    }
	
	    return true
  	}
  	return ValuesDoDiffer(thisValue, otherValue, Mode)
  }
