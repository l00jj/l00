interface EmitterOption {
  isOnce: boolean
}

class Emitter {
  function: Function
  isOnce: boolean
  constructor(fun: Function, emitterOption: EmitterOption) {
    this.function = fun
    //
    this.isOnce = emitterOption.isOnce ? emitterOption.isOnce : false
  }
}

export class EventEmitter {
  __emittersMap__: WeakMap<Function, Emitter> = new WeakMap();
  __emitters__: Map<string, Set<Emitter>> = new Map();

  on(_event_: string, _callback_: Function) {
    // Errors
    if (typeof _event_ !== 'string' || _event_ === '') return false;
    if (typeof _callback_ !== 'function') return false;    
    // 获取事件触发列表
    let emittersSet = this.__emitters__.get(_event_)
    // 判断是否存在事件列表
    if (!emittersSet) {
      emittersSet = new Set()
      this.__emitters__.set(_event_, emittersSet)
    }
    // 如果存在则不在添加，不重复事件
    if (this.__emittersMap__.has(_callback_)) return false;
    else {
      const emitter = new Emitter(_callback_, { isOnce: false })
      this.__emittersMap__.set(_callback_, emitter)
      emittersSet.add(emitter)
    }
    // 正确添加
    return true
  }

  once(_event_: string, _callback_: Function) {
    if (this.on(_event_, _callback_)) {
      // 获取事件对应的记录文档
      const emitter = this.__emittersMap__.get(_callback_)
      if (!emitter) return false;
      // 修改属性
      emitter.isOnce = true
    } else return false
    // 正确添加
    return true
  }

  off(_event_: string, _callback_: Function) {
    // 获取事件触发列表
    const emittersSet = this.__emitters__.get(_event_)
    if (!emittersSet) return false;
    // 获取事件对应的记录文档
    const emitter = this.__emittersMap__.get(_callback_)
    if (!emitter) return false;
    // 清理事件
    this.__emittersMap__.delete(_callback_)
    emittersSet.delete(emitter)
    // 如果事件列表清空，则删除事件
    if (emittersSet.size === 0) this.__emitters__.delete(_event_)
    // 正确删除
    return true
  }

  async emit(_event_: string, ..._args_: any[]) {
    // 获取事件触发列表
    const emittersSet = this.__emitters__.get(_event_)
    if (!emittersSet) return;
    // 逐个触发
    for (let emitter of emittersSet.values()) {
      // 阻塞式触发
      try {
        await emitter.function.apply(undefined, _args_)
      } catch (e) {
        console.error(e)
      }
      // 如果是单次触发，触发完后删除
      if (emitter.isOnce) this.off(_event_, emitter.function)
    }
  }

}




interface Name {
  original: string
  value: string
  namespace: string
}

export class EventEmitter_Original {
  __eventCallbacks__: any = {}

  constructor() {
    this.__eventCallbacks__ = {}
    this.__eventCallbacks__.base = {}
  }

  on(_names: string, callback: Function) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong names')
      return false
    }

    if (typeof callback === 'undefined') {
      console.warn('wrong callback')
      return false
    }

    // Resolve names
    const names = this.resolveNames(_names)

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name)

      // Create namespace if not exist
      if (!(this.__eventCallbacks__[name.namespace] instanceof Object)) this.__eventCallbacks__[name.namespace] = {}

      // Create callback if not exist
      if (!(this.__eventCallbacks__[name.namespace][name.value] instanceof Array))
        this.__eventCallbacks__[name.namespace][name.value] = []

      // Add callback
      this.__eventCallbacks__[name.namespace][name.value].push(callback)
    })

    return this
  }

  off(_names: string) {
    // Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn('wrong name')
      return false
    }

    // Resolve names
    const names = this.resolveNames(_names)

    // Each name
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name)

      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete this.__eventCallbacks__[name.namespace]
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in this.__eventCallbacks__) {
            if (
              this.__eventCallbacks__[namespace] instanceof Object &&
              this.__eventCallbacks__[namespace][name.value] instanceof Array
            ) {
              delete this.__eventCallbacks__[namespace][name.value]

              // Remove namespace if empty
              if (Object.keys(this.__eventCallbacks__[namespace]).length === 0) delete this.__eventCallbacks__[namespace]
            }
          }
        }

        // Specified namespace
        else if (
          this.__eventCallbacks__[name.namespace] instanceof Object &&
          this.__eventCallbacks__[name.namespace][name.value] instanceof Array
        ) {
          delete this.__eventCallbacks__[name.namespace][name.value]

          // Remove namespace if empty
          if (Object.keys(this.__eventCallbacks__[name.namespace]).length === 0) delete this.__eventCallbacks__[name.namespace]
        }
      }
    })

    return this
  }

  emit(_name: string, _args?: any[]) {
    // Errors
    if (typeof _name === 'undefined' || _name === '') {
      console.warn('wrong name')
      return false
    }

    let finalResult: any = null
    let result = null

    // Default args
    const args = !(_args instanceof Array) ? [] : _args

    // Resolve names (should on have one event)
    let nameArray = this.resolveNames(_name)

    // Resolve name
    let name = this.resolveName(nameArray[0])

    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in this.__eventCallbacks__) {
        if (
          this.__eventCallbacks__[namespace] instanceof Object &&
          this.__eventCallbacks__[namespace][name.value] instanceof Array
        ) {
          this.__eventCallbacks__[namespace][name.value].forEach((callback: Function) => {
            result = callback.apply(this, args)

            if (typeof finalResult === 'undefined') {
              finalResult = result
            }
          })
        }
      }
    }

    // Specified namespace
    else if (this.__eventCallbacks__[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.warn('wrong name')
        return this
      }

      this.__eventCallbacks__[name.namespace][name.value].forEach((callback: Function) => {
        result = callback.apply(this, args)

        if (typeof finalResult === 'undefined') finalResult = result
      })
    }

    return finalResult
  }

  resolveNames(_names: string) {
    let names: string | string[] = _names
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
    names = names.replace(/[,/]+/g, ' ')
    names = names.split(' ')

    return names
  }

  resolveName(name: string) {
    const newName: Partial<Name> = {}
    const parts = name.split('.')

    newName.original = name
    newName.value = parts[0]
    newName.namespace = 'base' // Base namespace

    // Specified namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1]
    }

    return newName as Name
  }
}