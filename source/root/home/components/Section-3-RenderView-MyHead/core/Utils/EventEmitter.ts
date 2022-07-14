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

export default class EventEmitter {
  __emittersMap__: WeakMap<Function, Emitter> = new WeakMap();
  __emitters__: Map<string, Set<Emitter>> = new Map(); // 使用 WeakMap 不容易直接debug发现错误的事件

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

  offAll(_event_: string) {
    // 获取事件触发列表
    const emittersSet = this.__emitters__.get(_event_)
    if (!emittersSet) return false;
    // 获取事件对应的记录，删除事件
    emittersSet.clear()
    this.__emitters__.delete(_event_)
    // 正确删除
    return true
  }

  clearEvents() {
    this.__emitters__.clear()
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