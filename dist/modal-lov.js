(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = require('./handlebars/base');

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = require('./handlebars/safe-string');

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = require('./handlebars/exception');

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];


},{"./handlebars/base":2,"./handlebars/exception":5,"./handlebars/no-conflict":15,"./handlebars/runtime":16,"./handlebars/safe-string":17,"./handlebars/utils":18}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _helpers = require('./helpers');

var _decorators = require('./decorators');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.11';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];


},{"./decorators":3,"./exception":5,"./helpers":6,"./logger":14,"./utils":18}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = require('./decorators/inline');

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


},{"./decorators/inline":4}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];


},{"../utils":18}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];


},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = require('./helpers/block-helper-missing');

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = require('./helpers/each');

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = require('./helpers/helper-missing');

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = require('./helpers/if');

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = require('./helpers/log');

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = require('./helpers/lookup');

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = require('./helpers/with');

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}


},{"./helpers/block-helper-missing":7,"./helpers/each":8,"./helpers/helper-missing":9,"./helpers/if":10,"./helpers/log":11,"./helpers/lookup":12,"./helpers/with":13}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];


},{"../utils":18}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];


},{"../exception":5,"../utils":18}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];


},{"../exception":5}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];


},{"../utils":18}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];


},{}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];


},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];


},{"../utils":18}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('./utils');

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];


},{"./utils":18}],15:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _base = require('./base');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}


},{"./base":2,"./exception":5,"./utils":18}],17:[function(require,module,exports){
// Build out our basic SafeString type
'use strict';

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];


},{}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}


},{}],19:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime')['default'];

},{"./dist/cjs/handlebars.runtime":1}],20:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":19}],21:[function(require,module,exports){
/* global apex */
var Handlebars = require('hbsfy/runtime')

Handlebars.registerHelper('raw', function (options) {
  return options.fn(this)
})

// Require dynamic templates
var modalReportTemplate = require('./templates/modal-report.hbs')
Handlebars.registerPartial('report', require('./templates/partials/_report.hbs'))
Handlebars.registerPartial('rows', require('./templates/partials/_rows.hbs'))
Handlebars.registerPartial('pagination', require('./templates/partials/_pagination.hbs'))

