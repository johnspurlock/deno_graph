// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
// @generated file from build script, do not edit
// deno-lint-ignore-file

import * as import0 from "./snippets/deno_graph-61717bf4b443d70d/src/deno_apis.js";

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) {
  return heap[idx];
}

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (
    cachegetUint8Memory0 === null ||
    cachegetUint8Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

let cachedTextEncoder = new TextEncoder("utf-8");

const encodeString = function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (
    cachegetInt32Memory0 === null ||
    cachegetInt32Memory0.buffer !== wasm.memory.buffer
  ) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

let heap_next = heap.length;

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

let cachedTextDecoder = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }
  if (className == "Object") {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}

const CLOSURE_DTORS = new FinalizationRegistry((state) => {
  wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
});

function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function __wbg_adapter_22(arg0, arg1, arg2) {
  wasm
    ._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hacbeaded009ccacb(
      arg0,
      arg1,
      addHeapObject(arg2),
    );
}

function isLikeNone(x) {
  return x === undefined || x === null;
}
/**
* @param {string} root_specifier
* @param {Function} load
* @param {Function | undefined} maybe_cache_info
* @param {Function | undefined} maybe_resolve
* @param {Function | undefined} maybe_check
* @param {Function | undefined} maybe_get_checksum
* @returns {any}
*/
export function createGraph(
  root_specifier,
  load,
  maybe_cache_info,
  maybe_resolve,
  maybe_check,
  maybe_get_checksum,
) {
  var ptr0 = passStringToWasm0(
    root_specifier,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  var len0 = WASM_VECTOR_LEN;
  var ret = wasm.createGraph(
    ptr0,
    len0,
    addHeapObject(load),
    isLikeNone(maybe_cache_info) ? 0 : addHeapObject(maybe_cache_info),
    isLikeNone(maybe_resolve) ? 0 : addHeapObject(maybe_resolve),
    isLikeNone(maybe_check) ? 0 : addHeapObject(maybe_check),
    isLikeNone(maybe_get_checksum) ? 0 : addHeapObject(maybe_get_checksum),
  );
  return takeObject(ret);
}

/**
* @param {string} specifier
* @param {any} maybe_headers
* @param {string} content
* @param {Function | undefined} maybe_resolve
* @returns {Module}
*/
export function parseModule(specifier, maybe_headers, content, maybe_resolve) {
  var ptr0 = passStringToWasm0(
    specifier,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  var len0 = WASM_VECTOR_LEN;
  var ptr1 = passStringToWasm0(
    content,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  var len1 = WASM_VECTOR_LEN;
  var ret = wasm.parseModule(
    ptr0,
    len0,
    addHeapObject(maybe_headers),
    ptr1,
    len1,
    isLikeNone(maybe_resolve) ? 0 : addHeapObject(maybe_resolve),
  );
  return Module.__wrap(ret);
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}
function __wbg_adapter_68(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h6261c08646bba37e(
    arg0,
    arg1,
    addHeapObject(arg2),
    addHeapObject(arg3),
  );
}

const ModuleFinalization = new FinalizationRegistry((ptr) =>
  wasm.__wbg_module_free(ptr)
);
/**
*/
export class Module {
  static __wrap(ptr) {
    const obj = Object.create(Module.prototype);
    obj.ptr = ptr;
    ModuleFinalization.register(obj, obj.ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    ModuleFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_module_free(ptr);
  }
  /**
    * @returns {any}
    */
  get cacheInfo() {
    var ret = wasm.module_cacheInfo(this.ptr);
    return takeObject(ret);
  }
  /**
    * @returns {string | undefined}
    */
  get checksum() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.module_checksum(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      let v0;
      if (r0 !== 0) {
        v0 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
      }
      return v0;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
    * @returns {any}
    */
  get dependencies() {
    var ret = wasm.module_dependencies(this.ptr);
    return takeObject(ret);
  }
  /**
    * @returns {string}
    */
  get mediaType() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.module_mediaType(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
  /**
    * @returns {number}
    */
  get size() {
    var ret = wasm.module_size(this.ptr);
    return ret >>> 0;
  }
  /**
    * @returns {string}
    */
  get source() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.module_source(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
  /**
    * @returns {string}
    */
  get specifier() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.module_specifier(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
  /**
    * @returns {any}
    */
  get typesDependency() {
    var ret = wasm.module_typesDependency(this.ptr);
    return takeObject(ret);
  }
  /**
    * @returns {any}
    */
  toJSON() {
    var ret = wasm.module_toJSON(this.ptr);
    return takeObject(ret);
  }
}

const ModuleGraphFinalization = new FinalizationRegistry((ptr) =>
  wasm.__wbg_modulegraph_free(ptr)
);
/**
*/
export class ModuleGraph {
  static __wrap(ptr) {
    const obj = Object.create(ModuleGraph.prototype);
    obj.ptr = ptr;
    ModuleGraphFinalization.register(obj, obj.ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    ModuleGraphFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_modulegraph_free(ptr);
  }
  /**
    * @returns {string}
    */
  get root() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.modulegraph_root(retptr, this.ptr);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
  /**
    * @param {string} specifier
    * @returns {Module | undefined}
    */
  get(specifier) {
    var ptr0 = passStringToWasm0(
      specifier,
      wasm.__wbindgen_malloc,
      wasm.__wbindgen_realloc,
    );
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.modulegraph_get(this.ptr, ptr0, len0);
    return ret === 0 ? undefined : Module.__wrap(ret);
  }
  /**
    */
  lock() {
    wasm.modulegraph_lock(this.ptr);
  }
  /**
    * @returns {Array<any>}
    */
  get modules() {
    var ret = wasm.modulegraph_modules(this.ptr);
    return takeObject(ret);
  }
  /**
    * @param {string} specifier
    * @returns {string}
    */
  resolve(specifier) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = passStringToWasm0(
        specifier,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      var len0 = WASM_VECTOR_LEN;
      wasm.modulegraph_resolve(retptr, this.ptr, ptr0, len0);
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
  /**
    * @param {string} specifier
    * @param {string} referrer
    * @returns {string | undefined}
    */
  resolveDependency(specifier, referrer) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      var ptr0 = passStringToWasm0(
        specifier,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      var len0 = WASM_VECTOR_LEN;
      var ptr1 = passStringToWasm0(
        referrer,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      var len1 = WASM_VECTOR_LEN;
      wasm.modulegraph_resolveDependency(
        retptr,
        this.ptr,
        ptr0,
        len0,
        ptr1,
        len1,
      );
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      let v2;
      if (r0 !== 0) {
        v2 = getStringFromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
      }
      return v2;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
    * @returns {any}
    */
  toJSON() {
    var ret = wasm.modulegraph_toJSON(this.ptr);
    return takeObject(ret);
  }
  /**
    * @param {boolean | undefined} maybe_no_color
    * @returns {string}
    */
  toString(maybe_no_color) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.modulegraph_toString(
        retptr,
        this.ptr,
        isLikeNone(maybe_no_color) ? 0xFFFFFF : maybe_no_color ? 1 : 0,
      );
      var r0 = getInt32Memory0()[retptr / 4 + 0];
      var r1 = getInt32Memory0()[retptr / 4 + 1];
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(r0, r1);
    }
  }
}

const imports = {
  __wbindgen_placeholder__: {
    __wbindgen_json_serialize: function (arg0, arg1) {
      const obj = getObject(arg1);
      var ret = JSON.stringify(obj === undefined ? null : obj);
      var ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbindgen_object_drop_ref: function (arg0) {
      takeObject(arg0);
    },
    __wbindgen_string_new: function (arg0, arg1) {
      var ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    },
    __wbg_modulegraph_new: function (arg0) {
      var ret = ModuleGraph.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbg_module_new: function (arg0) {
      var ret = Module.__wrap(arg0);
      return addHeapObject(ret);
    },
    __wbindgen_object_clone_ref: function (arg0) {
      var ret = getObject(arg0);
      return addHeapObject(ret);
    },
    __wbindgen_number_new: function (arg0) {
      var ret = arg0;
      return addHeapObject(ret);
    },
    __wbg_new_037a23de780123a1: function () {
      var ret = new Object();
      return addHeapObject(ret);
    },
    __wbg_set_75b59f2badfc7c64: function (arg0, arg1, arg2) {
      getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    },
    __wbindgen_cb_drop: function (arg0) {
      const obj = takeObject(arg0).original;
      if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
      }
      var ret = false;
      return ret;
    },
    __wbg_new_fc8ee963685ada41: function () {
      var ret = new Array();
      return addHeapObject(ret);
    },
    __wbg_new_d54146785c3bad04: function () {
      var ret = new Map();
      return addHeapObject(ret);
    },
    __wbg_new_ffb8fbe0ad5d4d2f: function () {
      var ret = new Object();
      return addHeapObject(ret);
    },
    __wbg_push_ef0a52724cfe2a05: function (arg0, arg1) {
      var ret = getObject(arg0).push(getObject(arg1));
      return ret;
    },
    __wbg_new_59b0692ed9b1e980: function (arg0, arg1) {
      var ret = new Error(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbg_call_4438b4bab9ab5268: function () {
      return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_call_f325895c60cbae4d: function () {
      return handleError(function (arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).call(
          getObject(arg1),
          getObject(arg2),
          getObject(arg3),
        );
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_set_38d91434591d225d: function (arg0, arg1, arg2) {
      var ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    },
    __wbg_new_ae366b99da42660b: function (arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg0, arg1) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wbg_adapter_68(a, state0.b, arg0, arg1);
          } finally {
            state0.a = a;
          }
        };
        var ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = state0.b = 0;
      }
    },
    __wbg_resolve_84f06d050082a771: function (arg0) {
      var ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_then_fd35af33296a58d7: function (arg0, arg1) {
      var ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_then_c919ca41618a24c2: function (arg0, arg1, arg2) {
      var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    },
    __wbindgen_is_string: function (arg0) {
      var ret = typeof (getObject(arg0)) === "string";
      return ret;
    },
    __wbindgen_debug_string: function (arg0, arg1) {
      var ret = debugString(getObject(arg1));
      var ptr0 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    },
    __wbindgen_throw: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbindgen_rethrow: function (arg0) {
      throw takeObject(arg0);
    },
    __wbindgen_closure_wrapper2434: function (arg0, arg1, arg2) {
      var ret = makeMutClosure(arg0, arg1, 266, __wbg_adapter_22);
      return addHeapObject(ret);
    },
  },
  "./snippets/deno_graph-61717bf4b443d70d/src/deno_apis.js": import0,
};

const wasm_url = new URL("deno_graph_bg.wasm", import.meta.url);
let wasmCode = "";
switch (wasm_url.protocol) {
  case "file:":
    if ("permissions" in Deno) {
      Deno.permissions.request({ name: "read" });
    }
    wasmCode = await Deno.readFile(wasm_url);
    break;
  case "https:":
  case "http:":
    if ("permissions" in Deno) {
      Deno.permissions.request({ name: "net", host: wasm_url.host });
    }
    wasmCode = await (await fetch(wasm_url)).arrayBuffer();
    break;
  default:
    throw new Error(`Unsupported protocol: ${wasm_url.protocol}`);
    break;
}

const wasmInstance =
  (await WebAssembly.instantiate(wasmCode, imports)).instance;
const wasm = wasmInstance.exports;

/* for testing and debugging */
export const _wasm = wasm;
export const _wasmInstance = wasmInstance;
