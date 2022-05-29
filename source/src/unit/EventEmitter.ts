interface Name {
  original: string
  value: string
  namespace: string
}

export class EventEmitter {
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