;(function ($, window) {
  $.widget('mho.modalLov', {
    // default options
    options: {
      id: '',
      title: '',
      itemName: '',
      searchField: '',
      searchButton: '',
      searchPlaceholder: '',
      ajaxIdentifier: '',
      showHeaders: false,
      returnCol: '',
      displayCol: '',
      validationError: '',
      cascadingItems: '',
      modalWidth: 600,
      noDataFound: '',
      allowMultilineRows: false,
      rowCount: 15,
      pageItemsToSubmit: '',
      markClasses: 'u-hot',
      hoverClasses: 'hover u-color-1',
      previousLabel: 'previous',
      nextLabel: 'next'
    },

    _returnValue: '',

    _item$: null,
    _searchButton$: null,
    _clearInput$: null,

    _searchField$: null,

    _templateData: {},
    _lastSearchTerm: '',

    _modalDialog$: null,

    _activeDelay: false,
    _disableChangeEvent: false,

    _ig$: null,
    _grid: null,

    _topApex: apex.util.getTopApex(),

    _resetFocus: function () {
      var self = this
      if (this._grid) {
        var recordId = this._grid.model.getRecordId(this._grid.view$.grid('getSelectedRecords')[0])
        var column = this._ig$.interactiveGrid('option').config.columns.filter(function (column) {
          return column.staticId === self.options.itemName
        })[0]
        this._grid.view$.grid('gotoCell', recordId, column.name)
        this._grid.focus()
      } else {
        this._item$.focus()
      }
    },

    // Combination of number, char and space, arrow keys
    _validSearchKeys: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // numbers
      65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, // chars
      93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, // numpad numbers
      40, // arrow down
      32, // spacebar
      8, // backspace
      106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 220 // interpunction
    ],

    _create: function () {
      var self = this

      self._item$ = $('#' + self.options.itemName)
      self._returnValue = self._item$.data('returnValue').toString()
      self._searchButton$ = $('#' + self.options.searchButton)
      self._clearInput$ = self._item$.parent().find('.search-clear')

      self._addCSSToTopLevel()

      // Trigger event on click input display field
      self._triggerLOVOnDisplay()

      // Trigger event on click input group addon button (magnifier glass)
      self._triggerLOVOnButton()

      // Clear text when clear icon is clicked
      self._initClearInput()

      // Cascading LOV item actions
      self._initCascadingLOVs()

      // Init APEX pageitem functions
      self._initApexItem()
    },

    _onOpenDialog: function (modal, options) {
      var self = options.widget
      self._modalDialog$ = self._topApex.jQuery(modal)
      // Focus on search field in LOV
      self._topApex.jQuery('#' + self.options.searchField).focus()
      // Remove validation results
      self._removeValidation()
      // Add text from display field
      if (options.fillSearchText) {
        self._topApex.item(self.options.searchField).setValue(self._item$.val())
      }
      // Add class on hover
      self._onRowHover()
      // selectInitialRow
      self._selectInitialRow()
      // Set action when a row is selected
      self._onRowSelected()
      // Navigate on arrow keys trough LOV
      self._initKeyboardNavigation()
      // Set search action
      self._initSearch()
      // Set pagination actions
      self._initPagination()
    },

    _onCloseDialog: function (modal, options) {
      // close takes place when no record has been selected, instead the close modal (or esc) was clicked/ pressed
      // It could mean two things: keep current or take the user's display value
      // What about two equal display values?

      // But no record selection could mean cancel
      // but open modal and forget about it
      // in the end, this should keep things intact as they were
      options.widget._destroy(modal)
      options.widget._triggerLOVOnDisplay()
    },

    _initGridConfig: function () {
      this._ig$ = this._item$.closest('.a-IG')

      if (this._ig$.length > 0) {
        this._grid = this._ig$.interactiveGrid('getViews').grid
      }
    },

    _onLoad: function (options) {
      var self = options.widget

      self._initGridConfig()

      // Create LOV region
      var $modalRegion = self._topApex.jQuery(modalReportTemplate(self._templateData)).appendTo('body')

      // Open new modal
      $modalRegion.dialog({
        height: $modalRegion.find('.t-Report-wrap').height() + 150, // + dialog button height
        width: self.options.modalWidth,
        closeText: apex.lang.getMessage('APEX.DIALOG.CLOSE'),
        draggable: true,
        modal: true,
        resizable: true,
        closeOnEscape: true,
        dialogClass: 'ui-dialog--apex ',
        open: function (modal) {
          // remove opener because it makes the page scroll down for IG
          self._topApex.jQuery(this).data('uiDialog').opener = self._topApex.jQuery()
          self._topApex.navigation.beginFreezeScroll()
          self._onOpenDialog(this, options)
        },
        beforeClose: function () {
          self._onCloseDialog(this, options)
          // Prevent scrolling down on modal close
          if (document.activeElement) {
            // document.activeElement.blur()
          }
        },
        close: function () {
          self._topApex.navigation.endFreezeScroll()
          self._resetFocus()
        }
      })
    },

    _onReload: function () {
      var self = this
      // This function is executed after a search
      var reportHtml = Handlebars.partials.report(self._templateData)
      var paginationHtml = Handlebars.partials.pagination(self._templateData)

      // Get current modal-lov table
      var modalLOVTable = self._modalDialog$.find('.modal-lov-table')
      var pagination = self._modalDialog$.find('.t-ButtonRegion-wrap')

      // Replace report with new data
      $(modalLOVTable).replaceWith(reportHtml)
      $(pagination).html(paginationHtml)

      // selectInitialRow in new modal-lov table
      self._selectInitialRow()

      // Make the enter key do something again
      self._activeDelay = false
    },

    _unescape: function (val) {
      return val // $('<input value="' + val + '"/>').val()
    },

    _getTemplateData: function () {
      var self = this

      // Create return Object
      var templateData = {
        id: self.options.id,
        classes: 'modal-lov',
        title: self.options.title,
        modalSize: self.options.modalSize,
        region: {
          attributes: 'style="bottom: 66px;"'
        },
        searchField: {
          id: self.options.searchField,
          placeholder: self.options.searchPlaceholder
        },
        report: {
          columns: {},
          rows: {},
          colCount: 0,
          rowCount: 0,
          showHeaders: self.options.showHeaders,
          noDataFound: self.options.noDataFound,
          classes: (self.options.allowMultilineRows) ? 'multiline' : ''
        },
        pagination: {
          rowCount: 0,
          firstRow: 0,
          lastRow: 0,
          allowPrev: false,
          allowNext: false,
          previous: self.options.previousLabel,
          next: self.options.nextLabel
        }
      }

      // No rows found?
      if (self.options.dataSource.row.length === 0) {
        return templateData
      }

      // Get columns
      var columns = Object.keys(self.options.dataSource.row[0])

      // Pagination
      templateData.pagination.firstRow = self.options.dataSource.row[0]['ROWNUM###']
      templateData.pagination.lastRow = self.options.dataSource.row[self.options.dataSource.row.length - 1]['ROWNUM###']

      // Check if there is a next resultset
      var nextRow = self.options.dataSource.row[self.options.dataSource.row.length - 1]['NEXTROW###']

      // Allow previous button?
      if (templateData.pagination.firstRow > 1) {
        templateData.pagination.allowPrev = true
      }

      // Allow next button?
      try {
        if (nextRow.toString().length > 0) {
          templateData.pagination.allowNext = true
        }
      } catch (err) {
        templateData.pagination.allowNext = false
      }

      // Remove internal columns (ROWNUM###, ...)
      columns.splice(columns.indexOf('ROWNUM###'), 1)
      columns.splice(columns.indexOf('NEXTROW###'), 1)

      // Remove column return-item
      columns.splice(columns.indexOf(self.options.returnCol), 1)
      // Remove column return-display if display columns are provided
      if (columns.length > 1) {
        columns.splice(columns.indexOf(self.options.displayCol), 1)
      }

      templateData.report.colCount = columns.length

      // Rename columns to standard names like column0, column1, ..
      var column = {}
      $.each(columns, function (key, val) {
        if (columns.length === 1 && self.options.itemLabel) {
          column['column' + key] = {
            name: val,
            label: self.options.itemLabel
          }
        } else {
          column['column' + key] = {
            name: val
          }
        }
        templateData.report.columns = $.extend(templateData.report.columns, column)
      })

      /* Get rows

        format will be like this:

        rows = [{column0: "a", column1: "b"}, {column0: "c", column1: "d"}]

      */
      var tmpRow

      var rows = $.map(self.options.dataSource.row, function (row, rowKey) {
        tmpRow = {
          columns: {}
        }
        // add column values to row
        $.each(templateData.report.columns, function (colId, col) {
          tmpRow.columns[colId] = self._unescape(row[col.name])
        })
        // add metadata to row
        tmpRow.returnVal = row[self.options.returnCol]
        tmpRow.displayVal = row[self.options.displayCol]
        return tmpRow
      })

      templateData.report.rows = rows

      templateData.report.rowCount = (rows.length === 0 ? false : rows.length)
      templateData.pagination.rowCount = templateData.report.rowCount

      return templateData
    },

    _destroy: function (modal) {
      var self = this
      $(window.top.document).off('keydown')
      $(window.top.document).off('keyup', '#' + self.options.searchField)
      self._item$.off('keyup')
      self._modalDialog$.remove()
      self._topApex.navigation.endFreezeScroll()
    },

    _getData: function (options, handler) {
      var self = this

      var settings = {
        searchTerm: '',
        firstRow: 1,
        fillSearchText: true
      }

      settings = $.extend(settings, options)
      var searchTerm = (settings.searchTerm.length > 0) ? settings.searchTerm : self._topApex.item(self.options.searchField).getValue()
      var items = [self.options.pageItemsToSubmit, self.options.cascadingItems]
        .filter(function (selector) {
          return (selector)
        })
        .join(',')

      // Store last searchTerm
      self._lastSearchTerm = searchTerm

      apex.server.plugin(self.options.ajaxIdentifier, {
        x01: 'GET_DATA',
        x02: searchTerm, // searchterm
        x03: settings.firstRow, // first rownum to return
        pageItems: items
      }, {
        target: self._item$,
        dataType: 'json',
        loadingIndicator: $.proxy(options.loadingIndicator, self),
        success: function (pData) {
          self.options.dataSource = pData
          self._templateData = self._getTemplateData()
          handler({
            widget: self,
            fillSearchText: settings.fillSearchText
          })
        }
      })
    },

    _initSearch: function () {
      var self = this
      // if the lastSearchTerm is not equal to the current searchTerm, then search immediate
      if (self._lastSearchTerm !== self._topApex.item(self.options.searchField).getValue()) {
        self._getData({
          firstRow: 1,
          loadingIndicator: self._modalLoadingIndicator
        }, function () {
          self._onReload()
        })
      }

      // Action when user inputs search text
      $(window.top.document).on('keyup', '#' + self.options.searchField, function (event) {
        // Do nothing for navigation keys, escape and enter
        var navigationKeys = [37, 38, 39, 40, 9, 33, 34, 27, 13]
        if ($.inArray(event.keyCode, navigationKeys) > -1) {
          return false
        }

        // Stop the enter key from selecting a row
        self._activeDelay = true

        // Don't search on all key events but add a delay for performance
        var srcEl = event.currentTarget
        if (srcEl.delayTimer) {
          clearTimeout(srcEl.delayTimer)
        }

        srcEl.delayTimer = setTimeout(function () {
          self._getData({
            firstRow: 1,
            loadingIndicator: self._modalLoadingIndicator
          }, function () {
            self._onReload()
          })
        }, 350)
      })
    },

    _initPagination: function () {
      var self = this
      var prevSelector = '#' + self.options.id + ' .t-Report-paginationLink--prev'
      var nextSelector = '#' + self.options.id + ' .t-Report-paginationLink--next'

      // remove current listeners
      self._topApex.jQuery(window.top.document).off('click', prevSelector)
      self._topApex.jQuery(window.top.document).off('click', nextSelector)

      // Previous set
      self._topApex.jQuery(window.top.document).on('click', prevSelector, function (e) {
        self._getData({
          firstRow: self._getFirstRownumPrevSet(),
          loadingIndicator: self._modalLoadingIndicator
        }, function () {
          self._onReload()
        })
      })

      // Next set
      self._topApex.jQuery(window.top.document).on('click', nextSelector, function (e) {
        self._getData({
          firstRow: self._getFirstRownumNextSet(),
          loadingIndicator: self._modalLoadingIndicator
        }, function () {
          self._onReload()
        })
      })
    },

    _getFirstRownumPrevSet: function () {
      var self = this
      try {
        return self._templateData.pagination.firstRow - self.options.rowCount
      } catch (err) {
        return 1
      }
    },

    _getFirstRownumNextSet: function () {
      var self = this
      try {
        return self._templateData.pagination.lastRow + 1
      } catch (err) {
        return 16
      }
    },

    _openLOV: function (options) {
      var self = this
      // Remove previous modal-lov region
      $('#' + self.options.id, document).remove()

      self._getData({
        firstRow: 1,
        searchTerm: options.searchTerm,
        fillSearchText: options.fillSearchText,
        loadingIndicator: self._itemLoadingIndicator
      }, options.afterData)
    },

    _addCSSToTopLevel: function () {
      var self = this
      // CSS file is always present when the current window is the top window, so do nothing
      if (window === window.top) {
        return
      }
      var cssSelector = 'link[rel="stylesheet"][href*="modal-lov"]'

      // Check if file exists in top window
      if (self._topApex.jQuery(cssSelector).length === 0) {
        self._topApex.jQuery('head').append($(cssSelector).clone())
      }
    },

    _triggerLOVOnDisplay: function () {
      var self = this
      // Trigger event on click input display field
      self._item$.on('keyup', function (e) {
        if ($.inArray(e.keyCode, self._validSearchKeys) > -1 && (!e.ctrlKey || e.keyCode === 86)) {
          $(this).off('keyup')
          self._openLOV({
            searchTerm: self._item$.val(),
            fillSearchText: true,
            afterData: function (options) {
              self._onLoad(options)
              // Clear input as soon as modal is ready
              self._returnValue = ''
              self._item$.val('')
            }
          })
        }
      })
    },

    _triggerLOVOnButton: function () {
      var self = this
      // Trigger event on click input group addon button (magnifier glass)
      self._searchButton$.on('click', function (e) {
        self._openLOV({
          searchTerm: '',
          fillSearchText: false,
          afterData: self._onLoad
        })
      })
    },

    _onRowHover: function () {
      var self = this
      self._modalDialog$.on('mouseenter mouseleave', '.t-Report-report tbody tr', function () {
        if ($(this).hasClass('mark')) {
          return
        }
        $(this).toggleClass(self.options.hoverClasses)
      })
    },

    _selectInitialRow: function () {
      var self = this
      // If current item in LOV then select that row
      // Else select first row of report
      //Atamanskiy 22.08.2019
      //var $curRow = self._modalDialog$.find('.t-Report-report tr[data-return="' + self._returnValue + '"]')
      var ettn_returnValue = self._returnValue.replace(/"/g, '\\"');
      var $curRow = self._modalDialog$.find('.t-Report-report tr[data-return="' + ettn_returnValue + '"]')
      //Atamanskiy 22.08.2019
      if ($curRow.length > 0) {
        $curRow.addClass('mark ' + self.options.markClasses)
      } else {
        self._modalDialog$.find('.t-Report-report tr[data-return]').first().addClass('mark ' + self.options.markClasses)
      }
    },

    _initKeyboardNavigation: function () {
      var self = this

      function navigate (direction, event) {
        event.stopImmediatePropagation()
        event.preventDefault()
        var currentRow = self._modalDialog$.find('.t-Report-report tr.mark')
        switch (direction) {
          case 'up':
            if ($(currentRow).prev().is('.t-Report-report tr')) {
              $(currentRow).removeClass('mark ' + self.options.markClasses).prev().addClass('mark ' + self.options.markClasses)
            }
            break
          case 'down':
            if ($(currentRow).next().is('.t-Report-report tr')) {
              $(currentRow).removeClass('mark ' + self.options.markClasses).next().addClass('mark ' + self.options.markClasses)
            }
            break
        }
      }

      $(window.top.document).on('keydown', function (e) {
        switch (e.keyCode) {
          case 38: // up
            navigate('up', e)
            break
          case 40: // down
            navigate('down', e)
            break
          case 9: // tab
            navigate('down', e)
            break
          case 13: // ENTER
            if (!self._activeDelay) {
              var currentRow = self._modalDialog$.find('.t-Report-report tr.mark').first()
              self._returnSelectedRow(currentRow)
            }
            break
          case 33: // Page up
            e.preventDefault()
            self._topApex.jQuery('#' + self.options.id + ' .t-ButtonRegion-buttons .t-Report-paginationLink--prev').trigger('click')
            break
          case 34: // Page down
            e.preventDefault()
            self._topApex.jQuery('#' + self.options.id + ' .t-ButtonRegion-buttons .t-Report-paginationLink--next').trigger('click')
            break
        }
      })
    },

    _returnSelectedRow: function ($row) {
      var self = this

      // Do nothing if row does not exist
      if (!$row || $row.length === 0) {
        return
      }

      apex.item(self.options.itemName).setValue(self._unescape($row.data('return').toString()), self._unescape($row.data('display')))


      // Trigger a custom event and add data to it: all columns of the row
      var data = {}
      $.each($('.t-Report-report tr.mark').find('td'), function (key, val) {
        data[$(val).attr('headers')] = $(val).html()
      })

      // Finally hide the modal
      self._modalDialog$.dialog('close')
    },

    _onRowSelected: function () {
      var self = this
      // Action when row is clicked
      self._modalDialog$.on('click', '.modal-lov-table .t-Report-report tbody tr', function (e) {
        self._returnSelectedRow(self._topApex.jQuery(this))
      })
    },

    _removeValidation: function () {
      // Clear current errors
      apex.message.clearErrors(this.options.itemName)
    },

    _clearInput: function () {
      var self = this
      apex.item(self.options.itemName).setValue('')
      self._returnValue = ''
      self._removeValidation()
      self._item$.focus()
    },

    _initClearInput: function () {
      var self = this

      self._clearInput$.on('click', function () {
        self._clearInput()
      })
    },

    _initCascadingLOVs: function () {
      var self = this
      $(self.options.cascadingItems).on('change', function () {
        self._clearInput()
      })
    },

    _setValueBasedOnDisplay: function (pValue) {
      var self = this

      var promise = apex.server.plugin(self.options.ajaxIdentifier, {
        x01: 'GET_VALUE',
        x02: pValue // returnVal
      }, {
        dataType: 'json',
        loadingIndicator: $.proxy(self._itemLoadingIndicator, self),
        success: function (pData) {
          self._disableChangeEvent = false
          self._returnValue = pData.returnValue
          self._item$.val(pData.displayValue)
          self._item$.trigger('change')
        }
      })

      promise
        .done(function (pData) {
          self._returnValue = pData.returnValue
          self._item$.val(pData.displayValue)
          self._item$.trigger('change')
        })
        .always(function () {
          self._disableChangeEvent = false
        })
    },

    _initApexItem: function () {
      var self = this
      // Set and get value via apex functions
      apex.item.create(self.options.itemName, {
        enable: function () {
          self._item$.prop('disabled', false)
          self._searchButton$.prop('disabled', false)
          self._clearInput$.show()
        },
        disable: function () {
          self._item$.prop('disabled', true)
          self._searchButton$.prop('disabled', true)
          self._clearInput$.hide()
        },
        isDisabled: function () {
          return self._item$.prop('disabled')
        },
        show: function () {
          self._item$.show()
          self._searchButton$.show()
        },
        hide: function () {
          self._item$.hide()
          self._searchButton$.hide()
        },

        setValue: function (pValue, pDisplayValue, pSuppressChangeEvent) {
          if (pDisplayValue || !pValue || pValue.length === 0) {
            // Assuming no check is needed to see if the value is in the LOV
            self._item$.val(pDisplayValue)
            self._returnValue = pValue
          } else {
            self._item$.val(pDisplayValue)
            self._disableChangeEvent = true
            self._setValueBasedOnDisplay(pValue)
          }
        },
        getValue: function () {
          // Always return at least an empty string
          return self._returnValue || ''
        },
        isChanged: function () {
          return document.getElementById(self.options.itemName).value !== document.getElementById(self.options.itemName).defaultValue
        }
      })
      apex.item(self.options.itemName).callbacks.displayValueFor = function () {
        return self._item$.val()
      }

      // Only trigger the change event after the Async callback if needed
      self._item$['trigger'] = function (type, data) {
        if (type === 'change' && self._disableChangeEvent) {
          return
        }
        $.fn.trigger.call(self._item$, type, data)
      }
    },

    _itemLoadingIndicator: function (loadingIndicator) {
      $('#' + this.options.searchButton).after(loadingIndicator)
      return loadingIndicator
    },

    _modalLoadingIndicator: function (loadingIndicator) {
      this._modalDialog$.prepend(loadingIndicator)
      return loadingIndicator
    }
  })
})(apex.jQuery, window)

},{"./templates/modal-report.hbs":22,"./templates/partials/_pagination.hbs":23,"./templates/partials/_report.hbs":24,"./templates/partials/_rows.hbs":25,"hbsfy/runtime":20}],22:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"t-DialogRegion js-regieonDialog t-Form--stretchInputs t-Form--large modal-lov\" title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"t-DialogRegion-body js-regionDialog-body no-padding\" "
    + ((stack1 = alias5(((stack1 = (depth0 != null ? depth0.region : depth0)) != null ? stack1.attributes : stack1), depth0)) != null ? stack1 : "")
    + ">\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n                <div class=\"col col-12\">\r\n                    <div class=\"t-Report t-Report--altRowsDefault\">\r\n                        <div class=\"t-Report-wrap\" style=\"width: 100%\">\r\n                            <div class=\"t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs margin-top-sm\" id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.searchField : depth0)) != null ? stack1.id : stack1), depth0))
    + "_CONTAINER\">\r\n                                <div class=\"t-Form-inputContainer\">\r\n                                    <div class=\"t-Form-itemWrapper\">\r\n                                        <input type=\"text\" class=\"apex-item-text modal-lov-item \" id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.searchField : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" autocomplete=\"off\" placeholder=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.searchField : depth0)) != null ? stack1.placeholder : stack1), depth0))
    + "\">\r\n                                        <button type=\"button\" id=\"P1110_ZAAL_FK_CODE_BUTTON\" class=\"a-Button modal-lov-button a-Button--popupLOV\">\r\n                                            <span class=\"fa fa-search\" aria-hidden=\"true\"></span>\r\n                                        </button>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n"
    + ((stack1 = container.invokePartial(partials.report,depth0,{"name":"report","data":data,"indent":"                            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"t-DialogRegion-buttons js-regionDialog-buttons\">\r\n        <div class=\"t-ButtonRegion t-ButtonRegion--dialogRegion\">\r\n            <div class=\"t-ButtonRegion-wrap\">\r\n"
    + ((stack1 = container.invokePartial(partials.pagination,depth0,{"name":"pagination","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"usePartial":true,"useData":true});

},{"hbsfy/runtime":20}],23:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "<div class=\"t-ButtonRegion-col t-ButtonRegion-col--left\">\r\n    <div class=\"t-ButtonRegion-buttons\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.allowPrev : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n<div class=\"t-ButtonRegion-col t-ButtonRegion-col--center\" style=\"text-align: center;\">\r\n  "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.firstRow : stack1), depth0))
    + " - "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.lastRow : stack1), depth0))
    + "\r\n</div>\r\n<div class=\"t-ButtonRegion-col t-ButtonRegion-col--right\">\r\n    <div class=\"t-ButtonRegion-buttons\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.allowNext : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a href=\"javascript:void(0);\" class=\"t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--prev\">\r\n          <span class=\"a-Icon icon-left-arrow\"></span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.previous : stack1), depth0))
    + "\r\n        </a>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a href=\"javascript:void(0);\" class=\"t-Button t-Button--small t-Button--noUI t-Report-paginationLink t-Report-paginationLink--next\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.next : stack1), depth0))
    + "\r\n          <span class=\"a-Icon icon-right-arrow\"></span>\r\n        </a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.pagination : depth0)) != null ? stack1.rowCount : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

},{"hbsfy/runtime":20}],24:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), buffer =
  "            <table cellpadding=\"0\" border=\"0\" cellspacing=\"0\" summary=\"\" class=\"t-Report-report "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.classes : stack1), depth0))
    + "\" width=\"100%\">\r\n              <tbody>\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.showHeaders : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
  stack1 = ((helper = (helper = helpers.report || (depth0 != null ? depth0.report : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"report","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(alias1,options) : helper));
  if (!helpers.report) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "              </tbody>\r\n            </table>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                  <thead>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.columns : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                  </thead>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                      <th class=\"t-Report-colHead\" id=\""
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "                      </th>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                          "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.label : depth0), depth0))
    + "\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                          "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.rows,depth0,{"name":"rows","data":data,"indent":"                  ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <span class=\"nodatafound\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.noDataFound : stack1), depth0))
    + "</span>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"t-Report-tableWrap modal-lov-table\">\r\n  <table cellpadding=\"0\" border=\"0\" cellspacing=\"0\" class=\"\" width=\"100%\">\r\n    <tbody>\r\n      <tr>\r\n        <td></td>\r\n      </tr>\r\n      <tr>\r\n        <td>\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.rowCount : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n"
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.report : depth0)) != null ? stack1.rowCount : stack1),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true});

},{"hbsfy/runtime":20}],25:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  <tr data-return=\""
    + alias2(alias1((depth0 != null ? depth0.returnVal : depth0), depth0))
    + "\" data-display=\""
    + alias2(alias1((depth0 != null ? depth0.displayVal : depth0), depth0))
    + "\" class=\"pointer\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.columns : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "      <td headers=\""
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"t-Report-cell\">"
    + alias1(container.lambda(depth0, depth0))
    + "</td>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.rows : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

},{"hbsfy/runtime":20}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy9lYWNoLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvbG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIm5vZGVfbW9kdWxlcy9oYnNmeS9ydW50aW1lLmpzIiwic3JjL2pzL21vZGFsLWxvdi5qcyIsInNyYy9qcy90ZW1wbGF0ZXMvbW9kYWwtcmVwb3J0LmhicyIsInNyYy9qcy90ZW1wbGF0ZXMvcGFydGlhbHMvX3BhZ2luYXRpb24uaGJzIiwic3JjL2pzL3RlbXBsYXRlcy9wYXJ0aWFscy9fcmVwb3J0LmhicyIsInNyYy9qcy90ZW1wbGF0ZXMvcGFydGlhbHMvX3Jvd3MuaGJzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OEJDQXNCLG1CQUFtQjs7SUFBN0IsSUFBSTs7Ozs7b0NBSU8sMEJBQTBCOzs7O21DQUMzQix3QkFBd0I7Ozs7K0JBQ3ZCLG9CQUFvQjs7SUFBL0IsS0FBSzs7aUNBQ1Esc0JBQXNCOztJQUFuQyxPQUFPOztvQ0FFSSwwQkFBMEI7Ozs7O0FBR2pELFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTFDLE9BQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUUsQ0FBQyxVQUFVLG9DQUFhLENBQUM7QUFDM0IsSUFBRSxDQUFDLFNBQVMsbUNBQVksQ0FBQztBQUN6QixJQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFFLENBQUMsZ0JBQWdCLEdBQUcsS0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCAqIGFzIGJhc2UgZnJvbSAnLi9oYW5kbGViYXJzL2Jhc2UnO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxuaW1wb3J0IFNhZmVTdHJpbmcgZnJvbSAnLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9oYW5kbGViYXJzL2V4Y2VwdGlvbic7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL2hhbmRsZWJhcnMvdXRpbHMnO1xuaW1wb3J0ICogYXMgcnVudGltZSBmcm9tICcuL2hhbmRsZWJhcnMvcnVudGltZSc7XG5cbmltcG9ydCBub0NvbmZsaWN0IGZyb20gJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCc7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxuZnVuY3Rpb24gY3JlYXRlKCkge1xuICBsZXQgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24oc3BlYykge1xuICAgIHJldHVybiBydW50aW1lLnRlbXBsYXRlKHNwZWMsIGhiKTtcbiAgfTtcblxuICByZXR1cm4gaGI7XG59XG5cbmxldCBpbnN0ID0gY3JlYXRlKCk7XG5pbnN0LmNyZWF0ZSA9IGNyZWF0ZTtcblxubm9Db25mbGljdChpbnN0KTtcblxuaW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuZXhwb3J0IGRlZmF1bHQgaW5zdDtcbiIsImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjExJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcbiIsImltcG9ydCByZWdpc3RlcklubGluZSBmcm9tICcuL2RlY29yYXRvcnMvaW5saW5lJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJJbmxpbmUoaW5zdGFuY2UpO1xufVxuXG4iLCJpbXBvcnQge2V4dGVuZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckRlY29yYXRvcignaW5saW5lJywgZnVuY3Rpb24oZm4sIHByb3BzLCBjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICBsZXQgcmV0ID0gZm47XG4gICAgaWYgKCFwcm9wcy5wYXJ0aWFscykge1xuICAgICAgcHJvcHMucGFydGlhbHMgPSB7fTtcbiAgICAgIHJldCA9IGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIGxldCBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gZXh0ZW5kKHt9LCBvcmlnaW5hbCwgcHJvcHMucGFydGlhbHMpO1xuICAgICAgICBsZXQgcmV0ID0gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9yaWdpbmFsO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBwcm9wcy5wYXJ0aWFsc1tvcHRpb25zLmFyZ3NbMF1dID0gb3B0aW9ucy5mbjtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuIiwiXG5jb25zdCBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgbGV0IGxvYyA9IG5vZGUgJiYgbm9kZS5sb2MsXG4gICAgICBsaW5lLFxuICAgICAgY29sdW1uO1xuICBpZiAobG9jKSB7XG4gICAgbGluZSA9IGxvYy5zdGFydC5saW5lO1xuICAgIGNvbHVtbiA9IGxvYy5zdGFydC5jb2x1bW47XG5cbiAgICBtZXNzYWdlICs9ICcgLSAnICsgbGluZSArICc6JyArIGNvbHVtbjtcbiAgfVxuXG4gIGxldCB0bXAgPSBFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICAvLyBVbmZvcnR1bmF0ZWx5IGVycm9ycyBhcmUgbm90IGVudW1lcmFibGUgaW4gQ2hyb21lIChhdCBsZWFzdCksIHNvIGBmb3IgcHJvcCBpbiB0bXBgIGRvZXNuJ3Qgd29yay5cbiAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZXJyb3JQcm9wcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpc1tlcnJvclByb3BzW2lkeF1dID0gdG1wW2Vycm9yUHJvcHNbaWR4XV07XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBFeGNlcHRpb24pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAobG9jKSB7XG4gICAgICB0aGlzLmxpbmVOdW1iZXIgPSBsaW5lO1xuXG4gICAgICAvLyBXb3JrIGFyb3VuZCBpc3N1ZSB1bmRlciBzYWZhcmkgd2hlcmUgd2UgY2FuJ3QgZGlyZWN0bHkgc2V0IHRoZSBjb2x1bW4gdmFsdWVcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29sdW1uJywge1xuICAgICAgICAgIHZhbHVlOiBjb2x1bW4sXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAobm9wKSB7XG4gICAgLyogSWdub3JlIGlmIHRoZSBicm93c2VyIGlzIHZlcnkgcGFydGljdWxhciAqL1xuICB9XG59XG5cbkV4Y2VwdGlvbi5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcblxuZXhwb3J0IGRlZmF1bHQgRXhjZXB0aW9uO1xuIiwiaW1wb3J0IHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJFYWNoIGZyb20gJy4vaGVscGVycy9lYWNoJztcbmltcG9ydCByZWdpc3RlckhlbHBlck1pc3NpbmcgZnJvbSAnLi9oZWxwZXJzL2hlbHBlci1taXNzaW5nJztcbmltcG9ydCByZWdpc3RlcklmIGZyb20gJy4vaGVscGVycy9pZic7XG5pbXBvcnQgcmVnaXN0ZXJMb2cgZnJvbSAnLi9oZWxwZXJzL2xvZyc7XG5pbXBvcnQgcmVnaXN0ZXJMb29rdXAgZnJvbSAnLi9oZWxwZXJzL2xvb2t1cCc7XG5pbXBvcnQgcmVnaXN0ZXJXaXRoIGZyb20gJy4vaGVscGVycy93aXRoJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMoaW5zdGFuY2UpIHtcbiAgcmVnaXN0ZXJCbG9ja0hlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlckVhY2goaW5zdGFuY2UpO1xuICByZWdpc3RlckhlbHBlck1pc3NpbmcoaW5zdGFuY2UpO1xuICByZWdpc3RlcklmKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb2coaW5zdGFuY2UpO1xuICByZWdpc3Rlckxvb2t1cChpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyV2l0aChpbnN0YW5jZSk7XG59XG4iLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBjcmVhdGVGcmFtZSwgaXNBcnJheX0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignYmxvY2tIZWxwZXJNaXNzaW5nJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGxldCBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGZuKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dCA9PT0gZmFsc2UgfHwgY29udGV4dCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoY29udGV4dCkpIHtcbiAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgICAgb3B0aW9ucy5pZHMgPSBbb3B0aW9ucy5uYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzLmVhY2goY29udGV4dCwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBsZXQgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBhcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgICAgIG9wdGlvbnMgPSB7ZGF0YTogZGF0YX07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgYmxvY2tQYXJhbXMsIGNyZWF0ZUZyYW1lLCBpc0FycmF5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4uL2V4Y2VwdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdlYWNoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTXVzdCBwYXNzIGl0ZXJhdG9yIHRvICNlYWNoJyk7XG4gICAgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbixcbiAgICAgICAgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIHJldCA9ICcnLFxuICAgICAgICBkYXRhLFxuICAgICAgICBjb250ZXh0UGF0aDtcblxuICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgIGNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSkgKyAnLic7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhlY0l0ZXJhdGlvbihmaWVsZCwgaW5kZXgsIGxhc3QpIHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGRhdGEua2V5ID0gZmllbGQ7XG4gICAgICAgIGRhdGEuaW5kZXggPSBpbmRleDtcbiAgICAgICAgZGF0YS5maXJzdCA9IGluZGV4ID09PSAwO1xuICAgICAgICBkYXRhLmxhc3QgPSAhIWxhc3Q7XG5cbiAgICAgICAgaWYgKGNvbnRleHRQYXRoKSB7XG4gICAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGNvbnRleHRQYXRoICsgZmllbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0ID0gcmV0ICsgZm4oY29udGV4dFtmaWVsZF0sIHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXM6IGJsb2NrUGFyYW1zKFtjb250ZXh0W2ZpZWxkXSwgZmllbGRdLCBbY29udGV4dFBhdGggKyBmaWVsZCwgbnVsbF0pXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dCAmJiB0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGZvciAobGV0IGogPSBjb250ZXh0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgIGlmIChpIGluIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24oaSwgaSwgaSA9PT0gY29udGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBwcmlvcktleTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gY29udGV4dCkge1xuICAgICAgICAgIGlmIChjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIC8vIFdlJ3JlIHJ1bm5pbmcgdGhlIGl0ZXJhdGlvbnMgb25lIHN0ZXAgb3V0IG9mIHN5bmMgc28gd2UgY2FuIGRldGVjdFxuICAgICAgICAgICAgLy8gdGhlIGxhc3QgaXRlcmF0aW9uIHdpdGhvdXQgaGF2ZSB0byBzY2FuIHRoZSBvYmplY3QgdHdpY2UgYW5kIGNyZWF0ZVxuICAgICAgICAgICAgLy8gYW4gaXRlcm1lZGlhdGUga2V5cyBhcnJheS5cbiAgICAgICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByaW9yS2V5ID0ga2V5O1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuIiwiaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKC8qIFthcmdzLCBdb3B0aW9ucyAqLykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBBIG1pc3NpbmcgZmllbGQgaW4gYSB7e2Zvb319IGNvbnN0cnVjdC5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNvbWVvbmUgaXMgYWN0dWFsbHkgdHJ5aW5nIHRvIGNhbGwgc29tZXRoaW5nLCBibG93IHVwLlxuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignTWlzc2luZyBoZWxwZXI6IFwiJyArIGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0ubmFtZSArICdcIicpO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQge2lzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2lmJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb25kaXRpb25hbCkpIHsgY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbC5jYWxsKHRoaXMpOyB9XG5cbiAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIGlzIHRvIHJlbmRlciB0aGUgcG9zaXRpdmUgcGF0aCBpZiB0aGUgdmFsdWUgaXMgdHJ1dGh5IGFuZCBub3QgZW1wdHkuXG4gICAgLy8gVGhlIGBpbmNsdWRlWmVyb2Agb3B0aW9uIG1heSBiZSBzZXQgdG8gdHJlYXQgdGhlIGNvbmR0aW9uYWwgYXMgcHVyZWx5IG5vdCBlbXB0eSBiYXNlZCBvbiB0aGVcbiAgICAvLyBiZWhhdmlvciBvZiBpc0VtcHR5LiBFZmZlY3RpdmVseSB0aGlzIGRldGVybWluZXMgaWYgMCBpcyBoYW5kbGVkIGJ5IHRoZSBwb3NpdGl2ZSBwYXRoIG9yIG5lZ2F0aXZlLlxuICAgIGlmICgoIW9wdGlvbnMuaGFzaC5pbmNsdWRlWmVybyAmJiAhY29uZGl0aW9uYWwpIHx8IGlzRW1wdHkoY29uZGl0aW9uYWwpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd1bmxlc3MnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIHJldHVybiBpbnN0YW5jZS5oZWxwZXJzWydpZiddLmNhbGwodGhpcywgY29uZGl0aW9uYWwsIHtmbjogb3B0aW9ucy5pbnZlcnNlLCBpbnZlcnNlOiBvcHRpb25zLmZuLCBoYXNoOiBvcHRpb25zLmhhc2h9KTtcbiAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9nJywgZnVuY3Rpb24oLyogbWVzc2FnZSwgb3B0aW9ucyAqLykge1xuICAgIGxldCBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgbGV0IGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nKC4uLiBhcmdzKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG4iLCJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKEhhbmRsZWJhcnMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgbGV0IHJvb3QgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyxcbiAgICAgICRIYW5kbGViYXJzID0gcm9vdC5IYW5kbGViYXJzO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBIYW5kbGViYXJzLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAocm9vdC5IYW5kbGViYXJzID09PSBIYW5kbGViYXJzKSB7XG4gICAgICByb290LkhhbmRsZWJhcnMgPSAkSGFuZGxlYmFycztcbiAgICB9XG4gICAgcmV0dXJuIEhhbmRsZWJhcnM7XG4gIH07XG59XG4iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgQ09NUElMRVJfUkVWSVNJT04sIFJFVklTSU9OX0NIQU5HRVMsIGNyZWF0ZUZyYW1lIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIGNvbnN0IGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgY29uc3QgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgZnVuY3Rpb24gaW52b2tlUGFydGlhbFdyYXBwZXIocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG4gICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgb3B0aW9ucy5pZHNbMF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcnRpYWwgPSBlbnYuVk0ucmVzb2x2ZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgdGVtcGxhdGVTcGVjLmNvbXBpbGVyT3B0aW9ucywgZW52KTtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmRlbnQpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaW5lc1tpXSA9IG9wdGlvbnMuaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgbGV0IGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1wiJyArIG5hbWUgKyAnXCIgbm90IGRlZmluZWQgaW4gJyArIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIHJldC5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWNbaSArICdfZCddO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIGxldCBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIGxldCBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICBsZXQgZGVwdGhzLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0LyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsIHx8IHRlbXBsYXRlU3BlYy51c2VEZWNvcmF0b3JzKSB7XG4gICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuZGVjb3JhdG9ycywgZW52LmRlY29yYXRvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsXG4gICAgICAgIG9wdGlvbnMuZGF0YSB8fCBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSxcbiAgICAgICAgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ0BwYXJ0aWFsLWJsb2NrJykge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgY29uc3QgY3VycmVudFBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoID0gb3B0aW9ucy5pZHNbMF0gfHwgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoO1xuICB9XG5cbiAgbGV0IHBhcnRpYWxCbG9jaztcbiAgaWYgKG9wdGlvbnMuZm4gJiYgb3B0aW9ucy5mbiAhPT0gbm9vcCkge1xuICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBnZXQgYWNjZXNzIHRvIGN1cnJlbnRQYXJ0aWFsQmxvY2sgZnJvbSB0aGUgY2xvc3VyZVxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG4gICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cbiAgICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IHJldHVybiAnJzsgfVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICBsZXQgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG4iLCIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcbiIsImNvbnN0IGVzY2FwZSA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjeDI3OycsXG4gICdgJzogJyYjeDYwOycsXG4gICc9JzogJyYjeDNEOydcbn07XG5cbmNvbnN0IGJhZENoYXJzID0gL1smPD5cIidgPV0vZyxcbiAgICAgIHBvc3NpYmxlID0gL1smPD5cIidgPV0vO1xuXG5mdW5jdGlvbiBlc2NhcGVDaGFyKGNocikge1xuICByZXR1cm4gZXNjYXBlW2Nocl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQob2JqLyogLCAuLi5zb3VyY2UgKi8pIHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3VtZW50c1tpXSwga2V5KSkge1xuICAgICAgICBvYmpba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBsZXQgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBTb3VyY2VkIGZyb20gbG9kYXNoXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvbG9kYXNoL2Jsb2IvbWFzdGVyL0xJQ0VOU0UudHh0XG4vKiBlc2xpbnQtZGlzYWJsZSBmdW5jLXN0eWxlICovXG5sZXQgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuLy8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICB9O1xufVxuZXhwb3J0IHtpc0Z1bmN0aW9ufTtcbi8qIGVzbGludC1lbmFibGUgZnVuYy1zdHlsZSAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xufTtcblxuLy8gT2xkZXIgSUUgdmVyc2lvbnMgZG8gbm90IGRpcmVjdGx5IHN1cHBvcnQgaW5kZXhPZiBzbyB3ZSBtdXN0IGltcGxlbWVudCBvdXIgb3duLCBzYWRseS5cbmV4cG9ydCBmdW5jdGlvbiBpbmRleE9mKGFycmF5LCB2YWx1ZSkge1xuICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVFeHByZXNzaW9uKHN0cmluZykge1xuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBkb24ndCBlc2NhcGUgU2FmZVN0cmluZ3MsIHNpbmNlIHRoZXkncmUgYWxyZWFkeSBzYWZlXG4gICAgaWYgKHN0cmluZyAmJiBzdHJpbmcudG9IVE1MKSB7XG4gICAgICByZXR1cm4gc3RyaW5nLnRvSFRNTCgpO1xuICAgIH0gZWxzZSBpZiAoc3RyaW5nID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9IGVsc2UgaWYgKCFzdHJpbmcpIHtcbiAgICAgIHJldHVybiBzdHJpbmcgKyAnJztcbiAgICB9XG5cbiAgICAvLyBGb3JjZSBhIHN0cmluZyBjb252ZXJzaW9uIGFzIHRoaXMgd2lsbCBiZSBkb25lIGJ5IHRoZSBhcHBlbmQgcmVnYXJkbGVzcyBhbmRcbiAgICAvLyB0aGUgcmVnZXggdGVzdCB3aWxsIGRvIHRoaXMgdHJhbnNwYXJlbnRseSBiZWhpbmQgdGhlIHNjZW5lcywgY2F1c2luZyBpc3N1ZXMgaWZcbiAgICAvLyBhbiBvYmplY3QncyB0byBzdHJpbmcgaGFzIGVzY2FwZWQgY2hhcmFjdGVycyBpbiBpdC5cbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZztcbiAgfVxuXG4gIGlmICghcG9zc2libGUudGVzdChzdHJpbmcpKSB7IHJldHVybiBzdHJpbmc7IH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRnJhbWUob2JqZWN0KSB7XG4gIGxldCBmcmFtZSA9IGV4dGVuZCh7fSwgb2JqZWN0KTtcbiAgZnJhbWUuX3BhcmVudCA9IG9iamVjdDtcbiAgcmV0dXJuIGZyYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmxvY2tQYXJhbXMocGFyYW1zLCBpZHMpIHtcbiAgcGFyYW1zLnBhdGggPSBpZHM7XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDb250ZXh0UGF0aChjb250ZXh0UGF0aCwgaWQpIHtcbiAgcmV0dXJuIChjb250ZXh0UGF0aCA/IGNvbnRleHRQYXRoICsgJy4nIDogJycpICsgaWQ7XG59XG4iLCIvLyBDcmVhdGUgYSBzaW1wbGUgcGF0aCBhbGlhcyB0byBhbGxvdyBicm93c2VyaWZ5IHRvIHJlc29sdmVcbi8vIHRoZSBydW50aW1lIG9uIGEgc3VwcG9ydGVkIHBhdGguXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lJylbJ2RlZmF1bHQnXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhbmRsZWJhcnMvcnVudGltZVwiKVtcImRlZmF1bHRcIl07XG4iLCIvKiBnbG9iYWwgYXBleCAqL1xyXG52YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hic2Z5L3J1bnRpbWUnKVxyXG5cclxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcigncmF3JywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKVxyXG59KVxyXG5cclxuLy8gUmVxdWlyZSBkeW5hbWljIHRlbXBsYXRlc1xyXG52YXIgbW9kYWxSZXBvcnRUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL21vZGFsLXJlcG9ydC5oYnMnKVxyXG5IYW5kbGViYXJzLnJlZ2lzdGVyUGFydGlhbCgncmVwb3J0JywgcmVxdWlyZSgnLi90ZW1wbGF0ZXMvcGFydGlhbHMvX3JlcG9ydC5oYnMnKSlcclxuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ3Jvd3MnLCByZXF1aXJlKCcuL3RlbXBsYXRlcy9wYXJ0aWFscy9fcm93cy5oYnMnKSlcclxuSGFuZGxlYmFycy5yZWdpc3RlclBhcnRpYWwoJ3BhZ2luYXRpb24nLCByZXF1aXJlKCcuL3RlbXBsYXRlcy9wYXJ0aWFscy9fcGFnaW5hdGlvbi5oYnMnKSlcclxuXHJcbjsoZnVuY3Rpb24gKCQsIHdpbmRvdykge1xyXG4gICQud2lkZ2V0KCdtaG8ubW9kYWxMb3YnLCB7XHJcbiAgICAvLyBkZWZhdWx0IG9wdGlvbnNcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgaWQ6ICcnLFxyXG4gICAgICB0aXRsZTogJycsXHJcbiAgICAgIGl0ZW1OYW1lOiAnJyxcclxuICAgICAgc2VhcmNoRmllbGQ6ICcnLFxyXG4gICAgICBzZWFyY2hCdXR0b246ICcnLFxyXG4gICAgICBzZWFyY2hQbGFjZWhvbGRlcjogJycsXHJcbiAgICAgIGFqYXhJZGVudGlmaWVyOiAnJyxcclxuICAgICAgc2hvd0hlYWRlcnM6IGZhbHNlLFxyXG4gICAgICByZXR1cm5Db2w6ICcnLFxyXG4gICAgICBkaXNwbGF5Q29sOiAnJyxcclxuICAgICAgdmFsaWRhdGlvbkVycm9yOiAnJyxcclxuICAgICAgY2FzY2FkaW5nSXRlbXM6ICcnLFxyXG4gICAgICBtb2RhbFdpZHRoOiA2MDAsXHJcbiAgICAgIG5vRGF0YUZvdW5kOiAnJyxcclxuICAgICAgYWxsb3dNdWx0aWxpbmVSb3dzOiBmYWxzZSxcclxuICAgICAgcm93Q291bnQ6IDE1LFxyXG4gICAgICBwYWdlSXRlbXNUb1N1Ym1pdDogJycsXHJcbiAgICAgIG1hcmtDbGFzc2VzOiAndS1ob3QnLFxyXG4gICAgICBob3ZlckNsYXNzZXM6ICdob3ZlciB1LWNvbG9yLTEnLFxyXG4gICAgICBwcmV2aW91c0xhYmVsOiAncHJldmlvdXMnLFxyXG4gICAgICBuZXh0TGFiZWw6ICduZXh0J1xyXG4gICAgfSxcclxuXHJcbiAgICBfcmV0dXJuVmFsdWU6ICcnLFxyXG5cclxuICAgIF9pdGVtJDogbnVsbCxcclxuICAgIF9zZWFyY2hCdXR0b24kOiBudWxsLFxyXG4gICAgX2NsZWFySW5wdXQkOiBudWxsLFxyXG5cclxuICAgIF9zZWFyY2hGaWVsZCQ6IG51bGwsXHJcblxyXG4gICAgX3RlbXBsYXRlRGF0YToge30sXHJcbiAgICBfbGFzdFNlYXJjaFRlcm06ICcnLFxyXG5cclxuICAgIF9tb2RhbERpYWxvZyQ6IG51bGwsXHJcblxyXG4gICAgX2FjdGl2ZURlbGF5OiBmYWxzZSxcclxuICAgIF9kaXNhYmxlQ2hhbmdlRXZlbnQ6IGZhbHNlLFxyXG5cclxuICAgIF9pZyQ6IG51bGwsXHJcbiAgICBfZ3JpZDogbnVsbCxcclxuXHJcbiAgICBfdG9wQXBleDogYXBleC51dGlsLmdldFRvcEFwZXgoKSxcclxuXHJcbiAgICBfcmVzZXRGb2N1czogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgaWYgKHRoaXMuX2dyaWQpIHtcclxuICAgICAgICB2YXIgcmVjb3JkSWQgPSB0aGlzLl9ncmlkLm1vZGVsLmdldFJlY29yZElkKHRoaXMuX2dyaWQudmlldyQuZ3JpZCgnZ2V0U2VsZWN0ZWRSZWNvcmRzJylbMF0pXHJcbiAgICAgICAgdmFyIGNvbHVtbiA9IHRoaXMuX2lnJC5pbnRlcmFjdGl2ZUdyaWQoJ29wdGlvbicpLmNvbmZpZy5jb2x1bW5zLmZpbHRlcihmdW5jdGlvbiAoY29sdW1uKSB7XHJcbiAgICAgICAgICByZXR1cm4gY29sdW1uLnN0YXRpY0lkID09PSBzZWxmLm9wdGlvbnMuaXRlbU5hbWVcclxuICAgICAgICB9KVswXVxyXG4gICAgICAgIHRoaXMuX2dyaWQudmlldyQuZ3JpZCgnZ290b0NlbGwnLCByZWNvcmRJZCwgY29sdW1uLm5hbWUpXHJcbiAgICAgICAgdGhpcy5fZ3JpZC5mb2N1cygpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5faXRlbSQuZm9jdXMoKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENvbWJpbmF0aW9uIG9mIG51bWJlciwgY2hhciBhbmQgc3BhY2UsIGFycm93IGtleXNcclxuICAgIF92YWxpZFNlYXJjaEtleXM6IFs0OCwgNDksIDUwLCA1MSwgNTIsIDUzLCA1NCwgNTUsIDU2LCA1NywgLy8gbnVtYmVyc1xyXG4gICAgICA2NSwgNjYsIDY3LCA2OCwgNjksIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCwgODEsIDgyLCA4MywgODQsIDg1LCA4NiwgODcsIDg4LCA4OSwgOTAsIC8vIGNoYXJzXHJcbiAgICAgIDkzLCA5NCwgOTUsIDk2LCA5NywgOTgsIDk5LCAxMDAsIDEwMSwgMTAyLCAxMDMsIDEwNCwgMTA1LCAvLyBudW1wYWQgbnVtYmVyc1xyXG4gICAgICA0MCwgLy8gYXJyb3cgZG93blxyXG4gICAgICAzMiwgLy8gc3BhY2ViYXJcclxuICAgICAgOCwgLy8gYmFja3NwYWNlXHJcbiAgICAgIDEwNiwgMTA3LCAxMDksIDExMCwgMTExLCAxODYsIDE4NywgMTg4LCAxODksIDE5MCwgMTkxLCAxOTIsIDIxOSwgMjIwLCAyMjEsIDIyMCAvLyBpbnRlcnB1bmN0aW9uXHJcbiAgICBdLFxyXG5cclxuICAgIF9jcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICBzZWxmLl9pdGVtJCA9ICQoJyMnICsgc2VsZi5vcHRpb25zLml0ZW1OYW1lKVxyXG4gICAgICBzZWxmLl9yZXR1cm5WYWx1ZSA9IHNlbGYuX2l0ZW0kLmRhdGEoJ3JldHVyblZhbHVlJykudG9TdHJpbmcoKVxyXG4gICAgICBzZWxmLl9zZWFyY2hCdXR0b24kID0gJCgnIycgKyBzZWxmLm9wdGlvbnMuc2VhcmNoQnV0dG9uKVxyXG4gICAgICBzZWxmLl9jbGVhcklucHV0JCA9IHNlbGYuX2l0ZW0kLnBhcmVudCgpLmZpbmQoJy5zZWFyY2gtY2xlYXInKVxyXG5cclxuICAgICAgc2VsZi5fYWRkQ1NTVG9Ub3BMZXZlbCgpXHJcblxyXG4gICAgICAvLyBUcmlnZ2VyIGV2ZW50IG9uIGNsaWNrIGlucHV0IGRpc3BsYXkgZmllbGRcclxuICAgICAgc2VsZi5fdHJpZ2dlckxPVk9uRGlzcGxheSgpXHJcblxyXG4gICAgICAvLyBUcmlnZ2VyIGV2ZW50IG9uIGNsaWNrIGlucHV0IGdyb3VwIGFkZG9uIGJ1dHRvbiAobWFnbmlmaWVyIGdsYXNzKVxyXG4gICAgICBzZWxmLl90cmlnZ2VyTE9WT25CdXR0b24oKVxyXG5cclxuICAgICAgLy8gQ2xlYXIgdGV4dCB3aGVuIGNsZWFyIGljb24gaXMgY2xpY2tlZFxyXG4gICAgICBzZWxmLl9pbml0Q2xlYXJJbnB1dCgpXHJcblxyXG4gICAgICAvLyBDYXNjYWRpbmcgTE9WIGl0ZW0gYWN0aW9uc1xyXG4gICAgICBzZWxmLl9pbml0Q2FzY2FkaW5nTE9WcygpXHJcblxyXG4gICAgICAvLyBJbml0IEFQRVggcGFnZWl0ZW0gZnVuY3Rpb25zXHJcbiAgICAgIHNlbGYuX2luaXRBcGV4SXRlbSgpXHJcbiAgICB9LFxyXG5cclxuICAgIF9vbk9wZW5EaWFsb2c6IGZ1bmN0aW9uIChtb2RhbCwgb3B0aW9ucykge1xyXG4gICAgICB2YXIgc2VsZiA9IG9wdGlvbnMud2lkZ2V0XHJcbiAgICAgIHNlbGYuX21vZGFsRGlhbG9nJCA9IHNlbGYuX3RvcEFwZXgualF1ZXJ5KG1vZGFsKVxyXG4gICAgICAvLyBGb2N1cyBvbiBzZWFyY2ggZmllbGQgaW4gTE9WXHJcbiAgICAgIHNlbGYuX3RvcEFwZXgualF1ZXJ5KCcjJyArIHNlbGYub3B0aW9ucy5zZWFyY2hGaWVsZCkuZm9jdXMoKVxyXG4gICAgICAvLyBSZW1vdmUgdmFsaWRhdGlvbiByZXN1bHRzXHJcbiAgICAgIHNlbGYuX3JlbW92ZVZhbGlkYXRpb24oKVxyXG4gICAgICAvLyBBZGQgdGV4dCBmcm9tIGRpc3BsYXkgZmllbGRcclxuICAgICAgaWYgKG9wdGlvbnMuZmlsbFNlYXJjaFRleHQpIHtcclxuICAgICAgICBzZWxmLl90b3BBcGV4Lml0ZW0oc2VsZi5vcHRpb25zLnNlYXJjaEZpZWxkKS5zZXRWYWx1ZShzZWxmLl9pdGVtJC52YWwoKSlcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgY2xhc3Mgb24gaG92ZXJcclxuICAgICAgc2VsZi5fb25Sb3dIb3ZlcigpXHJcbiAgICAgIC8vIHNlbGVjdEluaXRpYWxSb3dcclxuICAgICAgc2VsZi5fc2VsZWN0SW5pdGlhbFJvdygpXHJcbiAgICAgIC8vIFNldCBhY3Rpb24gd2hlbiBhIHJvdyBpcyBzZWxlY3RlZFxyXG4gICAgICBzZWxmLl9vblJvd1NlbGVjdGVkKClcclxuICAgICAgLy8gTmF2aWdhdGUgb24gYXJyb3cga2V5cyB0cm91Z2ggTE9WXHJcbiAgICAgIHNlbGYuX2luaXRLZXlib2FyZE5hdmlnYXRpb24oKVxyXG4gICAgICAvLyBTZXQgc2VhcmNoIGFjdGlvblxyXG4gICAgICBzZWxmLl9pbml0U2VhcmNoKClcclxuICAgICAgLy8gU2V0IHBhZ2luYXRpb24gYWN0aW9uc1xyXG4gICAgICBzZWxmLl9pbml0UGFnaW5hdGlvbigpXHJcbiAgICB9LFxyXG5cclxuICAgIF9vbkNsb3NlRGlhbG9nOiBmdW5jdGlvbiAobW9kYWwsIG9wdGlvbnMpIHtcclxuICAgICAgLy8gY2xvc2UgdGFrZXMgcGxhY2Ugd2hlbiBubyByZWNvcmQgaGFzIGJlZW4gc2VsZWN0ZWQsIGluc3RlYWQgdGhlIGNsb3NlIG1vZGFsIChvciBlc2MpIHdhcyBjbGlja2VkLyBwcmVzc2VkXHJcbiAgICAgIC8vIEl0IGNvdWxkIG1lYW4gdHdvIHRoaW5nczoga2VlcCBjdXJyZW50IG9yIHRha2UgdGhlIHVzZXIncyBkaXNwbGF5IHZhbHVlXHJcbiAgICAgIC8vIFdoYXQgYWJvdXQgdHdvIGVxdWFsIGRpc3BsYXkgdmFsdWVzP1xyXG5cclxuICAgICAgLy8gQnV0IG5vIHJlY29yZCBzZWxlY3Rpb24gY291bGQgbWVhbiBjYW5jZWxcclxuICAgICAgLy8gYnV0IG9wZW4gbW9kYWwgYW5kIGZvcmdldCBhYm91dCBpdFxyXG4gICAgICAvLyBpbiB0aGUgZW5kLCB0aGlzIHNob3VsZCBrZWVwIHRoaW5ncyBpbnRhY3QgYXMgdGhleSB3ZXJlXHJcbiAgICAgIG9wdGlvbnMud2lkZ2V0Ll9kZXN0cm95KG1vZGFsKVxyXG4gICAgICBvcHRpb25zLndpZGdldC5fdHJpZ2dlckxPVk9uRGlzcGxheSgpXHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0R3JpZENvbmZpZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLl9pZyQgPSB0aGlzLl9pdGVtJC5jbG9zZXN0KCcuYS1JRycpXHJcblxyXG4gICAgICBpZiAodGhpcy5faWckLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLl9ncmlkID0gdGhpcy5faWckLmludGVyYWN0aXZlR3JpZCgnZ2V0Vmlld3MnKS5ncmlkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX29uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgdmFyIHNlbGYgPSBvcHRpb25zLndpZGdldFxyXG5cclxuICAgICAgc2VsZi5faW5pdEdyaWRDb25maWcoKVxyXG5cclxuICAgICAgLy8gQ3JlYXRlIExPViByZWdpb25cclxuICAgICAgdmFyICRtb2RhbFJlZ2lvbiA9IHNlbGYuX3RvcEFwZXgualF1ZXJ5KG1vZGFsUmVwb3J0VGVtcGxhdGUoc2VsZi5fdGVtcGxhdGVEYXRhKSkuYXBwZW5kVG8oJ2JvZHknKVxyXG4gICAgICBcclxuICAgICAgLy8gT3BlbiBuZXcgbW9kYWxcclxuICAgICAgJG1vZGFsUmVnaW9uLmRpYWxvZyh7XHJcbiAgICAgICAgaGVpZ2h0OiAkbW9kYWxSZWdpb24uZmluZCgnLnQtUmVwb3J0LXdyYXAnKS5oZWlnaHQoKSArIDE1MCwgLy8gKyBkaWFsb2cgYnV0dG9uIGhlaWdodFxyXG4gICAgICAgIHdpZHRoOiBzZWxmLm9wdGlvbnMubW9kYWxXaWR0aCxcclxuICAgICAgICBjbG9zZVRleHQ6IGFwZXgubGFuZy5nZXRNZXNzYWdlKCdBUEVYLkRJQUxPRy5DTE9TRScpLFxyXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICByZXNpemFibGU6IHRydWUsXHJcbiAgICAgICAgY2xvc2VPbkVzY2FwZTogdHJ1ZSxcclxuICAgICAgICBkaWFsb2dDbGFzczogJ3VpLWRpYWxvZy0tYXBleCAnLFxyXG4gICAgICAgIG9wZW46IGZ1bmN0aW9uIChtb2RhbCkge1xyXG4gICAgICAgICAgLy8gcmVtb3ZlIG9wZW5lciBiZWNhdXNlIGl0IG1ha2VzIHRoZSBwYWdlIHNjcm9sbCBkb3duIGZvciBJR1xyXG4gICAgICAgICAgc2VsZi5fdG9wQXBleC5qUXVlcnkodGhpcykuZGF0YSgndWlEaWFsb2cnKS5vcGVuZXIgPSBzZWxmLl90b3BBcGV4LmpRdWVyeSgpXHJcbiAgICAgICAgICBzZWxmLl90b3BBcGV4Lm5hdmlnYXRpb24uYmVnaW5GcmVlemVTY3JvbGwoKVxyXG4gICAgICAgICAgc2VsZi5fb25PcGVuRGlhbG9nKHRoaXMsIG9wdGlvbnMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZWZvcmVDbG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5fb25DbG9zZURpYWxvZyh0aGlzLCBvcHRpb25zKVxyXG4gICAgICAgICAgLy8gUHJldmVudCBzY3JvbGxpbmcgZG93biBvbiBtb2RhbCBjbG9zZVxyXG4gICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl90b3BBcGV4Lm5hdmlnYXRpb24uZW5kRnJlZXplU2Nyb2xsKClcclxuICAgICAgICAgIHNlbGYuX3Jlc2V0Rm9jdXMoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX29uUmVsb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGFmdGVyIGEgc2VhcmNoXHJcbiAgICAgIHZhciByZXBvcnRIdG1sID0gSGFuZGxlYmFycy5wYXJ0aWFscy5yZXBvcnQoc2VsZi5fdGVtcGxhdGVEYXRhKVxyXG4gICAgICB2YXIgcGFnaW5hdGlvbkh0bWwgPSBIYW5kbGViYXJzLnBhcnRpYWxzLnBhZ2luYXRpb24oc2VsZi5fdGVtcGxhdGVEYXRhKVxyXG5cclxuICAgICAgLy8gR2V0IGN1cnJlbnQgbW9kYWwtbG92IHRhYmxlXHJcbiAgICAgIHZhciBtb2RhbExPVlRhYmxlID0gc2VsZi5fbW9kYWxEaWFsb2ckLmZpbmQoJy5tb2RhbC1sb3YtdGFibGUnKVxyXG4gICAgICB2YXIgcGFnaW5hdGlvbiA9IHNlbGYuX21vZGFsRGlhbG9nJC5maW5kKCcudC1CdXR0b25SZWdpb24td3JhcCcpXHJcblxyXG4gICAgICAvLyBSZXBsYWNlIHJlcG9ydCB3aXRoIG5ldyBkYXRhXHJcbiAgICAgICQobW9kYWxMT1ZUYWJsZSkucmVwbGFjZVdpdGgocmVwb3J0SHRtbClcclxuICAgICAgJChwYWdpbmF0aW9uKS5odG1sKHBhZ2luYXRpb25IdG1sKVxyXG5cclxuICAgICAgLy8gc2VsZWN0SW5pdGlhbFJvdyBpbiBuZXcgbW9kYWwtbG92IHRhYmxlXHJcbiAgICAgIHNlbGYuX3NlbGVjdEluaXRpYWxSb3coKVxyXG5cclxuICAgICAgLy8gTWFrZSB0aGUgZW50ZXIga2V5IGRvIHNvbWV0aGluZyBhZ2FpblxyXG4gICAgICBzZWxmLl9hY3RpdmVEZWxheSA9IGZhbHNlXHJcbiAgICB9LFxyXG5cclxuICAgIF91bmVzY2FwZTogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICByZXR1cm4gdmFsIC8vICQoJzxpbnB1dCB2YWx1ZT1cIicgKyB2YWwgKyAnXCIvPicpLnZhbCgpXHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRUZW1wbGF0ZURhdGE6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAvLyBDcmVhdGUgcmV0dXJuIE9iamVjdFxyXG4gICAgICB2YXIgdGVtcGxhdGVEYXRhID0ge1xyXG4gICAgICAgIGlkOiBzZWxmLm9wdGlvbnMuaWQsXHJcbiAgICAgICAgY2xhc3NlczogJ21vZGFsLWxvdicsXHJcbiAgICAgICAgdGl0bGU6IHNlbGYub3B0aW9ucy50aXRsZSxcclxuICAgICAgICBtb2RhbFNpemU6IHNlbGYub3B0aW9ucy5tb2RhbFNpemUsXHJcbiAgICAgICAgcmVnaW9uOiB7XHJcbiAgICAgICAgICBhdHRyaWJ1dGVzOiAnc3R5bGU9XCJib3R0b206IDY2cHg7XCInXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWFyY2hGaWVsZDoge1xyXG4gICAgICAgICAgaWQ6IHNlbGYub3B0aW9ucy5zZWFyY2hGaWVsZCxcclxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBzZWxmLm9wdGlvbnMuc2VhcmNoUGxhY2Vob2xkZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcG9ydDoge1xyXG4gICAgICAgICAgY29sdW1uczoge30sXHJcbiAgICAgICAgICByb3dzOiB7fSxcclxuICAgICAgICAgIGNvbENvdW50OiAwLFxyXG4gICAgICAgICAgcm93Q291bnQ6IDAsXHJcbiAgICAgICAgICBzaG93SGVhZGVyczogc2VsZi5vcHRpb25zLnNob3dIZWFkZXJzLFxyXG4gICAgICAgICAgbm9EYXRhRm91bmQ6IHNlbGYub3B0aW9ucy5ub0RhdGFGb3VuZCxcclxuICAgICAgICAgIGNsYXNzZXM6IChzZWxmLm9wdGlvbnMuYWxsb3dNdWx0aWxpbmVSb3dzKSA/ICdtdWx0aWxpbmUnIDogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgIHJvd0NvdW50OiAwLFxyXG4gICAgICAgICAgZmlyc3RSb3c6IDAsXHJcbiAgICAgICAgICBsYXN0Um93OiAwLFxyXG4gICAgICAgICAgYWxsb3dQcmV2OiBmYWxzZSxcclxuICAgICAgICAgIGFsbG93TmV4dDogZmFsc2UsXHJcbiAgICAgICAgICBwcmV2aW91czogc2VsZi5vcHRpb25zLnByZXZpb3VzTGFiZWwsXHJcbiAgICAgICAgICBuZXh0OiBzZWxmLm9wdGlvbnMubmV4dExhYmVsXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBObyByb3dzIGZvdW5kP1xyXG4gICAgICBpZiAoc2VsZi5vcHRpb25zLmRhdGFTb3VyY2Uucm93Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZURhdGFcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR2V0IGNvbHVtbnNcclxuICAgICAgdmFyIGNvbHVtbnMgPSBPYmplY3Qua2V5cyhzZWxmLm9wdGlvbnMuZGF0YVNvdXJjZS5yb3dbMF0pXHJcblxyXG4gICAgICAvLyBQYWdpbmF0aW9uXHJcbiAgICAgIHRlbXBsYXRlRGF0YS5wYWdpbmF0aW9uLmZpcnN0Um93ID0gc2VsZi5vcHRpb25zLmRhdGFTb3VyY2Uucm93WzBdWydST1dOVU0jIyMnXVxyXG4gICAgICB0ZW1wbGF0ZURhdGEucGFnaW5hdGlvbi5sYXN0Um93ID0gc2VsZi5vcHRpb25zLmRhdGFTb3VyY2Uucm93W3NlbGYub3B0aW9ucy5kYXRhU291cmNlLnJvdy5sZW5ndGggLSAxXVsnUk9XTlVNIyMjJ11cclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgbmV4dCByZXN1bHRzZXRcclxuICAgICAgdmFyIG5leHRSb3cgPSBzZWxmLm9wdGlvbnMuZGF0YVNvdXJjZS5yb3dbc2VsZi5vcHRpb25zLmRhdGFTb3VyY2Uucm93Lmxlbmd0aCAtIDFdWydORVhUUk9XIyMjJ11cclxuXHJcbiAgICAgIC8vIEFsbG93IHByZXZpb3VzIGJ1dHRvbj9cclxuICAgICAgaWYgKHRlbXBsYXRlRGF0YS5wYWdpbmF0aW9uLmZpcnN0Um93ID4gMSkge1xyXG4gICAgICAgIHRlbXBsYXRlRGF0YS5wYWdpbmF0aW9uLmFsbG93UHJldiA9IHRydWVcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWxsb3cgbmV4dCBidXR0b24/XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKG5leHRSb3cudG9TdHJpbmcoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZURhdGEucGFnaW5hdGlvbi5hbGxvd05leHQgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICB0ZW1wbGF0ZURhdGEucGFnaW5hdGlvbi5hbGxvd05leHQgPSBmYWxzZVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZW1vdmUgaW50ZXJuYWwgY29sdW1ucyAoUk9XTlVNIyMjLCAuLi4pXHJcbiAgICAgIGNvbHVtbnMuc3BsaWNlKGNvbHVtbnMuaW5kZXhPZignUk9XTlVNIyMjJyksIDEpXHJcbiAgICAgIGNvbHVtbnMuc3BsaWNlKGNvbHVtbnMuaW5kZXhPZignTkVYVFJPVyMjIycpLCAxKVxyXG5cclxuICAgICAgLy8gUmVtb3ZlIGNvbHVtbiByZXR1cm4taXRlbVxyXG4gICAgICBjb2x1bW5zLnNwbGljZShjb2x1bW5zLmluZGV4T2Yoc2VsZi5vcHRpb25zLnJldHVybkNvbCksIDEpXHJcbiAgICAgIC8vIFJlbW92ZSBjb2x1bW4gcmV0dXJuLWRpc3BsYXkgaWYgZGlzcGxheSBjb2x1bW5zIGFyZSBwcm92aWRlZFxyXG4gICAgICBpZiAoY29sdW1ucy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29sdW1ucy5zcGxpY2UoY29sdW1ucy5pbmRleE9mKHNlbGYub3B0aW9ucy5kaXNwbGF5Q29sKSwgMSlcclxuICAgICAgfVxyXG5cclxuICAgICAgdGVtcGxhdGVEYXRhLnJlcG9ydC5jb2xDb3VudCA9IGNvbHVtbnMubGVuZ3RoXHJcblxyXG4gICAgICAvLyBSZW5hbWUgY29sdW1ucyB0byBzdGFuZGFyZCBuYW1lcyBsaWtlIGNvbHVtbjAsIGNvbHVtbjEsIC4uXHJcbiAgICAgIHZhciBjb2x1bW4gPSB7fVxyXG4gICAgICAkLmVhY2goY29sdW1ucywgZnVuY3Rpb24gKGtleSwgdmFsKSB7XHJcbiAgICAgICAgaWYgKGNvbHVtbnMubGVuZ3RoID09PSAxICYmIHNlbGYub3B0aW9ucy5pdGVtTGFiZWwpIHtcclxuICAgICAgICAgIGNvbHVtblsnY29sdW1uJyArIGtleV0gPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IHZhbCxcclxuICAgICAgICAgICAgbGFiZWw6IHNlbGYub3B0aW9ucy5pdGVtTGFiZWxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29sdW1uWydjb2x1bW4nICsga2V5XSA9IHtcclxuICAgICAgICAgICAgbmFtZTogdmFsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXBsYXRlRGF0YS5yZXBvcnQuY29sdW1ucyA9ICQuZXh0ZW5kKHRlbXBsYXRlRGF0YS5yZXBvcnQuY29sdW1ucywgY29sdW1uKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLyogR2V0IHJvd3NcclxuXHJcbiAgICAgICAgZm9ybWF0IHdpbGwgYmUgbGlrZSB0aGlzOlxyXG5cclxuICAgICAgICByb3dzID0gW3tjb2x1bW4wOiBcImFcIiwgY29sdW1uMTogXCJiXCJ9LCB7Y29sdW1uMDogXCJjXCIsIGNvbHVtbjE6IFwiZFwifV1cclxuXHJcbiAgICAgICovXHJcbiAgICAgIHZhciB0bXBSb3dcclxuXHJcbiAgICAgIHZhciByb3dzID0gJC5tYXAoc2VsZi5vcHRpb25zLmRhdGFTb3VyY2Uucm93LCBmdW5jdGlvbiAocm93LCByb3dLZXkpIHtcclxuICAgICAgICB0bXBSb3cgPSB7XHJcbiAgICAgICAgICBjb2x1bW5zOiB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhZGQgY29sdW1uIHZhbHVlcyB0byByb3dcclxuICAgICAgICAkLmVhY2godGVtcGxhdGVEYXRhLnJlcG9ydC5jb2x1bW5zLCBmdW5jdGlvbiAoY29sSWQsIGNvbCkge1xyXG4gICAgICAgICAgdG1wUm93LmNvbHVtbnNbY29sSWRdID0gc2VsZi5fdW5lc2NhcGUocm93W2NvbC5uYW1lXSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGFkZCBtZXRhZGF0YSB0byByb3dcclxuICAgICAgICB0bXBSb3cucmV0dXJuVmFsID0gcm93W3NlbGYub3B0aW9ucy5yZXR1cm5Db2xdXHJcbiAgICAgICAgdG1wUm93LmRpc3BsYXlWYWwgPSByb3dbc2VsZi5vcHRpb25zLmRpc3BsYXlDb2xdXHJcbiAgICAgICAgcmV0dXJuIHRtcFJvd1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGVtcGxhdGVEYXRhLnJlcG9ydC5yb3dzID0gcm93c1xyXG5cclxuICAgICAgdGVtcGxhdGVEYXRhLnJlcG9ydC5yb3dDb3VudCA9IChyb3dzLmxlbmd0aCA9PT0gMCA/IGZhbHNlIDogcm93cy5sZW5ndGgpXHJcbiAgICAgIHRlbXBsYXRlRGF0YS5wYWdpbmF0aW9uLnJvd0NvdW50ID0gdGVtcGxhdGVEYXRhLnJlcG9ydC5yb3dDb3VudFxyXG5cclxuICAgICAgcmV0dXJuIHRlbXBsYXRlRGF0YVxyXG4gICAgfSxcclxuXHJcbiAgICBfZGVzdHJveTogZnVuY3Rpb24gKG1vZGFsKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAkKHdpbmRvdy50b3AuZG9jdW1lbnQpLm9mZigna2V5ZG93bicpXHJcbiAgICAgICQod2luZG93LnRvcC5kb2N1bWVudCkub2ZmKCdrZXl1cCcsICcjJyArIHNlbGYub3B0aW9ucy5zZWFyY2hGaWVsZClcclxuICAgICAgc2VsZi5faXRlbSQub2ZmKCdrZXl1cCcpXHJcbiAgICAgIHNlbGYuX21vZGFsRGlhbG9nJC5yZW1vdmUoKVxyXG4gICAgICBzZWxmLl90b3BBcGV4Lm5hdmlnYXRpb24uZW5kRnJlZXplU2Nyb2xsKClcclxuICAgIH0sXHJcblxyXG4gICAgX2dldERhdGE6IGZ1bmN0aW9uIChvcHRpb25zLCBoYW5kbGVyKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgdmFyIHNldHRpbmdzID0ge1xyXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxyXG4gICAgICAgIGZpcnN0Um93OiAxLFxyXG4gICAgICAgIGZpbGxTZWFyY2hUZXh0OiB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldHRpbmdzID0gJC5leHRlbmQoc2V0dGluZ3MsIG9wdGlvbnMpXHJcbiAgICAgIHZhciBzZWFyY2hUZXJtID0gKHNldHRpbmdzLnNlYXJjaFRlcm0ubGVuZ3RoID4gMCkgPyBzZXR0aW5ncy5zZWFyY2hUZXJtIDogc2VsZi5fdG9wQXBleC5pdGVtKHNlbGYub3B0aW9ucy5zZWFyY2hGaWVsZCkuZ2V0VmFsdWUoKVxyXG4gICAgICB2YXIgaXRlbXMgPSBbc2VsZi5vcHRpb25zLnBhZ2VJdGVtc1RvU3VibWl0LCBzZWxmLm9wdGlvbnMuY2FzY2FkaW5nSXRlbXNdXHJcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgIHJldHVybiAoc2VsZWN0b3IpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbignLCcpXHJcblxyXG4gICAgICAvLyBTdG9yZSBsYXN0IHNlYXJjaFRlcm1cclxuICAgICAgc2VsZi5fbGFzdFNlYXJjaFRlcm0gPSBzZWFyY2hUZXJtXHJcblxyXG4gICAgICBhcGV4LnNlcnZlci5wbHVnaW4oc2VsZi5vcHRpb25zLmFqYXhJZGVudGlmaWVyLCB7XHJcbiAgICAgICAgeDAxOiAnR0VUX0RBVEEnLFxyXG4gICAgICAgIHgwMjogc2VhcmNoVGVybSwgLy8gc2VhcmNodGVybVxyXG4gICAgICAgIHgwMzogc2V0dGluZ3MuZmlyc3RSb3csIC8vIGZpcnN0IHJvd251bSB0byByZXR1cm5cclxuICAgICAgICBwYWdlSXRlbXM6IGl0ZW1zXHJcbiAgICAgIH0sIHtcclxuICAgICAgICB0YXJnZXQ6IHNlbGYuX2l0ZW0kLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgbG9hZGluZ0luZGljYXRvcjogJC5wcm94eShvcHRpb25zLmxvYWRpbmdJbmRpY2F0b3IsIHNlbGYpLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChwRGF0YSkge1xyXG4gICAgICAgICAgc2VsZi5vcHRpb25zLmRhdGFTb3VyY2UgPSBwRGF0YVxyXG4gICAgICAgICAgc2VsZi5fdGVtcGxhdGVEYXRhID0gc2VsZi5fZ2V0VGVtcGxhdGVEYXRhKClcclxuICAgICAgICAgIGhhbmRsZXIoe1xyXG4gICAgICAgICAgICB3aWRnZXQ6IHNlbGYsXHJcbiAgICAgICAgICAgIGZpbGxTZWFyY2hUZXh0OiBzZXR0aW5ncy5maWxsU2VhcmNoVGV4dFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0U2VhcmNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAvLyBpZiB0aGUgbGFzdFNlYXJjaFRlcm0gaXMgbm90IGVxdWFsIHRvIHRoZSBjdXJyZW50IHNlYXJjaFRlcm0sIHRoZW4gc2VhcmNoIGltbWVkaWF0ZVxyXG4gICAgICBpZiAoc2VsZi5fbGFzdFNlYXJjaFRlcm0gIT09IHNlbGYuX3RvcEFwZXguaXRlbShzZWxmLm9wdGlvbnMuc2VhcmNoRmllbGQpLmdldFZhbHVlKCkpIHtcclxuICAgICAgICBzZWxmLl9nZXREYXRhKHtcclxuICAgICAgICAgIGZpcnN0Um93OiAxLFxyXG4gICAgICAgICAgbG9hZGluZ0luZGljYXRvcjogc2VsZi5fbW9kYWxMb2FkaW5nSW5kaWNhdG9yXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5fb25SZWxvYWQoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFjdGlvbiB3aGVuIHVzZXIgaW5wdXRzIHNlYXJjaCB0ZXh0XHJcbiAgICAgICQod2luZG93LnRvcC5kb2N1bWVudCkub24oJ2tleXVwJywgJyMnICsgc2VsZi5vcHRpb25zLnNlYXJjaEZpZWxkLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAvLyBEbyBub3RoaW5nIGZvciBuYXZpZ2F0aW9uIGtleXMsIGVzY2FwZSBhbmQgZW50ZXJcclxuICAgICAgICB2YXIgbmF2aWdhdGlvbktleXMgPSBbMzcsIDM4LCAzOSwgNDAsIDksIDMzLCAzNCwgMjcsIDEzXVxyXG4gICAgICAgIGlmICgkLmluQXJyYXkoZXZlbnQua2V5Q29kZSwgbmF2aWdhdGlvbktleXMpID4gLTEpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3RvcCB0aGUgZW50ZXIga2V5IGZyb20gc2VsZWN0aW5nIGEgcm93XHJcbiAgICAgICAgc2VsZi5fYWN0aXZlRGVsYXkgPSB0cnVlXHJcblxyXG4gICAgICAgIC8vIERvbid0IHNlYXJjaCBvbiBhbGwga2V5IGV2ZW50cyBidXQgYWRkIGEgZGVsYXkgZm9yIHBlcmZvcm1hbmNlXHJcbiAgICAgICAgdmFyIHNyY0VsID0gZXZlbnQuY3VycmVudFRhcmdldFxyXG4gICAgICAgIGlmIChzcmNFbC5kZWxheVRpbWVyKSB7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQoc3JjRWwuZGVsYXlUaW1lcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNyY0VsLmRlbGF5VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNlbGYuX2dldERhdGEoe1xyXG4gICAgICAgICAgICBmaXJzdFJvdzogMSxcclxuICAgICAgICAgICAgbG9hZGluZ0luZGljYXRvcjogc2VsZi5fbW9kYWxMb2FkaW5nSW5kaWNhdG9yXHJcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuX29uUmVsb2FkKClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgMzUwKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBfaW5pdFBhZ2luYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIHZhciBwcmV2U2VsZWN0b3IgPSAnIycgKyBzZWxmLm9wdGlvbnMuaWQgKyAnIC50LVJlcG9ydC1wYWdpbmF0aW9uTGluay0tcHJldidcclxuICAgICAgdmFyIG5leHRTZWxlY3RvciA9ICcjJyArIHNlbGYub3B0aW9ucy5pZCArICcgLnQtUmVwb3J0LXBhZ2luYXRpb25MaW5rLS1uZXh0J1xyXG5cclxuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgbGlzdGVuZXJzXHJcbiAgICAgIHNlbGYuX3RvcEFwZXgualF1ZXJ5KHdpbmRvdy50b3AuZG9jdW1lbnQpLm9mZignY2xpY2snLCBwcmV2U2VsZWN0b3IpXHJcbiAgICAgIHNlbGYuX3RvcEFwZXgualF1ZXJ5KHdpbmRvdy50b3AuZG9jdW1lbnQpLm9mZignY2xpY2snLCBuZXh0U2VsZWN0b3IpXHJcblxyXG4gICAgICAvLyBQcmV2aW91cyBzZXRcclxuICAgICAgc2VsZi5fdG9wQXBleC5qUXVlcnkod2luZG93LnRvcC5kb2N1bWVudCkub24oJ2NsaWNrJywgcHJldlNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHNlbGYuX2dldERhdGEoe1xyXG4gICAgICAgICAgZmlyc3RSb3c6IHNlbGYuX2dldEZpcnN0Um93bnVtUHJldlNldCgpLFxyXG4gICAgICAgICAgbG9hZGluZ0luZGljYXRvcjogc2VsZi5fbW9kYWxMb2FkaW5nSW5kaWNhdG9yXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5fb25SZWxvYWQoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBOZXh0IHNldFxyXG4gICAgICBzZWxmLl90b3BBcGV4LmpRdWVyeSh3aW5kb3cudG9wLmRvY3VtZW50KS5vbignY2xpY2snLCBuZXh0U2VsZWN0b3IsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgc2VsZi5fZ2V0RGF0YSh7XHJcbiAgICAgICAgICBmaXJzdFJvdzogc2VsZi5fZ2V0Rmlyc3RSb3dudW1OZXh0U2V0KCksXHJcbiAgICAgICAgICBsb2FkaW5nSW5kaWNhdG9yOiBzZWxmLl9tb2RhbExvYWRpbmdJbmRpY2F0b3JcclxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl9vblJlbG9hZCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX2dldEZpcnN0Um93bnVtUHJldlNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gc2VsZi5fdGVtcGxhdGVEYXRhLnBhZ2luYXRpb24uZmlyc3RSb3cgLSBzZWxmLm9wdGlvbnMucm93Q291bnRcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIDFcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfZ2V0Rmlyc3RSb3dudW1OZXh0U2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLl90ZW1wbGF0ZURhdGEucGFnaW5hdGlvbi5sYXN0Um93ICsgMVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gMTZcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfb3BlbkxPVjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIC8vIFJlbW92ZSBwcmV2aW91cyBtb2RhbC1sb3YgcmVnaW9uXHJcbiAgICAgICQoJyMnICsgc2VsZi5vcHRpb25zLmlkLCBkb2N1bWVudCkucmVtb3ZlKClcclxuXHJcbiAgICAgIHNlbGYuX2dldERhdGEoe1xyXG4gICAgICAgIGZpcnN0Um93OiAxLFxyXG4gICAgICAgIHNlYXJjaFRlcm06IG9wdGlvbnMuc2VhcmNoVGVybSxcclxuICAgICAgICBmaWxsU2VhcmNoVGV4dDogb3B0aW9ucy5maWxsU2VhcmNoVGV4dCxcclxuICAgICAgICBsb2FkaW5nSW5kaWNhdG9yOiBzZWxmLl9pdGVtTG9hZGluZ0luZGljYXRvclxyXG4gICAgICB9LCBvcHRpb25zLmFmdGVyRGF0YSlcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZENTU1RvVG9wTGV2ZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIC8vIENTUyBmaWxlIGlzIGFsd2F5cyBwcmVzZW50IHdoZW4gdGhlIGN1cnJlbnQgd2luZG93IGlzIHRoZSB0b3Agd2luZG93LCBzbyBkbyBub3RoaW5nXHJcbiAgICAgIGlmICh3aW5kb3cgPT09IHdpbmRvdy50b3ApIHtcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgICB2YXIgY3NzU2VsZWN0b3IgPSAnbGlua1tyZWw9XCJzdHlsZXNoZWV0XCJdW2hyZWYqPVwibW9kYWwtbG92XCJdJ1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgZmlsZSBleGlzdHMgaW4gdG9wIHdpbmRvd1xyXG4gICAgICBpZiAoc2VsZi5fdG9wQXBleC5qUXVlcnkoY3NzU2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHNlbGYuX3RvcEFwZXgualF1ZXJ5KCdoZWFkJykuYXBwZW5kKCQoY3NzU2VsZWN0b3IpLmNsb25lKCkpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3RyaWdnZXJMT1ZPbkRpc3BsYXk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIC8vIFRyaWdnZXIgZXZlbnQgb24gY2xpY2sgaW5wdXQgZGlzcGxheSBmaWVsZFxyXG4gICAgICBzZWxmLl9pdGVtJC5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICgkLmluQXJyYXkoZS5rZXlDb2RlLCBzZWxmLl92YWxpZFNlYXJjaEtleXMpID4gLTEgJiYgKCFlLmN0cmxLZXkgfHwgZS5rZXlDb2RlID09PSA4NikpIHtcclxuICAgICAgICAgICQodGhpcykub2ZmKCdrZXl1cCcpXHJcbiAgICAgICAgICBzZWxmLl9vcGVuTE9WKHtcclxuICAgICAgICAgICAgc2VhcmNoVGVybTogc2VsZi5faXRlbSQudmFsKCksXHJcbiAgICAgICAgICAgIGZpbGxTZWFyY2hUZXh0OiB0cnVlLFxyXG4gICAgICAgICAgICBhZnRlckRhdGE6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgc2VsZi5fb25Mb2FkKG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgLy8gQ2xlYXIgaW5wdXQgYXMgc29vbiBhcyBtb2RhbCBpcyByZWFkeVxyXG4gICAgICAgICAgICAgIHNlbGYuX3JldHVyblZhbHVlID0gJydcclxuICAgICAgICAgICAgICBzZWxmLl9pdGVtJC52YWwoJycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBfdHJpZ2dlckxPVk9uQnV0dG9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICAvLyBUcmlnZ2VyIGV2ZW50IG9uIGNsaWNrIGlucHV0IGdyb3VwIGFkZG9uIGJ1dHRvbiAobWFnbmlmaWVyIGdsYXNzKVxyXG4gICAgICBzZWxmLl9zZWFyY2hCdXR0b24kLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgc2VsZi5fb3BlbkxPVih7XHJcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnJyxcclxuICAgICAgICAgIGZpbGxTZWFyY2hUZXh0OiBmYWxzZSxcclxuICAgICAgICAgIGFmdGVyRGF0YTogc2VsZi5fb25Mb2FkXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX29uUm93SG92ZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIHNlbGYuX21vZGFsRGlhbG9nJC5vbignbW91c2VlbnRlciBtb3VzZWxlYXZlJywgJy50LVJlcG9ydC1yZXBvcnQgdGJvZHkgdHInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ21hcmsnKSkge1xyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3Moc2VsZi5vcHRpb25zLmhvdmVyQ2xhc3NlcylcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX3NlbGVjdEluaXRpYWxSb3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIC8vIElmIGN1cnJlbnQgaXRlbSBpbiBMT1YgdGhlbiBzZWxlY3QgdGhhdCByb3dcclxuICAgICAgLy8gRWxzZSBzZWxlY3QgZmlyc3Qgcm93IG9mIHJlcG9ydFxyXG4gICAgICB2YXIgJGN1clJvdyA9IHNlbGYuX21vZGFsRGlhbG9nJC5maW5kKCcudC1SZXBvcnQtcmVwb3J0IHRyW2RhdGEtcmV0dXJuPVwiJyArIHNlbGYuX3JldHVyblZhbHVlICsgJ1wiXScpXHJcbiAgICAgIGlmICgkY3VyUm93Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkY3VyUm93LmFkZENsYXNzKCdtYXJrICcgKyBzZWxmLm9wdGlvbnMubWFya0NsYXNzZXMpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VsZi5fbW9kYWxEaWFsb2ckLmZpbmQoJy50LVJlcG9ydC1yZXBvcnQgdHJbZGF0YS1yZXR1cm5dJykuZmlyc3QoKS5hZGRDbGFzcygnbWFyayAnICsgc2VsZi5vcHRpb25zLm1hcmtDbGFzc2VzKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0S2V5Ym9hcmROYXZpZ2F0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgZnVuY3Rpb24gbmF2aWdhdGUgKGRpcmVjdGlvbiwgZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICB2YXIgY3VycmVudFJvdyA9IHNlbGYuX21vZGFsRGlhbG9nJC5maW5kKCcudC1SZXBvcnQtcmVwb3J0IHRyLm1hcmsnKVxyXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICBjYXNlICd1cCc6XHJcbiAgICAgICAgICAgIGlmICgkKGN1cnJlbnRSb3cpLnByZXYoKS5pcygnLnQtUmVwb3J0LXJlcG9ydCB0cicpKSB7XHJcbiAgICAgICAgICAgICAgJChjdXJyZW50Um93KS5yZW1vdmVDbGFzcygnbWFyayAnICsgc2VsZi5vcHRpb25zLm1hcmtDbGFzc2VzKS5wcmV2KCkuYWRkQ2xhc3MoJ21hcmsgJyArIHNlbGYub3B0aW9ucy5tYXJrQ2xhc3NlcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICAgIGlmICgkKGN1cnJlbnRSb3cpLm5leHQoKS5pcygnLnQtUmVwb3J0LXJlcG9ydCB0cicpKSB7XHJcbiAgICAgICAgICAgICAgJChjdXJyZW50Um93KS5yZW1vdmVDbGFzcygnbWFyayAnICsgc2VsZi5vcHRpb25zLm1hcmtDbGFzc2VzKS5uZXh0KCkuYWRkQ2xhc3MoJ21hcmsgJyArIHNlbGYub3B0aW9ucy5tYXJrQ2xhc3NlcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgJCh3aW5kb3cudG9wLmRvY3VtZW50KS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcclxuICAgICAgICAgIGNhc2UgMzg6IC8vIHVwXHJcbiAgICAgICAgICAgIG5hdmlnYXRlKCd1cCcsIGUpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlIDQwOiAvLyBkb3duXHJcbiAgICAgICAgICAgIG5hdmlnYXRlKCdkb3duJywgZSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIGNhc2UgOTogLy8gdGFiXHJcbiAgICAgICAgICAgIG5hdmlnYXRlKCdkb3duJywgZSlcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgIGNhc2UgMTM6IC8vIEVOVEVSXHJcbiAgICAgICAgICAgIGlmICghc2VsZi5fYWN0aXZlRGVsYXkpIHtcclxuICAgICAgICAgICAgICB2YXIgY3VycmVudFJvdyA9IHNlbGYuX21vZGFsRGlhbG9nJC5maW5kKCcudC1SZXBvcnQtcmVwb3J0IHRyLm1hcmsnKS5maXJzdCgpXHJcbiAgICAgICAgICAgICAgc2VsZi5fcmV0dXJuU2VsZWN0ZWRSb3coY3VycmVudFJvdylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgY2FzZSAzMzogLy8gUGFnZSB1cFxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgc2VsZi5fdG9wQXBleC5qUXVlcnkoJyMnICsgc2VsZi5vcHRpb25zLmlkICsgJyAudC1CdXR0b25SZWdpb24tYnV0dG9ucyAudC1SZXBvcnQtcGFnaW5hdGlvbkxpbmstLXByZXYnKS50cmlnZ2VyKCdjbGljaycpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICBjYXNlIDM0OiAvLyBQYWdlIGRvd25cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIHNlbGYuX3RvcEFwZXgualF1ZXJ5KCcjJyArIHNlbGYub3B0aW9ucy5pZCArICcgLnQtQnV0dG9uUmVnaW9uLWJ1dHRvbnMgLnQtUmVwb3J0LXBhZ2luYXRpb25MaW5rLS1uZXh0JykudHJpZ2dlcignY2xpY2snKVxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX3JldHVyblNlbGVjdGVkUm93OiBmdW5jdGlvbiAoJHJvdykge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgIC8vIERvIG5vdGhpbmcgaWYgcm93IGRvZXMgbm90IGV4aXN0XHJcbiAgICAgIGlmICghJHJvdyB8fCAkcm93Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBhcGV4Lml0ZW0oc2VsZi5vcHRpb25zLml0ZW1OYW1lKS5zZXRWYWx1ZShzZWxmLl91bmVzY2FwZSgkcm93LmRhdGEoJ3JldHVybicpLnRvU3RyaW5nKCkpLCBzZWxmLl91bmVzY2FwZSgkcm93LmRhdGEoJ2Rpc3BsYXknKSkpXHJcblxyXG5cclxuICAgICAgLy8gVHJpZ2dlciBhIGN1c3RvbSBldmVudCBhbmQgYWRkIGRhdGEgdG8gaXQ6IGFsbCBjb2x1bW5zIG9mIHRoZSByb3dcclxuICAgICAgdmFyIGRhdGEgPSB7fVxyXG4gICAgICAkLmVhY2goJCgnLnQtUmVwb3J0LXJlcG9ydCB0ci5tYXJrJykuZmluZCgndGQnKSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XHJcbiAgICAgICAgZGF0YVskKHZhbCkuYXR0cignaGVhZGVycycpXSA9ICQodmFsKS5odG1sKClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIEZpbmFsbHkgaGlkZSB0aGUgbW9kYWxcclxuICAgICAgc2VsZi5fbW9kYWxEaWFsb2ckLmRpYWxvZygnY2xvc2UnKVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25Sb3dTZWxlY3RlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgLy8gQWN0aW9uIHdoZW4gcm93IGlzIGNsaWNrZWRcclxuICAgICAgc2VsZi5fbW9kYWxEaWFsb2ckLm9uKCdjbGljaycsICcubW9kYWwtbG92LXRhYmxlIC50LVJlcG9ydC1yZXBvcnQgdGJvZHkgdHInLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHNlbGYuX3JldHVyblNlbGVjdGVkUm93KHNlbGYuX3RvcEFwZXgualF1ZXJ5KHRoaXMpKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBfcmVtb3ZlVmFsaWRhdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBDbGVhciBjdXJyZW50IGVycm9yc1xyXG4gICAgICBhcGV4Lm1lc3NhZ2UuY2xlYXJFcnJvcnModGhpcy5vcHRpb25zLml0ZW1OYW1lKVxyXG4gICAgfSxcclxuXHJcbiAgICBfY2xlYXJJbnB1dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgYXBleC5pdGVtKHNlbGYub3B0aW9ucy5pdGVtTmFtZSkuc2V0VmFsdWUoJycpXHJcbiAgICAgIHNlbGYuX3JldHVyblZhbHVlID0gJydcclxuICAgICAgc2VsZi5fcmVtb3ZlVmFsaWRhdGlvbigpXHJcbiAgICAgIHNlbGYuX2l0ZW0kLmZvY3VzKClcclxuICAgIH0sXHJcblxyXG4gICAgX2luaXRDbGVhcklucHV0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgc2VsZi5fY2xlYXJJbnB1dCQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX2NsZWFySW5wdXQoKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBfaW5pdENhc2NhZGluZ0xPVnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICQoc2VsZi5vcHRpb25zLmNhc2NhZGluZ0l0ZW1zKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX2NsZWFySW5wdXQoKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBfc2V0VmFsdWVCYXNlZE9uRGlzcGxheTogZnVuY3Rpb24gKHBWYWx1ZSkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgIHZhciBwcm9taXNlID0gYXBleC5zZXJ2ZXIucGx1Z2luKHNlbGYub3B0aW9ucy5hamF4SWRlbnRpZmllciwge1xyXG4gICAgICAgIHgwMTogJ0dFVF9WQUxVRScsXHJcbiAgICAgICAgeDAyOiBwVmFsdWUgLy8gcmV0dXJuVmFsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGxvYWRpbmdJbmRpY2F0b3I6ICQucHJveHkoc2VsZi5faXRlbUxvYWRpbmdJbmRpY2F0b3IsIHNlbGYpLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChwRGF0YSkge1xyXG4gICAgICAgICAgc2VsZi5fZGlzYWJsZUNoYW5nZUV2ZW50ID0gZmFsc2VcclxuICAgICAgICAgIHNlbGYuX3JldHVyblZhbHVlID0gcERhdGEucmV0dXJuVmFsdWVcclxuICAgICAgICAgIHNlbGYuX2l0ZW0kLnZhbChwRGF0YS5kaXNwbGF5VmFsdWUpXHJcbiAgICAgICAgICBzZWxmLl9pdGVtJC50cmlnZ2VyKCdjaGFuZ2UnKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIHByb21pc2VcclxuICAgICAgICAuZG9uZShmdW5jdGlvbiAocERhdGEpIHtcclxuICAgICAgICAgIHNlbGYuX3JldHVyblZhbHVlID0gcERhdGEucmV0dXJuVmFsdWVcclxuICAgICAgICAgIHNlbGYuX2l0ZW0kLnZhbChwRGF0YS5kaXNwbGF5VmFsdWUpXHJcbiAgICAgICAgICBzZWxmLl9pdGVtJC50cmlnZ2VyKCdjaGFuZ2UnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl9kaXNhYmxlQ2hhbmdlRXZlbnQgPSBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0QXBleEl0ZW06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIC8vIFNldCBhbmQgZ2V0IHZhbHVlIHZpYSBhcGV4IGZ1bmN0aW9uc1xyXG4gICAgICBhcGV4Lml0ZW0uY3JlYXRlKHNlbGYub3B0aW9ucy5pdGVtTmFtZSwge1xyXG4gICAgICAgIGVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5faXRlbSQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSlcclxuICAgICAgICAgIHNlbGYuX3NlYXJjaEJ1dHRvbiQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSlcclxuICAgICAgICAgIHNlbGYuX2NsZWFySW5wdXQkLnNob3coKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2VsZi5faXRlbSQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxyXG4gICAgICAgICAgc2VsZi5fc2VhcmNoQnV0dG9uJC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXHJcbiAgICAgICAgICBzZWxmLl9jbGVhcklucHV0JC5oaWRlKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzRGlzYWJsZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHJldHVybiBzZWxmLl9pdGVtJC5wcm9wKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl9pdGVtJC5zaG93KClcclxuICAgICAgICAgIHNlbGYuX3NlYXJjaEJ1dHRvbiQuc2hvdygpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBzZWxmLl9pdGVtJC5oaWRlKClcclxuICAgICAgICAgIHNlbGYuX3NlYXJjaEJ1dHRvbiQuaGlkZSgpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChwVmFsdWUsIHBEaXNwbGF5VmFsdWUsIHBTdXBwcmVzc0NoYW5nZUV2ZW50KSB7XHJcbiAgICAgICAgICBpZiAocERpc3BsYXlWYWx1ZSB8fCAhcFZhbHVlIHx8IHBWYWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgLy8gQXNzdW1pbmcgbm8gY2hlY2sgaXMgbmVlZGVkIHRvIHNlZSBpZiB0aGUgdmFsdWUgaXMgaW4gdGhlIExPVlxyXG4gICAgICAgICAgICBzZWxmLl9pdGVtJC52YWwocERpc3BsYXlWYWx1ZSlcclxuICAgICAgICAgICAgc2VsZi5fcmV0dXJuVmFsdWUgPSBwVmFsdWVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuX2l0ZW0kLnZhbChwRGlzcGxheVZhbHVlKVxyXG4gICAgICAgICAgICBzZWxmLl9kaXNhYmxlQ2hhbmdlRXZlbnQgPSB0cnVlXHJcbiAgICAgICAgICAgIHNlbGYuX3NldFZhbHVlQmFzZWRPbkRpc3BsYXkocFZhbHVlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vIEFsd2F5cyByZXR1cm4gYXQgbGVhc3QgYW4gZW1wdHkgc3RyaW5nXHJcbiAgICAgICAgICByZXR1cm4gc2VsZi5fcmV0dXJuVmFsdWUgfHwgJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYub3B0aW9ucy5pdGVtTmFtZSkudmFsdWUgIT09IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYub3B0aW9ucy5pdGVtTmFtZSkuZGVmYXVsdFZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBhcGV4Lml0ZW0oc2VsZi5vcHRpb25zLml0ZW1OYW1lKS5jYWxsYmFja3MuZGlzcGxheVZhbHVlRm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBzZWxmLl9pdGVtJC52YWwoKVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBPbmx5IHRyaWdnZXIgdGhlIGNoYW5nZSBldmVudCBhZnRlciB0aGUgQXN5bmMgY2FsbGJhY2sgaWYgbmVlZGVkXHJcbiAgICAgIHNlbGYuX2l0ZW0kWyd0cmlnZ2VyJ10gPSBmdW5jdGlvbiAodHlwZSwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnY2hhbmdlJyAmJiBzZWxmLl9kaXNhYmxlQ2hhbmdlRXZlbnQpIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAkLmZuLnRyaWdnZXIuY2FsbChzZWxmLl9pdGVtJCwgdHlwZSwgZGF0YSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfaXRlbUxvYWRpbmdJbmRpY2F0b3I6IGZ1bmN0aW9uIChsb2FkaW5nSW5kaWNhdG9yKSB7XHJcbiAgICAgICQoJyMnICsgdGhpcy5vcHRpb25zLnNlYXJjaEJ1dHRvbikuYWZ0ZXIobG9hZGluZ0luZGljYXRvcilcclxuICAgICAgcmV0dXJuIGxvYWRpbmdJbmRpY2F0b3JcclxuICAgIH0sXHJcblxyXG4gICAgX21vZGFsTG9hZGluZ0luZGljYXRvcjogZnVuY3Rpb24gKGxvYWRpbmdJbmRpY2F0b3IpIHtcclxuICAgICAgdGhpcy5fbW9kYWxEaWFsb2ckLnByZXBlbmQobG9hZGluZ0luZGljYXRvcilcclxuICAgICAgcmV0dXJuIGxvYWRpbmdJbmRpY2F0b3JcclxuICAgIH1cclxuICB9KVxyXG59KShhcGV4LmpRdWVyeSwgd2luZG93KVxyXG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzQ29tcGlsZXIudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIiwgYWxpYXM0PWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uLCBhbGlhczU9Y29udGFpbmVyLmxhbWJkYTtcblxuICByZXR1cm4gXCI8ZGl2IGlkPVxcXCJcIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuaWQgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmlkIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJpZFwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCJcXFwiIGNsYXNzPVxcXCJ0LURpYWxvZ1JlZ2lvbiBqcy1yZWdpZW9uRGlhbG9nIHQtRm9ybS0tc3RyZXRjaElucHV0cyB0LUZvcm0tLWxhcmdlIG1vZGFsLWxvdlxcXCIgdGl0bGU9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy50aXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAudGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInQtRGlhbG9nUmVnaW9uLWJvZHkganMtcmVnaW9uRGlhbG9nLWJvZHkgbm8tcGFkZGluZ1xcXCIgXCJcbiAgICArICgoc3RhY2sxID0gYWxpYXM1KCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlZ2lvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEuYXR0cmlidXRlcyA6IHN0YWNrMSksIGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbCBjb2wtMTJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidC1SZXBvcnQgdC1SZXBvcnQtLWFsdFJvd3NEZWZhdWx0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0LVJlcG9ydC13cmFwXFxcIiBzdHlsZT1cXFwid2lkdGg6IDEwMCVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0LUZvcm0tZmllbGRDb250YWluZXIgdC1Gb3JtLWZpZWxkQ29udGFpbmVyLS1zdGFja2VkIHQtRm9ybS1maWVsZENvbnRhaW5lci0tc3RyZXRjaElucHV0cyBtYXJnaW4tdG9wLXNtXFxcIiBpZD1cXFwiXCJcbiAgICArIGFsaWFzNChhbGlhczUoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2VhcmNoRmllbGQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmlkIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiX0NPTlRBSU5FUlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0LUZvcm0taW5wdXRDb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInQtRm9ybS1pdGVtV3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiYXBleC1pdGVtLXRleHQgbW9kYWwtbG92LWl0ZW0gXFxcIiBpZD1cXFwiXCJcbiAgICArIGFsaWFzNChhbGlhczUoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc2VhcmNoRmllbGQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmlkIDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiXFxcIiBhdXRvY29tcGxldGU9XFxcIm9mZlxcXCIgcGxhY2Vob2xkZXI9XFxcIlwiXG4gICAgKyBhbGlhczQoYWxpYXM1KCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnNlYXJjaEZpZWxkIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5wbGFjZWhvbGRlciA6IHN0YWNrMSksIGRlcHRoMCkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBpZD1cXFwiUDExMTBfWkFBTF9GS19DT0RFX0JVVFRPTlxcXCIgY2xhc3M9XFxcImEtQnV0dG9uIG1vZGFsLWxvdi1idXR0b24gYS1CdXR0b24tLXBvcHVwTE9WXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJmYSBmYS1zZWFyY2hcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGNvbnRhaW5lci5pbnZva2VQYXJ0aWFsKHBhcnRpYWxzLnJlcG9ydCxkZXB0aDAse1wibmFtZVwiOlwicmVwb3J0XCIsXCJkYXRhXCI6ZGF0YSxcImluZGVudFwiOlwiICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLFwiaGVscGVyc1wiOmhlbHBlcnMsXCJwYXJ0aWFsc1wiOnBhcnRpYWxzLFwiZGVjb3JhdG9yc1wiOmNvbnRhaW5lci5kZWNvcmF0b3JzfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCIgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidC1EaWFsb2dSZWdpb24tYnV0dG9ucyBqcy1yZWdpb25EaWFsb2ctYnV0dG9uc1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0LUJ1dHRvblJlZ2lvbiB0LUJ1dHRvblJlZ2lvbi0tZGlhbG9nUmVnaW9uXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0LUJ1dHRvblJlZ2lvbi13cmFwXFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBjb250YWluZXIuaW52b2tlUGFydGlhbChwYXJ0aWFscy5wYWdpbmF0aW9uLGRlcHRoMCx7XCJuYW1lXCI6XCJwYWdpbmF0aW9uXCIsXCJkYXRhXCI6ZGF0YSxcImluZGVudFwiOlwiICAgICAgICAgICAgICAgIFwiLFwiaGVscGVyc1wiOmhlbHBlcnMsXCJwYXJ0aWFsc1wiOnBhcnRpYWxzLFwiZGVjb3JhdG9yc1wiOmNvbnRhaW5lci5kZWNvcmF0b3JzfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCIgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIjtcbn0sXCJ1c2VQYXJ0aWFsXCI6dHJ1ZSxcInVzZURhdGFcIjp0cnVlfSk7XG4iLCIvLyBoYnNmeSBjb21waWxlZCBIYW5kbGViYXJzIHRlbXBsYXRlXG52YXIgSGFuZGxlYmFyc0NvbXBpbGVyID0gcmVxdWlyZSgnaGJzZnkvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGViYXJzQ29tcGlsZXIudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1jb250YWluZXIubGFtYmRhLCBhbGlhczM9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiPGRpdiBjbGFzcz1cXFwidC1CdXR0b25SZWdpb24tY29sIHQtQnV0dG9uUmVnaW9uLWNvbC0tbGVmdFxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInQtQnV0dG9uUmVnaW9uLWJ1dHRvbnNcXFwiPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnNbXCJpZlwiXS5jYWxsKGFsaWFzMSwoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5wYWdpbmF0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5hbGxvd1ByZXYgOiBzdGFjazEpLHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDIsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48ZGl2IGNsYXNzPVxcXCJ0LUJ1dHRvblJlZ2lvbi1jb2wgdC1CdXR0b25SZWdpb24tY29sLS1jZW50ZXJcXFwiIHN0eWxlPVxcXCJ0ZXh0LWFsaWduOiBjZW50ZXI7XFxcIj5cXHJcXG4gIFwiXG4gICAgKyBhbGlhczMoYWxpYXMyKCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnBhZ2luYXRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmZpcnN0Um93IDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiIC0gXCJcbiAgICArIGFsaWFzMyhhbGlhczIoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucGFnaW5hdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEubGFzdFJvdyA6IHN0YWNrMSksIGRlcHRoMCkpXG4gICAgKyBcIlxcclxcbjwvZGl2PlxcclxcbjxkaXYgY2xhc3M9XFxcInQtQnV0dG9uUmVnaW9uLWNvbCB0LUJ1dHRvblJlZ2lvbi1jb2wtLXJpZ2h0XFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidC1CdXR0b25SZWdpb24tYnV0dG9uc1xcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVyc1tcImlmXCJdLmNhbGwoYWxpYXMxLCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnBhZ2luYXRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmFsbG93TmV4dCA6IHN0YWNrMSkse1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oNCwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIilcbiAgICArIFwiICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcblwiO1xufSxcIjJcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiICAgICAgICA8YSBocmVmPVxcXCJqYXZhc2NyaXB0OnZvaWQoMCk7XFxcIiBjbGFzcz1cXFwidC1CdXR0b24gdC1CdXR0b24tLXNtYWxsIHQtQnV0dG9uLS1ub1VJIHQtUmVwb3J0LXBhZ2luYXRpb25MaW5rIHQtUmVwb3J0LXBhZ2luYXRpb25MaW5rLS1wcmV2XFxcIj5cXHJcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImEtSWNvbiBpY29uLWxlZnQtYXJyb3dcXFwiPjwvc3Bhbj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYSgoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5wYWdpbmF0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5wcmV2aW91cyA6IHN0YWNrMSksIGRlcHRoMCkpXG4gICAgKyBcIlxcclxcbiAgICAgICAgPC9hPlxcclxcblwiO1xufSxcIjRcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiICAgICAgICA8YSBocmVmPVxcXCJqYXZhc2NyaXB0OnZvaWQoMCk7XFxcIiBjbGFzcz1cXFwidC1CdXR0b24gdC1CdXR0b24tLXNtYWxsIHQtQnV0dG9uLS1ub1VJIHQtUmVwb3J0LXBhZ2luYXRpb25MaW5rIHQtUmVwb3J0LXBhZ2luYXRpb25MaW5rLS1uZXh0XFxcIj5cIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYSgoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5wYWdpbmF0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5uZXh0IDogc3RhY2sxKSwgZGVwdGgwKSlcbiAgICArIFwiXFxyXFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJhLUljb24gaWNvbi1yaWdodC1hcnJvd1xcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgPC9hPlxcclxcblwiO1xufSxcImNvbXBpbGVyXCI6WzcsXCI+PSA0LjAuMFwiXSxcIm1haW5cIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuICgoc3RhY2sxID0gaGVscGVyc1tcImlmXCJdLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5wYWdpbmF0aW9uIDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5yb3dDb3VudCA6IHN0YWNrMSkse1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIik7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBoZWxwZXIsIG9wdGlvbnMsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBidWZmZXIgPSBcbiAgXCIgICAgICAgICAgICA8dGFibGUgY2VsbHBhZGRpbmc9XFxcIjBcXFwiIGJvcmRlcj1cXFwiMFxcXCIgY2VsbHNwYWNpbmc9XFxcIjBcXFwiIHN1bW1hcnk9XFxcIlxcXCIgY2xhc3M9XFxcInQtUmVwb3J0LXJlcG9ydCBcIlxuICAgICsgY29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24oY29udGFpbmVyLmxhbWJkYSgoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZXBvcnQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLmNsYXNzZXMgOiBzdGFjazEpLCBkZXB0aDApKVxuICAgICsgXCJcXFwiIHdpZHRoPVxcXCIxMDAlXFxcIj5cXHJcXG4gICAgICAgICAgICAgIDx0Ym9keT5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzW1wiaWZcIl0uY2FsbChhbGlhczEsKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucmVwb3J0IDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5zaG93SGVhZGVycyA6IHN0YWNrMSkse1wibmFtZVwiOlwiaWZcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMiwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIik7XG4gIHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMucmVwb3J0IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZXBvcnQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwob3B0aW9ucz17XCJuYW1lXCI6XCJyZXBvcnRcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oOCwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YX0pLCh0eXBlb2YgaGVscGVyID09PSBcImZ1bmN0aW9uXCIgPyBoZWxwZXIuY2FsbChhbGlhczEsb3B0aW9ucykgOiBoZWxwZXIpKTtcbiAgaWYgKCFoZWxwZXJzLnJlcG9ydCkgeyBzdGFjazEgPSBoZWxwZXJzLmJsb2NrSGVscGVyTWlzc2luZy5jYWxsKGRlcHRoMCxzdGFjazEsb3B0aW9ucyl9XG4gIGlmIChzdGFjazEgIT0gbnVsbCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIHJldHVybiBidWZmZXIgKyBcIiAgICAgICAgICAgICAgPC90Ym9keT5cXHJcXG4gICAgICAgICAgICA8L3RhYmxlPlxcclxcblwiO1xufSxcIjJcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiICAgICAgICAgICAgICAgICAgPHRoZWFkPlxcclxcblwiXG4gICAgKyAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucmVwb3J0IDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5jb2x1bW5zIDogc3RhY2sxKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDMsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XFxyXFxuXCI7XG59LFwiM1wiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KTtcblxuICByZXR1cm4gXCIgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVxcXCJ0LVJlcG9ydC1jb2xIZWFkXFxcIiBpZD1cXFwiXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMua2V5IHx8IChkYXRhICYmIGRhdGEua2V5KSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlcnMuaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJrZXlcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiXFxcIj5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzW1wiaWZcIl0uY2FsbChhbGlhczEsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmxhYmVsIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJpZlwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSg0LCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIucHJvZ3JhbSg2LCBkYXRhLCAwKSxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCIgICAgICAgICAgICAgICAgICAgICAgPC90aD5cXHJcXG5cIjtcbn0sXCI0XCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCIgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbihjb250YWluZXIubGFtYmRhKChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5sYWJlbCA6IGRlcHRoMCksIGRlcHRoMCkpXG4gICAgKyBcIlxcclxcblwiO1xufSxcIjZcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHJldHVybiBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApLCBkZXB0aDApKVxuICAgICsgXCJcXHJcXG5cIjtcbn0sXCI4XCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiAoKHN0YWNrMSA9IGNvbnRhaW5lci5pbnZva2VQYXJ0aWFsKHBhcnRpYWxzLnJvd3MsZGVwdGgwLHtcIm5hbWVcIjpcInJvd3NcIixcImRhdGFcIjpkYXRhLFwiaW5kZW50XCI6XCIgICAgICAgICAgICAgICAgICBcIixcImhlbHBlcnNcIjpoZWxwZXJzLFwicGFydGlhbHNcIjpwYXJ0aWFscyxcImRlY29yYXRvcnNcIjpjb250YWluZXIuZGVjb3JhdG9yc30pKSAhPSBudWxsID8gc3RhY2sxIDogXCJcIik7XG59LFwiMTBcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazE7XG5cbiAgcmV0dXJuIFwiICAgIDxzcGFuIGNsYXNzPVxcXCJub2RhdGFmb3VuZFxcXCI+XCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKGNvbnRhaW5lci5sYW1iZGEoKChzdGFjazEgPSAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucmVwb3J0IDogZGVwdGgwKSkgIT0gbnVsbCA/IHN0YWNrMS5ub0RhdGFGb3VuZCA6IHN0YWNrMSksIGRlcHRoMCkpXG4gICAgKyBcIjwvc3Bhbj5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KTtcblxuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJ0LVJlcG9ydC10YWJsZVdyYXAgbW9kYWwtbG92LXRhYmxlXFxcIj5cXHJcXG4gIDx0YWJsZSBjZWxscGFkZGluZz1cXFwiMFxcXCIgYm9yZGVyPVxcXCIwXFxcIiBjZWxsc3BhY2luZz1cXFwiMFxcXCIgY2xhc3M9XFxcIlxcXCIgd2lkdGg9XFxcIjEwMCVcXFwiPlxcclxcbiAgICA8dGJvZHk+XFxyXFxuICAgICAgPHRyPlxcclxcbiAgICAgICAgPHRkPjwvdGQ+XFxyXFxuICAgICAgPC90cj5cXHJcXG4gICAgICA8dHI+XFxyXFxuICAgICAgICA8dGQ+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVyc1tcImlmXCJdLmNhbGwoYWxpYXMxLCgoc3RhY2sxID0gKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnJlcG9ydCA6IGRlcHRoMCkpICE9IG51bGwgPyBzdGFjazEucm93Q291bnQgOiBzdGFjazEpLHtcIm5hbWVcIjpcImlmXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIiAgICAgICAgPC90ZD5cXHJcXG4gICAgICA8L3RyPlxcclxcbiAgICA8L3Rib2R5PlxcclxcbiAgPC90YWJsZT5cXHJcXG5cIlxuICAgICsgKChzdGFjazEgPSBoZWxwZXJzLnVubGVzcy5jYWxsKGFsaWFzMSwoKHN0YWNrMSA9IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yZXBvcnQgOiBkZXB0aDApKSAhPSBudWxsID8gc3RhY2sxLnJvd0NvdW50IDogc3RhY2sxKSx7XCJuYW1lXCI6XCJ1bmxlc3NcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMTAsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvZGl2PlxcclxcblwiO1xufSxcInVzZVBhcnRpYWxcIjp0cnVlLFwidXNlRGF0YVwiOnRydWV9KTtcbiIsIi8vIGhic2Z5IGNvbXBpbGVkIEhhbmRsZWJhcnMgdGVtcGxhdGVcbnZhciBIYW5kbGViYXJzQ29tcGlsZXIgPSByZXF1aXJlKCdoYnNmeS9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZWJhcnNDb21waWxlci50ZW1wbGF0ZSh7XCIxXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBhbGlhczE9Y29udGFpbmVyLmxhbWJkYSwgYWxpYXMyPWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIiAgPHRyIGRhdGEtcmV0dXJuPVxcXCJcIlxuICAgICsgYWxpYXMyKGFsaWFzMSgoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAucmV0dXJuVmFsIDogZGVwdGgwKSwgZGVwdGgwKSlcbiAgICArIFwiXFxcIiBkYXRhLWRpc3BsYXk9XFxcIlwiXG4gICAgKyBhbGlhczIoYWxpYXMxKChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kaXNwbGF5VmFsIDogZGVwdGgwKSwgZGVwdGgwKSlcbiAgICArIFwiXFxcIiBjbGFzcz1cXFwicG9pbnRlclxcXCI+XFxyXFxuXCJcbiAgICArICgoc3RhY2sxID0gaGVscGVycy5lYWNoLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY29sdW1ucyA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgyLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCIgIDwvdHI+XFxyXFxuXCI7XG59LFwiMlwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIGhlbHBlciwgYWxpYXMxPWNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uO1xuXG4gIHJldHVybiBcIiAgICAgIDx0ZCBoZWFkZXJzPVxcXCJcIlxuICAgICsgYWxpYXMxKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMua2V5IHx8IChkYXRhICYmIGRhdGEua2V5KSkgIT0gbnVsbCA/IGhlbHBlciA6IGhlbHBlcnMuaGVscGVyTWlzc2luZyksKHR5cGVvZiBoZWxwZXIgPT09IFwiZnVuY3Rpb25cIiA/IGhlbHBlci5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSkse1wibmFtZVwiOlwia2V5XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCIgY2xhc3M9XFxcInQtUmVwb3J0LWNlbGxcXFwiPlwiXG4gICAgKyBhbGlhczEoY29udGFpbmVyLmxhbWJkYShkZXB0aDAsIGRlcHRoMCkpXG4gICAgKyBcIjwvdGQ+XFxyXFxuXCI7XG59LFwiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMTtcblxuICByZXR1cm4gKChzdGFjazEgPSBoZWxwZXJzLmVhY2guY2FsbChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5yb3dzIDogZGVwdGgwKSx7XCJuYW1lXCI6XCJlYWNoXCIsXCJoYXNoXCI6e30sXCJmblwiOmNvbnRhaW5lci5wcm9ncmFtKDEsIGRhdGEsIDApLFwiaW52ZXJzZVwiOmNvbnRhaW5lci5ub29wLFwiZGF0YVwiOmRhdGF9KSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG4iXX0=
